"use client";
import React from "react";
import { useMessage } from "@/store/messagingStore";
import { useSession } from "next-auth/react";
import { UserAvatarsTooltip } from "@/components/common/UsersAvatarTooltip";
import { Button } from "@/components/ui/button";

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
    <div className="flex w-full flex-row items-center justify-between border-b border-white/10 px-4 pb-4 pt-5">
      <div className="flex flex-row items-center">
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
      <Button className="mx-8">Details</Button>
    </div>
  );
}

export default ChatHeader;
