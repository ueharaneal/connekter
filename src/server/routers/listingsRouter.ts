import { publicProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import db from "@/server/db";

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
});
