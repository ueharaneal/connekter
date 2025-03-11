import { Button } from "@/components/ui/button";
import { WrenchIcon, Search, MapPin } from "lucide-react";

export default function EmptyProviderSearchState() {
  return (
    <div className="col-span-full row-span-3 row-start-2 flex min-h-[400px] w-full flex-col items-center justify-center gap-6 border-none bg-background p-8 text-center">
      <div className="relative">
        <div className="absolute -left-8 top-0 animate-pulse">
          <WrenchIcon className="h-8 w-8 text-gray-800" />
        </div>
        <div className="relative z-10">
          <WrenchIcon className="h-16 w-16 text-gray-600" />
        </div>
        <div className="absolute -right-8 -top-4 animate-pulse">
          <WrenchIcon className="h-8 w-8 text-gray-800" />
        </div>
        <div className="absolute -bottom-2 right-0">
          <MapPin className="h-6 w-6 text-primary" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">
          No Contracters found in this area
        </h3>
        <p className="text-sm text-muted-foreground">
          We couldn&apos;t find any available Contracters matching your
          criteria. Try adjusting your search radius or filters.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          className=""
          onClick={() => {
            // Handle expanding search radius
          }}
        >
          <Search className="mr-2 h-4 w-4" />
          Expand search area
        </Button>
        <Button variant="outline" className="">
          Modify filters
        </Button>
      </div>
    </div>
  );
}
