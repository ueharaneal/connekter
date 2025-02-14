import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import AFHInfoCard from "./_components/afhInfoCard"

export default function AFHInfoPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <div className="p-4">
        <Link href="/provider-dashboard">
          <Button variant="ghost" className="text-white hover:text-white hover:bg-zinc-800/50">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>
      <div className="flex-grow flex items-center justify-center p-4">
        <AFHInfoCard
          licenseNumber="3948530"
          afhName="Above Woodinville"
          yearLicensed="1998"
          address={{
            street: "14906 ne woodinville duvall road",
            cityStateZip: "98072 Woodinville Wa",
          }}
        />
      </div>
    </div>
  )
}

