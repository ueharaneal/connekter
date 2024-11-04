"use server";

import db from "@/server/db";
import { users, verificationTokens } from "@/server/db/schema";
import { findVerificationTokenByToken } from "@/lib/server-utils/auth/tokenQueries";
import { findUserByEmail } from "@/lib/server-utils/userQueries";
import { eq } from "drizzle-orm";

export async function verifyCredentialsEmailAction(token: string) {
  const verificationToken = await findVerificationTokenByToken(token);

  if (!verificationToken?.expires) return { success: false };

  if (new Date(verificationToken.expires) < new Date()) {
    return { success: false };
  }

  const existingUser = await findUserByEmail(verificationToken.identifier);
  if (existingUser?.id) {
    await db
      .update(users)
      .set({
        emailVerified: new Date(),
      })
      .where(eq(users.id, existingUser.id));

    await db
      .update(verificationTokens)
      .set({
        expires: new Date(),
      })
      .where(eq(verificationTokens.identifier, verificationToken.identifier));
    return { success: true };
  } else {
    return { success: false };
  }
}
