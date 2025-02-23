import { sql } from "drizzle-orm";

export function createLatLngGISPoint({
  lat,
  lng,
}: {
  lat: number;
  lng: number;
}) {
  const latLngPoint = sql`ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326)`;
  return latLngPoint;
}
