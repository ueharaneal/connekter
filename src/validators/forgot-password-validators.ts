import { z } from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
