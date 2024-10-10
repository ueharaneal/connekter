import { z } from "zod"

export const SignupSchema = z
	.object({
		firstName: z
			.string()
			.min(2, "Must be atleast two characters long")
			.transform(val => val.trim()),
		lastName: z
			.string()
			.min(2, "Must be atleast two characters long")
			.transform(val => val.trim()),
		email: z
			.string()
			.email("Must be a valid email")
			.transform(val => val.trim().toLowerCase()),
		password: z.string().min(6, "Must be atleast 6 characters long"),
		confirmPassword: z.string().min(6, "Must be atleast 6 characters long"),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords must match",
		path: ["confirmPassword"],
	})

export type SignupInput = z.infer<typeof SignupSchema>
