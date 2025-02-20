"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useParams } from "next/navigation"
import { CareLevelT, Listing } from "@/server/db/schema"
export default function CareLevelsPage({listingCareLevels, listing}: {listingCareLevels: CareLevelT[], listing: Listing}) {
  const [careLevel, setCareLevel] = useState("low")
  const params = useParams();
  const currentListingId = params["listing-id"] as string;

  // State for each care level with their respective sections and items
  const [careData, setCareData] = useState({
    low: [
      {
        title: "Included in care:",
        items: [
          "Medication management (specify frequency and type)",
          "Assistance with bathing (specify frequency)",
          "Dressing assistance",
          "Meal preparation (specify if all meals or some)",
          "24-hour on-site staff",
          "Emergency call system",
        ],
      },
      {
        title: "Included in service",
        items: [
          "Breakfast, Lunch and Dinner",
          "Tea, coffee, juice and snacks any time",
          "Housekeeping and Flat Linens Laundry",
          "Personal Laundry",
          "Social and recreational activities",
        ],
      },
    ],
    medium: [
      {
        title: "Included in care:",
        items: ["Medication management", "Bathing assistance", "Personal hygiene"],
      },
    ],
    heavy: [
      {
        title: "Included in care:",
        items: ["24/7 nurse assistance", "Constant supervision", "IV management"],
      },
    ],
  })

  // Handle adding a new item to a care level
  const handleAddItem = (level: string, sectionIndex: number, newItem: string) => {
    if (newItem.trim()) {
      const updatedCareData = { ...careData }
      updatedCareData[level][sectionIndex].items.push(newItem)
      setCareData(updatedCareData)
    }
  }

  // Handle removing an item from a care level
  const handleRemoveItem = (level: string, sectionIndex: number, itemIndex: number) => {
    const updatedCareData = { ...careData }
    updatedCareData[level][sectionIndex].items.splice(itemIndex, 1)
    setCareData(updatedCareData)
  }

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
            {careData[careLevel].map((section, sectionIndex) => (
              <Section
                key={section.title}
                sectionIndex={sectionIndex}
                title={section.title}
                items={section.items}
                level={careLevel}
                onAddItem={handleAddItem}
                onRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

interface SectionProps {
  title: string
  items: string[]
  sectionIndex: number
  level: string
  onAddItem: (level: string, sectionIndex: number, newItem: string) => void
  onRemoveItem: (level: string, sectionIndex: number, itemIndex: number) => void
}

function Section({ title, items, sectionIndex, level, onAddItem, onRemoveItem }: SectionProps) {
  const [newItem, setNewItem] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAddItem(level, sectionIndex, newItem)
    setNewItem("") // Clear the input field after adding
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-pink-500">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.length === 0 ? (
          <li className="text-zinc-400">No items available</li>
        ) : (
          items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-center justify-between text-zinc-300">
              <span>{item}</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-400"
                onClick={() => onRemoveItem(level, sectionIndex, itemIndex)}
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))
        )}
      </ul>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="New item"
          className="px-4 py-2 bg-zinc-800 rounded-lg"
        />
        <Button variant="ghost" size="sm" className="text-zinc-400" type="submit">
          <Plus className="h-4 w-4 mr-1" /> Add item
        </Button>
      </form>
    </div>
  )
}
