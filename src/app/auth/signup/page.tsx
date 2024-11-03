import React, { Suspense } from "react";
import SignUpForm from "@/components/auth/SignupForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  OAuthSignInButton,
  OAuthSignInButtonSkeleton,
} from "@/components/auth/OAuthSignInButtons";

function SignUp() {
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight"> Sign Up </h1>
        <div className="my-4 h-1 bg-muted" />
        {/* SignUp form  */}
        <SignUpForm />
        {/* Oauth Links */}
        <div className="my-4 h-1 bg-muted" />
        <Suspense fallback={<OAuthSignInButtonSkeleton signUp={false} />}>
          <OAuthSignInButton signUp={true} />
        </Suspense>
        {/* Go to signin link */}
        <div className="mt-5 text-center text-sm">
          Already have an Account?
          <Button asChild variant="link" className="-mx-3">
            <Link href="/auth/signin"> Click Here</Link>
          </Button>
          to sign in
        </div>
      </div>
    </main>
  );
}

export default SignUp;
