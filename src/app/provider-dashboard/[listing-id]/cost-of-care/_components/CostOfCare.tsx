"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { SelectItem } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LabeledNumericInput } from "./LabelledNumericInput";
import { LabeledDropdownInput } from "./LabelledDropdownInput";
import { useParams } from "next/navigation";
import { trpc } from "@/server/client";
import { Room } from "@/server/db/schema/tables/rooms";
import { CareLevelT } from "@/server/db/schema";
import { toast } from "sonner";
const CARE_LEVEL_RATES = {
  low: 1,
  medium: 1.5,
  heavy: 2,
};

type Props = {
  listingRooms: Room[];
  listingCareLevels: CareLevelT[];
};

export default function CostOfCare({
  listingRooms,
  listingCareLevels,
}: {
  listingRooms: Room[];
  listingCareLevels: CareLevelT[];
}) {
  const params = useParams();
  const currentListingId = params["listing-id"] as string;
  const [roomCosts, setRoomCosts] = useState<Record<string, string>>(() => {
    return listingRooms.reduce(
      (acc, room) => {
        acc[room.id] = ""; // Initialize empty rent cost for each room
        return acc;
      },
      {} as Record<string, string>,
    );
  });
  const [servicesCost, setServicesCost] = useState("");
  const [careLevel, setCareLevel] = useState<"low" | "medium" | "heavy">("low");
  const [selectedRoom, setSelectedRoom] = useState(listingRooms[0]?.id);
  const [total, setTotal] = useState(0);
  const [dailyTotal, setDailyTotal] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);

  // Map care levels to their respective ID and price
  const [careLevelCosts, setCareLevelCosts] = useState<
    Record<string, { id?: number; price: number; levelName: string }>
  >(() => {
    if (!listingCareLevels || listingCareLevels.length === 0) {
      // Initialize with empty values if no care levels
      return {
        low: { price: 0, levelName: "low" },
        medium: { price: 0, levelName: "medium" },
        heavy: { price: 0, levelName: "heavy" },
      };
    }

    // Filter out undefined or duplicate levels
    return listingCareLevels.reduce(
      (acc, level) => {
        if (level && level.levelName) {
          // Ensure valid data
          acc[level.levelName] = {
            id: level.id,
            price: level.price,
            levelName: level.levelName,
          };
        }
        return acc;
      },
      {} as Record<string, { id?: number; price: number; levelName: string }>,
    );
  });
  const { mutate: saveCostOfCare } = trpc.provider.saveCostOfCare.useMutation();

  useEffect(() => {
    const numericRentCost =
      roomCosts[selectedRoom] === "" ? 0 : Number(roomCosts[selectedRoom]);
    const numericServicesCost = servicesCost === "" ? 0 : Number(servicesCost);
    const currentCareCost = careLevelCosts[careLevel]?.price || 0;

    const dailyCost =
      numericRentCost +
      numericServicesCost +
      currentCareCost * CARE_LEVEL_RATES[careLevel];

    setDailyTotal(dailyCost);
    setMonthlyTotal(dailyCost * 30);
    setTotal(dailyCost * 30);
  }, [roomCosts, servicesCost, careLevelCosts, careLevel]);

  const handleCareLevelChange = (newLevel: "low" | "medium" | "heavy") => {
    setCareLevel(newLevel);
  };

  const handleCareLevelCostChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = Number(e.target.value) || 0;
    setCareLevelCosts((prev) => ({
      ...prev,
      [careLevel]: {
        id: prev[careLevel]?.id || undefined,
        price: value,
        levelName: careLevel,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const careLevelData = Object.values(careLevelCosts).map(
      ({ id, price, levelName }) => ({
        careLevelId: id,
        price,
        levelName,
      }),
    );

    try {
      console.log("Form data to be saved:", {
        rentCosts: Object.entries(roomCosts).map(([roomId, roomPrice]) => ({
          roomId,
          roomPrice: Number(roomPrice),
        })),
        serviceCost: Number(servicesCost),
        careLevelData,
      });

      await saveCostOfCare({
        rentCosts: Object.entries(roomCosts).map(([roomId, roomPrice]) => ({
          roomId,
          roomPrice: Number(roomPrice),
        })),
        serviceCost: Number(servicesCost),
        careLevelData,
        listingId: currentListingId,
        roomId: selectedRoom,
      });

      toast.success("Cost of care saved successfully!");

      console.log("Cost of care saved successfully!");
    } catch (error) {
      console.error("Error saving cost of care:", error);
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-7xl text-white">
        <div className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              <h2 className="text-xl font-semibold">Estimate</h2>
            </div>
            <Button variant="outline">Add logo</Button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 md:grid-cols-[300px_1fr]"
          >
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-14%20at%201.13.18%E2%80%AFAM-aJgxhYazaktmcqpdDSBjR3S1hsqkVv.png"
                  alt="Room preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <LabeledNumericInput
                  label="Cost for rent"
                  id="rentCost"
                  value={roomCosts[selectedRoom]}
                  placeholder="Enter rent cost"
                  onChange={(e) =>
                    setRoomCosts((prev) => ({
                      ...prev,
                      [selectedRoom]: e.target.value,
                    }))
                  }
                />

                <LabeledDropdownInput
                  label="Room type"
                  id="roomType"
                  value={selectedRoom}
                  onValueChange={setSelectedRoom}
                >
                  {listingRooms?.map((room: Room) => (
                    <SelectItem key={room.id} value={room.id}>
                      Room: {room.name}
                    </SelectItem>
                  ))}
                </LabeledDropdownInput>

                <LabeledNumericInput
                  label="Cost for services"
                  id="servicesCost"
                  value={servicesCost}
                  placeholder="Enter services cost"
                  onChange={(e) => setServicesCost(e.target.value)}
                />

                <LabeledNumericInput
                  label="Care level rate"
                  id="careLevelCost"
                  value={careLevelCosts[careLevel]?.price || ""}
                  placeholder="Enter care level cost"
                  onChange={handleCareLevelCostChange}
                />

                <LabeledDropdownInput
                  label="Care level"
                  id="careLevel"
                  value={careLevel}
                  onValueChange={(value) => handleCareLevelChange(value as "low" | "medium" | "heavy")}
                >
                  <SelectItem value="low">Care Level: Low</SelectItem>
                  <SelectItem value="medium">Care Level: Medium</SelectItem>
                  <SelectItem value="heavy">Care Level: Heavy</SelectItem>
                </LabeledDropdownInput>

                <div className="space-y-3 pt-4">
                  <div className="flex justify-between">
                    <span>${dailyTotal}/day x 30 nights</span>
                    <span>${monthlyTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining balance</span>
                    <span>${total}</span>
                  </div>
                </div>

                <div className="flex justify-between border-t border-zinc-800 pt-4">
                  <span className="text-xl font-semibold">Total</span>
                  <span className="text-xl font-semibold">${total}</span>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" variant="outline">
                  Save Data
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
