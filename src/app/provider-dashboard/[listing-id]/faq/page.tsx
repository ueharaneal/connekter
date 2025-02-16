import { FAQSection } from "./_components/faq/FAQSection"
import { DocumentSection } from "../_components/DocumentSection"
import { eq } from "drizzle-orm";
import db from "@/server/db";
import { listingFaqs } from "@/server/db/schema";

export default async function Page({ params }: { params: { "listing-id": string } }) {
  const currentListingId = params["listing-id"];

  const initialDocuments: { id: string; title: string; hasFile: boolean }[] = [
    { id: "1", title: "Policies", hasFile: false },
    { id: "2", title: "House Rules", hasFile: false },
    { id: "3", title: "AFH Contract", hasFile: false },
    { id: "4", title: "Disclosure of Services", hasFile: false },
  ]
  // If currentListingId is not set, render a loading state
  if (!currentListingId) {
    return <div>Loading...</div>;
  }
  const faqs = await db.query.listingFaqs.findMany({
    where: eq(listingFaqs.listingId, currentListingId),
  });
  return (
    <div className="min-h-screen bg-background text-white p-6">
      <div className="max-w-4xl mx-auto">
        <FAQSection initialFaqs={faqs} />
        <DocumentSection initialDocuments={initialDocuments} isDraggable={true} />
      </div>
    </div>
  )
}
