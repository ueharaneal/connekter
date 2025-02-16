"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MapPin, Search, SlidersHorizontal } from "lucide-react";

export default function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 p-1">
        <Popover open={isSearchOpen} onOpenChange={setIsSearchOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="h-12 flex-1 justify-start rounded-full text-left font-normal text-muted-foreground hover:bg-zinc-900 hover:text-zinc-300"
            >
              <Search className="mr-2 h-4 w-4" />
              Search locations...
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full border-zinc-800 bg-zinc-900 p-0">
            <div className="flex items-center border-b border-zinc-800 p-2">
              <MapPin className="mr-2 h-4 w-4 text-zinc-400" />
              <Input
                type="text"
                placeholder="Enter location..."
                className="border-0 bg-transparent text-white placeholder:text-zinc-500 focus-visible:ring-0"
              />
            </div>
            <div className="py-2">
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-zinc-800"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Current Location
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-zinc-800"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Huntsville, AL
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-zinc-800"
              >
                <MapPin className="mr-2 h-4 w-4" />
                Madison, AL
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-12 w-12 rounded-full bg-zinc-800 text-white hover:bg-zinc-700"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span className="sr-only">Filters</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 border-zinc-800 bg-zinc-900">
            <div className="grid gap-4">
              <h3 className="text-lg font-medium text-white">Filters</h3>
              {/* Filter options would go here */}
              <div className="text-sm text-zinc-400">
                Filter options can be added here based on your requirements
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
