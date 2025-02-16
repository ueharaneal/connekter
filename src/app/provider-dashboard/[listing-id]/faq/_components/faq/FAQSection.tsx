"use client"

import { useState } from "react"
import { DragDropContext, Droppable, type DroppableProvided, type DropResult } from "@hello-pangea/dnd"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FAQItem } from "./FAQItem"
import { AddEditFAQDialog } from "./AddEditFaqDialog"

export interface FAQ {
  id: string
  question: string
  answer: string
}

const initialFaqs: FAQ[] = [
  {
    id: "1",
    question: "What services do you provide?",
    answer:
      "We provide comprehensive adult family home care services including 24/7 personal care, medication management, meal preparation, housekeeping, and social activities. Our trained staff ensures residents receive personalized attention and care tailored to their individual needs.",
  },
  {
    id: "2",
    question: "What are your visiting hours?",
    answer:
      "Our visiting hours are from 8:00 AM to 8:00 PM daily. We encourage family and friends to visit their loved ones regularly. Special arrangements can be made for visits outside these hours by contacting the home administrator.",
  },
]

export function FAQSection() {
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(faqs)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setFaqs(items)
  }

  const handleSave = (question: string, answer: string) => {
    if (editingFaq) {
      setFaqs(faqs.map((faq) => (faq.id === editingFaq.id ? { ...faq, question, answer } : faq)))
    } else {
      setFaqs([
        ...faqs,
        {
          id: Date.now().toString(),
          question,
          answer,
        },
      ])
    }
    handleClose()
  }

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setFaqs(faqs.filter((faq) => faq.id !== id))
  }

  const handleClose = () => {
    setIsDialogOpen(false)
    setEditingFaq(null)
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
        <Button
          variant="outline"
          onClick={() => setIsDialogOpen(true)}
          className="bg-transparent border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="faqs" type="faq">
          {(provided: DroppableProvided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4 mb-8">
              {faqs.map((faq, index) => (
                <FAQItem key={faq.id} faq={faq} index={index} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <AddEditFAQDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
        editingFaq={editingFaq}
      />
    </>
  )
}

