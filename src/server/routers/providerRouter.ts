import { protectedProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import db from "@/server/db";
import { providers, providerUpdateSchema, users, listings, rooms, careLevelZodEnum, careLevels, CareLevel } from "@/server/db/schema";
import { and, eq } from "drizzle-orm";

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

  saveCareLevels: protectedProcedure
    .input(
      z.object({
        listingId: z.string(),
        careLevels: z.record(
          z.string(),
          z.array(
            z.object({
              title: z.string(),
              items: z.array(z.string()),
            })
          )
        ),
        serviceItems: z.array(z.string()),
        notIncludedItems: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      const { careLevels, serviceItems, notIncludedItems, listingId } = input;

      try{
        await db.update(listings).set({
          lowCareLevelItems: careLevels.low.map((item) => item.items).flat(),
          mediumCareLevelItems: careLevels.medium.map((item) => item.items).flat(),
          heavyCareLevelItems: careLevels.heavy.map((item) => item.items).flat(),
          serviceItems: serviceItems,
          itemsNotIncluded: notIncludedItems,
        }).where(eq(listings.id, Number(listingId)));
      } catch (error) {
        console.error(error);
      }
    }),


  saveCostOfCare: protectedProcedure
    .input(z.object({
      rentCosts: z.array(z.object({
        roomId: z.string(),
        roomPrice: z.number(),
      })),
      serviceCost: z.number(),
      careLevelData: z.array(z.object({
        careLevelId: z.number().optional(),
        price: z.number(),
        levelName: z.string(),
      })),
      roomId: z.string(),
      listingId: z.string(),
    }))
    .mutation(async ({ input, ctx }) => {
      const { rentCosts, serviceCost, careLevelData, listingId } = input;
      const { id: userId } = ctx.user;

      if (!userId) {
        throw new Error("User ID is required");
      }

      await db.update(listings).set({
        serviceCost,
      }).where(eq(listings.id, Number(listingId)));

      for (const { roomId, roomPrice } of rentCosts) {
        await db.update(rooms).set({
          roomPrice: roomPrice,
        }).where(eq(rooms.id, roomId));

        const careLevelsForRoom = await db.query.careLevels.findMany({
          where: eq(careLevels.roomId, roomId),
        });

        if (!careLevelsForRoom) {
          for (const { price, levelName } of careLevelData) {
            await db.insert(careLevels).values({
              price: Number(price),
              levelName: levelName as CareLevel,
              roomId,
            });
          }
        } else {
          for (const { price, levelName } of careLevelData) {
            await db.update(careLevels).set({
              price: Number(price),
            }).where(and(eq(careLevels.levelName, levelName as CareLevel), eq(careLevels.roomId, roomId)));
          }
        }
      }
    }),
});
