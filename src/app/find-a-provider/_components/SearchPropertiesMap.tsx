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
import PoiMarkers from "./PoiMarkers";
import type { InfiniteQueryObserverResult } from "@tanstack/react-query";

export type Poi = {
  key: string;
  location: google.maps.LatLngLiteral;
  originalNightlyPrice: number;
  id: string;
  image: string;
};

export type MapBoundary = {
  north: number;
  south: number;
  east: number;
  west: number;
};

export type fetchNextPageOfAdjustedPropertiesType =
  RouterOutputs["listings"]["getByBoundaryInfiniteScroll"];

function SearchPropertiesMap({
  setFunctionRef,
  mapBoundaries,
  setMapBoundaries,
}: {
  setFunctionRef: (
    ref: () => Promise<
      InfiniteQueryObserverResult<fetchNextPageOfAdjustedPropertiesType>
    >,
  ) => void;
  mapBoundaries: MapBoundary | null;
  setMapBoundaries: (boundaries: MapBoundary) => void;
}) {
  const { clearFilter, adjustedListings, setAdjustedListings } =
    useListingsMap();

  const [isFilterUndefined, setIsFilterUndefined] = useState(true);

  const { data: initialProperties } =
    trpc.listings.getByBoundaryInfiniteScroll.useQuery(
      {
        boundaries:
        {
            north: z.number(),
            south: z.number(),
            east: z.number(),
            west: z.number(),
          })
          .nullable(),
        cursor: z.number().nullish(),
        city: z.string().optional(),
        latLngPoint: z
          .object({
            lat: z.number(),
            lng: z.number(),
          })
          .optional(),
        radius: z.number().optional(),
      }),
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        refetchOnWindowFocus: false,
      },
    );

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

  const {
    data: fetchedAdjustedProperties,
    isLoading,
    fetchNextPage: fetchNextPageOfAdjustedProperties,
    isFetching,
  } = trpc.listings.getByBoundaryInfiniteScroll.useInfiniteQuery(
    {
      boundaries: mapBoundaries,
      latLngPoint: filters.filter
        ? {
            lat: filters.filter.lat,
            lng: filters.filter.long,
          }
        : undefined,
      radius: filters.radius,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      refetchOnWindowFocus: false,
    },
  );

  useEffect(() => {
    setIsLoading(isLoading || isFetching);
  }, [isLoading, isFetching, setIsLoading]);

  useEffect(() => {
    if (fetchedAdjustedProperties) {
      console.log("setting adjusted listings");
      setAdjustedProperties(fetchedAdjustedProperties.data);
    }
  }, [fetchedAdjustedProperties, setAdjustedProperties]);

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
    console.log("setting function ref from propertiesMap");
    setFunctionRef(fetchNextPageOfAdjustedProperties);
  }, [fetchNextPageOfAdjustedProperties, setFunctionRef]);

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

  const propertiesCoordinates = useMemo(() => {
    if (adjustedProperties && mapBoundaries !== null) {
      return adjustedProperties.pages.flatMap((page) =>
        page.data.map((listing) => ({
          key: listing.name,
          location: {
            lat: listing.latLngPoint.y,
            lng: listing.latLngPoint.x,
          },
          originalNightlyPrice: listing.originalNightlyPrice,
          id: `${listing.id}`,
          image: listing.imageUrls[0]!,
        })),
      );
    } else if (initialProperties) {
      return initialProperties.pages.flatMap((page) =>
        page.data.map((listing) => ({
          key: listing.name,
          location: {
            lat: listing.latLngPoint.y,
            lng: listing.latLngPoint.x,
          },
          originalNightlyPrice: listing.originalNightlyPrice,
          id: `${listing.id}`,
          image: listing.imageUrls[0]!,
        })),
      );
    }
    return [];
  }, [adjustedProperties, initialProperties, mapBoundaries]);

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
    void fetchNextPageOfAdjustedProperties();
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
