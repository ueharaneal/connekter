import { z } from "zod";

export const UpdateUserInfoSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, "Your name must have 2 characters or more."),
});

export type UpdateUserInfoInput = z.infer<typeof UpdateUserInfoSchema>;
