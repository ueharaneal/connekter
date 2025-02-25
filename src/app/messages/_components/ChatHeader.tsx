"use client";
import React from "react";
import { useMessage } from "@/store/messagingStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

function ChatHeader() {
  const session = useSession({ required: true });
  const curUserId = session.data?.user?.id;
  const { currentConversationWithParticipants } = useMessage();

  const participantsWithouMe =
    currentConversationWithParticipants?.participants.filter(
      (user) => user.userId !== curUserId,
    );

  console.log(curUserId);
  console.log(participantsWithouMe);

  return (
    <div className="flex items-center border-b border-white/10 p-4">
      <Avatar className="h-10 w-10">
        {participantsWithouMe && (
          <AvatarImage
            className=""
            src={participantsWithouMe[0].user.image ?? ""}
            alt={participantsWithouMe[0].user.name ?? ""}
          />
        )}
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <div className="ml-4">
        {participantsWithouMe && (
          <h2 className="text-lg font-semibold capitalize text-gray-200">
            {participantsWithouMe.length > 1
              ? participantsWithouMe.map((user) => user.user.name)
              : participantsWithouMe[0].user.name}
          </h2>
        )}
      </div>
    </div>
  );
}

export default ChatHeader;
