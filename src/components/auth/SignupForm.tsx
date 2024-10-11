"use client";
import React from "react";
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
import { signupUserAction } from "@/actions/signup-user-action";
import { useToast } from "@/hooks/use-toast";

function SignupForm() {
  const { toast } = useToast();
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
      toast({
        title: "Log in Successful",
      });
      form.reset();
    } else {
      switch (res.statusCode) {
        case 400:
          const nestedErrors = res.error; // `error` is an array of ErrorItem
          nestedErrors.forEach((errorItem) => {
            console.log(`Setting error for field: ${errorItem.field}`);
            form.setError(errorItem.field as keyof SignupInput, {
              message: errorItem.message,
            });
            toast({
              title: errorItem.message,
              variant: "destructive",
            });
          });
          break;
        case 409:
          const errorMessage = res.error;
          toast({
            title: errorMessage,
            variant: "destructive",
          });
          form.setError("email", { message: "Email already exists" });
          break;

        case 500:
          const error = res.error || "Internal Server error";
          toast({
            title: error,
            variant: "destructive",
          });

          //form.setError("confirmPassword", { message: error });
          break;
      }
    }
  };

  return (
    <Card>
      <CardHeader>Sign Up</CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-y-3"
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
