import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { getCoordinates } from "../google-maps";

export const utilsRouter = createTRPCRouter({
  getCoordinates: publicProcedure
    .input(z.object({ location: z.string() }))
    .query(async ({ input }) => {
      const coordinates = await getCoordinates(input.location);

      return coordinates;
    }),
});
