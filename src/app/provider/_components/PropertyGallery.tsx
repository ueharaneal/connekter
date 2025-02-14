"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";

const filters = [
  "All photos",
  "Available rooms",
  "Kitchen",
  "Living room",
  "Bathroom",
  "Patio",
];

export default function PropertyGallery() {
  const [activeFilter, setActiveFilter] = React.useState("All photos");

  return (
    <div className="mx-auto w-full p-4">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-1">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "ghost"}
              className={cn(
                "rounded-full px-3 text-xs text-white",
                activeFilter === filter && "hover:bg-primary",
              )}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* First Image - Always Visible */}
          <div className="relative block aspect-[4/3] overflow-hidden rounded-xl md:block">
            {" "}
            {/* Visible on all sizes */}
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-14%20at%2012.26.51%E2%80%AFAM-QkIivaSab7tcjNb3ay7bp0NPg0Z3rr.png"
              alt="Modern house exterior at night"
              fill
              className="object-cover"
            />
          </div>

          {/* Second Image - Hidden on md and smaller, visible on lg and larger */}
          <div className="relative hidden aspect-[4/3] overflow-hidden rounded-xl md:block">
            {" "}
            {/* Hidden on md and smaller, block on md and larger */}
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-14%20at%2012.26.51%E2%80%AFAM-QkIivaSab7tcjNb3ay7bp0NPg0Z3rr.png"
              alt="Modern kitchen with white cabinets"
              fill
              className="object-cover"
            />
          </div>

          {/* Third Image - Hidden on md and smaller, visible on lg and larger */}
          <div className="group relative hidden aspect-[4/3] overflow-hidden rounded-xl md:block">
            {" "}
            {/* Hidden on md and smaller, block on md and larger */}
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-14%20at%2012.26.51%E2%80%AFAM-QkIivaSab7tcjNb3ay7bp0NPg0Z3rr.png"
              alt="Available bedroom"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
