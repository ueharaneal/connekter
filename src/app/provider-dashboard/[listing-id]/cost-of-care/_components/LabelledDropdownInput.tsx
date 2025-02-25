"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LabeledDropdownInputProps {
  label: string;
  id: string;
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
}

export function LabeledDropdownInput({
  label,
  id,
  value,
  onValueChange,
  placeholder,
  children,
}: LabeledDropdownInputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1">
        {label}
      </label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id} className="w-full border-zinc-700 bg-zinc-800">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    </div>
  );
}
