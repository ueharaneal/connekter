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
  id: number;
  name?: string;
  distance?: string;
  providerImage?: string;
  roomImage?: string;
  verified?: boolean;
  rating?: number;
  bio?: string;
}

export default function ProviderCard({
  id,
  name = "neals house",
  distance = "10 miles",
  providerImage = "data:image/jpeg;base64,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",
  roomImage = "https://a0.muscache.com/im/pictures/miso/Hosting-762632213174916471/original/5d19ef9f-c2d9-479d-9a22-3b6a12a9850d.jpeg?im_w=1200&im_format=avif",
  verified = true,
  rating = 4.5,
  bio = "Experienced caregiver with a passion for helping others. Specialized in elderly care and companionship.",
}: ProviderCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { data: listing } = trpc.listings.getListingById.useQuery({ id });
  console.log(listing);

  const property = {
    imageUrls: [
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/dff6780d-98a5-4a1d-8861-819ed68c028b",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/42f28a18-d5ed-4462-aff5-d8d0994b6442",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/80faae4b-3523-4d49-ae4f-c01c4bdd066f",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/31067cc4-9a64-4995-9444-249d297a307e",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/f5db4194-cae7-4285-abb8-013b78ce569e",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/dccbf772-d8e6-464d-bc99-1dca71309f1a",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/896daf76-4626-4915-b401-c35a0041c3c6",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/dca9b32a-0285-48c1-a6d5-b34cd0be9a2a",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/33cf07ed-f6a7-4d7e-9596-fb1bc6a30bf2",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/73e6d5c7-09bb-400f-8d28-fb74792f99d0",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/32be5928-69da-47e1-8986-c4fc46213cad",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/b559bce7-e1d8-4a17-90f8-8eedbb9aade8",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/e1c96960-aa88-48a6-a428-4f398948d9e7",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/5c5d0b8d-ef79-4072-b590-5bf6fb89398b",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/c7aad5ed-24ac-4c3c-adbd-d8e53e3f895b",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/941764b9-37c8-4934-9461-59471dcda310",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/048f50e6-0fdc-453a-9cba-48d533c3012a",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/439fd6a8-42bf-472d-87ac-0b4bf7b7f162",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/d435eaca-30bc-4382-a957-0da9d4e0f0f0",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/77d17c07-3f4b-4bfd-95e0-8dea7a51e5b6",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/46221adc-9362-4d0c-a954-663ab10ce56e",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/fe65ae00-64ce-4abd-9227-3d97dd24bc55",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/60d5ae0d-4a52-4197-a0c3-b1e743ea6d22",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/3f6660e2-e131-4306-95dd-27081dfdd361",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/0d6e68a0-6bf2-4633-b95d-d8741147be36",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/591d76b6-69c4-4ef5-8a31-5f18a1a33ab4",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/c0801ce1-beaf-4c4a-9afb-9f79e5e9b88c",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/b826165e-da38-40fc-80b2-9480968f3ed7",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/706913cc-072c-496e-9cce-fa7545529106",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/b97bb239-7bde-43aa-8592-945e732581aa",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/1148dd22-aad3-466d-bf77-1e492d1d218e",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/d57b198c-0722-4b7e-9255-15be01d732b5",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/a7b3b436-4d8d-4ba8-8276-ca896d3a81e3",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/8e7b639f-1f60-464b-af34-cd7f360f0b1e",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/aaffac33-b9a2-4037-b087-0182bed51a0c",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/c7418ae2-fae8-4ce3-9255-b7a7faafc751",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/044170d7-0aa2-4759-b129-ce388775dfaf",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/fc703ace-99f9-46dd-82d0-8a42e4cef5b6",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/a291092d-10b4-49f6-b20b-9d87236e154c",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/d704fed5-e460-440e-8597-453e59d38882",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/91883c13-b576-4848-88aa-8151313bae4b",
      "https://img.trackhs.com/1280x800/https://track-pm.s3.amazonaws.com/cbislandvacations/image/255f4a71-37a5-4231-b1bf-e7cc16ad413c",
    ],
  };

  return (
    <Card className="max-w-lg overflow-hidden bg-black text-white">
      <div className="relative h-48">
        <div className="absolute inset-0">
          <Image
            src={roomImage || "/placeholder.svg"}
            alt="Room"
            fill
            className="object-cover"
          />
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
          <SeeAllImages imageUrls={property.imageUrls} />
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
