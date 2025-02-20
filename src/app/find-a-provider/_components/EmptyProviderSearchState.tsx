import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Search, MapPin } from "lucide-react";

export default function EmptyProviderSearchState() {
  return (
    <Card className="bg-bacground col-span-full row-span-3 row-start-2 flex min-h-[400px] w-full flex-col items-center justify-center gap-6 border-none p-8 text-center text-white">
      <div className="relative">
        <div className="absolute -left-8 top-0 animate-pulse">
          <Home className="h-8 w-8 text-gray-600" />
        </div>
        <div className="relative z-10">
          <Home className="h-16 w-16 text-gray-400" />
        </div>
        <div className="absolute -right-8 -top-4 animate-pulse">
          <Home className="h-8 w-8 text-gray-600" />
        </div>
        <div className="absolute -bottom-2 right-0">
          <MapPin className="h-6 w-6 text-pink-500" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold">No homes found in this area</h3>
        <p className="text-sm text-gray-400">
          We couldn't find any available homes matching your criteria. Try
          adjusting your search radius or filters.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <Button
          className="bg-pink-500 hover:bg-pink-600"
          onClick={() => {
            // Handle expanding search radius
          }}
        >
          <Search className="mr-2 h-4 w-4" />
          Expand search area
        </Button>
        <Button
          variant="outline"
          className="border-gray-800 text-white hover:bg-gray-800"
        >
          Modify filters
        </Button>
      </div>
    </Card>
  );
}
