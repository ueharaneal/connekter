import { create } from "zustand";

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

type ProvidersFilterState = {
  locationBoundingBox: LocationBoundingBoxType;
  radius: number;
  open: boolean;
  filter: CitiesLatLong | undefined;
  setFilter: (filter: CitiesLatLong | undefined) => void;
  setRadius: (radius: number) => void;
  clearFilter: () => void;
  setLocationBoundingBox: (
    locationBoundingBox: LocationBoundingBoxType,
  ) => void;
};

export const useProvidersFilter = create<ProvidersFilterState>((set) => ({
  locationBoundingBox: {
    northeastLat: 0,
    northeastLng: 0,
    southwestLat: 0,
    southwestLng: 0,
  },
  radius: 50,
  open: false,
  filter: undefined,
  clearFilter: () => {
    set((state) => ({
      ...state,
      roomType: undefined,
      radius: 50,
      guests: 0,
      maxNightlyPrice: undefined,
    }));
  },
  setRadius: (radius) => set(() => ({ radius })),
  setFilter: (filter) => set(() => ({ filter })),
  setLocationBoundingBox: (locationBoundingBox) =>
    set(() => ({ locationBoundingBox })),
}));
