"use client";

import { Draggable } from "@hello-pangea/dnd";
import { GripVertical, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Document } from "./DocumentSection";

interface DocumentItemProps {
  document: Document;
  index: number;
  onDelete: (id: string) => void;
  isDraggable: boolean;
}

export function DocumentItem({
  document,
  index,
  onDelete,
  isDraggable,
}: DocumentItemProps) {
  return (
    <>
      {isDraggable ? (
        <Draggable draggableId={document.id} index={index}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              className="rounded-lg bg-zinc-900 p-4"
            >
              <div className="flex items-center gap-4">
                <div {...provided.dragHandleProps}>
                  <GripVertical className="h-5 w-5 text-zinc-500" />
                </div>

                <h3 className="flex-1 font-semibold">{document.title}</h3>
                <Button
                  variant="outline"
                  className="border-orange-500 bg-transparent text-orange-500 hover:bg-orange-500 hover:text-white"
                >
                  Upload
                </Button>
                <div className="flex gap-2">
                  {/* <Button variant="ghost" size="icon" onClick={() => onEdit(document)}>
                <Pencil className="h-4 w-4" />
              </Button> */}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(document.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      ) : (
        <div className="rounded-lg bg-zinc-900 p-4">
          <div className="flex items-center gap-4">
            <h3 className="flex-1 font-semibold">{document.title}</h3>
            <Button
              variant="outline"
              className="border-orange-500 bg-transparent text-orange-500 hover:bg-orange-500 hover:text-white"
            >
              Upload
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(document.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
