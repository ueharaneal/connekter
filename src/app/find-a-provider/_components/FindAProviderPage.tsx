"use client";
import ProviderList from "./ProviderList";
import SearchBar from "./Searchbar";
import { useListingsMap } from "@/store/listingMapStore";
import SearchPropertiesMap from "./SearchPropertiesMap";
import { useEffect } from "react";
import { trpc } from "@/server/client";
// im going to pull of the login in this page

// 1. Map changes bounding boxes, and recieved new properties
// 2. listings recieves new properties
// 3. searchbar changes will change the bounding boxes and update the new proprerties

function FindAProviderPage() {
  const {
    adjustedListings,
    setAdjustedListings,
    locationBoundingBox,
    citySearchLatLong,
  } = useListingsMap();

  console.log(
    adjustedListings,
    setAdjustedListings,
    locationBoundingBox,
    citySearchLatLong,
  );

  const {
    data: listingsQuery,
    isLoading,
    isFetching,
  } = trpc.listings.getListingsByBoundary.useQuery(
    {
      boundaries: {
        north: locationBoundingBox.north,
        south: locationBoundingBox.south,
        east: locationBoundingBox.east,
        west: locationBoundingBox.west,
      },
      cursor: null,
    },
    {
      enabled: !!locationBoundingBox,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    },
  );

  useEffect(() => {
    setAdjustedListings(listingsQuery?.data);
  }, [listingsQuery, setAdjustedListings]);

  return (
    <div className="mt-12 flex w-full flex-col items-center gap-y-4 p-4">
      <SearchBar />
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <div className="hidden w-full overflow-y-auto md:flex md:flex-col lg:max-h-[calc(100vh-120px)]">
          <ProviderList
            currentListings={adjustedListings}
            isLoading={isLoading || isFetching}
          />
        </div>
        <div className="relative h-[400px] rounded-lg shadow-md lg:h-[calc(100vh-150px)] lg:w-4/5">
          {" "}
          <SearchPropertiesMap currentListings={adjustedListings} />
        </div>
      </div>
    </div>
  );
}

export default FindAProviderPage;
