"use client";

import { useState } from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { GeneralPhotoUpload } from "./_components/GeneralPhotoUpload";
import { RoomPhotoUpload } from "./_components/RoomPhotoUpload";

export interface Room {
  id: string;
  photos: string[];
  roomType: string;
  bathroomType: string;
  availableTo: string[];
  isAvailable: boolean;
}

export default function PhotoUploadPage() {
  const [generalPhotos, setGeneralPhotos] = useState<
    Array<{ id: string; url: string; tag: string }>
  >([]);
  const [rooms, setRooms] = useState<Array<Room>>([]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setGeneralPhotos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="min-h-screen bg-black p-6 text-white">
      <div className="mx-auto max-w-5xl space-y-8">
        <section>
          <h1 className="mb-2 text-2xl font-bold">Upload General Photos</h1>
          <p className="mb-6 text-gray-400">
            Do not include room photos at this time. They will be added
            separately. Capture images of the exterior, common areas, living
            room, bathroom, patio, deck, and any noteworthy views.
          </p>
          <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={generalPhotos.map((p) => p.id)}
              strategy={rectSortingStrategy}
            >
              <GeneralPhotoUpload
                photos={generalPhotos}
                setPhotos={setGeneralPhotos}
              />
            </SortableContext>
          </DndContext>
        </section>

        <section>
          <h1 className="mb-2 text-2xl font-bold">Upload Room Photos</h1>
          <p className="mb-6 text-gray-400">
            Add multiple photos for each room. Each room can have its own
            collection of photos.
          </p>
          <RoomPhotoUpload rooms={rooms} setRooms={setRooms} />
        </section>
      </div>
    </div>
  );
}
