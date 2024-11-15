"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { useOnboardingStore } from "@/store/providerOnboardStore";

export function OnboardingFooter({ numOfSteps }: { numOfSteps: number }) {
  const step = useOnboardingStore((state) => state.step);
  const setNextStep = useOnboardingStore((state) => state.setNextStep);
  const setPrevStep = useOnboardingStore((state) => state.setPrevStep);

  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t-2 border-border bg-background">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {step > 0 && (
          <Button variant="outline" size="lg" onClick={() => setPrevStep(step)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
        )}
        <p>{step}</p>

        {step !== numOfSteps ? (
          <Button size="lg" onClick={() => setNextStep(step)}>
            Next <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button>Finish</Button>
        )}
      </div>
    </footer>
  );
}
