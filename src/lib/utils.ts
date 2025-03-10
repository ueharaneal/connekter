import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getBaseUrl() {
  return process.env.NODE_ENV === "production"
    ? process.env.PROD_URL
    : `http://localhost:3000`;
}

export function formatCurrency(cents: number, { round = false } = {}) {
  const dollars = round ? Math.round(cents / 100) : cents / 100;
  return dollars.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

export function getLatLongString(lat: number, long: number): string {
  return `${lat},${long}`;
}

export function convertGeometryPointToLatLng(latLngPoint: string) {}
