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

  getListingById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const listing = await db.query.listings.findFirst({
        where: eq(listings.id, input.id),
      });

      return listing;
    }),

  getListingsByBoundary: publicProcedure
    .input(
      z.object({
        boundaries: z.object({
          north: z.number(),
          south: z.number(),
          east: z.number(),
          west: z.number(),
        }),
        cursor: z.number().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const { cursor, boundaries } = input;
      console.log(input);
      try {
        // Start with base query
        const baseQuery = db
          .select({
            id: listings.id,
            imageUrls: listings.imageUrls,
            name: listings.name,
            latLngPoint: listings.latLngPoint,
          })
          .from(listings);

        // Build conditions array
        const conditions = [];

        // Add boundary condition using ST_Contains
        conditions.push(sql`
          ST_Contains(
            ST_MakeEnvelope(
              ${boundaries.west}, ${boundaries.south},
              ${boundaries.east}, ${boundaries.north},
              4326
            ),
            ${listings.latLngPoint}
          )
        `);

        // Add cursor condition if it exists
        if (cursor) {
          conditions.push(sql`${listings.id} > ${cursor}`);
        }

        const query = baseQuery.where(and(...conditions));

        const data = await query.limit(100).orderBy(asc(listings.id));
        if (data.length < 1) console.log("fuck");

        console.log(data);
        return {
          data,
          nextCursor:
            data.length === 100 ? data[data.length - 1].id : undefined,
        };
      } catch (error) {
        console.error("Database query error:", error);
        throw new Error("Failed to fetch listings");
      }
    }),
});
