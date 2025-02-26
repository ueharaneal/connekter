import {
  Header,
  Testimonials,
  FAQSection,
  ProcessSteps,
  Footer,
} from "@/components/landing-page";

import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col gap-y-8">
      <Header />
      <ProcessSteps />
      <Testimonials />
      <FAQSection />
    </div>
  );
}
