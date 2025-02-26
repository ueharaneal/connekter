import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

// Define link objects for each section
const supportLinks = [
  { label: "Contact us", href: "#" },
  { label: "Report a bug", href: "#" },
];

const careProviderLinks = [
  { label: "Create a contracting profile", href: "#" },
  { label: "Find a gig", href: "#" },
];

const links = [{ label: "Join our team", href: "#" }];

const socialLinks = [
  { icon: Facebook, href: "#" },
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Linkedin, href: "#" },
];

export function Footer() {
  return (
    <footer className="w-full bg-zinc-900 py-8 text-sm text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <Column title="Support" links={supportLinks} />
          <Column title="Contracters" links={careProviderLinks} />
          <Column title="Connekter" links={links} />
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-primary-foreground">
              Follow Us
            </h2>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-primary-foreground transition-colors hover:text-pink-500"
                >
                  <link.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <Separator className="my-4 bg-primary" />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-primary-foreground">
            &copy; 2025 Connekter. All rights reserved.
          </p>
          <div className="flex space-x-4 text-xs">
            <Link
              href="#"
              className="text-primary-foreground transition-colors hover:text-pink-500"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-primary-foreground transition-colors hover:text-pink-500"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Reusable Column component
function Column({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-primary-foreground">{title}</h2>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              className="text-primary-foreground transition-colors hover:text-pink-500"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
