"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Listing } from "@/server/db/schema";
import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PropertyCard({ listings }: { listings: Listing[] }) {
  const router = useRouter();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
  });

  const updateUrl = useCallback(
    (index: number) => {
      const currentListingId = listings[index]?.id;
      if (currentListingId) {
        router.push(`/provider-dashboard/${currentListingId}`, {
          scroll: false,
        });
      }
    },
    [listings, router],
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      // Initialize the carousel to the correct listing based on URL
      const currentPath = window.location.pathname;
      const currentId = currentPath.split("/").pop();
      const initialIndex = listings.findIndex(
        (listing) => listing.id.toString() === currentId,
      );
      if (initialIndex !== -1) {
        emblaApi.scrollTo(initialIndex, true);
      }

      // Add event listener for when the slide transition settles
      const onSettle = () => {
        const currentIndex = emblaApi.selectedScrollSnap();
        updateUrl(currentIndex);
      };

      emblaApi.on("settle", onSettle);

      return () => {
        emblaApi.off("settle", onSettle);
      };
    }
  }, [emblaApi, listings, updateUrl]);

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {listings.map((listing) => (
            <div key={listing.id} className="min-w-0 flex-[0_0_100%]">
              <Card className="relative mb-6 overflow-hidden border-zinc-800 bg-zinc-900/50 px-5">
                <div className="relative p-8">
                  <div className="flex items-start gap-4">
                    <div className="relative h-[150px] w-[200px] overflow-hidden rounded-lg">
                      <Image
                        src={listing.imageUrls[0]}
                        alt="Above Woodinville Property"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="mb-2 text-xl font-semibold">
                            {listing.name}
                          </h2>
                          <p className="text-sm text-zinc-400">
                            {listings.length} active listings
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-500/20 bg-transparent text-orange-500 hover:bg-orange-500/10"
                        >
                          <Link href={`/provider/${listing.id}`}>
                            View profile
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-zinc-900/50 hover:bg-zinc-900"
                  onClick={scrollPrev}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-zinc-900/50 hover:bg-zinc-900"
                  onClick={scrollNext}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
