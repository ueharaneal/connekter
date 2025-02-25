"use client";
import React from "react";
import { useMessage } from "@/store/messagingStore";
import { useSession } from "next-auth/react";
import { UserAvatarsTooltip } from "@/components/common/UsersAvatarTooltip";

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
      {participantsWithouMe && (
        <UserAvatarsTooltip users={participantsWithouMe} useDialog />
      )}
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
