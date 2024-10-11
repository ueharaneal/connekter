import React from "react";
import SignInForm from "@/components/auth/SignInForm";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight"> Sign In </h1>
        <div className="my-4 h-1 bg-muted" />
        {/* SignUp form  */}
        <SignInForm />
        {/* Oauth Links */}
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
