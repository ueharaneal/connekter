import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Crown } from "lucide-react";
import { ListingWProvider } from "@/types/listing-types";

export default function CareProviderCard({
  listing,
}: {
  listing: ListingWProvider;
}) {
  console.log(listing.provider.credentials);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-3xl text-foreground">
        <CardHeader className="flex flex-row justify-between space-y-1">
          <h2 className="text-2xl font-semibold">Meet the Contracter</h2>
          <Badge
            variant="secondary"
            className="text-nowrap rounded-full text-xs"
          >
            Verified Contracter ✓
          </Badge>
        </CardHeader>
        <CardContent className="flex flex-col justify-between gap-x-2 gap-y-4">
          <Image
            src={listing.provider.image || ""}
            alt=" Contracter portrait"
            width={300}
            height={200}
            className="w-full rounded-lg object-cover"
          />

          <div className="space-y-3">
            <div>
              <h3 className="mb-2 text-lg font-medium">About</h3>
              <p className="text-sm text-zinc-400">{listing.provider.about}</p>
            </div>

            <div className="flex flex-col items-start gap-1">
              <Badge
                variant="secondary"
                className="text-nowrap bg-rose-500/10 text-xs text-rose-500 hover:bg-rose-500/20"
              >
                <Crown className="mr-1 h-3 w-3" />
                Super Host
              </Badge>
              <span className="text-xs text-zinc-400">
                They consistently provide a great quality and level of care for
                their residents.
              </span>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-medium">Credentials</h3>
              <p className="text-sm text-zinc-400">
                {listing.provider.credentials
                  ? listing.provider.credentials
                  : "No Credentials"}
              </p>
            </div>

            {listing.provider.languages && (
              <div>
                <h3 className="mb-2 text-lg font-medium">Languages</h3>
                <div className="flex gap-2">
                  {listing.provider.languages.map((language, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-zinc-700 text-xs text-zinc-400"
                    >
                      {language}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
