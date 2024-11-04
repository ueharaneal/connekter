import "server-only";
import db from "@/server/db";
import { verificationTokens } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const findVerificationTokenByToken = async (
  token: string,
): Promise<typeof verificationTokens.$inferSelect | null> => {
  if (!token) return null;

  const verificationToken = await db.query.verificationTokens.findFirst({
    where: eq(verificationTokens.token, token),
  });

  return verificationToken ?? null;
};
