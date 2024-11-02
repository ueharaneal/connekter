import React from "react";
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

type TokenStateProps = {
  state: "invalid" | "expired";
};

export default function TokenState({ state = "invalid" }: TokenStateProps) {
  const isInvalid = state === "invalid";

  const title = isInvalid ? "Invalid Token" : "Expired Token";
  const description = isInvalid
    ? "The verification token is invalid."
    : "The verification token has expired.";
  const content = isInvalid
    ? "This can happen if the token has already been used or is incorrect. Please request a new verification email or contact support if the problem persists."
    : "This can happen if too much time has passed since the token was issued. Please request a new verification email to continue the process.";

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
            <Link href="/auth/signup">Request new verification email</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
