"use server";
import db from "@/db";
import { users } from "@/db/schema";
import { findUserByEmail } from "@/lib/server-utils/userQueries";
import { eq } from "drizzle-orm";
import nextAuth from "@/auth";
import { revalidatePath } from "next/cache";

export const changeUserRoleAction = async ({
  email,
  newRole,
}: {
  email: string;
  newRole: (typeof users.$inferSelect)["role"];
}) => {
  const session = await nextAuth.auth();

  if (session?.user?.role !== "admin") throw new Error("Unauthorized");

  const existingUser = await findUserByEmail(email);
  if (existingUser && existingUser.role !== newRole) {
    console.log("It ran");
    await db
      .update(users)
      .set({ role: newRole })
      .where(eq(users.id, existingUser.id));
  }
  revalidatePath("/admin");
};
