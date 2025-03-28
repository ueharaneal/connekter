import db from "@/server/db";
import { providerProfiles } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { providerUpdateSchema } from "@/server/db/schema/tables/providers";
import { z } from "zod";
import nextAuth from "@/auth";

export async function updateProviderAction(
  input: z.infer<typeof providerUpdateSchema>,
) {
  const session = await nextAuth.auth();
  if (!session?.user || !session.user.id) throw new Error("Not authenticated");
  const id = session.user.id;
  return await db
    .update(providerProfiles)
    .set(input)
    .where(eq(providerProfiles.userId, id));
}
