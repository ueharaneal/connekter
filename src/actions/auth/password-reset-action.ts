"use server";
import { findVerificationTokenByToken } from "@/lib/server-utils/auth/tokenQueries";
import { findUserByEmail } from "@/lib/server-utils/userQueries";
import { z } from "zod";
import argon2 from "argon2";
import db from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
type Res =
  | { success: true }
  | { success: false; error: string[]; statusCode: 400 }
  | { success: false; error: string; statusCode: 400 | 401 | 500 };

export async function passwordResetAction({
  email,
  token,
  values,
}: {
  email: string;
  token: string;
  values: unknown;
}): Promise<Res> {
  const parsedValues = z
    .object({
      password: z
        .string()
        .min(6, "Password must be at least 6 characters long"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    })
    .safeParse(values);

  if (!parsedValues.success) {
    return {
      success: false,
      error: parsedValues.error.message,
      statusCode: 400,
    };
  } else {
    const password = parsedValues.data.password;
    const existingToken = await findVerificationTokenByToken(token);
    if (!existingToken) {
      return {
        success: false,
        error: "Token is invalid, please reset password again",
        statusCode: 401,
      };
    }
    const isExpired = new Date(existingToken.expires) < new Date();
    if (isExpired) {
      return {
        success: false,
        error: "Token has expired, please reset password again",
        statusCode: 400,
      };
    }

    //now hash password and save to db
    const existingUser = await findUserByEmail(email);
    if (!existingUser) {
      return {
        success: false,
        error: "Email does not exist ",
        statusCode: 401,
      };
    }
    if (
      !existingUser?.password ||
      existingUser.email !== existingToken.identifier
    ) {
      return {
        success: false,
        error: "Unauthorized",
        statusCode: 400,
      };
    }

    try {
      const hashedPassword = await argon2.hash(password);
      await db
        .update(users)
        .set({ password: hashedPassword })
        .where(eq(users.email, existingToken.identifier));
      return { success: true };
    } catch {
      return {
        success: false,
        error: "Internal Server Error",
        statusCode: 500,
      };
    }
  }
}
