"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { oathSignInAction } from "@/actions/auth/oauth-signin-action";
import { useRouter, useSearchParams } from "next/navigation";

type OAuthSigninButtonProps = {
  signUp: boolean;
};
export function OAuthSignInButton({ signUp }: OAuthSigninButtonProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const text = signUp ? "Continue" : "Continue";

  useEffect(() => {
    if (!error) return;
    if (error === "OAuthAccountNotLinked") {
      setErrorMessage("This account is already in use. Please sign in");
    } else {
      setErrorMessage("An error occured. Please try again. ");
    }
  }, [error]);
  const clickHandler = async (provider: "google") => {
    try {
      await oathSignInAction(provider);
    } catch (error) {
      // This Catch is to prevent users to sign in with a different provider with an email that already exists.
      console.log(error);
    }
  };

  return (
    <div className="w-full">
      <Button
        variant="outline"
        className="w-full"
        onClick={clickHandler.bind(null, "google")}
      >
        <FcGoogle className="mr-2" color="#34A853" />
        {text} with Google
      </Button>
      {errorMessage && (
        <p className="mt-2 text-sm font-medium text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

type OAuthSigninButtonSkeletonProps = OAuthSigninButtonProps;

export function OAuthSignInButtonSkeleton({
  signUp,
}: OAuthSigninButtonSkeletonProps) {
  const text = signUp ? "Sign up" : "Sign in";
  return (
    <div className="w-full">
      <Button variant="secondary" className="w-full">
        <FcGoogle className="mr-2" color="#34A853" />
        {text} in with Google
      </Button>
    </div>
  );
}

export default OAuthSignInButtonSkeleton;
