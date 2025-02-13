import { baseProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import db from "@/server/db";
import { providers, providerUpdateSchema } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const providerRouter = createTRPCRouter({
  getProvider: baseProcedure.query(async ({ ctx }) => {
    const allProviders = await db.query.providers.findFirst({
      with: {
        user: true,
      },
    });

    return allProviders;
  }),
  updateProvider: baseProcedure
    .input(providerUpdateSchema)
    .mutation(async ({ input, ctx }) => {
      return await db
        .update(providers)
        .set(input)
        .where(eq(providers.id, ctx.user.id));
    }),
});
