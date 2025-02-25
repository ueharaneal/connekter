"use client";

import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  type DroppableProvided,
  type DropResult,
} from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FAQItem } from "./FAQItem";
import { AddEditFAQDialog } from "./AddEditFaqDialog";
import { trpc } from "@/server/client";
import { useParams } from "next/navigation";
export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

// const initialFaqs: FAQ[] = [
//   {
//     id: "1",
//     question: "What services do you provide?",
//     answer:
//       "We provide comprehensive adult family home care services including 24/7 personal care, medication management, meal preparation, housekeeping, and social activities. Our trained staff ensures residents receive personalized attention and care tailored to their individual needs.",
//   },
//   {
//     id: "2",
//     question: "What are your visiting hours?",
//     answer:
//       "Our visiting hours are from 8:00 AM to 8:00 PM daily. We encourage family and friends to visit their loved ones regularly. Special arrangements can be made for visits outside these hours by contacting the home administrator.",
//   },
// ]

export function FAQSection({ initialFaqs }: { initialFaqs: FAQ[] }) {
  const { "listing-id": listingId } = useParams();

  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

  const { mutate: createFaq } = trpc.faq.createFaq.useMutation();
  const { mutate: updateFaq } = trpc.faq.updateFaq.useMutation();
  const { mutate: deleteFaq } = trpc.faq.deleteFaq.useMutation();

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(faqs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setFaqs(items);
  };

  useEffect(() => {
    setFaqs(initialFaqs);
  }, [initialFaqs]);

  const handleSave = (question: string, answer: string) => {
    if (editingFaq) {
      updateFaq({ id: editingFaq.id, question, answer });
      setFaqs(
        faqs.map((faq) =>
          faq.id === editingFaq.id ? { ...faq, question, answer } : faq,
        ),
      );
    } else {
      createFaq({ listingId: parseInt(listingId as string), question, answer });
      setFaqs([
        ...faqs,
        {
          id: Date.now().toString(),
          question,
          answer,
        },
      ]);
    }
    handleClose();
  };

  const handleEdit = (faq: FAQ) => {
    setEditingFaq(faq);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteFaq({ id });
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setEditingFaq(null);
  };

  return (
    <>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
        <Button
          variant="outline"
          onClick={() => setIsDialogOpen(true)}
          className="border-orange-500 bg-transparent text-orange-500 hover:bg-orange-500 hover:text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="faqs" type="faq">
          {(provided: DroppableProvided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="mb-8 space-y-4"
            >
              {faqs.map((faq, index) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  index={index}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
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
  );
}
