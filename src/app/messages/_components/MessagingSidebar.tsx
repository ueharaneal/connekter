"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Circle } from "lucide-react";
import { ResizablePanel } from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { useMemo, useState, useEffect } from "react";
import { useMessage, type AllUserConversations } from "@/store/messagingStore";
import { useRouter } from "next/navigation";
import { formatRelative } from "date-fns";
import { useSession } from "next-auth/react";

function MessagingSidebar() {
  const router = useRouter();
  const { data } = useSession();

  const curSessionId = data?.user?.id;

  const [isCollapsed, setIsCollapsed] = useState(false);

  const { allUserConversations, setCurrentConversationWithParticipants } =
    useMessage();

  const memoizedUserConversations = useMemo(() => {
    // Sort conversations by most recent message
    return [...allUserConversations].sort((a, b) => {
      const aLatestMessage = a.messages?.[a.messages.length - 1];
      const bLatestMessage = b.messages?.[b.messages.length - 1];

      // If no messages, sort by conversation creation date
      if (!aLatestMessage && !bLatestMessage) {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      // If one conversation has messages and the other doesn't
      if (!aLatestMessage) return 1;
      if (!bLatestMessage) return -1;

      // Sort by latest message date
      return (
        new Date(bLatestMessage.createdAt).getTime() -
        new Date(aLatestMessage.createdAt).getTime()
      );
    });
  }, [allUserConversations]);

  console.log(memoizedUserConversations);

  const handleConversationClick = (
    conversation: AllUserConversations[number],
  ) => {
    setCurrentConversationWithParticipants(conversation);
    void router.push(`/messages/${conversation.id}`);
  };

  const onResize = (size: number) => {
    // Snap to either collapsed (10%) or expanded (25%) state
    if (size < 15) {
      setIsCollapsed(true);
    } else {
      setIsCollapsed(false);
    }
  };

  const [panelSize, setPanelSize] = useState(() => {
    if (typeof window !== "undefined") {
      const savedSize = localStorage.getItem("sidebar-size");
      return savedSize ? Number(savedSize) : 20;
    }
    return 20;
  });

  useEffect(() => {
    localStorage.setItem("sidebar-size", String(panelSize));
  }, [panelSize]);

  console.log(panelSize);

  return (
    <ResizablePanel
      defaultSize={panelSize}
      maxSize={20}
      minSize={5}
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
        {memoizedUserConversations.map((conversation) => (
          <div
            key={conversation.id}
            className={cn(
              "relative flex h-full cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-white/5",
              // selectedconversation.id === conversation.id && "bg-white/10",
              isCollapsed && "justify-center",
            )}
            onClick={() => handleConversationClick(conversation)}
          >
            {/* {conversation.messages[0].read !== undefined ||
              (conversation.messages[0].read !== true && (
                <Circle className="absolute left-1 top-1/2 h-2 w-2 -translate-y-1/2 fill-blue-500 text-blue-500" />
              ))} */}
            <Avatar className="h-10 w-10 flex-shrink-0">
              {/* Find the first participant that isn't the current user */}
              {(() => {
                const otherParticipant = conversation.participants.find(
                  (p) => p.user.id !== curSessionId,
                )?.user;

                return (
                  <>
                    <AvatarImage
                      src={otherParticipant?.image ?? ""}
                      alt={otherParticipant?.name ?? ""}
                    />
                    <AvatarFallback className="bg-gray-600 capitalize text-white">
                      {otherParticipant?.name?.charAt(0) || "?"}
                    </AvatarFallback>
                  </>
                );
              })()}
            </Avatar>
            {!isCollapsed && (
              <div className="flex w-full min-w-0 flex-row items-start justify-between capitalize">
                <div className="flex h-full flex-col items-start">
                  <p className="truncate font-medium text-gray-200">
                    {conversation.name ??
                      (conversation.participants.find(
                        (p) => p.user.id !== curSessionId,
                      )?.user.name ||
                        "Chat")}
                  </p>
                  {conversation.messages.length > 0 && (
                    <p className="line-clamp-2 overflow-hidden text-ellipsis text-sm text-gray-400">
                      {conversation.messages[0].message}
                    </p>
                  )}
                </div>
                {conversation.messages.length > 0 && (
                  <span className="absolute right-8 ml-2 whitespace-nowrap text-xs text-gray-400">
                    {formatRelative(
                      conversation.messages[0].createdAt,
                      new Date(),
                    )}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </ScrollArea>
    </ResizablePanel>
  );
}

export default MessagingSidebar;
