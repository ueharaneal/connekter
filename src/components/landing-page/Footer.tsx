import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const socialLinks = ["facebook", "twitter", "linkedin", "instagram"];

export function Footer() {
  return (
    <footer className="bg-background py-8 text-foreground">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-2xl font-bold">Ready to get started?</h2>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="bg-primary px-8 py-4 font-bold text-primary-foreground hover:bg-primary/90"
            >
              Post a Job Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary px-8 py-4 font-bold text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Find Work as a Contractor
            </Button>
          </div>
        </div>
        <div className="mb-4 flex justify-center space-x-4">
          {socialLinks.map((social) => (
            <Link
              key={social}
              href={`https://${social}.com/connekter`}
              className="text-primary hover:text-primary/80"
            >
              <span className="sr-only">{social}</span>
              <Image
                src={`/${social}-icon.svg`}
                alt={`${social} icon`}
                width={24}
                height={24}
              />
            </Link>
          ))}
        </div>
        <div className="text-center">
          <p>Contact us: support@connekter.com | Add number here</p>
        </div>
      </div>
    </footer>
  );
}
