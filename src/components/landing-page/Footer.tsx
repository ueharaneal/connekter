import Link from "next/link";
import { Separator } from "../ui/separator";
// Define link objects for each section
const supportLinks = [{ label: "Contact us", href: "#" }];

const careProviderLinks = [
  { label: "List your AFH", href: "#" },
  { label: "Become a member", href: "#" },
];

const carefinderLinks = [{ label: "Join our team", href: "#" }];

export function Footer() {
  return (
    <footer className="w-full bg-primary py-3 pb-5 text-sm">
      <div className="mx-auto">
        <div className="flex flex-col justify-between gap-x-6 gap-y-3 md:flex-row lg:justify-around">
          <Column title="Support" links={supportLinks} />
          <Separator className="mx-auto w-11/12 bg-pink-600 md:hidden" />
          <Column title="Care Provider" links={careProviderLinks} />
          <Separator className="mx-auto w-11/12 bg-pink-600 md:hidden" />
          <Column title="Carefinder" links={carefinderLinks} />
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
    <div className="mx-8 flex flex-row items-center justify-between gap-2 text-end tracking-tight md:mx-2 md:flex-col md:justify-start md:text-center">
      <h2 className="mb-4 text-base font-bold text-foreground md:mb-0 md:text-lg">
        {title}
      </h2>
      <div className="flex flex-col gap-1 text-xs">
        {links.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className="text-foreground hover:text-foreground/80"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
