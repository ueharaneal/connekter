"use client"
import { Pencil } from "lucide-react";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";
import { trpc } from "@/server/client";
import { useState, useEffect } from "react";
import { updateProviderAction } from "@/actions/providers/update-provider";

interface Section {
  id: string;
  title: string;
  content: string;
  isEditing: boolean;
}
export default function EditableSections({initialSections}: {initialSections: Section[]}) {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const { mutate: updateProvider, isPending: isUpdating } =
  trpc.provider.updateProvider.useMutation();
  console.log(initialSections);

  useEffect(() => {
    // Sync languages state with selectedLanguages whenever the parent state changes
    setSections(initialSections);
  }, [initialSections]);
  const saveSection = (id: string) => {
    const updatedSection = sections.find((section) => section.id === id);
    if (!updatedSection) return;

    console.log(updatedSection.content);

    updateProvider(
      { [id]: updatedSection.content }, // Send updated field to backend
      {
        onSuccess: () => {
          setSections((prev) =>
            prev.map((section) =>
              section.id === id ? { ...section, isEditing: false } : section,
            ),
          );
        },
      },
    );
  };

  const toggleEdit = (id: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id
          ? { ...section, isEditing: !section.isEditing }
          : section,
      ),
    );
  };

  const updateContent = (id: string, newContent: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, content: newContent } : section,
      ),
    );
  };


  return (
    <>
  {sections.map((section) => (
    <div key={section.id} className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{section.title}</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() =>
            section.isEditing
              ? saveSection(section.id)
              : toggleEdit(section.id)
          }
          className="text-zinc-400 hover:text-white"
          disabled={isUpdating}
        >
          <Pencil className="mr-2 h-4 w-4" />
          {section.isEditing
            ? isUpdating
              ? "Saving..."
              : "Save"
            : "Edit"}
        </Button>
      </div>
      {section.isEditing ? (
        <Textarea
          value={section.content}
          onChange={(e) => updateContent(section.id, e.target.value)}
          className="min-h-[100px] border-zinc-700 bg-zinc-800 text-white"
        />
      ) : (
        <p className="text-zinc-300">{section.content}</p>
      )}
    </div>
    ))}
    </>
  );
}
