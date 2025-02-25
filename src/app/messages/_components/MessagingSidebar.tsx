"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Send, ArrowDown } from "lucide-react";
import { ResizablePanel } from "@/components/ui/resizable";
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const [userScrolled, setUserScrolled] = useState(false);

  const me = session.data?.user?.id;

  // Access conversationMessages from Zustand store
  const conversationMessages = useMessage(
    (state) => state.conversations[conversationId as string]?.messages,
  );

  const { currentConversationWithParticipants } = useMessage();

  // Scroll to bottom when messages change, but only if the user hasn't scrolled up
  useEffect(() => {
    if (scrollRef.current && !userScrolled) {
      const scrollContainer = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [conversationMessages, userScrolled]);

  // Handle scroll events to detect when user has scrolled up
  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        // Check if scroll is more than 10 pixels from bottom
        const isScrolled =
          scrollContainer.scrollTop <
          scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;

        setUserScrolled(isScrolled);

        // If scrolled all the way to bottom, reset userScrolled
        if (
          scrollContainer.scrollTop ===
          scrollContainer.scrollHeight - scrollContainer.clientHeight
        ) {
          setUserScrolled(false);
        }
      }
    }
  };

  // Function to scroll to the bottom
  const scrollToBottom = () => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]",
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
        setUserScrolled(false);
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
    <div className="relative">
      {/* Chat header */}
      <ChatHeader />

      {/* Messages area */}
      <ScrollArea
        ref={scrollRef}
        className="h-[calc(80vh)] bg-background px-4"
        onScroll={handleScroll}
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
                      className={` ${isCurrentUser ? "justify-start" : "justify-start"} "h-full flex-col items-start`}
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
                        } mt-1 rounded-2xl px-3 py-2`}
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

      {/* Scroll to bottom button - only shown when user has scrolled up */}
      {userScrolled && (
        <div
          className="absolute bottom-16 left-0 right-0 z-10 flex justify-center"
          onClick={scrollToBottom}
        >
          <div className="cursor-pointer rounded-full bg-black p-2 transition-all hover:scale-110">
            <ArrowDown className="h-5 w-5 text-white" />
          </div>
        </div>
      )}

      <MessageInput />
    </div>
  );
}
