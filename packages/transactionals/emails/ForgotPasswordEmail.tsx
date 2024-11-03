import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ForgotPasswordEmailProps {
  userFirstName: string;
  resetPasswordUrl: string;
}

export const ForgotPasswordEmail = ({
  userFirstName = "John",
  resetPasswordUrl = "https://example.com/reset-password",
}: ForgotPasswordEmailProps) => {
  const previewText = `Reset your password for Your App`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Password Reset Request</Heading>
          <Text style={text}>Hello {userFirstName},</Text>
          <Text style={text}>
            We received a request to reset your password for Your App. If you
            didn&apos;t make this request, you can safely ignore this email.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={resetPasswordUrl}>
              Reset Your Password
            </Button>
          </Section>
          <Text style={text}>
            This password reset link will expire in 1 hour for security reasons.
          </Text>
          <Text style={text}>
            If you&apos;re having trouble clicking the button, copy and paste
            the URL below into your web browser:
          </Text>
          <Link href={resetPasswordUrl} style={link}>
            {resetPasswordUrl}
          </Link>
          <Hr style={hr} />
          <Text style={footer}>
            If you didn&apos;t request a password reset, please ignore this
            email or contact our support team if you have any concerns.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default ForgotPasswordEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "40px 0",
  padding: "0",
  textAlign: "center" as const,
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "26px",
  textAlign: "left" as const,
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#5469d4",
  borderRadius: "4px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
};

const link = {
  color: "#5469d4",
  fontSize: "14px",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
};
