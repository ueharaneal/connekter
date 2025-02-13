"use client";
import React from "react";
import { clientLinks } from "./links";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/../public/assets/images/common/Logo.png";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

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
      <Button variant="ghost">
        <HamburgerMenuIcon className="size-6" />
      </Button>
    </nav>
  );
}

export default MobileNavbar;
