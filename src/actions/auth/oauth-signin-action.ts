"use server";
import nextAuth from "@/../auth";
import { isRedirectError } from "next/dist/client/components/redirect";

export async function oathSignInAction(provider: "google" | "github") {
  //is provider so we can just add more in the future
  try {
    await nextAuth.signIn(provider, { redirectTo: "/profile" });
  } catch (err) {
    if (isRedirectError(err)) {
      throw err;
    }
    console.error(err);
  }
}
