import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import db from "@/server/db";
import { eq } from "drizzle-orm";
import { listingFaqs } from "../db/schema";

export const faqRouter = createTRPCRouter({
  getFaqs: publicProcedure.query(async () => {
    const allFaqs = await db.query.listingFaqs.findMany();

    return allFaqs;
  }),
  createFaq: protectedProcedure
    .input(
      z.object({
        listingId: z.string(),
        question: z.string().min(1, "Question is required"),
        answer: z.string().min(1, "Answer is required"),
      }),
    )
    .mutation(async ({ input }) => {
      const insertedFaq = await db
        .insert(listingFaqs)
        .values({
          listingId: input.listingId,
          question: input.question,
          answer: input.answer,
        })
        .returning();
      return insertedFaq;
    }),
  updateFaq: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        question: z.string(),
        answer: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, question, answer } = input;
      const updatedFaq = await db
        .update(listingFaqs)
        .set({ question, answer })
        .where(eq(listingFaqs.id, id));
      return updatedFaq;
    }),
  deleteFaq: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { id } = input;
      const deletedFaq = await db
        .delete(listingFaqs)
        .where(eq(listingFaqs.id, id));
      return deletedFaq;
    }),
});
