"use client";
import React from "react";
import { clientLinks } from "./links";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/assets/images/common/Logo.png";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function MobileNavbar() {
  return (
    <nav className="fixed top-0 z-20 flex w-full flex-row items-center justify-between border-t border-border bg-black px-8 py-3 lg:hidden">
      <Link href="/">
        <Image src={Logo} alt="logo" className="size-9 object-contain" />
      </Link>
      {/* {clientLinks.map((link, index) => (
        <Link key={index} href={link.href}>
          {link.label}
        </Link> */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="lg:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="[&>button]:hidden">
          <div className="grid gap-6 p-6">
            {clientLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="font-medium underline-offset-4 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}

export default MobileNavbar;
