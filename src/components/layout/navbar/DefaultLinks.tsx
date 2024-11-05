import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function DefaultLinks() {
  return (
    <div>
      <Link href="/about">
        <Button variant="link">How it works</Button>
      </Link>
      <Link href="/about">
        <Button variant="link">Contracts</Button>
      </Link>
    </div>
  );
}
