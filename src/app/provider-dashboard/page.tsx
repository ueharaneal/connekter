import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
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
} from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Carefinder</h1>
        <Button variant="outline" className="bg-transparent border-white/20 text-white hover:bg-white/10">
          <Plus className="mr-2 h-4 w-4" />
          Add AFH
        </Button>
      </header>

      {/* Main Card */}
      <Card className="bg-zinc-900/50 border-zinc-800 mb-6 overflow-hidden">
        <div className="relative p-4">
          <div className="flex gap-4 items-start">
            <div className="relative w-[200px] h-[150px] rounded-lg overflow-hidden">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-02-12%20at%2012.30.21%20AM-jr6e3R4YIl6tzItrs5ccOwfwIvq5xj.png"
                alt="Above Woodinville Property"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Above Woodinville</h2>
                  <p className="text-sm text-zinc-400">2 active listings</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent border-orange-500/20 text-orange-500 hover:bg-orange-500/10"
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
          { icon: <FileText className="h-5 w-5" />, title: "AFH", subtitle: "Adult Family Home Details" },
          { icon: <Home className="h-5 w-5" />, title: "The Home", subtitle: "Home Information and Features" },
          { icon: <ListStart className="h-5 w-5" />, title: "The Listing", subtitle: "Listing Details and Management" },
          { icon: <Video className="h-5 w-5" />, title: "Video Introduction", subtitle: "Add or Update Video Content" },
          {
            icon: <MessageSquare className="h-5 w-5" />,
            title: "Testimonials",
            subtitle: "Customer Reviews and Feedback",
          },
          { icon: <HelpCircle className="h-5 w-5" />, title: "FAQ", subtitle: "Frequently Asked Questions" },
          {
            icon: <DollarSign className="h-5 w-5" />,
            title: "Cost of Care",
            subtitle: "Pricing and Payment Information",
          },
          {
            icon: <Users className="h-5 w-5" />,
            title: "Enrollment and Admissions",
            subtitle: "Manage Enrollment Process",
          },
        ].map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800"
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
  )
}


