"use client"
import React from "react"
import {
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { SignupSchema, type SignupInput } from "@/validators/signup-validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function SignupForm() {
	const form = useForm<SignupInput>({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(SignupSchema),
	})

	const onSubmit = async (values: SignupInput) => {
		console.log(values)
	}

	return (
		<Card>
			<CardHeader>Sign Up</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex-col flex gap-y-3'
					>
						<div className='flex flex-row w-full gap-x-4 justify-around'>
							<FormField
								control={form.control}
								name='firstName'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>First Name</FormLabel>
										<FormControl>
											<Input
												type='text'
												placeholder='e.g. John Smith'
												{...field}
												className='w-full'
											/>
										</FormControl>
										<FormDescription></FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='lastName'
								render={({ field }) => (
									<FormItem className='w-full'>
										<FormLabel>Last Name</FormLabel>
										<FormControl>
											<Input
												type='text'
												{...field}
												placeholder='e.g. Smith'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type='text'
											{...field}
											placeholder='e.g. johnSmith@example.com'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type='password'
											{...field}
											placeholder='Password'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='confirmPassword'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Confirm Password</FormLabel>
									<FormControl>
										<Input
											type='password'
											{...field}
											placeholder='Confirm password'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type='submit'
							disabled={form.formState.isSubmitting}
							className='w-full'
						>
							Sign Up
						</Button>
					</form>
				</Form>
			</CardContent>
			<CardFooter></CardFooter>
		</Card>
	)
}

export default SignupForm
