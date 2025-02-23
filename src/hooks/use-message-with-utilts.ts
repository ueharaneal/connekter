import { trpc } from "@/server/client";
import { useCallback } from "react";
import { useMessage } from "@/store/messagingStore";
import { toast } from "sonner";

export const useMessageWithUtils = () => {
  const utils = trpc.useUtils();
  const setCurrentUserConversationIds = useMessage(
    (state) => state.setCurrentUserConversationIds,
  );

  const fetchUserConversationIds = useCallback(
    async (userId: string) => {
      try {
        const conversations = await utils.messages.getUserConversations.fetch({
          userId,
        });

        if (conversations) {
          const conversationIds = conversations.map(
            (conversation) => conversation.id,
          );
          setCurrentUserConversationIds(conversationIds);
        }
      } catch (error) {
        console.error("Error fetching user conversations for IDs:", error);
        toast.error("Error fetching conversations.");
      }
    },
    [utils, setCurrentUserConversationIds],
  );

  return {
    // Return all the store functions plus our new one
    ...useMessage.getState(),
    fetchUserConversationIds,
  };
};
