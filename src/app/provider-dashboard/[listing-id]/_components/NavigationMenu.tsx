"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  FileText,
  Home,
  ListStart,
  Video,
  MessageSquare,
  HelpCircle,
  DollarSign,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function NavigationMenu() {
  const router = useRouter();
  const params = useParams();

  const currentListingId = params["listing-id"] as string;

  // If currentListingId is not set, render a loading state
  if (!currentListingId) {
    return <div>Loading...</div>;
  }

  const menuItems = [
    {
      icon: <FileText className="h-5 w-5" />,
      title: "My AFH",
      subtitle: "Adult Family Home Details",
      href: `/provider-dashboard/${currentListingId}/my-afh`,
    },
    {
      icon: <Home className="h-5 w-5" />,
      title: "The Provider",
      subtitle: "Provider Information and Features",
      href: `/provider-dashboard/${currentListingId}/profile`,
    },
    {
      icon: <ListStart className="h-5 w-5" />,
      title: "The Home & Listing",
      subtitle: "Listing Details and Management",
      href: `/provider-dashboard/${currentListingId}/the-home-and-listing`,
    },
    {
      icon: <Video className="h-5 w-5" />,
      title: "FAQ",
      subtitle: "Frequently Asked Questions",
      href: `/provider-dashboard/${currentListingId}/faq`,
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Testimonials",
      subtitle: "Customer Reviews and Feedback",
      href: `/provider-dashboard/${currentListingId}/testimonials`,
    },
    {
      icon: <HelpCircle className="h-5 w-5" />,
      title: "Admissions & Enrollment",
      subtitle: "Admissions and Enrollment",
      href: `/provider-dashboard/${currentListingId}/admissions-and-enrollment`,
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      title: "Cost of Care",
      subtitle: "Pricing and Payment Information",
      href: `/provider-dashboard/${currentListingId}/cost-of-care`,
    },
  ];
  return (
    <div className="space-y-2">
      {menuItems.map((item, index) => (
        <Button
          key={index}
          variant="ghost"
          className="h-auto w-full justify-between border border-zinc-800 bg-zinc-900/50 px-4 py-4 hover:bg-zinc-900"
          onClick={() => router.push(item.href)}
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
  );
}
