// app/layout.tsx
import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar/Navbar";
import "./globals.css";
import { Providers } from "@/components/auth/Providers";
import { Toaster } from "@/components/ui/sonner";
import { TRPCProvider } from "@/components/providers/TrpcProvider";
import { HydrateClient } from "@/server/trpcServer";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Footer } from "@/components/landing-page";
import Script from "next/script";
import GoogleMapsClientProvider from "@/lib/providers/GoogleMapsClientProvider";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Connekter",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`relative flex min-h-screen flex-col`}>
        <Providers>
          <TRPCProvider>
            <HydrateClient>
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                disableTransitionOnChange
              >
                <Script
                  src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACES_KEY}&libraries=places&callback=Function.prototype`}
                  strategy="beforeInteractive"
                />{" "}
                <GoogleMapsClientProvider>
                  <NextTopLoader color="#FF47A3" />

                  {/* Use the client wrapper here */}
                  <Navbar />
                  <div className="mt-10 flex flex-grow flex-col bg-background">
                    {children}
                  </div>
                </GoogleMapsClientProvider>
                <Footer />
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
                {/* Closing the client wrapper */}
              </ThemeProvider>
            </HydrateClient>
          </TRPCProvider>
        </Providers>
      </body>
    </html>
  );
}
