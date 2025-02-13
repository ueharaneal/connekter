import { Button } from "@/components/ui/button";
import Link from "next/link";
import { clientLinks } from "./links";


export default function DefaultLinks() {


  return (
    <div className="flex">
      {clientLinks.map((link) => (
        <Button key={link.href} variant="link" asChild>
          <Link href={link.href}>{link.label} </Link>
        </Button>
      ))}
    </div>
  );
}
