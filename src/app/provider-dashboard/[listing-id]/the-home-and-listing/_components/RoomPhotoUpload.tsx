"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Room } from "../page";

interface RoomPhotoUploadProps {
  rooms: Room[];
  setRooms: (rooms: Room[]) => void;
}

export function RoomPhotoUpload({ rooms, setRooms }: RoomPhotoUploadProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState<
    Record<string, number>
  >({});

  const createRoom = useCallback(
    (files: FileList) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        setRooms([
          ...rooms,
          {
            id: Math.random().toString(),
            photos: [url],
            roomType: "",
            bathroomType: "",
            availableTo: [],
            isAvailable: true,
          },
        ]);
      };
      reader.readAsDataURL(files[0]);
    },
    [rooms, setRooms],
  );

  const addPhotosToRoom = (roomId: string, files: FileList) => {
    const newPhotos: string[] = [];
    let processed = 0;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const url = e.target?.result as string;
        newPhotos.push(url);
        processed++;

        if (processed === files.length) {
          setRooms(
            rooms.map((room) =>
              room.id === roomId
                ? { ...room, photos: [...room.photos, ...newPhotos] }
                : room,
            ),
          );
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const toggleAvailability = (roomId: string) => {
    setRooms(
      rooms.map((room) =>
        room.id === roomId ? { ...room, isAvailable: !room.isAvailable } : room,
      ),
    );
  };

  const updateRoomType = (roomId: string, roomType: string) => {
    setRooms(
      rooms.map((room) => (room.id === roomId ? { ...room, roomType } : room)),
    );
  };

  const updateBathroomType = (roomId: string, bathroomType: string) => {
    setRooms(
      rooms.map((room) =>
        room.id === roomId ? { ...room, bathroomType } : room,
      ),
    );
  };

  const updateAvailableTo = (roomId: string, value: string) => {
    setRooms(
      rooms.map((room) => {
        if (room.id === roomId) {
          const availableTo = room.availableTo.includes(value)
            ? room.availableTo.filter((v) => v !== value)
            : [...room.availableTo, value];
          return { ...room, availableTo };
        }
        return room;
      }),
    );
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border-2 border-dashed border-gray-700 p-8 text-center">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && createRoom(e.target.files)}
          className="hidden"
          id="room-upload"
        />
        <label
          htmlFor="room-upload"
          className="flex cursor-pointer items-center justify-center gap-2 text-gray-400 transition-colors hover:text-white"
        >
          <Plus className="h-5 w-5" />
          Create new room
        </label>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div key={room.id} className="overflow-hidden rounded-lg bg-gray-900">
            <div className="relative">
              <div className="absolute left-2 top-2 z-10">
                <Badge
                  variant={room.isAvailable ? "primary" : "red"}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                  onClick={() => toggleAvailability(room.id)}
                >
                  {room.isAvailable ? "Available" : "Unavailable"}
                </Badge>
              </div>
              <Button
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 z-10"
                onClick={() => setRooms(rooms.filter((r) => r.id !== room.id))}
              >
                <X className="h-4 w-4" />
              </Button>
              <div className="relative aspect-video">
                <Image
                  src={room.photos[currentPhotoIndex[room.id] || 0]}
                  alt=""
                  fill
                  className="object-cover"
                />
                {room.photos.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-2 top-1/2 -translate-y-1/2"
                      onClick={() =>
                        setCurrentPhotoIndex({
                          ...currentPhotoIndex,
                          [room.id]:
                            (currentPhotoIndex[room.id] || 0) > 0
                              ? (currentPhotoIndex[room.id] || 0) - 1
                              : room.photos.length - 1,
                        })
                      }
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                      onClick={() =>
                        setCurrentPhotoIndex({
                          ...currentPhotoIndex,
                          [room.id]:
                            (currentPhotoIndex[room.id] || 0) <
                            room.photos.length - 1
                              ? (currentPhotoIndex[room.id] || 0) + 1
                              : 0,
                        })
                      }
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
                <div className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-sm">
                  {(currentPhotoIndex[room.id] || 0) + 1}/{room.photos.length}
                </div>
              </div>
            </div>

            <div className="space-y-4 p-4">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) =>
                  e.target.files && addPhotosToRoom(room.id, e.target.files)
                }
                className="hidden"
                id={`add-photos-${room.id}`}
              />
              <label
                htmlFor={`add-photos-${room.id}`}
                className="block cursor-pointer text-sm text-gray-400 transition-colors hover:text-white"
              >
                Add more photos
              </label>

              <div className="space-y-2">
                <p className="text-sm font-medium">Room Type</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={
                      room.roomType === "private-room" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => updateRoomType(room.id, "private-room")}
                    className="w-full"
                  >
                    Private Room
                  </Button>
                  <Button
                    variant={
                      room.roomType === "shared-room" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => updateRoomType(room.id, "shared-room")}
                    className="w-full"
                  >
                    Shared Room
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Bathroom Type</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={
                      room.bathroomType === "private-bathroom"
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      updateBathroomType(room.id, "private-bathroom")
                    }
                    className="w-full"
                  >
                    Private Bathroom
                  </Button>
                  <Button
                    variant={
                      room.bathroomType === "shared-bathroom"
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      updateBathroomType(room.id, "shared-bathroom")
                    }
                    className="w-full"
                  >
                    Shared Bathroom
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Available to</p>
                <div className="flex gap-2">
                  <Button
                    variant={
                      room.availableTo.includes("private-pay")
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => updateAvailableTo(room.id, "private-pay")}
                  >
                    Private pay
                  </Button>
                  <Button
                    variant={
                      room.availableTo.includes("medicaid")
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => updateAvailableTo(room.id, "medicaid")}
                  >
                    Medicaid
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
