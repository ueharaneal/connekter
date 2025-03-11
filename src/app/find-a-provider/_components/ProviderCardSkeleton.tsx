import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProviderCardSkeleton() {
  return (
    <Card className="max-w-lg overflow-hidden bg-blue-100 text-black">
      <div className="relative h-48">
        <Skeleton className="absolute inset-0 h-full w-full" />
        {/* Badge skeleton */}
        <Skeleton className="absolute right-4 top-4 h-6 w-24" />

        {/* Bottom content overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex flex-row items-center gap-3">
            {/* Avatar skeleton */}
            <Skeleton className="h-14 w-14 rounded-full" />
            <div>
              {/* Name skeleton */}
              <Skeleton className="mb-2 h-6 w-32" />
              {/* Distance skeleton */}
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
        {/* See all photos skeleton */}
        <Skeleton className="absolute bottom-2 right-4 h-8 w-32" />
      </div>

      <CardContent className="space-y-3 p-4">
        <div className="space-y-2">
          {/* Room details title skeleton */}
          <Skeleton className="h-5 w-24" />
          <div className="grid grid-cols-2 gap-2">
            {/* Room features skeletons */}
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-36" />
          </div>
        </div>
      </CardContent>

      <CardFooter className="grid grid-cols-2 gap-3 p-4 pt-0">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </CardFooter>
    </Card>
  );
}
