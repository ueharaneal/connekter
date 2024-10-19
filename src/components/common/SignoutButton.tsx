"use client";
import React from "react";
import { Button } from "../ui/button";
import signoutUserAction from "../../actions/auth/signout-user-action";

function SignoutButton() {
  const clickHandler = async () => {
    await signoutUserAction();
    window.location.href = "/";
  };

  return (
    <Button variant="destructive" size="sm" onClick={() => clickHandler()}>
      Sign Out
    </Button>
  );
}

export default SignoutButton;
