import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

type ResetTokenStateProps = {
  state: "invalid" | "expired";
};

export function InvalidResetTokenState({
  state = "invalid",
}: ResetTokenStateProps) {
  const isInvalid = state === "invalid";

  const title = isInvalid ? "Invalid Reset Token" : "Expired Reset Token";
  const description = isInvalid
    ? "The password reset token is invalid."
    : "The password reset token has expired.";
  const content = isInvalid
    ? "This can happen if the token has already been used or is incorrect. Please go to the sign in page to request a new password reset email or contact support if the problem persists."
    : "This can happen if too much time has passed since the token was issued. Please go to the sign in page to request a new password reset email to continue the process.";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
            <AlertTriangle className="h-6 w-6 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">{content}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/auth/signin">Go to sign in page</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
