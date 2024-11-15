import React from "react";
import { useOnboardingStore } from "@/store/providerOnboardStore";
function StepperProgression() {
  const step = useOnboardingStore((state) => state.step);
  return <div></div>;
}

export default StepperProgression;
