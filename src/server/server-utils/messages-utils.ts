import { z } from "zod";
import db from "@/server/db";
import { asc, desc, eq, inArray, sql } from "drizzle-orm";
import {
  conversationParticipants,
  conversations,
} from "../db/schema/tables/messages";

type CreateOrFindConversationParams = {
  participantUserIds: string[];
  currentUserId: string;
  name?: string;
  listingId?: number;
};

export async function createOrFindConversation({
  participantUserIds,
  currentUserId,
  name,
  listingId,
}: CreateOrFindConversationParams) {
  // Add current user as a participant if not included
  if (!participantUserIds.includes(currentUserId)) {
    participantUserIds.push(currentUserId);
  }

  // Sort participants for consistent comparison
  const allParticipants = [...participantUserIds].sort();

  // Find existing conversations
  const existingConversations = await db
    .select({
      conversationId: conversationParticipants.conversationId,
      participantCount: sql`count(*)`.as("participantCount"),
    })
    .from(conversationParticipants)
    .where(inArray(conversationParticipants.userId, allParticipants))
    .groupBy(conversationParticipants.conversationId)
    .having(({ participantCount }) =>
      eq(participantCount, allParticipants.length),
    );

  // Check for exact participant matches
  for (const conv of existingConversations) {
    const participants = await db
      .select()
      .from(conversationParticipants)
      .where(eq(conversationParticipants.conversationId, conv.conversationId));

    if (participants.length === allParticipants.length) {
      const participantIds = participants.map((p) => p.userId).sort();
      if (JSON.stringify(participantIds) === JSON.stringify(allParticipants)) {
        return await db.query.conversations.findFirst({
          where: eq(conversations.id, conv.conversationId),
        });
      }
    }
  }

  // Create new conversation if no match found
  const conversationValues = {
    ...(listingId && { listingId }),
    ...(name && { name }),
  };

  const newConversation = await db
    .insert(conversations)
    .values(conversationValues)
    .returning()
    .then((res) => res[0]!);

  // Add participants
  const participantPromises = participantUserIds.map((participant) =>
    db.insert(conversationParticipants).values({
      conversationId: newConversation.id,
      userId: participant,
    }),
  );
  await Promise.all(participantPromises);

  return newConversation;
}
