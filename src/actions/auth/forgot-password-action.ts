"use server";

import db from "@/server/db";
import { users } from "@/server/db/schema";
import { ForgotPasswordSchema } from "@/validators/forgot-password-validators";
import { eq } from "drizzle-orm";
import { createVerificationTokenActions } from "./create-verification-token";
import { sendEmail } from "@/lib/server-utils/sendEmail";
import ForgotPasswordEmail from "../../../packages/transactionals/emails/ForgotPasswordEmail";

type ErrorItem = {
  field: string;
  message: string;
};

type Res =
  | { success: true }
  | { success: false; error: ErrorItem[]; statusCode: 400 }
  | { success: false; error: ErrorItem; statusCode: 400 | 401 | 500 };

export async function forgotPasswordAction(values: unknown): Promise<Res> {
  const parsedValues = ForgotPasswordSchema.safeParse(values);

  if (!parsedValues.success) {
    const flatErrors = parsedValues.error.errors.map((error) => ({
      field: error.path.join(","),
      message: error.message,
    }));
    console.log(flatErrors);
    return { success: false, error: flatErrors, statusCode: 400 };
  }
  //in case the email doesnt even exist
  const curUser = await db.query.users.findFirst({
    where: eq(users.email, parsedValues.data.email),
  });
  if (!curUser) {
    return {
      success: true,
    };
  } //dont let a user know if an email exist in DB to protect from malious attacks?

  //send password reset to password
  try {
    // IF password does not exist meaning it was created with OATH
    if (!curUser.password) {
      return {
        success: false,
        error: {
          field: "email",
          message: "This user we created wtih OAuth, please sign in with OATH",
        },
        statusCode: 401,
      };
    }
    const verificationToken = await createVerificationTokenActions(
      curUser.email,
    );
    console.log("SENDING EMAIL");

    await sendEmail({
      to: curUser.email,
      subject: "Password Reset",
      content: ForgotPasswordEmail({
        userFirstName: curUser.name ?? "User",
        resetPasswordUrl: `http://localhost:3000/auth/signin/forgot-password?token=${verificationToken}`,
      }),
    });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: { field: "email", message: " Internal Server Error" },
      statusCode: 500,
    };
  }

  return { success: true };
}
