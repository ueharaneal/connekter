import db from "@/server/db";
import {
  conversationParticipants,
  conversations,
} from "../server/db/schema/tables/messages";
import { sql, eq, or } from "drizzle-orm";

export const useFindOrCreateConversationWithUser = async ({
  currentUserId,
  recievingUserId,
}: {
  currentUserId: string;
  recievingUserId: string;
}) => {
  const existingConversation = await db.query.conversations.findFirst({
    where: eq(
      conversations.id,
      db
        .select({ conversationId: conversationParticipants.conversationId })
        .from(conversationParticipants)
        .where(
            eq(conversationParticipants.userId, recievingUserId),
        )
        .groupBy(conversationParticipants.conversationId)
        .having(sql`count(*) = 2`)
        .limit(1),
    ),
    with: {
      participants: true,
    },
  });

  if (existingConversation) {
    return existingConversation.id;
  }

  const newConversation = await db
    .insert(conversations)
    .values({})
    .returning({ id: conversations.id });

  if (!newConversation[0]) {
    throw new Error("Failed to create new conversation");
  }


    await db.insert(conversationParticipants).values([
      { conversationId: newConversation[0].id, userId: recievingUserId },
      {
        conversationId: newConversation[0].id,
      },
    ]);
  } else {
    await db.insert(conversationParticipants).values([
      { conversationId: newConversation[0].id, userId: inviteeUser.id },
      { conversationId: newConversation[0].id, userId: hostId },
    ]);
  }

  return newConversation[0].id;
};
