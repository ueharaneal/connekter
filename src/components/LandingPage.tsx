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
      <main className="z-20 mt-[-20px] rounded-3xl border-t-2 border-border bg-background pt-20 shadow-lg">
        <HowItWorks />
        <Testimonials />
        <Safety />
      </main>
      <Footer />
    </div>
  );
}
