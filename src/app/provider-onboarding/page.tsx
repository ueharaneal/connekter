"use client";

import React from "react";
import { OnboardingFooter } from "./_components/OnboardingFooter";
import StepperProgression from "./_components/StepperProgression";
import { useOnboardingStore } from "@/store/providerOnboardStore";
import StepZero from "./_components/StepZero";
import StepOne from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";
import StepThree from "./_components/StepThree";
import { useSession } from "next-auth/react";
import Image from "next/image";

const NUM_OF_STEPS = 3;

function Page() {
  useSession({ required: true });
  const step = useOnboardingStore((state) => state.step);
  return (
    <div className="mx-10 flex h-screen flex-row justify-between gap-x-4">
      <div className="relative h-5/6 w-1/4 rounded-xl">
        <Image
          className="rounded-xl border-2"
          alt="builing"
          fill
          src="https://images.unsplash.com/photo-1725913583896-1ecbed1ab3e4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fGNvbnRyYWN0JTIwZGlhZ3JhbXxlbnwwfHwwfHx8MA%3D%3D"
        />
      </div>
      <section className="w-full flex-1">
        {step === 0 && <StepZero />}
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        {step === 3 && <StepThree />}
        <OnboardingFooter numOfSteps={NUM_OF_STEPS} />
      </section>
      <StepperProgression numOfSteps={NUM_OF_STEPS} />
    </div>
  );
}

export default Page;
