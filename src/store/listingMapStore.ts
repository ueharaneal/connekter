import { create } from "zustand";
import type { Listing } from "@/server/db/schema";

export type CitiesLatLong = {
  id: string;
  label: string;
  long: number;
  lat: number;
};

type LocationBoundingBoxType = {
  northeastLat: number;
  northeastLng: number;
  southwestLat: number;
  southwestLng: number;
};

type CitiesFilterState = {
  locationBoundingBox: LocationBoundingBoxType;
  radius: number;
  open: boolean;
  citySearchLatLong: CitiesLatLong | undefined;
  initialListings: Listing[];
  adjustedListings: Listing[];
  setAdjustedListings: (listings: Listing[]) => void;
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
    northeastLat: 0,
    northeastLng: 0,
    southwestLat: 0,
    southwestLng: 0,
  },
  radius: 50,
  open: false,
  citySearchLatLong: undefined,
  initialListings: [],
  adjustedListings: [],
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
