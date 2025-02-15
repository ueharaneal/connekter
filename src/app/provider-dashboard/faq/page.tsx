import { FAQSection } from "./_components/faq/FAQSection"
import { DocumentSection } from "./_components/document/DocumentSection"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-white p-6">
      <div className="max-w-4xl mx-auto">
        <FAQSection />
        <DocumentSection />
      </div>
    </div>
  )
}
