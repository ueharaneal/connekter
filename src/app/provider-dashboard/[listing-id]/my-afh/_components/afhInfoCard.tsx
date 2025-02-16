import { Card, CardContent } from "@/components/ui/card"

interface AFHInfoCardProps {
  licenseNumber: string
  afhName: string
  yearLicensed: string
  address: {
    street: string
    cityStateZip: string
  }
}

export default function AFHInfoCard({ licenseNumber, afhName, yearLicensed, address }: AFHInfoCardProps) {
  return (
    <Card className="bg-black text-white max-w-2xl rounded-3xl border-zinc-800 -mt-10">
      <CardContent className="py-12 px-24 space-y-8">
        <h1 className="text-2xl font-bold tracking-wide text-center mb-8">THE AFH</h1>

        <div className="space-y-4">
          <div className="grid grid-cols-[140px,1fr] items-center">
            <span className="text-zinc-400">License number:</span>
            <span>{licenseNumber}</span>
          </div>

          <div className="grid grid-cols-[140px,1fr] items-center">
            <span className="text-zinc-400">AFH name:</span>
            <span className="bg-blue-900/50 text-blue-400 px-3 py-1 rounded inline-block">{afhName}</span>
          </div>

          <div className="grid grid-cols-[140px,1fr] items-center">
            <span className="text-zinc-400">Year licensed:</span>
            <span>{yearLicensed}</span>
          </div>

          <div className="grid grid-cols-[140px,1fr] items-start">
            <span className="text-zinc-400">Home Location</span>
            <div className="space-y-1">
              <p className="text-zinc-300">{address.street}</p>
              <p className="text-zinc-300">{address.cityStateZip}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

