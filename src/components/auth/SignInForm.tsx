"use client";
import React, { Suspense } from "react";
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
import {
  OAuthSignInButtonSkeleton,
  OAuthSignInButton,
} from "@/components/auth/OAuthSignInButtons";

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
    <Card className="flex w-full flex-col items-center py-8">
      <CardHeader className="mb-4 text-center text-3xl font-semibold">
        Log in to Connekter
      </CardHeader>
      <CardContent className="relative mx-auto flex w-5/6 flex-col gap-y-8">
        <Suspense fallback={<OAuthSignInButtonSkeleton signUp={false} />}>
          <OAuthSignInButton signUp={false} />
        </Suspense>
        <div className="max-w-11/12 relative mx-1 flex flex-row items-center gap-x-4">
          <div className="w-full border-b border-border" />
          <p className="whitespace-nowrap text-nowrap text-xs font-semibold text-muted-foreground">
            OR CONTINUE WITH EMAIL
          </p>
          <div className="w-full border-b border-border" />
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-y-4"
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
              className="mt-2 w-full"
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
