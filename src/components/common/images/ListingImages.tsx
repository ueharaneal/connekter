"use client";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface ListingImagesProps {
  listingImages?: string[];
  indexOfSelectedImage?: number;
}

export default function ListingImages({
  listingImages = [],
  indexOfSelectedImage,
}: ListingImagesProps) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        startIndex: indexOfSelectedImage,
      }}
      className="w-full md:h-[700px] md:w-[600px] lg:h-[750px] lg:w-[800px]"
    >
      <CarouselContent className="[&>button]:hidden">
        {listingImages.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card className="min-h-[230px] items-center border-none bg-transparent shadow-none sm:min-h-[400px] md:min-h-[700px]">
                <CardContent className="relative h-[230px] w-full sm:h-[400px] md:h-[700px]">
                  <div className="relative h-full w-full">
                    <Image
                      src={image}
                      alt={`Property Image ${index + 1}`}
                      className="rounded-lg object-cover"
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index === 0}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-ml-6 h-[50px] w-[50px]" />
      <CarouselNext className="-mr-6 h-[50px] w-[50px]" />
    </Carousel>
  );
}
