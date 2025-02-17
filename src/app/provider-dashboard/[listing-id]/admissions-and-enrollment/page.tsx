import { DocumentSection } from "../_components/DocumentSection"


export default async function Page({ params }: { params: { "listing-id": string } }) {
  const currentListingId = params["listing-id"];
  console.log("currentListingId", currentListingId); // Debug: check in browser console

  // If currentListingId is not set, render a loading state
  if (!currentListingId) {
    return <div>Loading...</div>;
  }
  const documents = [
    {
      id: "1",
      title: "Admissions and Enrollment",
      hasFile: false,
    },
    {
      id: "2",
      title: "Admissions and Enrollment",
      hasFile: false,
    },
    {
      id: "3",
      title: "Admissions and Enrollment",
      hasFile: false,
    },
  ]

  return (
    <div className="min-h-screen bg-background text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Admissions & Enrollment</h2>
            <div className="text-sm text-gray-400">
              Complete all relevant information for resident admissions and enrollment.
            </div>
          </div>
          <DocumentSection initialDocuments={documents} isDraggable={false} />
        </div>
      </div>
    </div>
  )
}
