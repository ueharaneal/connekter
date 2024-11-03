"use client";
import React from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { SignInSchema, type SignInInput } from "@/validators/auth-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signinUserAction } from "@/actions/auth/signin-user-action";
import { toast } from "sonner";
import ForgotPasswordForm from "./ForgotPasswordForm";

function SignInForm() {
  const form = useForm<SignInInput>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInSchema),
  });

  const onSubmit = async (values: SignInInput) => {
    const res = await signinUserAction(values);

    if (res.success) {
      //hard window change
      window.location.href = "/profile";
      toast("Login Successful");
      form.reset();
    } else {
      switch (res.statusCode) {
        case 500:
          form.setError("email", { message: "" });
          form.setError("password", { message: "" });
          toast.error("Error", {
            description: "Internal server error",
          });
        case 401:
          form.setError("password", { message: res.error });
          toast.error(res.error);
      }
    }
  };

  return (
    <Card className="felxs w-full flex-col items-center">
      <CardHeader>Sign In</CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-y-3"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="e.g. johnSmith@example.com"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full"
            >
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex w-full justify-center">
        <ForgotPasswordForm />
      </CardFooter>
    </Card>
  );
}

export default SignInForm;
