"use server";

import bcrypt from "bcryptjs";
import { SignupSchema } from "@/validators/auth-validators";
import db from "@/server/db";
import { lower, users, verificationTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { createVerificationTokenActions } from "./create-verification-token";
import { sendEmail } from "@/lib/server-utils/sendEmail";
import { VerifyEmail } from "../../../packages/transactionals/emails/VerifyEmail";

type ErrorItem = {
  field: string;
  message: string;
};

type Res =
  | { success: true }
  | { success: false; error: ErrorItem[]; statusCode: 400 }
  | { success: false; error: string; statusCode: 500 | 409 };

export async function signupUserAction(values: unknown): Promise<Res> {
  const parsedValues = SignupSchema.safeParse(values);
  if (!parsedValues.success) {
    const flatErrors = parsedValues.error.errors.map((error) => ({
      field: error.path.join("."),
      message: error.message,
    }));
    console.log(flatErrors);
    return { success: false, error: flatErrors, statusCode: 400 };
  }

  const { firstName, lastName, email, password } = parsedValues.data;

  const existingUser = await db.query.users.findFirst({
    where: eq(lower(users.email), email.toLowerCase()),
  });

  if (existingUser) {
    if (!existingUser.emailVerified) {
      const verificationToken = await createVerificationTokenActions(
        existingUser.email,
      );
      await sendEmail({
        to: existingUser.email,
        subject: "Verify your email",
        content: VerifyEmail({
          name: existingUser.name ?? "User",
          verificationToken: verificationToken,
        }),
      });
      return {
        success: false,
        error: "User exists but not verified. Verification link resent",
        statusCode: 409,
      };
    } else {
      return { success: false, error: "Email already exists", statusCode: 409 };
    }
  }

  try {
    // Using bcrypt.hash instead of argon2.hash
    // The number 10 is the salt rounds - increase for stronger hashing (but slower)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
        // Add these if your schema has these fields
        name: `${firstName} ${lastName}`,
      })
      .returning({
        id: users.id,
        email: users.email,
        emailVerified: users.emailVerified,
        name: users.name,
      })
      .then((res) => res![0]);

    const verificationToken = await createVerificationTokenActions(
      newUser.email,
    );

    // Send verification email
    await sendEmail({
      to: newUser.email,
      subject: "Verify your email",
      content: VerifyEmail({
        name: newUser.name ?? "User",
        verificationToken: verificationToken,
      }),
    });

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
