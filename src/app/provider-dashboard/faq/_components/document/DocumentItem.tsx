"use client"

import { Draggable } from "@hello-pangea/dnd"
import { GripVertical, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Document } from "./DocumentSection"

interface DocumentItemProps {
  document: Document
  index: number
  onDelete: (id: string) => void
}

export function DocumentItem({ document, index, onDelete }: DocumentItemProps) {
  return (
    <Draggable draggableId={document.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} className="bg-zinc-900 rounded-lg p-4">
          <div className="flex items-center gap-4">
            <div {...provided.dragHandleProps}>
              <GripVertical className="h-5 w-5 text-zinc-500" />
            </div>
            <h3 className="font-semibold flex-1">{document.title}</h3>
            <Button
              variant="outline"
              className="bg-transparent border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              Upload
            </Button>
            <div className="flex gap-2">
              {/* <Button variant="ghost" size="icon" onClick={() => onEdit(document)}>
                <Pencil className="h-4 w-4" />
              </Button> */}
              <Button variant="ghost" size="icon" onClick={() => onDelete(document.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

