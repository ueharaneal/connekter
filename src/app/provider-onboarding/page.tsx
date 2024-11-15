"use client";

import React from "react";
import { OnboardingFooter } from "./_components/OnboardingFooter";
import StepperProgression from "./_components/StepperProgression";
import { useOnboardingStore } from "@/store/providerOnboardStore";
import StepZero from "./_components/StepZero";
import StepOne from "./_components/StepOne";
import StepTwo from "./_components/StepTwo";
import StepThree from "./_components/StepThree";

function Page() {
  const step = useOnboardingStore((state) => state.step);
  return (
    <div>
      <StepperProgression />
      <main>
        {step === 0 && <StepZero />}
        {step === 1 && <StepOne />}
        {step === 2 && <StepTwo />}
        {step === 3 && <StepThree />}
      </main>
      <OnboardingFooter />
    </div>
  );
}

export default Page;
