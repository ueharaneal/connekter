"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import type { Document } from "./DocumentSection"

interface AddEditDocumentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (title: string) => void
  onClose: () => void
  editingDocument: Document | null
}

export function AddEditDocumentDialog({
  open,
  onOpenChange,
  onSave,
  editingDocument,
}: AddEditDocumentDialogProps) {
  const [title, setTitle] = useState("")

  useEffect(() => {
    if (editingDocument) {
      setTitle(editingDocument.title)
    } else {
      setTitle("")
    }
  }, [editingDocument])

  const handleSave = () => {
    onSave(title)
    setTitle("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle>{editingDocument ? "Edit Document" : "Add Document"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Enter document title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-zinc-800 border-zinc-700"
          />
          <Button onClick={handleSave} className="w-full bg-orange-500 hover:bg-orange-600 text-white">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

