import React from "react";

import CareProviderCard from "../_components/CareProviderCard";
import FAQAccordion from "../_components/ProviderFaq";
import PropertyGallery from "../_components/PropertyGallery";
import AboutProperty from "../_components/AboutProperty";
import ProvdierPriceCard from "../_components/ProviderPriceCard";
import ConnectWithProvider from "../_components/ConnectWithProvider";

function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log(id);

  return (
    <div className="mx-4 mt-12 flex w-full max-w-7xl flex-col gap-y-16 md:mx-auto">
      <div className="flex flex-col justify-center gap-y-10 md:flex-row md:items-start">
        <div className="flex w-full flex-col gap-y-4 md:w-5/6">
          <h1 className="mx-8 text-start text-2xl font-bold md:text-3xl lg:text-4xl">
            {" "}
            AFH PROPERTY NAME{" "}
          </h1>
          <PropertyGallery />
          <AboutProperty />
        </div>
        <CareProviderCard />
      </div>
      <ProvdierPriceCard />
      <ConnectWithProvider />
      <FAQAccordion />
    </div>
  );
}

export default Page; // Export the component named 'Page'
