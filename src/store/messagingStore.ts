import { type MessageType } from "@/server/db/schema";
import { create } from "zustand";
import supabase from "@/server/db/supabase-client";
import { LIMIT_MESSAGE } from "@/lib/constants";
import { toast } from "sonner";
import { RealtimeChannel } from "@supabase/supabase-js";
import { trpc } from "@/server/client";

export type ChatMessageType = MessageType & { userId: string }; // make userId non-null

type ConversationsState = Record<
  string,
  {
    messages: ChatMessageType[];
    page: number;
    hasMore: boolean;
    alreadyFetched: boolean;
  }
>;

type MessageState = {
  conversations: ConversationsState;
  currentUserConversationIds: string[];
  fetchUserConversationIds: (userId: string) => Promise<void>;
  currentConversationId: string | null;
  setCurrentConversationId: (id: string) => void;
  switchConversation: (conversationId: string) => void;
  addMessageToConversation: (
    conversationId: string,
    messages: ChatMessageType,
  ) => void;
  optimisticIds: string[];
  setOptimisticIds: (id: string) => void;
  setMoreMessagesToConversation: (
    conversationId: string,
    moreMessages: ChatMessageType[],
  ) => void;
  fetchInitialMessages: (conversationId: string) => Promise<void>;
  removeMessageFromConversation: (
    conversationId: string,
    messageId: string,
  ) => void;
  realtimeSubscription: RealtimeChannel | null;
  setupRealtimeSubscriptions: (userId: string) => Promise<void>;
  unsubscribeRealtime: () => void;
};

export const useMessage = create<MessageState>((set, get) => {
  const utils = trpc.useUtils();

  return {
    conversations: {},
    currentUserConversationIds: [],
    fetchUserConversationIds: async (userId: string) => {
      try {
        const conversations = await utils.messages.getUserConversations.fetch({
          userId,
        });

        if (conversations) {
          const conversationIds = conversations.map(
            (conversation) => conversation.id,
          );
          set({ currentUserConversationIds: conversationIds });
        }
      } catch (error) {
        console.error("Error fetching user conversations for IDs:", error);
        toast.error("Error fetching conversations.");
      }
    },
    currentConversationId: null,
    setCurrentConversationId: (id: string) => {
      set(() => ({
        currentConversationId: id,
      }));
    },
    switchConversation: (conversationId: string) => {
      set({ currentConversationId: conversationId });
    },
    addMessageToConversation: (
      conversationId: string,
      newMessage: ChatMessageType,
    ) => {
      set((state) => {
        const updatedConversations: ConversationsState = {
          ...state.conversations,
        };

        if (updatedConversations[conversationId]) {
          updatedConversations[conversationId] = {
            messages: [
              ...updatedConversations[conversationId].messages,
              newMessage,
            ],
            page: updatedConversations[conversationId].page,
            hasMore: updatedConversations[conversationId].hasMore,
            alreadyFetched: updatedConversations[conversationId].alreadyFetched,
          };
        }

        const updatedState: MessageState = {
          ...state,
          conversations: updatedConversations,
          optimisticIds: [...state.optimisticIds, newMessage.id],
        };

        return updatedState;
      });
    },
    optimisticIds: [],
    setOptimisticIds: (id: string) =>
      set((state) => ({
        optimisticIds: [...state.optimisticIds, id],
      })),
    setMoreMessagesToConversation: (
      conversationId: string,
      moreMessages: ChatMessageType[],
    ) => {
      set((state) => {
        const updatedConversations: ConversationsState = {
          ...state.conversations,
        };

        if (updatedConversations[conversationId]) {
          updatedConversations[conversationId] = {
            messages: [
              ...updatedConversations[conversationId].messages,
              ...moreMessages,
            ],
            page: updatedConversations[conversationId].page + 1,
            hasMore: moreMessages.length >= LIMIT_MESSAGE,
            alreadyFetched: updatedConversations[conversationId].alreadyFetched,
          };
        } else {
          updatedConversations[conversationId] = {
            messages: moreMessages,
            page: 1,
            hasMore: true,
            alreadyFetched: true,
          };
        }

        return {
          ...state,
          conversations: updatedConversations,
        };
      });
    },
    fetchInitialMessages: async (conversationId: string): Promise<void> => {
      const state = get();

      if (state.conversations[conversationId]?.alreadyFetched) {
        console.log(
          `Messages for ${conversationId} already fetched. Skipping initial fetch.`,
        );
        return;
      }
      console.log(
        `Fetching initial messages for conversationId: ${conversationId}`,
      );

      try {
        const { data, error } = await supabase
          .from("messages")
          .select(
            `
              *,
              user(name, image, email)
            `,
          )
          .range(0, LIMIT_MESSAGE)
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: true });

        if (error) {
          console.error(`Supabase fetch error:`, error.message);
          throw new Error(error.message);
        }

        const chatMessages = data.map((message) => ({
          id: message.id,
          createdAt: message.created_at,
          conversationId: message.conversation_id,
          userId: message.user_id,
          message: message.message,
          read: message.read ?? false,
          isEdit: message.is_edit ?? false,
          user: {
            name: message.user?.name ?? "",
            image: message.user?.image ?? "",
            email: message.user?.email ?? "",
          },
        }));

        const hasMore = chatMessages.length >= LIMIT_MESSAGE;

        set((state) => ({
          ...state,
          conversations: {
            ...state.conversations,
            [conversationId]: {
              messages: chatMessages,
              page: 1,
              hasMore,
              alreadyFetched: true,
            },
          },
        }));
      } catch (error) {
        console.error("Error fetchInitialMessages:", error);
        toast.error("Error");
      }
    },
    removeMessageFromConversation: (
      conversationId: string,
      messageId: string,
    ) => {
      set((state) => {
        const updatedConversations: ConversationsState = {
          ...state.conversations,
        };

        if (updatedConversations[conversationId]) {
          updatedConversations[conversationId] = {
            messages: updatedConversations[conversationId].messages.filter(
              (message) => message.id !== messageId,
            ),
            page: updatedConversations[conversationId].page,
            hasMore: updatedConversations[conversationId].hasMore,
            alreadyFetched: updatedConversations[conversationId].alreadyFetched,
          };
        }

        return {
          ...state,
          conversations: updatedConversations,
          optimisticIds: state.optimisticIds.filter((id) => id !== messageId),
        };
      });
    },

    realtimeSubscription: null,

    setupRealtimeSubscriptions: async (userId: string) => {
      const existingSubscription = get().realtimeSubscription;
      if (existingSubscription) {
        console.log(
          "Realtime subscription already exists. Unsubscribing first.",
        );
        await existingSubscription.unsubscribe();
        set({ realtimeSubscription: null });
      }

      console.log(`Setting up Realtime subscription for user: ${userId}`);

      const subscription = supabase
        .channel(`messages_for_user_${userId}`)
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "messages" },
          (payload) => {
            console.log("Realtime payload received:", payload);
            const newMessage = payload.new as MessageType;
            const conversationId = newMessage.conversationId;

            if (get().conversations[conversationId]) {
              const chatMessage: ChatMessageType = {
                ...newMessage,
                userId: newMessage.userId!,
              };
              get().addMessageToConversation(conversationId, chatMessage);
            } else {
              console.log(
                `New message received for conversation ${conversationId}, but conversation is not in Zustand state.`,
              );
            }
          },
        )
        .subscribe();

      set({ realtimeSubscription: subscription });
    },

    unsubscribeRealtime: async () => {
      const subscription = get().realtimeSubscription;
      if (subscription) {
        console.log("Unsubscribing from Realtime");
        await subscription.unsubscribe();
        set({ realtimeSubscription: null });
      }
    },
  };
});
