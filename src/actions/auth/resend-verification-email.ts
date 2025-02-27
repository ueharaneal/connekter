// app/actions/auth/resend-verification-email.ts
"use server";

import { createVerificationTokenActions } from "@/actions/auth/create-verification-token";
import { sendEmail } from "@/lib/server-utils/sendEmail";
import { VerifyEmail } from "../../../packages/transactionals/emails/VerifyEmail";

export async function resendVerificationEmail(email: string) {
  try {
    console.log("called ");
    const verificationToken = await createVerificationTokenActions(email);
    console.log(verificationToken);
    await sendEmail({
      to: email,
      subject: "Verify your email",
      content: VerifyEmail({
        name: "User",
        verificationToken: verificationToken,
      }),
    });

    return {
      success: true,
      message: "Verification email sent successfully",
    };
  } catch (error) {
    console.error("Failed to resend verification email:", error);
    return {
      success: false,
      error: "Failed to send verification email. Please try again later.",
    };
  }
}
