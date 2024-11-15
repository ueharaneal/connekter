import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <Construction className="mb-4 h-16 w-16 text-yellow-500" />
      <h1 className="mb-2 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <p className="mb-8 text-muted-foreground">
        It seems you&apos;ve ventured into uncharted territory. Don&apos;t
        worry, even the best contractors sometimes take a wrong turn!
      </p>
      <Button asChild>
        <Link href="/">Return to Home</Link>
      </Button>
    </div>
  );
}
