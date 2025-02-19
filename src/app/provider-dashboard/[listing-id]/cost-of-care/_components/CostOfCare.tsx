"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  SelectItem
} from "@/components/ui/select";
import { Calculator, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LabeledNumericInput } from "./LabelledNumericInput";
import { LabeledDropdownInput } from "./LabelledDropdownInput";
import { useParams } from "next/navigation";
import { trpc } from "@/server/client";
const CARE_LEVEL_RATES = {
  low: 1,
  medium: 1.5,
  heavy: 2,
};

export default function CostOfCare() {
  const params = useParams();
  const currentListingId = params["listing-id"] as string;

  const [rentCost, setRentCost] = useState("");
  const [servicesCost, setServicesCost] = useState("");
  const [careLevelCosts, setCareLevelCosts] = useState({
    low: "",
    medium: "",
    heavy: "",
  });
  const [selectedRoom, setSelectedRoom] = useState("1");
  const [careLevel, setCareLevel] = useState("low");
  const [total, setTotal] = useState(0);
  const [dailyTotal, setDailyTotal] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const { mutate: saveCostOfCare } = trpc.provider.saveCostOfCare.useMutation();

  useEffect(() => {
    const numericRentCost = rentCost === "" ? 0 : Number(rentCost);
    const numericServicesCost = servicesCost === "" ? 0 : Number(servicesCost);
    const currentCareCost =
      careLevelCosts[careLevel as keyof typeof careLevelCosts] === ""
        ? 0
        : Number(careLevelCosts[careLevel as keyof typeof careLevelCosts]);

    const dailyCost =
      numericRentCost +
      numericServicesCost +
      currentCareCost * CARE_LEVEL_RATES[careLevel as keyof typeof CARE_LEVEL_RATES];

    setDailyTotal(dailyCost);
    setMonthlyTotal(dailyCost * 30);
    setTotal(dailyCost * 30); // Assuming 30 days per month
  }, [rentCost, servicesCost, careLevelCosts, careLevel]);

  const handleCareLevelCostChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCareLevelCosts((prev) => ({
      ...prev,
      [careLevel]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      rentCost: Number(rentCost),
      serviceCost: Number(servicesCost),
      careLevelCosts,
    };

    await saveCostOfCare({
      rentCost: Number(rentCost),
      serviceCost: Number(servicesCost),
      careLevelCosts,
      listingId: currentListingId,
      roomId: selectedRoom,
    });

    // Here you can send this form data to the backend, using either TRPC or server functions
    console.log("Form data to be saved:", formData);

    // Example: call an API function
    // await saveData(formData);
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
          <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-[300px_1fr]">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-14%20at%201.13.18%E2%80%AFAM-aJgxhYazaktmcqpdDSBjR3S1hsqkVv.png"
                  alt="Room preview"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <Circle className="h-3 w-3 fill-pink-500 text-pink-500" />
                  <span className="text-sm text-zinc-400">Private room</span>
                </div>
                <div className="flex items-center gap-2">
                  <Circle className="h-3 w-3 fill-pink-500 text-pink-500" />
                  <span className="text-sm text-zinc-400">
                    Private bathroom
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-sm text-zinc-400">
                  Est move in schedule
                </div>
                <div className="font-semibold">Fri, Mar 1, 1:30PM</div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-4">
                {/* Rent Cost Field */}
                <div className="flex items-center justify-between gap-6">
                  <div className="flex w-full flex-col">
                    <LabeledNumericInput
                      label="Cost for rent"
                      id="rentCost"
                      value={rentCost}
                      placeholder="Enter rent cost"
                      onChange={(e) => setRentCost(e.target.value)}
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <LabeledDropdownInput
                      label="Room type"
                      id="roomType"
                      value={selectedRoom}
                      onValueChange={setSelectedRoom}
                    >
                      <SelectItem value="1">Room: #1</SelectItem>
                      <SelectItem value="2">Room: #2</SelectItem>
                      <SelectItem value="3">Room: #3</SelectItem>
                    </LabeledDropdownInput>
                  </div>
                </div>

                {/* Services Cost Field */}
                <div className="flex justify-between gap-6">
                  <div className="flex w-full flex-col">
                    <LabeledNumericInput
                      label="Cost for services"
                      id="servicesCost"
                      value={servicesCost}
                      placeholder="Enter services cost"
                      onChange={(e) => setServicesCost(e.target.value)}
                    />
                  </div>
                </div>

                {/* Care Level Cost Field */}
                <div className="flex items-center justify-between gap-6">
                  <div className="flex w-full flex-col">
                    <LabeledNumericInput
                      label="Care level rate"
                      id="careLevelCost"
                      value={careLevelCosts[careLevel as keyof typeof careLevelCosts]}
                      placeholder="Enter care level cost"
                      onChange={handleCareLevelCostChange}
                    />
                  </div>
                  <div className="flex w-full flex-col">
                    <LabeledDropdownInput
                      label="Care level"
                      id="careLevel"
                      value={careLevel}
                      onValueChange={setCareLevel}
                    >
                      <SelectItem value="low">Care Level: Low</SelectItem>
                      <SelectItem value="medium">
                        Care Level: Medium
                      </SelectItem>
                      <SelectItem value="heavy">Care Level: Heavy</SelectItem>
                    </LabeledDropdownInput>
                  </div>
                </div>

                {/* Totals Section */}
                <div className="space-y-3 pt-4">
                  <div className="flex justify-between">
                    <span>${dailyTotal}/day x 30 nights</span>
                    <span>${monthlyTotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Carefinder Service fee</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assessment fee</span>
                    <span>$0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      Remaining balance
                      <br />
                      of first months rent
                    </span>
                    <span>${total}</span>
                  </div>
                </div>

                <div className="flex justify-between border-t border-zinc-800 pt-4">
                  <span className="text-xl font-semibold">Total</span>
                  <span className="text-xl font-semibold">${total}</span>
                </div>
              </div>

              {/* Save Data Button */}
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
