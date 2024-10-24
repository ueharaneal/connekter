"use server";
import argon2 from "argon2";
import { SignupSchema } from "@/validators/auth-validators";
import db from "@/db";
import { lower, users } from "@/db/schema";
import { eq } from "drizzle-orm";

type ErrorItem = {
  field: string;
  message: string;
};

type Res =
  | { success: true }
  | { success: false; error: ErrorItem[]; statusCode: 400 }
  | { success: false; error: string; statusCode: 500 | 409 };
export async function signupUserAction(values: unknown): Promise<Res> {
  //values.email = undefined;
  const parsedValues = SignupSchema.safeParse(values);
  if (!parsedValues.success) {
    const flatErrors = parsedValues.error.errors.map((error) => ({
      field: error.path.join("."),
      message: error.message,
    }));
    console.log(flatErrors);
    return { success: false, error: flatErrors, statusCode: 400 };
  }

  const { firstName, lastName, email, password } = parsedValues.data;

  //to do hash password
  //TODO save user to database if does not already exist

  const existingUser = await db.query.users.findFirst({
    where: eq(lower(users.email), email.toLowerCase()),
  });

  if (existingUser) {
    return { success: false, error: "Email already exist", statusCode: 409 };
  }

  try {
    const hashedPassword = await argon2.hash(password);
    console.log(hashedPassword);
    const newUser = await db
      .insert(users)
      .values({
        email,
        password: hashedPassword,
      })
      .returning({ id: users.id })
      .then((res) => res![0]);

    console.log("inserted id", newUser.id);

    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
