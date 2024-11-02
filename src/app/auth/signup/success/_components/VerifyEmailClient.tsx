"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VerificationEmailClient() {
  const router = useRouter();
  const email = "ueharaneal@gmail.com";

  const handleResendEmail = async () => {
    // Add your resend verification email logic here
    console.log("Resending verification email to:", email);
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-3">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">
            Check your email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <p className="text-muted-foreground">
            We&apos;ve sent a verification link to{" "}
            <span className="font-medium text-foreground">
              {email || "your email"}
            </span>
          </p>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResendEmail}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Resend verification email
            </Button>

            <Button asChild variant="link" className="w-full">
              <Link href="/auth/sign-in" className="flex items-center">
                Back to sign in
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <p className="px-6 text-sm text-muted-foreground">
            Please check your spam folder if you don&apos;t see the email in
            your inbox. The verification link will expire in 24 hours.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
