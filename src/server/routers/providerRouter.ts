import { protectedProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import db from "@/server/db";
import { providers, providerUpdateSchema, users, listings, rooms, careLevelZodEnum, careLevels, CareLevel } from "@/server/db/schema";
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

  saveCostOfCare: protectedProcedure
    .input(z.object({
      rentCost: z.number(),
      serviceCost: z.number(),
      careLevelCosts: z.record(careLevelZodEnum, z.string()),
      roomId: z.string(),
      listingId: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { rentCost, serviceCost, careLevelCosts, roomId, listingId } = input;
      const { id: userId } = ctx.user;

      if (!userId) {
        throw new Error("User ID is required");
      }

      await db.update(listings).set({
        serviceCost,
      }).where(eq(listings.id, listingId));

      await db.update(rooms).set({
        roomPrice: rentCost,
      }).where(eq(rooms.id, roomId));

      const room = await db.query.rooms.findFirst({
        where: eq(rooms.id, roomId),
      });

      if (!room) {
        throw new Error("Room not found");
      }

      const careLevel = room.careLevelId;

      if (!careLevel) {
        for (const [key, value] of Object.entries(careLevelCosts)) {
          const newCareLevel = await db.insert(careLevels).values({
            price: Number(value),
            levelName: key as CareLevel,
          }).returning({ careLevelId: careLevels.careLevelId });

          await db.update(rooms).set({
            careLevelId: newCareLevel[0].careLevelId,
          }).where(eq(rooms.id, roomId));
        }
      } else {
        for (const [key, value] of Object.entries(careLevelCosts)) {
          await db.update(careLevels).set({
            price: Number(value),
            levelName: key as CareLevel,
          }).where(eq(careLevels.careLevelId, careLevel));
        }
      }
    }),
});
