import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignoutButton from "@/components/common/SignoutButton";
import nextAuth from "@/../auth";

export const NavbarLinks = async () => {
  const session = await nextAuth.auth();

  return session?.user ? <SignedIn /> : <SignedOut />;
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
