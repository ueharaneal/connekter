"use client";
import React, { Suspense } from "react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
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
import { SignupSchema, type SignupInput } from "@/validators/auth-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signupUserAction } from "@/actions/auth/signup-user-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  OAuthSignInButton,
  OAuthSignInButtonSkeleton,
} from "@/components/auth/OAuthSignInButtons";

function SignupForm() {
  const router = useRouter();
  const form = useForm<SignupInput>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (values: SignupInput) => {
    const res = await signupUserAction(values);
    console.log(res);

    if (res.success) {
      toast("Log in Successful", {});
      form.reset();
      router.push("/auth/signup/success");
    } else {
      switch (res.statusCode) {
        case 400:
          const nestedErrors = res.error; // `error` is an array of ErrorItem
          nestedErrors.forEach((errorItem) => {
            console.log(`Setting error for field: ${errorItem.field}`);
            form.setError(errorItem.field as keyof SignupInput, {
              message: errorItem.message,
            });
            toast.error(errorItem.message, {});
          });
          break;
        case 409:
          const errorMessage = res.error;
          toast.error(errorMessage);
          form.setError("email", { message: "Email already exists" });
          break;

        case 500:
          const error = res.error || "Internal Server error";
          toast.error(error);

          //form.setError("confirmPassword", { message: error });
          break;
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="mx-auto w-full text-center text-2xl font-semibold">
        Create an Account
      </CardHeader>
      <CardContent className="flex flex-col gap-y-8">
        <Suspense fallback={<OAuthSignInButtonSkeleton signUp={false} />}>
          <OAuthSignInButton signUp={true} />
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
            className="flex flex-col gap-y-4"
          >
            <div className="flex w-full flex-row justify-around gap-x-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="e.g. John Smith"
                        {...field}
                        className="w-full"
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} placeholder="e.g. Smith" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      placeholder="Confirm password"
                    />
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
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}

export default SignupForm;
