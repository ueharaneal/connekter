import {
  LayoutGrid,
  Mail,
  MessageSquare,
  Package,
  Users,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  { icon: LayoutGrid, label: "Dashboard", href: "/" },
  { icon: Mail, label: "Mail", href: "/mail" },
  { icon: MessageSquare, label: "Messages", href: "/messages" },
  { icon: Package, label: "Products", href: "/products" },
  { icon: Users, label: "Users", href: "/users" },
  { icon: Settings, label: "Settings", href: "/settings" },
];

export function AppSidebar() {
  return (
    <Sidebar className="w-16 border-r border-slate-800 bg-[#0A0A0B]">
      <TooltipProvider delayDuration={0}>
        <SidebarHeader className="p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background">
            <Package className="h-5 w-5 text-white" />
          </div>
        </SidebarHeader>
        <SidebarContent className="item-center mx-auto flex flex-col">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton asChild className="h-12 w-12">
                      <a
                        href={item.href}
                        className="flex items-center justify-center"
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="sr-only">{item.label}</span>
                      </a>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="font-medium">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </TooltipProvider>
    </Sidebar>
  );
}
