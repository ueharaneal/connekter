"use server";
import db from "@/db";
import { users } from "@/db/schema";
import { eq, isNull, and } from "drizzle-orm";

export async function oathVerifyEmailAction(email: string) {
  const existingUser = await db
    .select({ id: users.id })
    .from(users)
    .where(
      and(
        eq(users.email, email),
        isNull(users.password),
        isNull(users.emailVerified),
      ),
    )
    .then((res) => res[0] ?? null);

  console.log("existing user", existingUser);

  if (existingUser?.id) {
    await db
      .update(users)
      .set({
        emailVerified: new Date(),
      })
      .where(eq(users.id, existingUser.id));
  }
  return;
}
