'use client'
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import { usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboardPage = pathname === "/provider-dashboard";
  return (
    <div className="my-10 flex justify-center">
      <div className="w-3/5 mx-auto">
        <div className="p-4">
          {!isDashboardPage && (
            <Link href="/provider-dashboard">
              <Button variant="ghost" className="text-white hover:text-white hover:bg-zinc-800/50">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            </Link>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
