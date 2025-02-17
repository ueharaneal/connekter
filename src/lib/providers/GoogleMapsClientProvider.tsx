"use client";

import { APIProvider } from "@vis.gl/react-google-maps";

interface GoogleMapsClientProviderProps {
  children: React.ReactNode;
}

const GoogleMapsClientProvider: React.FC<GoogleMapsClientProviderProps> = ({
  children,
}) => {
  return (
    <>
      <APIProvider
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY as string}
        libraries={["places"]}
        onLoad={() => console.log("Maps API has loaded. (Client Component)")}
      >
        {children}
      </APIProvider>
    </>
  );
};

export default GoogleMapsClientProvider;
