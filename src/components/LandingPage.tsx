import {
  Header,
  HowItWorks,
  Testimonials,
  Safety,
  Footer,
} from "@/components/landing-page";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main>
        <HowItWorks />
        <Testimonials />
        <Safety />
      </main>
      <Footer />
    </div>
  );
}
