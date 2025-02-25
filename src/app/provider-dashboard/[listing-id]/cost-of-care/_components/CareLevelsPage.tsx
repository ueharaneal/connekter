"use client";

import { useState } from "react";
import Image from "next/image";
import { X, Plus, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { CareLevelT, Listing } from "@/server/db/schema";
import { trpc } from "@/server/client";
import { toast } from "sonner";
export default function CareLevelsPage({
  listingCareLevels,
  listing,
}: {
  listingCareLevels: CareLevelT[];
  listing: Listing;
}) {
  const params = useParams();
  const currentListingId = params["listing-id"] as string;
  const { mutate: saveCareLevels } = trpc.provider.saveCareLevels.useMutation({
    onSuccess: () => {
      toast.success("Care levels saved");
    },
    onError: () => {
      toast.error("Failed to save care levels");
    },
  });

  const [careLevel, setCareLevel] = useState("low");
  const [careData, setCareData] = useState(
    listingCareLevels.reduce(
      (acc, careLevel) => {
        let items: string[] = [];

        // Assign items based on levelName
        switch (careLevel.levelName) {
          case "low":
            items = listing.lowCareLevelItems || [];
            break;
          case "medium":
            items = listing.mediumCareLevelItems || [];
            break;
          case "heavy":
            items = listing.heavyCareLevelItems || [];
            break;
          default:
            items = []; // Fallback in case no matching level
        }

        acc[careLevel.levelName] = [
          {
            title: "Included in care:",
            items,
          },
        ];

        return acc;
      },
      {} as Record<
        string,
        { title: string; description?: string; items: string[] }[]
      >,
    ),
  );

  const [serviceItems, setServiceItems] = useState(listing.serviceItems || []);
  const [notIncludedItems, setNotIncludedItems] = useState(
    listing.itemsNotIncluded || [],
  );
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const handleAddItem = (
    level: string,
    sectionIndex: number,
    newItem: string,
  ) => {
    if (newItem.trim()) {
      const updatedCareData = { ...careData };
      updatedCareData[level][sectionIndex].items.push(newItem);
      setCareData(updatedCareData);
    }
    setEditingSection(null);
  };

  const handleRemoveItem = (
    level: string,
    sectionIndex: number,
    itemIndex: number,
  ) => {
    const updatedCareData = { ...careData };
    updatedCareData[level][sectionIndex].items.splice(itemIndex, 1);
    setCareData(updatedCareData);
  };

  const handleAddServiceItem = (newItem: string) => {
    if (newItem.trim()) {
      setServiceItems([...serviceItems, newItem]);
    }
    setEditingSection(null);
  };

  const handleRemoveServiceItem = (itemIndex: number) => {
    setServiceItems(serviceItems.filter((_, index) => index !== itemIndex));
  };

  const handleAddNotIncludedItem = (newItem: string) => {
    if (newItem.trim()) {
      setNotIncludedItems([...notIncludedItems, newItem]);
    }
    setEditingSection(null);
  };

  const handleRemoveNotIncludedItem = (itemIndex: number) => {
    setNotIncludedItems(
      notIncludedItems.filter((_, index) => index !== itemIndex),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveCareLevels({
      careLevels: careData,
      serviceItems: serviceItems,
      notIncludedItems: notIncludedItems,
      listingId: currentListingId,
    });
  };

  return (
    <div className="w-full max-w-7xl p-6">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Care Levels</h2>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-zinc-800">
              <Image
                src={listing.imageUrls[0] || "/placeholder.svg"}
                alt="Room preview"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-1">
              <div className="text-sm text-zinc-400">Est move in schedule</div>
              <div className="font-semibold">Fri, Mar 1, 1:30PM</div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-2">
              {Object.keys(careData).map((level) => (
                <Button
                  key={level}
                  type="button"
                  variant={careLevel === level ? "secondary" : "ghost"}
                  className={`rounded-full px-6 ${
                    careLevel === level
                      ? "bg-pink-500 text-white hover:bg-pink-600"
                      : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                  }`}
                  onClick={() => setCareLevel(level)}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </Button>
              ))}
            </div>

            {careData[careLevel][0].description && (
              <p className="text-lg text-zinc-300">
                {careData[careLevel][0].description}
              </p>
            )}

            <div className="space-y-8">
              {careData[careLevel].map((section, sectionIndex) => (
                <Section
                  key={section.title}
                  sectionIndex={sectionIndex}
                  title={section.title}
                  items={section.items}
                  level={careLevel}
                  onAddItem={handleAddItem}
                  onRemoveItem={handleRemoveItem}
                  isEditing={editingSection === `care-${sectionIndex}`}
                  onStartEdit={() => setEditingSection(`care-${sectionIndex}`)}
                />
              ))}

              <ServiceSection
                title="Included in service"
                items={serviceItems}
                onAddItem={handleAddServiceItem}
                onRemoveItem={handleRemoveServiceItem}
                isEditing={editingSection === "service"}
                onStartEdit={() => setEditingSection("service")}
              />

              <ServiceSection
                title="Not included in service"
                items={notIncludedItems}
                onAddItem={handleAddNotIncludedItem}
                onRemoveItem={handleRemoveNotIncludedItem}
                isEditing={editingSection === "not-included"}
                onStartEdit={() => setEditingSection("not-included")}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}

function Section({
  title,
  items,
  sectionIndex,
  level,
  onAddItem,
  onRemoveItem,
  isEditing,
  onStartEdit,
}: {
  title: string;
  items: string[];
  sectionIndex: number;
  level: string;
  onAddItem: (level: string, sectionIndex: number, newItem: string) => void;
  onRemoveItem: (
    level: string,
    sectionIndex: number,
    itemIndex: number,
  ) => void;
  isEditing: boolean;
  onStartEdit: () => void;
}) {
  const [newItem, setNewItem] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newItem) {
      onAddItem(level, sectionIndex, newItem);
      setNewItem("");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-pink-500">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          type="button"
          className="text-zinc-400 hover:text-zinc-100"
          onClick={onStartEdit}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>
      <ul className="space-y-2">
        {items.map((item: string, index: number) => (
          <li
            key={index}
            className="group flex items-center justify-between rounded-md px-3 py-2 hover:bg-zinc-800/50"
          >
            <span className="text-zinc-300">{item}</span>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              className="text-zinc-500 opacity-0 hover:text-zinc-300 group-hover:opacity-100"
              onClick={() => onRemoveItem(level, sectionIndex, index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </li>
        ))}
        {isEditing && (
          <li className="px-3 py-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type and press Enter"
              className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              autoFocus
            />
          </li>
        )}
      </ul>
    </div>
  );
}

function ServiceSection({
  title,
  items,
  onAddItem,
  onRemoveItem,
  isEditing,
  onStartEdit,
}: {
  title: string;
  items: string[];
  onAddItem: (newItem: string) => void;
  onRemoveItem: (itemIndex: number) => void;
  isEditing: boolean;
  onStartEdit: () => void;
}) {
  const [newItem, setNewItem] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newItem) {
      onAddItem(newItem);
      setNewItem("");
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-pink-500">{title}</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-zinc-400 hover:text-zinc-100"
          onClick={onStartEdit}
          type="button"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li
            key={index}
            className="group flex items-center justify-between rounded-md px-3 py-2 hover:bg-zinc-800/50"
          >
            <span className="text-zinc-300">{item}</span>
            <Button
              variant="ghost"
              size="sm"
              type="button"
              className="text-zinc-500 opacity-0 hover:text-zinc-300 group-hover:opacity-100"
              onClick={() => onRemoveItem(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </li>
        ))}
        {isEditing && (
          <li className="px-3 py-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type and press Enter"
              className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              autoFocus
            />
          </li>
        )}
      </ul>
    </div>
  );
}
