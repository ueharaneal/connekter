"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Listing } from "@/server/db/schema"
import { useCallback } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function PropertyCard({ listings }: { listings: Listing[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    loop: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {listings.map((listing) => (
            <div key={listing.id} className="flex-[0_0_100%] min-w-0 ">
              <Card className="mb-6 overflow-hidden border-zinc-800 bg-zinc-900/50 relative px-5">
                <div className="relative p-8">
                  <div className="flex items-start gap-4">
                    <div className="relative h-[150px] w-[200px] overflow-hidden rounded-lg">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-12%20at%2012.30.21%20AM-jr6e3R4YIl6tzItrs5ccOwfwIvq5xj.png"
                        alt="Above Woodinville Property"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h2 className="mb-2 text-xl font-semibold">{listing.name}</h2>
                          <p className="text-sm text-zinc-400">{listings.length} active listings</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-orange-500/20 bg-transparent text-orange-500 hover:bg-orange-500/10"
                        >
                          <Link href="/provider/1">View profile</Link>
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
  )
}

