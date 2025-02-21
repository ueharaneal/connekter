"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";
import { ResizablePanel } from "@/components/ui/resizable";

// Mock data for contacts
const contacts = [
  {
    id: 1,
    name: "Mom",
    avatar: "/avatar1.png",
    lastMessage: "Where u at now",
    time: "11:27 AM",
    unread: true,
  },
  {
    id: 2,
    name: "Devin Yerasi",
    avatar: "/avatar2.png",
    lastMessage: "How'd your day go? Also no more Friday?",
    time: "9:53 AM",
    unread: true,
  },
  {
    id: 3,
    name: "Kaitlynee BAWDYY",
    avatar: "/avatar3.png",
    lastMessage: "I'm supposed to see my grandma idk what time though",
    time: "6:33 AM",
    unread: true,
  },
  // ... add more contacts as needed
];

export default function MessagingPage() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() === "") return;
    const message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <ResizablePanel className="flex flex-col bg-[#1c1c1c]">
      {/* Chat header */}
      <div className="flex items-center border-b border-white/10 p-4">
        <Avatar className="h-10 w-10">
          <AvatarImage
            src={selectedContact.avatar}
            alt={selectedContact.name}
          />
          <AvatarFallback>{selectedContact.name[0]}</AvatarFallback>
        </Avatar>
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-200">
            {selectedContact.name}
          </h2>
        </div>
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 bg-background p-4">
        {/* Messages would go here */}
        {messages.map((message) => (
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
        ))}
      </ScrollArea>

      {/* Message input */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="border-0 bg-white/5 focus-visible:ring-1 focus-visible:ring-gray-400"
          />
          <Button
            size="icon"
            variant="ghost"
            className="text-gray-400 hover:text-white"
            onClick={sendMessage}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </ResizablePanel>
  );
}
