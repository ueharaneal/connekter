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

  // Assuming filters is defined somewhere in your component and is causing typescript error,
  // if filters is not used in this component, you can remove it.
  // If it is used, make sure filters is properly defined and passed down or fetched.
  // For now, I'm commenting out the filters related code to make the code runnable.
  const filters = useMemo(() => ({ filter: null }), []); // Example, adjust based on your actual filters

  const location = useMemo(() => {
    if (filters.filter) {
      // return {
      //   lat: filters.filter.lat,
      //   lng: filters.filter.long,
      // };
      return null; // Assuming filters are not used for initial center for now
    }
    return null;
  }, [filters]);

  // useEffect(() => {
  //   if (location?.lat && location.lng) {
  //     setCenter(location);
  //     if (map) {
  //       map.panTo(location);
  //       console.log("panning to location");
  //     } else {
  //       console.log("map not ready");
  //     }
  //   }
  // }, [location, map]);

  // Assuming propertiesCoordinates is defined somewhere and passed as props or calculated
  // For now, using currentListings to create markers as a placeholder
  const propertiesCoordinates = useMemo(() => {
    return currentListings.map((listing) => ({
      key: listing.id,
      id: listing.id,
      location: { lat: listing.latitude, lng: listing.longitude }, // Assuming latitude and longitude are in listing
      originalNightlyPrice: listing.nightlyPrice,
      image: listing.images[0] || "", // Assuming images is an array of strings
    }));
  }, [currentListings]);

  useEffect(() => {
    setMarkers(propertiesCoordinates as Poi[]);
  }, [propertiesCoordinates]);

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
      {isFilterUndefined ? (
        <div className="flex h-full w-full items-center justify-center rounded-xl border shadow-md">
          Search for a city...
        </div>
      ) : apiIsLoaded ? (
        center && (
          <Map
            {...cameraProps}
            defaultZoom={6}
            defaultCenter={center}
            onCameraChanged={handleCameraChanged}
            disableDefaultUI={true}
            zoomControl={true}
            fullscreenControl={false}
          >
            <PoiMarkers pois={markers} />
          </Map>
        )
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default SearchPropertiesMap;
