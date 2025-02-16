"use client";
import SingleLocationMap from "@/components/common/google-maps/SingleLocationMap";
import ProviderList from "./_components/ProviderList";
import { APIProvider } from "@vis.gl/react-google-maps";
import SearchBar from "./_components/Searchbar";

function ProvidersPage() {
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY as string}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <div className="mx-20 mt-12 flex w-full flex-col gap-y-4 p-4">
        <SearchBar />
        <div className="flex flex-col gap-4 p-4 lg:flex-row">
          <div className="hidden w-full overflow-y-auto md:flex md:flex-col lg:max-h-[calc(100vh-120px)] lg:w-1/2">
            <ProviderList />
          </div>
          <div className="relative h-[400px] rounded-lg shadow-md lg:h-[calc(100vh-150px)] lg:w-2/5">
            <SingleLocationMap lat={34.7279} lng={-86.585} />
          </div>
        </div>
      </div>
    </APIProvider>
  );
}

export default ProvidersPage;
