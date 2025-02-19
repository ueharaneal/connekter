"use client";
import {
  Map,
  type MapCameraChangedEvent,
  type MapProps,
  useMap,
  useApiIsLoaded,
} from "@vis.gl/react-google-maps";
import Spinner from "@/components/ui/Spinner";
import { useEffect, useMemo, useState } from "react";
import { trpc, type RouterOutputs } from "@/server/client";
import { useListingsMap } from "@/store/listingMapStore";
import { debounce } from "lodash";
import { Listing } from "@/server/db/schema";
import PoiMarkers from "./PoiMarkers";

export type Poi = {
  key: string;
  name: string;
  latLngLiteral: google.maps.LatLngLiteral;
  id: number;
  image: string;
};

export type fetchNextPageOfAdjustedPropertiesType =
  RouterOutputs["listings"]["getListingsByBoundary"];

function SearchPropertiesMap({
  currentListings,
}: {
  currentListings: Listing[] | undefined;
}) {
  const {
    adjustedListings,
    setAdjustedListings,
    locationBoundingBox,
    setLocationBoundingBox, // Get the setter from zustand
    citySearchLatLong,
  } = useListingsMap();

  const [isFilterUndefined, setIsFilterUndefined] = useState(true);
  const [markers, setMarkers] = useState<Poi[]>([]);
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);

  const [cameraProps] = useState<MapProps | null>({
    mapId: "9c8e46d54d7a528b",
    id: "9c8e46d54d7a528b",
    reuseMaps: true,
    clickableIcons: true,
    mapTypeControl: false,
    gestureHandling: "cooperative",
    fullscreenControl: true,
  });

  const map = useMap("9c8e46d54d7a528b");
  const apiIsLoaded = useApiIsLoaded();

  //To move camera after search bar changes
  useEffect(() => {
    console.log("hi");
    if (citySearchLatLong?.lat && citySearchLatLong?.long) {
      // Added apiIsLoaded and map check

      setCenter({ lat: citySearchLatLong.lat, lng: citySearchLatLong.long });
      if (map) {
        // Redundant check, but for clarity
        map.panTo({ lat: citySearchLatLong.lat, lng: citySearchLatLong.long });
        console.log("panning to location");
      } else {
        console.log("map not ready (still inside if, should not happen now)"); // Should not reach here
      }
    } else if (!apiIsLoaded) {
      console.log("API not yet loaded"); // Log if API is not loaded
    } else if (!map) {
      console.log("Map instance still undefined"); // Log if map is undefined after API loaded (less likely now)
    }
  }, [citySearchLatLong, apiIsLoaded, map]); // Added apiIsLoaded to dependencies

  //popualate markers depending on current boundingbox
  useEffect(() => {
    if (!adjustedListings) return;
    const listingsMarkers = adjustedListings.data.map((listing) => ({
      ...listing,
      latLngLiteral: { lat: listing.latLngPoint.y, lng: listing.latLngPoint.x }, // fix if backworkds
      key: listing.name,
      image: listing.imageUrls[0],
    }));
    setMarkers(listingsMarkers);
  }, [adjustedListings]);

  //camera change
  const handleCameraChanged = debounce((ev: MapCameraChangedEvent) => {
    const newCenter = {
      lat: ev.detail.center.lat,
      lng: ev.detail.center.lng,
    };
    setCenter(newCenter);

    setLocationBoundingBox({
      // Use setLocationBoundingBox from zustand
      north: ev.detail.bounds.north,
      south: ev.detail.bounds.south,
      east: ev.detail.bounds.east,
      west: ev.detail.bounds.west,
    });
  }, 700);

  return (
    <div className="h-full w-full">
      {!center ? (
        <div className="flex h-full w-full items-center justify-center rounded-xl border shadow-md">
          Search for a city...
        </div>
      ) : (
        <div className="absolute inset-0 z-0 overflow-hidden rounded-xl border">
          <Map
            {...cameraProps}
            defaultZoom={13}
            maxZoom={17}
            defaultCenter={center}
            onCameraChanged={handleCameraChanged}
            disableDefaultUI={true}
            zoomControl={true}
            fullscreenControl={false}
          >
            <PoiMarkers pois={markers} />
          </Map>
        </div>
      )}
    </div>
  );
}

export default SearchPropertiesMap;
