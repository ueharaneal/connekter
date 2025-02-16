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
  const { adjustedListings, setAdjustedListings, locationBoundingBox } =
    useListingsMap();

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

  const location = useMemo(() => {
    if (filters.filter) {
      return {
        lat: filters.filter.lat,
        lng: filters.filter.long,
      };
    }
    return null;
  }, [filters]);

  useEffect(() => {
    if (location?.lat && location.lng) {
      setCenter(location);
      if (map) {
        map.panTo(location);
        console.log("panning to location");
      } else {
        console.log("map not ready");
      }
    }
  }, [location, map]);

  useEffect(() => {
    setMarkers(propertiesCoordinates as Poi[]);
  }, [propertiesCoordinates]);

  const handleCameraChanged = debounce((ev: MapCameraChangedEvent) => {
    const newCenter = {
      lat: ev.detail.center.lat,
      lng: ev.detail.center.lng,
    };
    setCenter(newCenter);

    setMapBoundaries({
      north: ev.detail.bounds.north,
      south: ev.detail.bounds.south,
      east: ev.detail.bounds.east,
      west: ev.detail.bounds.west,
    });
  }, 700);

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
