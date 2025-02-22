import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ListingWProvider } from "@/types/listing-types";
import { Building2, MapPin, Users, Bath, Bed, Clock } from "lucide-react";

export default function AboutProperty({
  listing,
}: {
  listing: ListingWProvider;
}) {
  return (
    <div className="flex w-full items-center justify-center p-4">
      <Card className="w-full max-w-4xl border-zinc-800 bg-zinc-900 text-white">
        <CardHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold">{listing.name}</h2>
              <div className="mt-1 flex items-center text-zinc-400">
                <MapPin className="mr-1 h-4 w-4" />
                <span className="text-sm">{listing.address}</span>
              </div>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20">
              Licensed Facility
            </Badge>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
            <div className="flex items-center gap-1">
              <Building2 className="h-4 w-4" />
              <span>Established 1991</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Capacity: 24 residents</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>24/7 Care Available</span>
            </div>
          </div>
        </CardHeader>

        <Separator className="bg-zinc-800" />

        <CardContent className="space-y-6 py-6">
          <div>
            <h3 className="mb-3 text-lg font-medium">Property Overview</h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              <div className="space-y-1">
                <div className="flex items-center text-zinc-400">
                  <Bed className="mr-2 h-4 w-4" />
                  <span className="text-sm">Rooms</span>
                </div>
                <p className="font-medium">12 Private</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-zinc-400">
                  <Bath className="mr-2 h-4 w-4" />
                  <span className="text-sm">Bathrooms</span>
                </div>
                <p className="font-medium">8 Full, 4 Half</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center text-zinc-400">
                  <Building2 className="mr-2 h-4 w-4" />
                  <span className="text-sm">Property Type</span>
                </div>
                <p className="font-medium">Residential Care</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-lg font-medium">About the Property</h3>
            <p className="leading-relaxed text-zinc-400">
              Above Woodsville Care Home is a premier residential care facility
              offering compassionate, personalized care in a comfortable
              home-like environment. Our facility features spacious private
              rooms, beautiful common areas, and landscaped grounds. We maintain
              a high staff-to-resident ratio to ensure quality care and
              attention to each resident&apos;s needs.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Amenities</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                24/7 Nursing Staff
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Emergency Response
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Memory Care Unit
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Garden & Patio
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Daily Activities
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Private Dining
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="border-t border-zinc-800 pt-6">
          <Button className="w-full bg-white text-black hover:bg-white/90">
            Schedule a Tour
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
