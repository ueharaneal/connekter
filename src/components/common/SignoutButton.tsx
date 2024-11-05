"use client";
import React from "react";
import { Button } from "../ui/button";
import signoutUserAction from "../../actions/auth/signout-user-action";
import { LogOutIcon } from "lucide-react";

function SignoutButton() {
  const clickHandler = async () => {
    await signoutUserAction();
    window.location.href = "/";
  };

  return (
    <Button variant="destructive" size="sm" onClick={() => clickHandler()}>
      <div className="flex flex-row gap-x-1">
        <LogOutIcon className="mr-2 h-4 w-4" />
        <span>Sign out</span>
      </div>
    </Button>
  );
}

export default SignoutButton;
