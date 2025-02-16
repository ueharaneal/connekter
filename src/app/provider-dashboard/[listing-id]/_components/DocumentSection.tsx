"use client"

import { useState, useEffect } from "react"
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


export function DocumentSection({ initialDocuments, isDraggable }: { initialDocuments: Document[], isDraggable: boolean }) {
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDocument, setEditingDocument] = useState<Document | null>(null)

  useEffect(() => {
    setDocuments(initialDocuments)
  }, [initialDocuments])

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

  // const handleEdit = (document: Document) => {
  //   setEditingDocument(document)
  //   setIsDialogOpen(true)
  // }

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

      {isDraggable ? (
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="documents" type="document">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {documents.map((doc, index) => (
                <DocumentItem key={doc.id} document={doc} index={index} onDelete={handleDelete} isDraggable={isDraggable} />
              ))}
              {provided.placeholder}
            </div>
          )}
          </Droppable>
        </DragDropContext>
      ) : (
        <div className="space-y-4">
          {documents.map((doc, index) => (
            <DocumentItem key={doc.id} document={doc} index={index} onDelete={handleDelete} isDraggable={false} />
          ))}
        </div>
      )}

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

