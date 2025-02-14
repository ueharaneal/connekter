import { protectedProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import db from "@/server/db";
import { providers, providerUpdateSchema, users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const providerRouter = createTRPCRouter({
  createProvider: protectedProcedure
    .mutation(async ({ ctx }) => {
      if (!ctx.user.id) {
        throw new Error("User ID is required");
      }
      // const provider = await db.query.providers.findFirst({
      //   where: eq(providers.userId, ctx.user.id),
      // });
      // if (provider) {
      //   throw new Error("Provider already exists");
      // }
      const user = await db.query.users.findFirst({
        where: eq(users.id, ctx.user.id),
      });
      const userValues = {
        name: user?.name,
        email: user?.email,
        image: user?.image ? user?.image : null,
      };

      try {
        await db.insert(providers).values({
          ...userValues,
          userId: ctx.user.id,
        });
      } catch (error) {
        console.error(error);
      }
    }),
  getProvider: protectedProcedure.query(async ({ ctx }) => {
    const allProviders = await db.query.providers.findFirst({
      with: {
        user: true,
      },
    });

    return allProviders;
  }),
  updateProvider: protectedProcedure
    .input(providerUpdateSchema.omit({ userId: true }))
    .mutation(async ({ input, ctx }) => {
      if (!ctx.user.id) {
        throw new Error("User ID is required");
      }
      return await db
        .update(providers)
        .set(input)
        .where(eq(providers.userId, ctx.user.id));
    }),
});
