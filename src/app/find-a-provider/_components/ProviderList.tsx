import React from "react";
import ProviderCard from "./ProviderCard";
import { useListingsMap } from "@/store/listingMapStore";

function ProviderList() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {" "}
      <ProviderCard />
      <ProviderCard />
    </div>
  );
}

export default ProviderList;
