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

export default function MessagingPage() {
  const params = useParams();
  const { id } = params;

  // const { fetchInitialMessages } = useMessage();

  return (
    <ResizablePanel
      className="flex min-h-[94vh] flex-col bg-[#1c1c1c]"
      defaultSize={50}
      minSize={50}
    >
      {/* Chat header */}
      <div className="flex items-center border-b border-white/10 p-4">
        {/* <Avatar className="h-10 w-10">
          <AvatarImage
            src={selectedContact.avatar}
            alt={selectedContact.name}
          />
          <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
        </Avatar> */}
        <div className="ml-4">
          {/* <h2 className="text-lg font-semibold text-gray-200">
            {selectedContact.name}
          </h2> */}
        </div>
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 bg-background p-4">
        {/* Messages would go here */}
        {/* {messages.map((message) => (
          <Card
            key={message.id}
            className={`mb-4 ${message.sender === "You" ? "ml-auto" : "mr-auto"} max-w-[70%]`}
          >
            <CardContent className="p-3">
              <p
                className={`text-sm ${message.sender === "You" ? "text-blue-600" : "text-gray-800"} dark:text-white`}
              >
                {message.content}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {message.timestamp}
              </p>
            </CardContent>
          </Card>
        ))} */}
      </ScrollArea>
      <MessageInput />
    </ResizablePanel>
  );
}
