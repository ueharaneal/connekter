"use server";
import argon2 from "argon2";
import { SignInSchema } from "@/validators/auth-validators";

type Res =
  | { success: true }
  | { success: false; error: string; statusCode: 400 };

export async function signinUserAction(values: unknown): Promise<Res> {
  try {
    //handle logic in auth.ts

    return { success: true };
  } catch {
    return { success: false, error: "", statusCode: 400 };
  }
}
