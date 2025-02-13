import Link from "next/link";
import React from "react";
import { ProfileLinks } from "./ProfileLinks";
import DefaultLinks from "./DefaultLinks";
import Logo from '@/../public/assets/images/common/Logo.png'
import Image from "next/image";

function DesktopNavbar() {
  return (
    <nav className="sticky top-0 z-50 h-14 border-b bg-background">
      <div className="container mx-auto flex h-full items-center justify-between">
        <div className="flex flex-row gap-x-8">
          <h3 className="text-2xl font-semibold tracking-tight">
              <div className="flex flex-row gap-x-4 items-center">
            <Link href="/"> 
             <Image src={Logo} alt="logo" className="object-contain w-7"/>
              </Link>
              <Link href="/"> 
             <p>Carefinder</p> 
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
