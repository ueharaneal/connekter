import React from "react";
import SignUpForm from "@/components/auth/SignupForm";

function SignUp() {
  return (
    <main className="mt-4">
      <div className="container">
        <h1 className="text-3xl font-bold tracking-tight"> Sign Up </h1>
        <div className="h-1 bg-muted my-4" />
        {/* SignUp form  */}
        <SignUpForm />
        {/* Oauth Links */}
        {/* Go to signin link */}
      </div>
    </main>
  );
}

export default SignUp;
