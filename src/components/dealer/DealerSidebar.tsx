import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Car,
  BarChart3,
  MessageSquare,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/dealer" },
  { title: "Inventory", icon: Car, url: "/dealer/inventory" },
  { title: "Analytics", icon: BarChart3, url: "/dealer/analytics" },
  { title: "Inbox", icon: MessageSquare, url: "/dealer/inbox", badge: 3 },
  { title: "Staff", icon: Users, url: "/dealer/staff" },
  { title: "Settings", icon: Settings, url: "/dealer/settings" },
];

export function DealerSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-6 border-b border-border">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-xl font-bold">
            Exotics<span className="text-primary">.lk</span>
          </span>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Dealer Portal</p>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "w-full justify-start gap-3 px-4 py-3 rounded-xl transition-all",
                      location.pathname === item.url
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <span className="ml-auto px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span>Exit Portal</span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}
