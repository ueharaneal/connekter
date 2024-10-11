"use server";

import nextAuth from "@/../auth";

type Res =
  | { success: true }
  | { success: false; error: string; statusCode: 400 };

export async function signinUserAction(values: unknown): Promise<Res> {
  try {
    if (
      typeof values !== "object" ||
      values === null ||
      Array.isArray(values)
    ) {
      throw new Error("Invalid JSON object");
    }
    //handle logic in auth.ts
    nextAuth.signIn("credentials", { ...values, redirect: false });
    return { success: true };
  } catch {
    return { success: false, error: "", statusCode: 400 };
  }
}
