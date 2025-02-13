import { publicProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import db from "@/server/db";
import { eq } from "drizzle-orm";
import { conversations } from "../db/schema/tables/messages";

export const messagesRouter = createTRPCRouter({
  getUserConversations: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const allConversations = await db.query.conversations.findMany();

      return allConversations;
    }),
  addMessage: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async () => {
      return { name: "sir", race: "thing " };
    }),
});
