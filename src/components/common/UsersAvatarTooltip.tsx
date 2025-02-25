import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import UserAvatar from "./UserAvatar"; // Adjust the import path as needed

type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
};

type Member = {
  user: User;
};

type UserAvatarsProps = {
  users: Member[];
  tooltipText?: string;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  useDialog?: boolean;
  dialogContent?: React.ReactNode;
  maxVisible?: number;
};

export function UserAvatarsTooltip({
  users,
  tooltipText = "See all users",
  tooltipSide = "left",
  useDialog = false,
  dialogContent,
  maxVisible = 5,
}: UserAvatarsProps) {
  const visibleusers = users.slice(0, maxVisible);
  const extraCount = users.length - maxVisible;

  const avatarGroup = (
    <Button variant="ghost" className="-space-x-2" size="icon">
      {visibleusers.map((member) => (
        <UserAvatar
          key={member.user.id}
          size="sm"
          name={member.user.name}
          email={member.user.email}
          image={member.user.image}
        />
      ))}
      {extraCount > 0 && (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
          +{extraCount}
        </div>
      )}
    </Button>
  );

  // If we're using dialog mode, wrap in Dialog
  if (useDialog) {
    return (
      <Dialog>
        <TooltipProvider>
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>{avatarGroup}</DialogTrigger>
            </TooltipTrigger>
            <TooltipContent side={tooltipSide}>{tooltipText}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent className="sm:max-w-md">
          {dialogContent || (
            <div className="grid gap-4 capitalize">
              <h3 className="text-lg font-medium">Users</h3>
              <div className="flex flex-wrap gap-2">
                {users.map((member) => (
                  <div key={member.user.id} className="flex items-center gap-2">
                    <UserAvatar
                      size="md"
                      name={member.user.name}
                      email={member.user.email}
                      image={member.user.image}
                    />
                    <div>
                      <p className="font-medium">{member.user.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  // If we're not using dialog, just use tooltip
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{avatarGroup}</TooltipTrigger>
        <TooltipContent side={tooltipSide}>{tooltipText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
