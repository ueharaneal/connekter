"use client"

import { useState } from "react"
import { DragDropContext, Droppable, type DropResult } from "@hello-pangea/dnd"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DocumentItem } from "./DocumentItem"
import { AddEditDocumentDialog } from "./AddEditDocumentDialog"

export interface Document {
  id: string
  title: string
  hasFile: boolean
}

const initialDocuments: Document[] = [
  { id: "1", title: "Policies", hasFile: false },
  { id: "2", title: "House Rules", hasFile: false },
  { id: "3", title: "AFH Contract", hasFile: false },
  { id: "4", title: "Disclosure of Services", hasFile: false },
]

export function DocumentSection() {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDocument, setEditingDocument] = useState<Document | null>(null)

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(documents)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)
    setDocuments(items)
  }

  const handleSave = (title: string) => {
    if (editingDocument) {
      setDocuments(documents.map((doc) => (doc.id === editingDocument.id ? { ...doc, title } : doc)))
    } else {
      setDocuments([
        ...documents,
        {
          id: Date.now().toString(),
          title,
          hasFile: false,
        },
      ])
    }
    handleClose()
  }

  const handleEdit = (document: Document) => {
    setEditingDocument(document)
    setIsDialogOpen(true)
  }

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  const handleClose = () => {
    setIsDialogOpen(false)
    setEditingDocument(null)
  }

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Documents</h2>
        <Button
          variant="outline"
          onClick={() => setIsDialogOpen(true)}
          className="bg-transparent border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Document
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="documents" type="document">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {documents.map((doc, index) => (
                <DocumentItem key={doc.id} document={doc} index={index} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <AddEditDocumentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSave={handleSave}
        onClose={handleClose}
        editingDocument={editingDocument}
      />
    </>
  )
}

