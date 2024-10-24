"use server";
import nextAuth from "@/auth";

export async function signoutUserAction() {
  try {
    await nextAuth.signOut({ redirect: false });
  } catch (err) {
    console.log(err);
  }
}

export default signoutUserAction;
