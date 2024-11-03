"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export default function ForgotPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      form.reset();
      setSubmitSuccess(false);
      setError(null);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setError(null);
    try {
      // Here you would typically call your API to handle the password reset request
      // For this example, we'll simulate an API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitSuccess(true);
      // Close dialog after successful submission
      setTimeout(() => setIsOpen(false), 3000);
    } catch (err) {
      setError("Failed to send reset link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog onOpenChange={handleOpenChange} open={isOpen}>
      <DialogTrigger asChild>
        <div className="flex flex-row items-center gap-x-1 text-sm">
          Forgot your password? Click
          <Button variant="link" size="sm" className="px-0 text-sm">
            Here
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <div className="flex w-full max-w-md flex-col gap-y-4 border-none">
          <div>
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <p className="text-muted-foreground">
              Enter your email to reset your password
            </p>
          </div>
          <div>
            {submitSuccess ? (
              <Alert>
                <AlertDescription>
                  If an account exists for {form.getValues().email}, you will
                  receive a password reset email shortly.
                </AlertDescription>
              </Alert>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </Button>
                </form>
              </Form>
            )}
          </div>
          <footer className="flex justify-center">
            <Button
              variant="link"
              onClick={() => setIsOpen(false)}
              className="flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Login
            </Button>
          </footer>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
