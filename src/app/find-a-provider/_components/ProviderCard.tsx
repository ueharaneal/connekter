"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { CheckCircle, MessageCircle, Star } from "lucide-react";
import Link from "next/link";
import SeeAllImages from "@/components/common/images/SeeAllImages";
import { trpc } from "@/server/client";

interface ProviderCardProps {
  listingId: number;
  name?: string;
  distance?: string;
  providerImage?: string;
  roomImage?: string;
  verified?: boolean;
  rating?: number;
  bio?: string;
}

export default function ProviderCard({
  listingId,
  name = "neals house",
  distance = "10 miles",
  providerImage = "data:image/jpeg;base64,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",
  roomImage = "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/5d19ef9f-c2d9-479d-9a22-3b6a12a9850d.jpeg?im_w=1200&im_format=avif",
  verified = true,
  rating = 4.5,
  bio = "Experienced caregiver with a passion for helping others. Specialized in elderly care and companionship.",
}: ProviderCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: listing } = trpc.listings.getListingById.useQuery({
    id: listingId,
  });
  console.log(listing);

  return (
    <Card className="max-w-lg overflow-hidden bg-black text-white">
      <div className="relative h-48">
        <div className="absolute inset-0">
          {listing && (
            <Image
              src={listing.imageUrls[0]}
              blurDataURL=""
              alt="Room"
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        </div>
        <Badge className="absolute right-4 top-4 bg-orange-500/90 text-white hover:bg-orange-500/90">
          Available room
        </Badge>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-row items-center gap-3">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <div className="relative h-14 w-14 cursor-pointer rounded-full">
                  <Image
                    src={providerImage || "/placeholder.svg"}
                    alt=""
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 text-white">
                <DialogHeader>
                  <DialogTitle className="mb-4 text-2xl font-semibold">
                    {name}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex flex-row items-center gap-3">
                    <div className="relative h-12 w-12 rounded-full">
                      <Image
                        src={providerImage || "/placeholder.svg"}
                        alt=""
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-medium">{rating}</span>
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        {verified && (
                          <Badge
                            variant="secondary"
                            className="bg-purple-500/20 text-purple-400"
                          >
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-400">
                        {distance} miles away
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300">{bio}</p>
                  <Button className="w-full bg-pink-500 hover:bg-pink-600">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold capitalize">
                {name}
                {verified && (
                  <CheckCircle className="size-3 fill-green-500/20 text-green-600" />
                )}
              </h2>
              <p className="text-xs text-gray-300">{distance} miles away</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-2 right-4">
          {listing && <SeeAllImages imageUrls={listing.imageUrls} />}
        </div>
      </div>

      <CardContent className="space-y-4 p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-400">Room details:</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
              Private room
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
              Shared bathroom
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
              Accepts private pay
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-3 p-4 pt-0">
        <Button
          variant="outline"
          className="border-gray-800 text-white hover:bg-gray-800"
        >
          <Link href="/provider/1">View profile</Link>
        </Button>
        <Button className="bg-pink-500 hover:bg-pink-600">
          <MessageCircle className="mr-2 h-4 w-4" />
          Message
        </Button>
      </CardFooter>
    </Card>
  );
}
