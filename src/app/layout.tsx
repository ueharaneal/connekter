import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar/Navbar";
import "./globals.css";
import { Providers } from "@/components/auth/Providers";
import { Toaster } from "@/components/ui/sonner";
import { TRPCProvider } from "@/components/providers/TrpcProvider";
import { HydrateClient } from "@/server/trpcServer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

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
      <body className={`flex min-h-screen flex-col`}>
        <Providers>
          <TRPCProvider>
            <HydrateClient>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                <Navbar />
                <div className="flex flex-grow flex-col bg-background">
                  {children}
                </div>
                <Toaster
                  position="top-right"
                  toastOptions={{
                    unstyled: false,
                    classNames: {
                      error: "bg-red-200 border-red-500 text-black",
                      success: "bg-green-100 text-black border-green-400",
                      warning: "text-yellow-400",
                      info: "bg-blue-400",
                    },
                  }}
                />
              </ThemeProvider>
            </HydrateClient>
          </TRPCProvider>
        </Providers>
      </body>
    </html>
  );
}
