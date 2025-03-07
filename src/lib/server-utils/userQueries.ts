import "server-only";

import db from "@/server/db";
import { users, type User } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user =
    (await db.query.users.findFirst({
      where: eq(users.email, email),
    })) ?? null;
  return user;
};

export const findUserById = async (id: string): Promise<User> => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });

  if (!user) throw new Error("User not found.");

  return user;
};

export const findAllUsers = async () => {
  const allUsers = await db.query.users.findMany();
  return allUsers;
};
