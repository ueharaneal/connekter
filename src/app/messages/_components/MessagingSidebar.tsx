"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Circle } from "lucide-react";
import { ResizablePanel } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useState } from "react";

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

function MessagingSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedContact, setSelectedContact] = useState(contacts[0]);

  const onResize = (size: number) => {
    // Snap to either collapsed (10%) or expanded (25%) state
    if (size < 15) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };
  return (
    <ResizablePanel
      defaultSize={21}
      minSize={8}
      maxSize={21}
      onResize={onResize}
      className={cn(
        "relative flex flex-col gap-y-4 bg-[#1c1c1c] transition-all duration-300",
        isCollapsed ? "min-w-[4rem] max-w-[4rem]" : "min-w-[100px]",
      )}
    >
      {!isCollapsed && (
        <div className="sticky w-full border-b-2 border-border px-4 text-start text-3xl font-bold">
          <p className="px-3 pb-4 pt-5">Messages</p>
        </div>
      )}
      <ScrollArea className="">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={cn(
              "relative flex h-full cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-white/5",
              selectedContact.id === contact.id && "bg-white/10",
              isCollapsed && "justify-center",
            )}
            onClick={() => setSelectedContact(contact)}
          >
            {contact.unread && (
              <Circle className="absolute left-1 top-1/2 h-2 w-2 -translate-y-1/2 fill-blue-500 text-blue-500" />
            )}
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={contact.avatar} alt={contact.name} />
              <AvatarFallback className="bg-gray-600 text-white">
                {contact.name.split(" ")[0][0]}
              </AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex w-full min-w-0 flex-row items-start justify-between">
                <div className="">
                  <p className="truncate font-medium text-gray-200">
                    {contact.name}
                  </p>
                  <p className="line-clamp-2 overflow-hidden text-ellipsis text-sm text-gray-400">
                    {contact.lastMessage}
                  </p>
                </div>
                <span className="absolute right-8 ml-2 whitespace-nowrap text-xs text-gray-400">
                  {contact.time}
                </span>
              </div>
            )}
          </div>
        ))}
      </ScrollArea>
    </ResizablePanel>
  );
}

export default MessagingSidebar;
