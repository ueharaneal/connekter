import Link from "next/link";
import React from "react";
import { ProfileLinks } from "./ProfileLinks";
import DefaultLinks from "./DefaultLinks";
import Logo from "@/../public/assets/images/common/Logo.png";
import Image from "next/image";

function DesktopNavbar() {
  return (
    <nav className="fixed top-0 z-50 hidden h-14 w-full border-b bg-background lg:block">
      <div className="container mx-auto flex h-full items-center justify-between">
        <div className="flex flex-row gap-x-8">
          <h3 className="text-2xl font-semibold tracking-tight">
            <div className="flex flex-row items-center gap-x-4">
              <Link href="/">
                <Image src={Logo} alt="logo" className="w-7 object-contain" />
              </Link>
              <Link href="/">
                <p>Connekter</p>
              </Link>
            </div>
          </h3>
          <DefaultLinks />
        </div>
        <ProfileLinks />
      </div>
    </nav>
  );
}

export default DesktopNavbar;
