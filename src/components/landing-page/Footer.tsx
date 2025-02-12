import Link from "next/link";

const socialLinks = ["facebook", "twitter", "linkedin", "instagram"];

export function Footer() {
  return (
    <footer className="w-full bg-primary py-6  text-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Support Column */}
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-foreground">Support</h2>
          </div>

          {/* Care Provider Column */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-foreground">Care Provider</h2>
            <div className="flex flex-col gap-1 text-sm">
              <Link href="#" className="text-foreground  text-sm hover:text-foreground/80">
                List your AFH
              </Link>
              <Link href="#" className="text-foreground hover:text-foreground/80">
                Become a member
              </Link>
            </div>
          </div>

          {/* Carefinder Column */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-foreground">Carefinder</h2>
            <div className="flex flex-col gap-1 text-sm">
              <Link href="#" className="text-foreground hover:text-foreground/80">
                Join our team
              </Link>
              <Link href="#" className="text-foreground hover:text-foreground/80">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
