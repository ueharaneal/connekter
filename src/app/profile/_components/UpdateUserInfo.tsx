"use client";

import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  UpdateUserInfoSchema,
  UpdateUserInfoInput,
} from "@/validators/updateUserInfoValidators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type User } from "next-auth";
import { UpdateIcon } from "@radix-ui/react-icons";
import { PencilIcon } from "lucide-react";

type UpdateUserInfoProps = { user: User };

function UpdateUserInfo({ user }: UpdateUserInfoProps) {
  const { id, name: defaultName } = user;
  const form = useForm<UpdateUserInfoInput>({
    resolver: zodResolver(UpdateUserInfoSchema),
    defaultValues: {
      name: defaultName ?? "",
      id, // we add the id so that we know that the actualy person is updateing themselves
    },
  });
  const { handleSubmit, formState } = form;

  const onSubmit = async (values: UpdateUserInfoInput) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <PencilIcon />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit User Information</DialogTitle>
        </DialogHeader>
        <DialogDescription>Update your user information</DialogDescription>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={formState.isSubmitting}>
              {" "}
              Update Profile
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateUserInfo;
