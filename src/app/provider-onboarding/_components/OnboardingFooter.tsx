"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCheckIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useOnboardingStore } from "@/store/providerOnboardStore";
import { useState } from "react";

export function OnboardingFooter({ numOfSteps }: { numOfSteps: number }) {
  const step = useOnboardingStore((state) => state.step);
  const setNextStep = useOnboardingStore((state) => state.setNextStep);
  const setPrevStep = useOnboardingStore((state) => state.setPrevStep);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <footer className="fixed bottom-0 left-0 right-0 border-t-2 border-border bg-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {step > 0 && (
          <Button variant="outline" size="lg" onClick={() => setPrevStep(step)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
        )}
        <p>{step}</p>

        {step !== numOfSteps ? (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <Button size="lg" className="" onClick={() => setNextStep(step)}>
              {step === 0 ? "Start Your Journey" : "Next"}
              <ArrowRight
                className={`ml-2 h-4 w-4 transition-transform ${isHovered ? "translate-x-1" : ""}`}
              />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <Button size="lg" className="">
              Complete
              <CheckCheckIcon
                className={`ml-2 h-4 w-4 transition-transform ${isHovered ? "translate-x-1 scale-110" : ""}`}
              />
            </Button>
          </motion.div>
        )}
      </div>
    </footer>
  );
}
