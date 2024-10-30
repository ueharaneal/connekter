import { render } from "@react-email/render";
import nodemailler, { type TransportOptions } from "nodemailer";
import { ReactElement } from "react";

const transporter = nodemailler.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.NODEMAILER_GOOGLE_SMTP_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    accessToken: process.env.NODEMAILER_GOOGLE_ACCESS_TOKEN,
    refreshToken: process.env.NODEMAILER_GOOGLE_REFRESH_TOKEN,
  },
} as TransportOptions);

export async function sendEmail({
  to,
  subject,
  content,
}: {
  to: string;
  subject: string;
  content: ReactElement;
}) {
  const htmlContent = await render(content);
  console.log("SENT BABY GIRL");
  return await new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html: htmlContent,
      },
      (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      },
    );
  });
}
