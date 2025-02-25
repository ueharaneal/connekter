import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function ConnectWithProvider() {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-6xl space-y-6">
        <div className="flex items-start justify-between">
          <h1 className="tracking-tigh text-6xl font-medium leading-none text-muted-foreground">
            Connect
            <br />
            with Dawn
          </h1>
          <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-lg">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-14%20at%201.23.03%E2%80%AFAM-RpHesTMwmFsGtxQZLC2nbqsJ2Q1rog.png"
              alt="Dawn's profile"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <p className="max-w-xl text-2xl text-white">
          Schedule a short virtual meet. This is the best way to get questions
          answered, meet local care providers, and see if you feel a good fit.
        </p>

        <Button className="h-auto rounded-full bg-secondary px-6 py-3 text-lg font-medium text-white hover:bg-orange-500">
          Schedule
        </Button>
      </div>
    </div>
  );
}
