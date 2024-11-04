import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="relative overflow-hidden text-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Header background"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute inset-0 bg-purple-900/70" />
      </div>
      <div className="container relative z-10 mx-auto px-4 py-16 md:py-24">
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
          <div className="relative h-64 md:h-auto">
            <div className="absolute inset-0 grid grid-cols-2 gap-4">
              {[
                "Contractor working",
                "Happy client",
                "Project completion",
                "Diverse contractors",
              ].map((alt, index) => (
                <Image
                  key={index}
                  src="/placeholder.svg?height=300&width=300"
                  alt={alt}
                  width={300}
                  height={300}
                  className={`h-full w-full rounded-lg object-cover ${index % 2 ? "mt-8" : ""}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
