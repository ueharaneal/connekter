import { publicProcedure, createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import db from "@/server/db";
import { asc, desc, eq } from "drizzle-orm";
import { messages, MessageType } from "../db/schema/tables/messages";
import {
  conversationParticipants,
  conversations,
} from "../db/schema/tables/messages";
import { LIMIT_MESSAGE } from "@/lib/constants";
import { TRPCError } from "@trpc/server";
import supabase from "../db/supabase-client";

export const messagesRouter = createTRPCRouter({
  getUserConversations: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { userId } = input;

      type ConversationWithRelations = {
        id: string;
        messages: {
          id: string;
          message: string;
          createdAt: Date;
          user: {
            id: string;
            name: string | null;
            image: string | null;
          };
        }[];
        participants: {
          userId: string;
          user: {
            id: string;
            name: string | null;
            image: string | null;
          };
        }[];
      };

      const userConversations =
        await db.query.conversationParticipants.findMany({
          where: eq(conversationParticipants.userId, userId),
          with: {
            conversation: {
              with: {
                messages: {
                  orderBy: [desc(messages.createdAt)],
                  limit: 1,
                  with: {
                    user: {
                      columns: { name: true, image: true, id: true },
                    },
                  },
                },
                participants: {
                  with: {
                    user: {
                      columns: { name: true, image: true, id: true },
                    },
                  },
                },
              },
            },
          },
        });

      return userConversations.map((participant) => participant.conversation);
    }),

  getConversationMessages: publicProcedure
    .input(
      z.object({
        conversationId: z.string(),
        page: z.number().min(1).default(1), // Page number, starting from 1
        limit: z.number().min(1).max(50).default(LIMIT_MESSAGE), // Limit messages per page
      }),
    )
    .query(async ({ input }) => {
      const { conversationId, page, limit } = input;
      const offset = (page - 1) * limit; // Calculate offset for pagination

      const conversationMessages = await db.query.messages.findMany({
        where: eq(messages.conversationId, conversationId),
        orderBy: asc(messages.createdAt), // Order messages by creation time, ascending
        limit: limit,
        offset: offset,
        with: {
          user: {
            // Eager load sender user info
            columns: { name: true, image: true, id: true }, // Select only necessary columns
          },
        },
      });

      return conversationMessages;
    }),

  sendMessage: protectedProcedure // Use protectedProcedure if you want to ensure user is authenticated
    .input(
      z.object({
        conversationId: z.string(),
        message: z.string().min(1).max(1500), // Match your schema length
      }),
    )
    .mutation(async ({ input, ctx }) => {
      // `ctx` is available in protectedProcedure, for user info
      const { conversationId, message } = input;
      const userId = ctx.user.id; // Get user ID from context (assuming you have auth setup)

      if (!userId) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Not authenticated.",
        }); // Or handle auth as needed
      }

      try {
        const newMessage = await db
          .insert(messages)
          .values({
            conversationId: conversationId,
            userId: userId,
            message: message,
          })
          .returning(); // Use returning() to get the inserted message back

        if (!newMessage || newMessage.length === 0) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to insert new message.",
          });
        }

        // --- Supabase Realtime ---
        // Trigger a Realtime event so other clients in the conversation get the new message
        await supabase
          .from("messages") // Use the same table name as your schema
          .insert([newMessage[0]]); // Send the newly created message (or just its ID if you prefer)

        return newMessage[0]; // Return the newly created message
      } catch (error) {
        console.error("Error sending message:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send message.",
          cause: error, // Optionally include the original error for debugging
        });
      }
    }),
});
