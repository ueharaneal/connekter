import { Button } from "@react-email/components";
import { Html } from "@react-email/components";
import { Section } from "@react-email/components";
import { Text } from "@react-email/components";

interface VerifyEmailProps {
  name: string;
  verificationToken: string;
}

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `http://localhost:3000`
    : `http://localhost:3000`;

export const VerifyEmail = ({ name, verificationToken }: VerifyEmailProps) => {
  return (
    <Html>
      <Section style={styles.container}>
        <Text style={styles.heading}>Welcome, {name}!</Text>
        <Text style={styles.body}>
          Click the button below to verify your email address and activate your
          account.
        </Text>
        <Button
          href={`${baseUrl}/auth/signup/verify-email?token=${verificationToken}`}
          style={styles.button}
        >
          Verify Email
        </Button>
        <Text style={styles.body}>
          If you didn&apos;t request this email, please ignore it.
        </Text>
      </Section>
    </Html>
  );
};

// Styles for inline styling
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    maxWidth: "600px",
    margin: "auto",
    textAlign: "center" as const,
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  body: {
    fontSize: "16px",
    color: "#333",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "5px",
    textDecoration: "none",
  },
};
