import { publicProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import db from "@/server/db";
import { sql, and, gt, eq, asc } from "drizzle-orm";
import { listings } from "../db/schema";

export const listingsRouter = createTRPCRouter({
  getListings: publicProcedure.query(async () => {
    const allListings = await db.query.listings.findMany();

    return allListings;
  }),
  addListing: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async () => {
      return { name: "sir", race: "thing " };
    }),

  getByBoundaryInfiniteScroll: publicProcedure
    .input(
      z.object({
        boundaries: z
          .object({
            north: z.number(),
            south: z.number(),
            east: z.number(),
            west: z.number(),
          })
          .nullable(),
        cursor: z.number().nullish(),
        city: z.string().optional(),
        latLngPoint: z
          .object({
            lat: z.number(),
            lng: z.number(),
          })
          .optional(),
        radius: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      const { cursor, boundaries } = input;

      const lat = input.latLngPoint?.lat ?? 0;
      const lng = input.latLngPoint?.lng ?? 0;
      const radius = input.radius ?? 0; //just tried to fix a type error

      const data = await db
        .select({
          id: listings.id,
          imageUrls: listings.imageUrls,
          name: listings.name,
          latLngPoint: listings.latLngPoint,
        })
        .from(listings)
        .where(
          and(
            boundaries
              ? sql`
                ST_Y(${listings.latLngPoint}) BETWEEN ${boundaries.south} AND ${boundaries.north}
                AND ST_X(${listings.latLngPoint}) BETWEEN ${boundaries.west} AND ${boundaries.east}
              `
              : sql`TRUE`,
            input.latLngPoint?.lat && input.latLngPoint.lng && !boundaries
              ? sql`6371 * ACOS(
              SIN(${(lat * Math.PI) / 180}) * SIN(radians(ST_Y(${listings.latLngPoint}))) +
              COS(${(lat * Math.PI) / 180}) * COS(radians(ST_Y(${listings.latLngPoint}))) *
              COS(radians(ST_X(${listings.latLngPoint})) - ${(lng * Math.PI) / 180})
            ) <= ${radius}`
              : sql`TRUE`,
          ),
        )
        // .limit(12)
        .limit(100)
        .orderBy(asc(sql`id`), asc(sql`distance`));

      return {
        data,
        nextCursor: data.length ? data[data.length - 1]?.id : null,
      };
    }),
});
