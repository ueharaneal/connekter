import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DefaultLinks() {
  const links = [
    { href: "/about", label: "About" },
    { href: "/find-a-provider", label: "Find a Provider" },
    { href: "/provider-onboarding", label: "Join as a Provider" },
  ];

  return (
    <div className="flex">
      {links.map((link) => (
        <Button key={link.href} variant="link" asChild>
          <Link href={link.href}>{link.label} </Link>
        </Button>
      ))}
    </div>
  );
}
