import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ListingSkeleton() {
  return (
    <div className="mx-4 mt-12 w-full max-w-7xl md:mx-auto">
      {/* Header */}
      <div className="p-6">
        <Skeleton className="h-12 w-64 bg-gray-800" />
      </div>

      {/* Navigation */}
      <div className="flex gap-2 overflow-x-auto px-6">
        {[
          "All photos",
          "Available rooms",
          "Kitchen",
          "Living room",
          "Bathroom",
          "Patio",
        ].map((_, i) => (
          <Skeleton
            key={i}
            className={`h-10 w-32 rounded-full ${i === 0 ? "bg-primary" : "bg-gray-800"}`}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 p-6 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          {/* Image Gallery */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Skeleton
                key={i}
                className="aspect-[4/3] rounded-xl bg-gray-800"
              />
            ))}
          </div>

          {/* Property Info Card */}
          <Card className="border-0 bg-gray-900">
            <CardContent className="space-y-6">
              {/* Title and Badge */}
              <div className="flex items-start justify-between pt-6">
                <Skeleton className="h-8 w-72 bg-gray-800" />
                <Skeleton className="h-6 w-32 bg-green-900/50" />
              </div>

              {/* Address */}
              <Skeleton className="h-6 w-64 bg-gray-800" />

              {/* Stats */}
              <div className="flex gap-6">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-6 w-40 bg-gray-800" />
                ))}
              </div>

              {/* Property Overview */}
              <div className="space-y-4">
                <Skeleton className="h-7 w-48 bg-gray-800" />
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-5 w-24 bg-gray-800" />
                      <Skeleton className="h-6 w-32 bg-gray-800" />
                    </div>
                  ))}
                </div>
              </div>

              {/* About */}
              <div className="space-y-4">
                <Skeleton className="h-7 w-48 bg-gray-800" />
                <div className="space-y-2">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-4 w-full bg-gray-800" />
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-4">
                <Skeleton className="h-7 w-32 bg-gray-800" />
                <div className="grid grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-6 w-48 bg-gray-800" />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Care Provider Card */}
        <Card className="border-0 bg-gray-900">
          <CardHeader className="flex-row items-center justify-between">
            <Skeleton className="h-7 w-48 bg-gray-800" />
            <Skeleton className="h-6 w-32 bg-gray-800" />
          </CardHeader>
          <CardContent className="space-y-6">
            <Skeleton className="aspect-video w-full rounded-lg bg-gray-800" />

            {/* About Section */}
            <div className="space-y-4">
              <Skeleton className="h-7 w-24 bg-gray-800" />
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-4 w-full bg-gray-800" />
                ))}
              </div>
            </div>

            {/* Super Host */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-24 bg-gray-800" />
              <Skeleton className="h-4 w-full bg-gray-800" />
            </div>

            {/* Credentials */}
            <div className="space-y-4">
              <Skeleton className="h-7 w-32 bg-gray-800" />
              <div className="space-y-2">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-4 w-full bg-gray-800" />
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-4">
              <Skeleton className="h-7 w-32 bg-gray-800" />
              <Skeleton className="h-8 w-24 rounded-full bg-gray-800" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
