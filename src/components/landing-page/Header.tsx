"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function Header() {
  return (
    <main className="flex-grow">
      {/* Enhanced Hero Section */}
      <section className="relative flex items-center">
        <Image
          src="https://plus.unsplash.com/premium_photo-1682617326551-4749611516f6?q=80&w=3866&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Home renovation"
          layout="fill"
          objectFit="cover"
          className="brightness-70"
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
                <CheckCircle className="size-4 text-green-600" />
                <span>
                  Post jobs and receive bids from top-rated contractors
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="size-4 text-green-600" />
                <span>Read verified reviews and browse detailed profiles</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle className="size-4 text-green-600" />
                <span>
                  Secure the best deals for your home improvement projects
                </span>
              </li>
            </ul>
            <div className="grid grid-cols-2 gap-x-2">
              <Button size="lg" className="px-6 py-3 text-lg">
                Post a job
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="px-6 py-3 text-lg"
              >
                Become a contracter
              </Button>
            </div>
            <p className="text-sm opacity-80">
              Join thousands of homeowners who have found their perfect
              contractor through Connekter.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
