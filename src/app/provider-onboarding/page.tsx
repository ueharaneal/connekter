"use client";

import React from "react";
import { OnboardingFooter } from "./_components/OnboardingFooter";
import StepperProgression from "./_components/StepperProgression";
import { useOnboardingStore } from "@/store/providerOnboardStore";
import StepZero from "./_components/StepZero";
import StepOne from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";
import StepThree from "./_components/StepThree";

const NUM_OF_STEPS = 3;

function Page() {
  const step = useOnboardingStore((state) => state.step);
  return (
    <div className="flex h-screen flex-row justify-start">
      <StepperProgression numOfSteps={NUM_OF_STEPS} />
      <section className="w-full flex-1">
        {step === 0 && <StepZero />}
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        {step === 3 && <StepThree />}
        <OnboardingFooter numOfSteps={NUM_OF_STEPS} />
      </section>
    </div>
  );
}

export default Page;
