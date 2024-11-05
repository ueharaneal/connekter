"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignoutButton from "@/components/common/SignoutButton";
import { useSession } from "next-auth/react";
import Spinner from "@/components/ui/Spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User } from "lucide-react";
import type { Session } from "next-auth";

export const ProfileLinks = () => {
  const session = useSession();

  switch (session.status) {
    case "loading":
      return <CustomSessionLoader />;
    case "unauthenticated":
      return <SignedOut />;
    case "authenticated":
      return <SignedIn session={session.data} />;
    default:
      return null;
  }
};

export const CustomSessionLoader = () => {
  return (
    <Button variant="ghost" size="sm">
      <Spinner />
    </Button>
  );
};

export const SignedIn = ({ session }: { session: Session }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={session.user?.image ?? ""} />
          <AvatarFallback>{session.user?.name?.charAt(0) ?? ""}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SignoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const SignedOut = () => {
  return (
    <Button variant="default" size="lg" asChild>
      <Link href="/auth/signin">Sign In</Link>
    </Button>
  );
};
