"use server";
import db from "@/db";
import { users } from "@/db/schema";
import { findUserByEmail } from "@/lib/server-utils/userQueries";
import { eq } from "drizzle-orm";

export const changeUserRoleAction = async ({
  email,
  newRole,
}: {
  email: string;
  newRole: (typeof users.$inferSelect)["role"];
}) => {
  const existingUser = await findUserByEmail(email);
  if (existingUser && existingUser.role !== newRole) {
    await db
      .update(users)
      .set({ role: newRole })
      .where(eq(users.id, existingUser.id));
  }
};
