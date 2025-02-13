import {
  Header,
  Testimonials,
  FaqSection,
  Footer,
} from "@/components/landing-page";

import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="mx-4 flex min-h-screen flex-col gap-y-10">
      <Header />
      <Testimonials />
      <FaqSection />
    </div>
  );
}
