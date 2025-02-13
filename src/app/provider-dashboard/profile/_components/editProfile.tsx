"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { trpc } from "@/server/trpcServer";
import { zodResolver } from "@hookform/resolvers/zod";

const { data, isLoading } = trpc.provider.getProvider.useQuery();
const { mutate: updateProvider } = trpc.provider.updateProvider.useMutation();

const formSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
});

export function EditProfileSheet() {
  const { register, handleSubmit } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name,
      email: data?.email,
      phone: data?.phoneNumber,
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    updateProvider(data);
  };
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800"
        >
          Profile
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[400px] border-zinc-800 bg-zinc-900 text-white"
      >
        <SheetHeader>
          <SheetTitle className="text-white">Edit Profile</SheetTitle>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-8 space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-800">
                <Upload className="h-8 w-8 text-zinc-400" />
              </div>
              <span className="text-sm text-zinc-400">
                Upload Provider Headshot
              </span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Provider Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="border-zinc-700 bg-zinc-800 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="border-zinc-700 bg-zinc-800 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Cell Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  className="border-zinc-700 bg-zinc-800 text-white"
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-zinc-400">
            Changes are saved automatically
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
