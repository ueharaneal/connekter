import React from "react";
import SignUpForm from "@/components/auth/SignupForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import OAuthSignInButtons from "@/components/auth/OAuthSignInButtons";

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
        <OAuthSignInButtons signUp={true} />
        {/* Go to signin link */}
        <div className="mt-5 text-center text-sm">
          Already have an Account?
          <Button asChild variant="link" className="-mx-3">
            <Link href="/auth/signin"> Click Here</Link>
          </Button>
          to sign up
        </div>
      </div>
    </main>
  );
}

export default SignUp;
