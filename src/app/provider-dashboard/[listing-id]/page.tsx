import Header from "./_components/Header";
import ProviderCard from "./_components/ProviderCard";
import NavigationMenu from "./_components/NavigationMenu";
import { Suspense } from "react";
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
  const providersListings = await db.query.listings.findMany({
    where: eq(listings.providerId, session.user.id),
  });
  return (
    <div className="min-h-screen bg-background p-4 text-white">
      {/* Header */}
      <Header />

      {/* Main Card */}
      <Suspense fallback={<div>Loading...</div>}>
        <ProviderCard listings={providersListings} />
      </Suspense>

      {/* Navigation Menu */}
      <NavigationMenu />
    </div>
  );
}
