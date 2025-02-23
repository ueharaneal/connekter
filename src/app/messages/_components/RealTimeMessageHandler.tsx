"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useMessageWithUtils } from "@/hooks/use-message-with-utilts";
import { useMessage } from "@/store/messagingStore";

const RealtimeMessageHandler = () => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  // Get functions from our custom hook that includes TRPC utils
  const { fetchUserConversationIds } = useMessageWithUtils();

  // Get realtime-related functions directly from the store
  const setupRealtimeSubscriptions = useMessage(
    (state) => state.setupRealtimeSubscriptions,
  );
  const unsubscribeRealtime = useMessage((state) => state.unsubscribeRealtime);

  useEffect(() => {
    let isSubscribed = true;

    const initializeMessaging = async () => {
      if (!userId || !isSubscribed) return;

      try {
        // First fetch conversation IDs
        await fetchUserConversationIds(userId);
        console.log("✅ Conversation IDs fetched successfully");

        // Then setup realtime subscriptions
        await setupRealtimeSubscriptions(userId);
        console.log("✅ Realtime subscriptions initialized");
      } catch (error) {
        console.error("❌ Error initializing messaging:", error);
        // You might want to add toast.error here
      }
    };

    initializeMessaging();

    // Cleanup function
    return () => {
      isSubscribed = false;
      unsubscribeRealtime();
      console.log("🧹 Cleaned up realtime subscriptions");
    };
  }, [
    userId,
    fetchUserConversationIds,
    setupRealtimeSubscriptions,
    unsubscribeRealtime,
  ]);

  return null;
};

export default RealtimeMessageHandler;
