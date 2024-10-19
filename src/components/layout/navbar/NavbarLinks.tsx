"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignoutButton from "@/components/common/SignoutButton";
import { useSession } from "next-auth/react";
import Spinner from "@/components/ui/Spinner";

export const NavbarLinks = () => {
  const session = useSession();

  switch (session.status) {
    case "loading":
      return <CustomSessionLoader />;

    case "unauthenticated":
      return <SignedOut />;
    case "authenticated":
      return <SignedIn />;
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

export const SignedIn = () => {
  return (
    <>
      <li>
        <Button variant="outline" size="sm" asChild>
          <Link href="/profile">Profile</Link>
        </Button>{" "}
      </li>
      <li>
        <SignoutButton />
      </li>
    </>
  );
};

export const SignedOut = () => {
  return (
    <>
      <li>
        <Button variant="outline" size="sm" asChild>
          <Link href="/auth/signin">Sign In</Link>
        </Button>{" "}
      </li>
      <li>
        <Button variant="outline" size="sm" asChild>
          <Link href="/auth/signup">Sign Up</Link>
        </Button>{" "}
      </li>
    </>
  );
};
