import nextAuth from "@/auth";
import { redirect } from "next/navigation";
import db from "@/server/db";
import { listings } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export default async function Page() {
  const session = await nextAuth.auth();
  if (!session?.user || !session.user.id) {
    redirect("/");
  }

  const providersListings = await db.query.listings.findFirst({
    where: eq(listings.userId, session.user.id),
  });

  // If the provider has listings, redirect them to the first one
  if (providersListings) {
    redirect(`/provider-dashboard/${providersListings.id}`);
  }

  // If they don't have any listings, you could redirect them somewhere else (optional)
}
