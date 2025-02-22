"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, MapPin, Search, SlidersHorizontal } from "lucide-react";
import {
  CitiesLatLong,
  LocationBoundingBoxType,
  useListingsMap,
} from "@/store/listingMapStore";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import usePlaceAutocomplete from "use-places-autocomplete";
import { trpc } from "@/server/client";
import type { RouterOutputs } from "@/server/client";
import { toast } from "sonner";

export type Coordinates = RouterOutputs["utils"]["getCoordinates"];

export default function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { setLocationBoundingBox, setCitySearchLatLong } = useListingsMap();

  const utils = trpc.useUtils();

  const {
    ready,
    value: input,
    setValue: setInput,
    suggestions: { status: suggestionsLoading, data = [] }, // Provide default empty array
    clearSuggestions,
  } = usePlaceAutocomplete({
    callbackName: "PlacesAutocomplete",
    debounce: 300,
    requestOptions: {
      // Optional: Limit results to a specific country
      // componentRestrictions: { country: "us" },
    },
  });

  const handleLocationSelect = async (location: string) => {
    setInput(location);
    setIsSearchOpen(false);
    clearSuggestions();
    const coordinates = await utils.utils.getCoordinates.fetch({ location });
    updateLocationStore(coordinates, location);
  };

  const updateLocationStore = (coordinates: Coordinates, location: string) => {
    if (coordinates) {
      //update the cityLatLng
      if (coordinates.location) {
        const cityLatLong: CitiesLatLong = {
          label: location,
          lat: coordinates.location.lat,
          long: coordinates.location.lng,
        };
        if (coordinates.bounds) {
          setCitySearchLatLong(cityLatLong);
        }
      } else {
        toast.error("Error fetching coordinates");
      }
    }
  };

  // Only render the component when the Places API is ready
  if (!ready) {
    return (
      <div className="mx-auto w-full max-w-5xl">
        <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 p-1">
          <Button
            variant="ghost"
            className="h-12 flex-1 justify-start rounded-full text-left font-normal text-muted-foreground hover:bg-zinc-900 hover:text-zinc-300"
            disabled
          >
            <Search className="mr-2 h-4 w-4" />
            Loading...
          </Button>
        </div>
      </div>
    );
  }

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
              {input || "Search locations..."}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[calc(var(--radix-popover-trigger-width)_-_20px)] border-zinc-800 bg-zinc-900 p-0">
            <Command>
              <div className="flex w-full items-center p-2">
                <MapPin className="mr-2 h-4 w-4 text-zinc-400" />
                <CommandInput
                  value={input}
                  onValueChange={(value) => {
                    setInput(value);
                    if (value === "") clearSuggestions();
                  }}
                  placeholder="Enter location..."
                  className="w-[1000px] bg-transparent text-white placeholder:text-zinc-500 focus-visible:ring-0"
                />
              </div>

              <CommandList className="max-h-[300px] overflow-auto py-2">
                {suggestionsLoading === "OK" && data.length > 0 && (
                  <>
                    {data.map((suggestion) => (
                      <CommandItem
                        key={suggestion.place_id}
                        value={suggestion.description}
                        onSelect={() =>
                          handleLocationSelect(suggestion.description)
                        }
                        className="flex items-center px-2 py-3 text-white hover:bg-zinc-800"
                      >
                        <div className="flex flex-1 items-center">
                          <div className="mr-2 rounded-md bg-zinc-800 p-2">
                            <MapPin className="h-4 w-4" />
                          </div>
                          <p className="line-clamp-1 flex-1">
                            {suggestion.description}
                          </p>
                        </div>
                        <Check
                          className={cn(
                            "ml-2 h-4 w-4 flex-shrink-0",
                            suggestion.description === input
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </>
                )}

                {input === "" && (
                  <CommandGroup>
                    <p className="py-3 text-center text-sm text-zinc-400">
                      Start typing to see suggestions
                    </p>
                  </CommandGroup>
                )}

                {input !== "" && (!data || data.length === 0) && (
                  <CommandEmpty className="py-3 text-center text-sm text-zinc-400">
                    No suggestions found
                  </CommandEmpty>
                )}
              </CommandList>
            </Command>
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
