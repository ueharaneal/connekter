import "server-only";

import db from "@/db";
import { users, type User } from "@/db/schema";
import { eq } from "drizzle-orm";

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user =
    (await db.query.users.findFirst({
      where: eq(users.email, email),
    })) ?? null;
  return user;
};
