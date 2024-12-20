"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Home, Map, LayoutDashboard, Building2, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "../theme/ThemeToggle";
import { AppName } from "./AppName";
import SignOut from "../auth/SignOut";

export const items = {
  data: [
    {
      title: "Dashboard",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Map",
      url: "/map",
      icon: Map,
    },
  ],
  report: [
    {
      title: "Signal incident",
      url: "/signal",
      icon: Shield,
    },
  ],
};

export function AppSidebar() {
  const pathname = usePathname();
  const basePath = pathname?.split("/")[1];

  const isLinkActive = (itemUrl: string) => {
    const currentPath = pathname?.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;

    if (itemUrl === "/" && currentPath === `/${basePath}`) {
      return true;
    }

    const targetPath = `/${basePath}${itemUrl}`;
    return currentPath === targetPath;
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <AppName name="New York City" logo={Building2} plan="Crime data" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Data</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.data.map((item) => {
                const isActive = isLinkActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "w-full",
                        isActive && "bg-accent text-accent-foreground"
                      )}
                    >
                      <Link
                        href={`/${basePath}${item.url}`}
                        className="flex items-center gap-2"
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4",
                            isActive && "text-accent-foreground"
                          )}
                        />
                        <span className={cn(isActive && "font-semibold")}>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Report</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.report.map((item) => {
                const isActive = isLinkActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "w-full",
                        isActive && "bg-accent text-accent-foreground"
                      )}
                    >
                      <Link
                        href={`/${basePath}${item.url}`}
                        className="flex items-center gap-2"
                      >
                        <item.icon
                          className={cn(
                            "h-4 w-4",
                            isActive && "text-accent-foreground"
                          )}
                        />
                        <span className={cn(isActive && "font-semibold")}>
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-row justify-between">
        <SignOut className="w-full group-data-[collapsible=icon]:hidden" />
        <ThemeToggle className="w-3/12 group-data-[collapsible=icon]:w-full" />
      </SidebarFooter>
    </Sidebar>
  );
}
