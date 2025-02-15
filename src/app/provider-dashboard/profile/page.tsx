import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ScheduleInterview from "./_components/ScheduleInterview";
import VerificationBadge from "./_components/VerificationBadge";
import VideoUpload from "./_components/VideoUpload";
import ProviderHeader from "./_components/ProviderHeader";
import LanguageSection from "./_components/LanguageSection";
import db from "@/server/db";
import EditableSections from "./_components/EditableSections";
import { eq } from "drizzle-orm";
import { providers } from "@/server/db/schema/tables/providers";
import nextAuth from "@/auth";

export default async function ProviderProfile() {
  const session = await nextAuth.auth();
  if (!session?.user || !session.user.id) throw new Error("Not authenticated");
  const provider = await db.query.providers.findFirst({
    with: {
      user: true,
    },
    where: eq(providers.userId, session.user.id),
  });

  const sections = [
    {
      id: "about",
      title: "About",
      content: provider?.about ?? "No information available.",
      isEditing: false,
    },
    {
      id: "credentials",
      title: "Credentials",
      content: provider?.credentials ?? "No credentials listed.",
      isEditing: false,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950">
      <div className="p-4">
        <Link href="/provider-dashboard" passHref>
          <Button
            variant="ghost"
            className="text-white hover:bg-zinc-800 hover:text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>
      <Card className="mx-auto max-w-3xl border-zinc-800 bg-zinc-900 text-white">
        <ProviderHeader name={provider?.name ?? ""} />

        <CardContent className="space-y-8">
          <ScheduleInterview />
          {/* Video Introduction */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Video Introduction</h3>
            <div className="space-y-4 rounded-lg bg-zinc-800 p-6 text-center">
              <p className="text-sm text-zinc-400">
                Upload a short introduction to help families learn more about
                your services.
              </p>
              <VideoUpload />
            </div>
          </div>

          {/* Editable Sections */}
          <EditableSections initialSections={sections} />

          <VerificationBadge isVerified={provider?.verified ?? false} />

          {/* Languages Section */}
          <LanguageSection selectedLanguages={provider?.languages ?? []} />
        </CardContent>
      </Card>
    </div>
  );
}
