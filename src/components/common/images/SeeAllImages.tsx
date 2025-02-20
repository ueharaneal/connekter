import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { CheckCircle, ImagesIcon, MessageCircle, Star } from "lucide-react";
import Link from "next/link";
import {
  DialogContentNoDrawer,
  DialogNoDrawer,
  DialogTriggerNoDrawer,
} from "@/components/ui/dialog-no-drawer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ListingImages from "@/components/common/images/ListingImages";
import { Button } from "@/components/ui/button";

function SeeAllImages({ imageUrls }: { imageUrls: string[] }) {
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="rounded-full text-xs">
          See all {imageUrls.length} photos
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>More Photos</DialogTitle>
        </DialogHeader>
        <div className="grid auto-rows-auto grid-cols-2 gap-2 rounded-xl">
          {imageUrls.map((imageUrl, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div
                  className={`cursor-pointer hover:opacity-90 ${
                    index === 0 || index % 3 === 0
                      ? "col-span-2"
                      : imageUrls.length - 1 === index && index % 4 === 0
                        ? "col-span-2"
                        : "col-span-1"
                  }`}
                  onClick={() => setSelectedImageIdx(index)}
                >
                  <AspectRatio ratio={3 / 2}>
                    <Image
                      src={imageUrl}
                      alt=""
                      fill
                      className="h-full w-full object-cover object-center"
                    />
                  </AspectRatio>
                </div>
              </DialogTrigger>
              <DialogContent className="flex items-center justify-center border-none bg-transparent [&>button]:hidden">
                <div className="screen-full flex justify-center">
                  <ListingImages
                    listingImages={imageUrls}
                    indexOfSelectedImage={index}
                  />
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SeeAllImages;
