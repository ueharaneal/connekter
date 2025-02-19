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
import { getLatLongString } from "@/lib/utils";

export type Poi = {
  key: string;
  location: google.maps.LatLngLiteral;
  originalNightlyPrice: number;
  id: string;
  image: string;
};

export type fetchNextPageOfAdjustedPropertiesType =
  RouterOutputs["listings"]["getByBoundaryInfiniteScroll"];

function SearchPropertiesMap({
  currentListings,
}: {
  currentListings: Listing[];
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

  // Determine isFilterUndefined based on currentListings length, adjust condition as needed
  useEffect(() => {
    setIsFilterUndefined(currentListings.length === 0); // Example condition
  }, [currentListings]);

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
            zoom={13}
            defaultZoom={13}
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
