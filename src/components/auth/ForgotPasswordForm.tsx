"use client";

import {
  ForgotPasswordInput,
  ForgotPasswordSchema,
} from "@/validators/forgot-password-validators";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Separator } from "../ui/separator";

export default function ForgotPasswordForm() {
  const [success, setSuccess] = useState("");

  const form = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordInput) {
    console.log(values);
  }

  return (
    <Dialog>
      Forgot your password? Click{" "}
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="px-0">
          Here
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter your email</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {" "}
          We will send you an email with a password reset link
        </DialogDescription>
        <Separator className="my-1" />
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
          <input
            {...form.register("email")}
            placeholder="Enter Email"
            className={`w-full rounded border p-2 ${
              form.formState.errors.email ? "border-red-500" : ""
            }`}
          />
          {/* Display the error message below the input */}
          {form.formState.errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
          {success && <p className="text-600 text-sm font-medium">{success}</p>}
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full"
          >
            Send password reset
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
