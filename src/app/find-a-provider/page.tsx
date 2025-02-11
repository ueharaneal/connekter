"use client";
import SingleLocationMap from "@/components/common/google-maps/SingleLocationMap";
import ProviderList from "./_components/ProviderList";
import { APIProvider } from "@vis.gl/react-google-maps";

function ProvidersPage() {
  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY as string}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">Providers</h1>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <div className="h-[400px] rounded-lg p-4 shadow-md lg:h-[calc(100vh-150px)]">
              <SingleLocationMap lat={34.7279} lng={-86.585} />
            </div>
          </div>
          <div className="w-full overflow-y-auto lg:max-h-[calc(100vh-120px)] lg:w-1/2">
            <ProviderList />
          </div>
        </div>
      </div>
    </APIProvider>
  );
}

export default ProvidersPage;
