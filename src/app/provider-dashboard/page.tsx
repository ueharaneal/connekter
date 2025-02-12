import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ChevronRight,
  Plus,
  FileText,
  Home,
  ListStart,
  Video,
  MessageSquare,
  HelpCircle,
  DollarSign,
  Users,
} from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-black p-4 text-white">
      {/* Header */}
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Carefinder</h1>
        <Button
          variant="outline"
          className="border-white/20 bg-transparent text-white hover:bg-white/10"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add AFH
        </Button>
      </header>

      {/* Main Card */}
      <Card className="mb-6 overflow-hidden border-zinc-800 bg-zinc-900/50">
        <div className="relative p-4">
          <div className="flex items-start gap-4">
            <div className="relative h-[150px] w-[200px] overflow-hidden rounded-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-12%20at%2012.30.21%20AM-jr6e3R4YIl6tzItrs5ccOwfwIvq5xj.png"
                alt="Above Woodinville Property"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="mb-2 text-xl font-semibold">
                    Above Woodinville
                  </h2>
                  <p className="text-sm text-zinc-400">2 active listings</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-500/20 bg-transparent text-orange-500 hover:bg-orange-500/10"
                >
                  View profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation Menu */}
      <div className="space-y-2">
        {[
          {
            icon: <FileText className="h-5 w-5" />,
            title: "My AFH",
            subtitle: "Adult Family Home Details",
          },
          {
            icon: <Home className="h-5 w-5" />,
            title: "The Provider",
            subtitle: "Provider Information and Features",
          },
          {
            icon: <ListStart className="h-5 w-5" />,
            title: "The Home & Listing",
            subtitle: "Listing Details and Management",
          },
          {
            icon: <Video className="h-5 w-5" />,
            title: "FAQ",
            subtitle: "Frequently Asked Questions",
          },
          {
            icon: <MessageSquare className="h-5 w-5" />,
            title: "Testimonials",
            subtitle: "Customer Reviews and Feedback",
          },
          {
            icon: <HelpCircle className="h-5 w-5" />,
            title: "Admissions & Enrollment",
            subtitle: "Admissions and Enrollment",
          },
          {
            icon: <DollarSign className="h-5 w-5" />,
            title: "Cost of Care",
            subtitle: "Pricing and Payment Information",
          },
        ].map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="h-auto w-full justify-between border border-zinc-800 bg-zinc-900/50 px-4 py-4 hover:bg-zinc-900"
          >
            <div className="flex items-center gap-4">
              <div className="text-zinc-400">{item.icon}</div>
              <div className="text-left">
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-zinc-400">{item.subtitle}</div>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-zinc-400" />
          </Button>
        ))}
      </div>
    </div>
  );
}