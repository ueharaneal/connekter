import { render } from "@react-email/render";
import nodemailler, { type TransportOptions } from "nodemailer";
import { ReactElement } from "react";

const transporter = nodemailler.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  // debug: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
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
  return await new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: env.EMAIL_FROM,
        to,
        subject,
        html: render(content),
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
