import React from "react";
import ProviderCard from "./ProviderCard";
import { useListingsMap } from "@/store/listingMapStore";
import type { Listing } from "@/server/db/schema";

function ProviderList({
  currentListings,
}: {
  currentListings: Listing[] | undefined;
}) {
  console.log(currentListings);
  return (
    <div className="grid grid-cols-2 gap-1">
      {" "}
      <ProviderCard />
      <ProviderCard />
    </div>
  );
}

export default ProviderList;
