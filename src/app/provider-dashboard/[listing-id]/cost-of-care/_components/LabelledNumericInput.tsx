"use client";

import React from "react";
import { Input } from "@/components/ui/input";

interface LabeledNumericInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function LabeledNumericInput({ label, id, className, ...props }: LabeledNumericInputProps) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-1">
        {label}
      </label>
      <Input
        id={id}
        type="number"
        {...props}
        className={`w-full border-zinc-700 bg-zinc-800 text-white ${className || ""}`}
      />
    </div>
  );
}
