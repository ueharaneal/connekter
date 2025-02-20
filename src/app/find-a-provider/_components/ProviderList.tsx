import React from "react";
import ProviderCard from "./ProviderCard";
import { AdjustedListings, useListingsMap } from "@/store/listingMapStore";
import type { Listing } from "@/server/db/schema";
import ProviderCardSkeleton from "./ProviderCardSkeleton";
import EmptyProviderSearchState from "./EmptyProviderSearchState";

function ProviderList({
  currentListings,
}: {
  currentListings: AdjustedListings | undefined;
}) {
  console.log(currentListings);
  return (
    <div className="grid grid-cols-2 gap-2">
      {currentListings ? (
        currentListings.length > 0 ? (
          currentListings.map((listing) => (
            <ProviderCard key={listing.id} listingId={listing.id} />
          ))
        ) : (
          <EmptyProviderSearchState />
        )
      ) : (
        Array.from({ length: 6 }).map((_, index) => (
          <ProviderCardSkeleton key={index} />
        ))
      )}
    </div>
  );
}

export default ProviderList;
