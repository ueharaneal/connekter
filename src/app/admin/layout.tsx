import type React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider className="flex flex-row justify-start">
      <AppSidebar />
      <main className="-ml-32 mt-6 w-full">{children}</main>
    </SidebarProvider>
  );
}
