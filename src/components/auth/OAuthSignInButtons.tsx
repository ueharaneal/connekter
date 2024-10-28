"use client";
import React from "react";
import { Button } from "../ui/button";
import { SiGoogle, SiGoogleHex } from "@icons-pack/react-simple-icons";
import { oathSignInAction } from "@/actions/auth/oauth-signin-action";

type OAuthSigninButtonProps = {
  signUp: boolean;
};
function OAuthSignInButtons({ signUp }: OAuthSigninButtonProps) {
  const text = signUp ? "Sign Up" : "Sign In";

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
        variant="secondary"
        className="w-full"
        onClick={clickHandler.bind(null, "google")}
      >
        <SiGoogle className="mr-2" color="#34A853" />
        {text} with Google
      </Button>
    </div>
  );
}

export default OAuthSignInButtons;
