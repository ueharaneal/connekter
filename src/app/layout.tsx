import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar/Navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        {" "}
        <Navbar />
        <div className="mx-10 flex flex-col">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
