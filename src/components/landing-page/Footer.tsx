import Link from "next/link";

const socialLinks = ["facebook", "twitter", "linkedin", "instagram"];

export function Footer() {
  return (
    <footer className="w-full bg-primary py-3  text-sm">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          {/* Support Column */}
          <div className="flex flex-col gap-2 text-center items-center">
            <h2 className="text-xl font-semibold text-foreground">Support</h2>
            <div className="flex flex-col gap-1 text-xs">
              <Link href="#" className="text-foreground hover:text-foreground/80">
                Contact us
              </Link>
            </div>
            </div>

          {/* Care Provider Column */}
          <div className="flex flex-col gap-2 items-center text-center">
            <h2 className="text-xl font-semibold text-foreground">Care Provider</h2>
            <div className="flex flex-col gap-1 text-xs">
              <Link href="#" className="text-foreground   hover:text-foreground/80">
                List your AFH
              </Link>
              <Link href="#" className="text-foreground hover:text-foreground/80">
                Become a member
              </Link>
            </div>
          </div>

          {/* Carefinder Column */}
          <div className="flex flex-col gap-2 text-center items-center">
            <h2 className="text-xl font-semibold text-foreground">Carefinder</h2>
            <div className="flex flex-col gap-1 text-xs">
              <Link href="#" className="text-foreground hover:text-foreground/80">
                Join our team
              </Link>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
