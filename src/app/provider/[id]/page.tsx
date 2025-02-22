import React from "react";

import CareProviderCard from "../_components/CareProviderCard";
import FAQAccordion from "../_components/ProviderFaq";
import PropertyGallery from "../_components/PropertyGallery";
import AboutProperty from "../_components/AboutProperty";
import ProvdierPriceCard from "../../../components/common/ProviderPriceCard";
import ConnectWithProvider from "../_components/ConnectWithProvider";
import { getListingById } from "@/actions/listings-actions";
import ListingSkeleton from "../_components/ListingSkeleton";

async function Page({ params }: { params: { id: number } }) {
  const id = params.id;
  console.log(id);
  const response = await getListingById(id);
  const { listing } = response;

  return (
    <>
      {listing ? (
        <div className="mx-4 my-12 flex w-full max-w-7xl flex-col gap-y-16 md:mx-auto">
          <div className="flex flex-col justify-center gap-y-10 md:flex-row md:items-start">
            <div className="flex w-full flex-col gap-y-4 md:w-5/6">
              <h1 className="mx-8 text-start text-xl font-bold md:text-3xl lg:text-4xl">
                {" "}
                {listing.name}
              </h1>{" "}
              <PropertyGallery imageUrls={listing.imageUrls} />
              <AboutProperty listing={listing} />
            </div>
            <CareProviderCard />
          </div>
          <ProvdierPriceCard type="senior-view" />
          <ConnectWithProvider />
          <FAQAccordion />
        </div>
      ) : (
        <ListingSkeleton />
      )}
    </>
  );
}

export default Page; // Export the component named 'Page'
