"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import type { FAQ } from "./FAQSection"

interface AddEditFAQDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (question: string, answer: string) => void
  editingFaq: FAQ | null
}

export function AddEditFAQDialog({ open, onOpenChange, onSave, editingFaq }: AddEditFAQDialogProps) {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  useEffect(() => {
    if (editingFaq) {
      setQuestion(editingFaq.question)
      setAnswer(editingFaq.answer)
    } else {
      setQuestion("")
      setAnswer("")
    }
  }, [editingFaq])

  const handleSave = () => {
    onSave(question, answer)
    setQuestion("")
    setAnswer("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle>{editingFaq ? "Edit Question" : "Add Question"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Enter question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="bg-zinc-800 border-zinc-700"
          />
          <Textarea
            placeholder="Enter answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="bg-zinc-800 border-zinc-700 min-h-[150px]"
          />
          <Button onClick={handleSave} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

