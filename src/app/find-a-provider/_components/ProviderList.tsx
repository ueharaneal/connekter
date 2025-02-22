import React from "react";
import ProviderCard from "./ProviderCard";
import { AdjustedListings, useListingsMap } from "@/store/listingMapStore";
import ProviderCardSkeleton from "./ProviderCardSkeleton";
import EmptyProviderSearchState from "./EmptyProviderSearchState";

function ProviderList({
  currentListings,
  isLoading,
}: {
  currentListings: AdjustedListings | undefined;
  isLoading: boolean;
}) {
  console.log(isLoading);
  console.log(currentListings);

  // Show skeletons when explicitly loading OR when listings aren't available yet
  const showSkeletons =
    isLoading ||
    !currentListings ||
    (Array.isArray(currentListings) &&
      currentListings.length === 0 &&
      isLoading);

  return (
    <div className="grid grid-cols-2 gap-2">
      {showSkeletons ? (
        // Show skeletons while loading
        Array.from({ length: 6 }).map((_, index) => (
          <ProviderCardSkeleton key={index} />
        ))
      ) : currentListings.length > 0 ? (
        // Show listings if they exist
        currentListings.map((listing) => (
          <ProviderCard key={listing.id} listingId={listing.id} />
        ))
      ) : (
        // Show empty state only when not loading and listings are empty
        <EmptyProviderSearchState />
      )}
    </div>
  );
}
export default ProviderList;
