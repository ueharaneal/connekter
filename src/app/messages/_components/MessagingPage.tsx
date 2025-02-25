"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";
import { ResizablePanel } from "@/components/ui/resizable";
import { useParams } from "next/navigation";
import { useMessage } from "@/store/messagingStore";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import { useSession } from "next-auth/react";
import UserAvatar from "@/components/common/UserAvatar";

export default function MessagingPage() {
  const params = useParams();
  const { id: conversationId } = params; // Rename 'id' to 'conversationId' for clarity
  const session = useSession({ required: true });

  const me = session.data?.user?.id;
  console.log(me);

  const conversationMessages = useMessage(
    (state) => state.conversations[conversationId as string]?.messages,
  );

  const { currentConversationWithParticipants } = useMessage();

  const getParicipantInfoById = (currentMessageUserId: string) => {
    const messager = currentConversationWithParticipants?.participants.find(
      (participant) => participant.userId === currentMessageUserId,
    );

    return messager?.user ?? { id: "", name: "", email: "", image: "" };
  };

  return (
    <ResizablePanel
      className="relative flex min-h-[94vh] flex-col bg-[#1c1c1c]"
      defaultSize={50}
      minSize={50}
    >
      {/* Chat header */}
      <ChatHeader />

      {/* Messages area */}
      <ScrollArea className="h-[calc(80vh)] bg-background px-4">
        <div className="my-4 flex flex-col space-y-3">
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

      <MessageInput />
    </ResizablePanel>
  );
}
