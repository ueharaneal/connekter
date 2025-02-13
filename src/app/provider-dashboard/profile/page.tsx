"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, Download, Pencil } from "lucide-react"
import { EditProfileSheet } from "./_components/editProfile"

interface Section {
  id: string
  title: string
  content: string
  isEditing: boolean
}

export default function ProviderProfile() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: "about",
      title: "About",
      content:
        "Owned and operated by Brenda Marrymoore, Above Woodinville has been operating since 1991. Brenda received her bachelors degree from UW in medical administration and than completed the nursing program.",
      isEditing: false,
    },
    {
      id: "credentials",
      title: "Credentials",
      content:
        "Attended Washinton State Universitnity and recevied a bachelors of health administration, Registered Nurse and went on to recevie my Masters in public relations.",
      isEditing: false,
    },
  ])

  const toggleEdit = (id: string) => {
    setSections(
      sections.map((section) => (section.id === id ? { ...section, isEditing: !section.isEditing } : section)),
    )
  }

  const updateContent = (id: string, newContent: string) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, content: newContent } : section)))
  }

  const saveSection = (id: string) => {
    setSections(sections.map((section) => (section.id === id ? { ...section, isEditing: false } : section)))
  }

  return (
    <Card className="max-w-3xl mx-auto bg-zinc-900 text-white border-zinc-800">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-2xl font-bold">Meet the Care Provider</CardTitle>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-lg">Brenda Marrymoore</span>
            <Badge variant="secondary" className="bg-zinc-800">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Verified Provider
            </Badge>
          </div>
        </div>
        <EditProfileSheet />
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Video Introduction */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Video Introduction</h3>
          <div className="bg-zinc-800 rounded-lg p-6 text-center space-y-4">
            <p className="text-zinc-400 text-sm">
              Upload a short introduction to help families learn more about your services.
            </p>
            <Button variant="outline" className="bg-transparent border-pink-500 text-white hover:bg-pink-500/20">
              <Download className="w-4 h-4 mr-2" />
              Drop your video here
            </Button>
          </div>
        </div>

        {/* Editable Sections */}
        {sections.map((section) => (
          <div key={section.id} className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{section.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => (section.isEditing ? saveSection(section.id) : toggleEdit(section.id))}
                className="text-zinc-400 hover:text-white"
              >
                <Pencil className="w-4 h-4 mr-2" />
                {section.isEditing ? "Save" : "Edit"}
              </Button>
            </div>
            {section.isEditing ? (
              <Textarea
                value={section.content}
                onChange={(e) => updateContent(section.id, e.target.value)}
                className="min-h-[100px] bg-zinc-800 border-zinc-700 text-white"
              />
            ) : (
              <p className="text-zinc-300">{section.content}</p>
            )}
          </div>
        ))}

        {/* Languages Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Languages</h3>
          <div className="flex gap-2">
            <Badge variant="secondary" className="bg-zinc-800">
              English
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

