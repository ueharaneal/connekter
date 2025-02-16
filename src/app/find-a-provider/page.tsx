"use client";
import ProviderList from "./_components/ProviderList";
import { APIProvider } from "@vis.gl/react-google-maps";
import SearchBar from "./_components/Searchbar";
import { useListingsMap } from "@/store/listingMapStore";
import SearchPropertiesMap from "./_components/SearchPropertiesMap";

// im going to pull of the login in this page

// 1. Map changes bounding boxes, and recieved new properties
// 2. listings recieves new properties
// 3. searchbar changes will change the bounding boxes and update the new proprerties

function ProvidersPage() {
  const { initialListings, adjustedListings, setAdjustedListings } =
    useListingsMap();

  const currentListings = adjustedListings ? initialListings : adjustedListings;
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY as string}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <div className="mx-20 mt-12 flex w-full flex-col gap-y-4 p-4">
        <SearchBar />
        <div className="flex flex-col gap-4 p-4 lg:flex-row">
          <div className="hidden w-full overflow-y-auto md:flex md:flex-col lg:max-h-[calc(100vh-120px)] lg:w-1/2">
            <ProviderList currentListings={currentListings} />
          </div>
          <div className="relative h-[400px] rounded-lg shadow-md lg:h-[calc(100vh-150px)] lg:w-2/5">
            {" "}
            <SearchPropertiesMap currentListings={currentListings} />
          </div>
        </div>
      </div>
    </APIProvider>
  );
}

export default ProvidersPage;
