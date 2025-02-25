"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function Header() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="fixed top-0 z-10 w-full bg-white/80 px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            HomeProConnect
          </Link>
          <Button>Sign Up</Button>
        </div>
      </header>

      <main className="flex-grow">
        {/* Enhanced Hero Section */}
        <section className="relative flex min-h-screen items-center">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Home renovation"
            layout="fill"
            objectFit="cover"
            className="brightness-50"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
          <div className="container relative mx-auto px-4 py-24 text-white sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <h1 className="text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Find the Perfect Contractor for Your Home Project
              </h1>
              <p className="text-xl sm:text-2xl">
                Connect with skilled professionals, get competitive bids, and
                transform your home with ease.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400" />
                  <span>
                    Post jobs and receive bids from top-rated contractors
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400" />
                  <span>
                    Read verified reviews and browse detailed profiles
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="text-green-400" />
                  <span>
                    Secure the best deals for your home improvement projects
                  </span>
                </li>
              </ul>
              <div className="space-x-4">
                <Button size="lg" className="px-6 py-3 text-lg">
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-6 py-3 text-lg"
                >
                  How It Works
                </Button>
              </div>
              <p className="text-sm opacity-80">
                Join thousands of homeowners who have found their perfect
                contractor through HomeProConnect.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
