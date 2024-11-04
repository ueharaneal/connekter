import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { NavbarLinks } from "./NavbarLinks";

function Navbar() {
  return (
    <nav className="h-14 border-b">
      <div className="container mx-auto flex h-full items-center justify-between">
        <h3 className="text-2xl font-semibold tracking-tight">
          <Link href="/">Connekter </Link>
        </h3>
        <ul className="flex items-center gap-x-4">
          <NavbarLinks />
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
