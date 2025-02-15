"use client"

import { Draggable } from "@hello-pangea/dnd"
import { GripVertical, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { FAQ } from "./FAQSection"

interface FAQItemProps {
  faq: FAQ
  index: number
  onEdit: (faq: FAQ) => void
  onDelete: (id: string) => void
}

export function FAQItem({ faq, index, onEdit, onDelete }: FAQItemProps) {
  return (
    <Draggable draggableId={faq.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps} className="bg-zinc-900 rounded-lg p-4">
          <div className="flex items-start gap-4">
            <div {...provided.dragHandleProps}>
              <GripVertical className="h-5 w-5 text-zinc-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-2">{faq.question}</h3>
              <p className="text-zinc-400">{faq.answer}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => onEdit(faq)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDelete(faq.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  )
}

