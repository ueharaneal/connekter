import { render } from "@react-email/render";
import sgMail from "@sendgrid/mail";
import { ReactElement } from "react";

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmail({
  to,
  subject,
  content,
}: {
  to: string;
  subject: string;
  content: ReactElement;
}) {
  console.log("Preparing to send email via SendGrid");
  const htmlContent = await render(content);
  console.log(process.env.EMAIL_FROM);
  console.log(to);
  const msg = {
    to,
    from: process.env.EMAIL_FROM!, // Verified sender in SendGrid
    subject,
    html: htmlContent,
  };

  try {
    const response = await sgMail.send(msg);
    console.log("Email sent successfully");
    return response;
  } catch (error) {
    console.error("SendGrid email error:", error);
    throw error;
  }
}
