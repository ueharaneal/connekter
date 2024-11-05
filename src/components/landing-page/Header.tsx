import Image from "next/image";
import { Button } from "@/components/ui/button";

const images = [
  {
    src: "https://plus.unsplash.com/premium_photo-1664301132849-f52af765df79?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Contractor working",
  },
  {
    src: "https://images.unsplash.com/photo-1611843467160-25afb8df1074?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Garden",
  },
];

export function Header() {
  return (
    <header className="relative overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Header background"
          layout="fill"
          objectFit="cover"
          priority
          className=""
        />
        <div className="absolute inset-0 bg-blue-900/80" />
      </div>
      <div className="container relative z-30 mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
          <div>
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
              Find Your Perfect Contractor with Connekter
            </h1>
            <p className="mb-8 text-xl md:text-2xl">
              Post jobs effortlessly, receive competitive bids, and connect with
              skilled professionals today!
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-primary px-8 py-4 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90"
              >
                Post a Job Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white bg-transparent px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:bg-white hover:text-primary"
              >
                Find Work as a Contractor
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
