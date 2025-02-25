"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface PropertyGalleryProps {
  imageUrls: string[];
}

const filters = [
  "All photos",
  "Available rooms",
  "Kitchen",
  "Living room",
  "Bathroom",
  "Patio",
];

export default function PropertyGallery({ imageUrls }: PropertyGalleryProps) {
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
                "rounded-full px-3 text-xs",
                activeFilter === filter && "hover:bg-primary",
              )}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>

        {/* Carousel */}
        <Carousel className="w-full">
          <CarouselContent>
            {imageUrls.map((url, index) => (
              <CarouselItem key={index} className="md:basis-1/3">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl">
                      <Image
                        src={url || "/placeholder.svg"}
                        alt={`Property image ${index + 1}`}
                        fill
                        className="object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl" autoFocus={false}>
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={url || "/placeholder.svg"}
                        alt={`Property image ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute left-1 top-1/2 flex items-center justify-center">
            <CarouselPrevious className="relative left-0 translate-x-0 hover:translate-x-0 hover:bg-black" />
          </div>
          <div className="absolute right-1 top-1/2 flex items-center justify-center">
            <CarouselNext className="relative right-0 translate-x-0 hover:translate-x-0 hover:bg-black" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
