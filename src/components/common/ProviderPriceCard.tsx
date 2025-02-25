import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calculator, Circle, Info } from "lucide-react";

type ProviderPriceCardType = "senior-view" | "cost-of-care";

export default function ProvdierPriceCard({
  type,
}: {
  type: ProviderPriceCardType;
}) {
  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-7xl">
        <CardContent className="space-y-6 p-6">
          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-14%20at%201.13.18%E2%80%AFAM-aJgxhYazaktmcqpdDSBjR3S1hsqkVv.png"
                  alt="Room preview"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Circle className="h-3 w-3 fill-pink-500 text-pink-500" />
                  <span className="text-sm text-zinc-400">Private room</span>
                </div>
                <div className="flex items-center gap-2">
                  <Circle className="h-3 w-3 fill-pink-500 text-pink-500" />
                  <span className="text-sm text-zinc-400">Shared bathroom</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-zinc-400">
                  Est move in schedule
                </div>
                <div className="font-semibold">Fri, Mar 1, 1:30PM</div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                <h2 className="text-xl font-semibold">Estimate</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Cost for rent</span>
                  <div className="flex items-center gap-3">
                    <span>$100/day</span>
                    <Select defaultValue="1">
                      <SelectTrigger className="w-[130px] border-zinc-700 bg-zinc-800">
                        <SelectValue placeholder="Select room" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Room: #1</SelectItem>
                        <SelectItem value="2">Room: #2</SelectItem>
                        <SelectItem value="3">Room: #3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span>Cost for services</span>
                  <span>$100/day</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-orange-400">Care level - Low</span>
                  <div className="flex items-center gap-3">
                    <span>$100/day</span>
                    <Select defaultValue="low">
                      <SelectTrigger className="w-[130px] border-zinc-700 bg-zinc-800">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Care Level: Low</SelectItem>
                        <SelectItem value="medium">
                          Care Level: Medium
                        </SelectItem>
                        <SelectItem value="high">Care Level: High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex justify-between">
                    <span>$300/day x 30 nights</span>
                    <span>$9,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Connekter Service fee</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assessment fee</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      Remaining balance
                      <br />
                      of first months rent
                    </span>
                    <span>$9,000</span>
                  </div>
                </div>

                <div className="flex justify-between border-t border-zinc-800 pt-4">
                  <span className="text-xl font-semibold">Total</span>
                  <span className="text-xl font-semibold">$9,000</span>
                </div>
              </div>

              {type === "senior-view" && (
                <>
                  <Button className="w-full bg-pink-500 text-white hover:bg-pink-600">
                    Request quote
                  </Button>

                  <div className="mx-auto flex items-start gap-2 text-xs text-muted-foreground">
                    <Info className="mt-0.5 size-3 flex-shrink-0" />
                    <p>
                      Connekter is a care matching, booking service, independent
                      of all care options. We do not provide care.
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
