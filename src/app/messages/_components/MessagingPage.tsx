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

export default function MessagingPage() {
  const params = useParams();
  const { id: conversationId } = params; // Rename 'id' to 'conversationId' for clarity
  const session = useSession({ required: true });

  const curUserId = session.data?.user?.id;
  console.log(curUserId);
  // Access conversationMessages from Zustand store
  const conversationMessages = useMessage(
    (state) => state.conversations[conversationId as string]?.messages,
  );
  console.log(conversationMessages);

  return (
    <ResizablePanel
      className="flex min-h-[94vh] flex-col bg-[#1c1c1c]"
      defaultSize={50}
      minSize={50}
    >
      {/* Chat header */}
      <ChatHeader />
      {/* Messages area */}
      <ScrollArea className="h-[calc(80vh)] bg-background px-4">
        {/* Messages would go here */}
        {conversationMessages ? ( // Conditionally render messages if available
          conversationMessages.map((message) => (
            <Card
              key={message.id}
              className={`mb-4 ${
                message.userId === "YOUR_USER_ID_HERE" // Replace with logic to check if message is from current user
                  ? "ml-auto bg-blue-500 text-white" // Example styling for current user's messages
                  : "mr-auto bg-gray-700 text-white" // Example styling for other user's messages
              } max-w-[70%]`}
            >
              <CardContent className="p-3">
                <p className="text-sm dark:text-white">{message.message}</p>
                <p className="mt-1 text-xs text-gray-300 dark:text-gray-400">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="mt-4 text-center text-gray-300">Loading messages...</p> // Display loading message
        )}
      </ScrollArea>
      <MessageInput />
    </ResizablePanel>
  );
}
