import { createTRPCRouter } from "../trpc";
import { protectedProcedure } from "../trpc";
import db from "@/server/db";

export const stripeRouter = createTRPCRouter({
  authorizePayment: protectedProcedure.mutation(async ({ ctx, input }) => {
    return;
  }),
  savePaymentMethod: protectedProcedure.query(async ({ ctx, input }) => {
    return;
  }),
});
