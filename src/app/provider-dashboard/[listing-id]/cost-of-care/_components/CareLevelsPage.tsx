import Image from "next/image"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function CareLevelsPage() {
  const [careLevel, setCareLevel] = useState("low");
  return (
    <div className="w-full max-w-7xl text-white p-6">
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <div className="space-y-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-14%20at%201.13.18%E2%80%AFAM-aJgxhYazaktmcqpdDSBjR3S1hsqkVv.png"
              alt="Room preview"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-1">
            <div className="text-sm text-zinc-400">Est move in schedule</div>
            <div className="font-semibold">Fri, Mar 1, 1:30PM</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            {["Low", "Medium", "Heavy"].map((level) => (
              <Button
                key={level}
                variant={careLevel === level.toLowerCase() ? "secondary" : "ghost"}
                className={`rounded-full px-6 ${
                  careLevel === level.toLowerCase() ? "bg-pink-500 text-white hover:bg-pink-600" : "text-zinc-400"
                }`}
                onClick={() => setCareLevel(level.toLowerCase())}
              >
                {level}
              </Button>
            ))}
          </div>

          <div className="text-lg text-zinc-300">
            Can perform activities of daily living independently but may need light assistance and
          </div>

          <div className="space-y-6">
            <Section
              title="Included in care:"
              items={[
                "Medication management (specify frequency and type)",
                "Assistance with bathing (specify frequency)",
                "Dressing assistance",
                "Meal preparation (specify if all meals or some)",
                "24-hour on-site staff",
                "Emergency call system",
              ]}
            />

            <Section
              title="Included in service"
              items={[
                "Breakfast, Lunch and Dinner",
                "Tea, coffee, juice and snacks any time",
                "Housekeeping and Flat Linens Laundry",
                "Personal Laundry",
                "Social and recreational activities",
              ]}
            />

            <Section title="Included in Rent:" items={["Private room", "Private bathroom"]} />

            <Section
              title="Not included:"
              items={[
                "Transportation",
                "Special subscriptions -phone, streaming, news etc.",
                "Incontinence supplies",
                "Transportation",
                "Clothing, socks, razors, denture tablets, tissues",
                "Personalized equipment",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

interface SectionProps {
  title: string
  items: string[]
}

function Section({ title, items }: SectionProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-pink-500">{title}</h3>
        <Button variant="ghost" size="sm" className="text-zinc-400">
          <Plus className="h-4 w-4 mr-1" /> Add item
        </Button>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center justify-between text-zinc-300">
            <span>{item}</span>
            <Button variant="ghost" size="sm" className="text-zinc-400">
              <X className="h-4 w-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

