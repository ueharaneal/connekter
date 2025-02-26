"use client";

import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParams } from "next/navigation";
import { useMessage } from "@/store/messagingStore";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { useSession } from "next-auth/react";
import UserAvatar from "@/components/common/UserAvatar";

export default function MessagingPage() {
  const params = useParams();
  const { id: conversationId } = params;
  const session = useSession({ required: true });
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const me = session.data?.user?.id;

  const conversationMessages = useMessage(
    (state) => state.conversations[conversationId as string]?.messages,
  );

  const { currentConversationWithParticipants } = useMessage();

  // Then, scroll whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [conversationMessages]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        // Force a small delay to ensure DOM updates have completed
        setTimeout(() => {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }, 100);
      }
    }
  };

  const getParicipantInfoById = (currentMessageUserId: string) => {
    const messager = currentConversationWithParticipants?.participants.find(
      (participant) => participant.userId === currentMessageUserId,
    );

    return messager?.user ?? { id: "", name: "", email: "", image: "" };
  };

  return (
    <div>
      {/* Chat header */}
      <ChatHeader />

      {/* Messages area */}
      <ScrollArea
        ref={scrollAreaRef}
        className="h-[calc(80vh)] bg-background px-4"
      >
        <div className="my-8 flex flex-col space-y-3">
          {conversationMessages && conversationMessages.length > 0 ? (
            conversationMessages.map((message) => {
              const isCurrentUser = message.userId === me;

              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex flex-row items-end gap-x-2 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
                  >
                    <div className="mb-1">
                      <UserAvatar
                        size="sm"
                        image={getParicipantInfoById(message.userId).image}
                        name={message.userId}
                      />
                    </div>
                    <div
                      className={` ${isCurrentUser ? "text-end" : "text-start"} "h-full flex-col items-start`}
                    >
                      <div className={`text-xs opacity-60`}>
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div
                        className={` ${
                          isCurrentUser
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-foreground"
                        } mt-1 max-w-72 rounded-2xl px-3 py-2 sm:max-w-96 lg:max-w-prose`}
                      >
                        <p className="w-full text-center text-sm">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="py-10 text-center text-muted-foreground">
              No messages yet. Start the conversation!
            </p>
          )}
        </div>
      </ScrollArea>

      <MessageInput />
    </div>
  );
}
