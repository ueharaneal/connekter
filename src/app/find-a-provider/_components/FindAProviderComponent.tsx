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

function ProvidersPage() {
  const {
    initialListings,
    adjustedListings,
    setAdjustedListings,
    locationBoundingBox,
    citySearchLatLong,
  } = useListingsMap();

  console.log(
    initialListings,
    adjustedListings,
    setAdjustedListings,
    locationBoundingBox,
    citySearchLatLong,
  );

  const { data: listingsQuery } = trpc.listings.getListingsByBoundary.useQuery(
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
    },
  );

  useEffect(() => {
    setAdjustedListings(listingsQuery);
    console.log(adjustedListings);
  }, [listingsQuery, setAdjustedListings]);

  const currentListings = adjustedListings ? initialListings : adjustedListings;
  console.log(currentListings);
  return (
    <div className="mt-12 flex w-full flex-col items-center gap-y-4 p-4">
      <SearchBar />
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <div className="hidden w-full overflow-y-auto md:flex md:flex-col lg:max-h-[calc(100vh-120px)]">
          <ProviderList currentListings={currentListings} />
        </div>
        <div className="relative h-[400px] rounded-lg shadow-md lg:h-[calc(100vh-150px)] lg:w-4/5">
          {" "}
          <SearchPropertiesMap currentListings={currentListings} />
        </div>
      </div>
    </div>
  );
}

export default ProvidersPage;
