import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function PropertyCard() {
  return (
    <Card className="mb-6 overflow-hidden border-zinc-800 bg-zinc-900/50">
      <div className="relative p-4">
        <div className="flex items-start gap-4">
          <div className="relative h-[150px] w-[200px] overflow-hidden rounded-lg">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-12%20at%2012.30.21%20AM-jr6e3R4YIl6tzItrs5ccOwfwIvq5xj.png"
              alt="Above Woodinville Property"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="mb-2 text-xl font-semibold">Above Woodinville</h2>
                <p className="text-sm text-zinc-400">2 active listings</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-orange-500/20 bg-transparent text-orange-500 hover:bg-orange-500/10"
              >
                <Link href="/provider/1">View profile</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
