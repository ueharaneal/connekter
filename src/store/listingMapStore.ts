import { create } from "zustand";
import type { Listing } from "@/server/db/schema";
import type { RouterOutputs } from "@/server/client";

export type AdjustedListings =
  RouterOutputs["listings"]["getListingsByBoundary"]["data"];

export type CitiesLatLong = {
  label: string;
  long: number;
  lat: number;
};

export type LocationBoundingBoxType = {
  north: number;
  south: number;
  east: number;
  west: number;
};

type CitiesFilterState = {
  locationBoundingBox: LocationBoundingBoxType;
  radius: number;
  open: boolean;
  citySearchLatLong: CitiesLatLong | undefined;
  initialListings: Listing[];
  adjustedListings: AdjustedListings | undefined;
  setAdjustedListings: (listings: AdjustedListings | undefined) => void;
  setCitySearchLatLong: (citySearchLatLong: CitiesLatLong | undefined) => void;
  setRadius: (radius: number) => void;
  setOpen: (open: boolean) => void;
  clearFilter: () => void;
  setLocationBoundingBox: (
    locationBoundingBox: LocationBoundingBoxType,
  ) => void;
};

export const useListingsMap = create<CitiesFilterState>((set) => ({
  locationBoundingBox: {
    north: 0,
    south: 0,
    west: 0,
    east: 0,
  },
  radius: 50,
  open: false,
  citySearchLatLong: undefined,
  initialListings: [],
  adjustedListings: undefined,
  clearFilter: () => {
    set((state) => ({
      ...state,
      radius: 50,
    }));
  },
  setAdjustedListings: (adjustedListings) => set(() => ({ adjustedListings })),
  setRadius: (radius) => set(() => ({ radius })),
  setCitySearchLatLong: (citySearchLatLong) =>
    set(() => ({ citySearchLatLong })),
  setOpen: (open) => set(() => ({ open })),
  setLocationBoundingBox: (locationBoundingBox) =>
    set(() => ({ locationBoundingBox })),
}));
