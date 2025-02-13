import { baseProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import db from "@/server/db";
import { providers, providerUpdateSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const providerRouter = createTRPCRouter({
  getProvider: baseProcedure.query(async () => {
    const allProviders = await db.query.providers.findFirst({
      with: {
        user: true,
      },
    });

    return allProviders;
  }),
  updateProvider: baseProcedure
    .input(providerUpdateSchema)
    .mutation(async ({ input }) => {
      return await db.update(providers).set(input).where(eq(providers.id, input.id));
    }),
});
