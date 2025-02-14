import React from "react";
import SignUpForm from "@/components/auth/SignupForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function SignUp() {
  return (
    <main className="mx-auto mt-16 w-full max-w-2xl">
      <div className="">
        {/* SignUp form  */}
        <SignUpForm />
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
