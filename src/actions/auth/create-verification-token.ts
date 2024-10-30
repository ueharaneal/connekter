"use server";

import db from "@/db";
import { verificationTokens } from "@/db/schema";
import { VERIFICATION_TOKEN_EXP_MIN } from "@/lib/constants";

export async function createVerificationTokenActions(
  identifier: (typeof verificationTokens.$inferSelect)["identifier"],
) {
  const expires = new Date(Date.now() + VERIFICATION_TOKEN_EXP_MIN * 60 * 1000);
  const token = Math.random().toString(36).substring(2);
  //make sure to delete tokens with the same identifier before creating a new one
  const newVerificationToken = await db
    .insert(verificationTokens)
    .values({ expires, token, identifier })
    .returning({ token: verificationTokens.token })
    .then((res) => res![0]);
  console.log("LOOOOOK", newVerificationToken);
  return newVerificationToken.token;
}
