import Link from "next/link";
import React from "react";
import { ProfileLinks } from "./ProfileLinks";
import DefaultLinks from "./DefaultLinks";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 h-14 border-b bg-background">
      <div className="container mx-auto flex h-full items-center justify-between">
        <div className="flex flex-row gap-x-12">
          <h3 className="text-2xl font-semibold tracking-tight">
            <Link href="/">Carefinder </Link>
          </h3>
          <DefaultLinks />
        </div>
        <ProfileLinks />
      </div>
    </nav>
  );
}

export default Navbar;
