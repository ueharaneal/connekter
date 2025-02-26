import React, { Suspense } from "react";
import SignInForm from "@/components/auth/SignInForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <main className="mt-4 flex w-full flex-col items-center">
      <div className="container flex max-w-2xl flex-col items-center">
        <div className="my-4 h-1 max-w-3xl bg-muted" />
        {/* SignUp form  */}
        <SignInForm />

        {/* Go to signin link */}

        <div className="mt-5 text-center text-sm">
          Don&apos;t have an Account?
          <Button asChild variant="link" className="-mx-3">
            <Link href="/auth/signup">Click Here</Link>
          </Button>
          to sign up
        </div>
      </div>
    </main>
  );
}
