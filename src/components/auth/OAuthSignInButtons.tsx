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
    await oathSignInAction(provider);
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
