import {
  Header,
  Testimonials,
  FaqSection,
  Footer,
} from "@/components/landing-page";

import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col gap-y-10 mx-4">
      <Header />
        <Testimonials />
        <FaqSection />
      <Footer />
    </div>
  );
}
