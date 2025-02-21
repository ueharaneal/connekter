"use client"

import type React from "react"

import { useCallback } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { X } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Photo {
  id: string
  url: string
  tag: string
}

interface SortablePhotoProps {
  photo: Photo
  onRemove: (id: string) => void
  onTagChange: (id: string, tag: string) => void
}

// const SortablePhoto = ({ photo, onRemove, onTagChange }: SortablePhotoProps) => {
//   const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
//     id: photo.id,
//   });

//   const handleRemove = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     onRemove(photo.id);
//   };

//   const style = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//   }

//   return (
//     <div className="relative rounded-lg overflow-hidden bg-gray-900">
//       {/* Draggable content */}
//       <div
//         ref={setNodeRef}
//         style={style}
//         {...attributes}
//         {...listeners}
//         className="relative"
//       >
//         <Image
//           src={photo.url || "/placeholder.svg"}
//           alt=""
//           width={400}
//           height={300}
//           className="w-full aspect-[4/3] object-cover"
//         />
//       </div>

//       {/* Non-draggable content */}
//       <div className="absolute top-2 right-2">
//         <Button
//           type="button"
//           variant="destructive"
//           size="icon"
//           onClick={handleRemove}
//         >
//           <X className="h-4 w-4" />
//         </Button>
//       </div>

//       <div className="p-2">
//         <Select
//           value={photo.tag}
//           onValueChange={(value) => onTagChange(photo.id, value)}
//         >
//           <SelectTrigger>
//             <SelectValue placeholder="Select a tag" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="exterior">Exterior</SelectItem>
//             <SelectItem value="common-area">Common Area</SelectItem>
//             <SelectItem value="living-room">Living Room</SelectItem>
//             <SelectItem value="bathroom">Bathroom</SelectItem>
//             <SelectItem value="patio">Patio</SelectItem>
//             <SelectItem value="deck">Deck</SelectItem>
//             <SelectItem value="view">View</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>
//     </div>
//   )
// }

interface GeneralPhotoUploadProps {
  photos: Photo[]
  setPhotos: (photos: Photo[]) => void
}

export function GeneralPhotoUpload({ photos, setPhotos }: GeneralPhotoUploadProps) {
  const handleFileUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files) {
        Array.from(files).forEach((file) => {
          const reader = new FileReader()
          reader.onload = (e) => {
            const url = e.target?.result as string
            setPhotos([...photos, { id: Math.random().toString(), url, tag: "" }])
          }
          reader.readAsDataURL(file)
        })
      }
    },
    [photos, setPhotos],
  )

  const removePhoto = (id: string) => {
    console.log("Removing photo with id:", id)
    setPhotos(photos.filter((photo) => photo.id !== id))
  }

  const updatePhotoTag = (id: string, tag: string) => {
    setPhotos(photos.map((photo) => (photo.id === id ? { ...photo, tag } : photo)))
  }

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
        <input type="file" multiple accept="image/*" onChange={handleFileUpload} className="hidden" id="photo-upload" />
        <label htmlFor="photo-upload" className="cursor-pointer text-gray-400 hover:text-white transition-colors">
          Drag and drop photos here or click to upload
        </label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo) => (
          <SortablePhoto key={photo.id} photo={photo} onRemove={removePhoto} onTagChange={updatePhotoTag} />
        ))}
      </div>
    </div>
  )
}






//Original version with better visuals but non-working delete
const SortablePhoto = ({ photo, onRemove, onTagChange }: SortablePhotoProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: photo.id,
  });

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemove(photo.id);
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative rounded-lg overflow-hidden bg-gray-900"
    >
      <Image
        src={photo.url || "/placeholder.svg"}
        alt=""
        width={400}
        height={300}
        className="w-full aspect-[4/3] object-cover"
      />
      <Button
        type="button"
        variant="destructive"
        size="icon"
        className="absolute top-2 right-2 z-10"
        onClick={handleRemove}
      >
        <X className="h-4 w-4" />
      </Button>
      <div className="p-2">
        <Select
          value={photo.tag}
          onValueChange={(value) => onTagChange(photo.id, value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="exterior">Exterior</SelectItem>
            <SelectItem value="common-area">Common Area</SelectItem>
            <SelectItem value="living-room">Living Room</SelectItem>
            <SelectItem value="bathroom">Bathroom</SelectItem>
            <SelectItem value="patio">Patio</SelectItem>
            <SelectItem value="deck">Deck</SelectItem>
            <SelectItem value="view">View</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
