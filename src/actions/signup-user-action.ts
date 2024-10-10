"use server";
import argon2 from "argon2";
import { SignupSchema } from "@/validators/auth-validators";
type ErrorItem = {
  field: string;
  message: string;
};

type Res =
  | { success: true }
  | { success: false; error: ErrorItem[]; statusCode: 400 }
  | { success: false; error: string; statusCode: 500 };
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
  //TODO save user to database
  try {
    const hashedPassword = await argon2.hash(password);
    console.log(hashedPassword);
    return { success: true };
  } catch (err) {
    console.error(err);
    return { success: false, error: "Internal Server Error", statusCode: 500 };
  }
}
