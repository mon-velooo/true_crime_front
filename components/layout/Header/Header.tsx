"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { items } from "@/components/ui/AppSidebar";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { useDateRange } from "@/providers/DateRangeProvider";
import { cn } from "@/lib/utils";

export function Header() {
  const { dateRange, setDateRange } = useDateRange();
  const pathname = usePathname();
  const basePath = pathname?.split("/")[1];
  const { state } = useSidebar();

  const currentItem = items.find((item) => {
    if (item.url === "/") {
      return pathname === `/${basePath}`;
    }
    return pathname === `/${basePath}${item.url}`;
  }) || {
    title: "Not Found",
    url: pathname,
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background",
        "ml-[var(--sidebar-width)]",
        "transition-[margin] duration-200 ease-linear",
        state === "collapsed" && "ml-[var(--sidebar-width-icon)]"
      )}
      style={{
        width: `calc(100% - ${state === "collapsed" ? "var(--sidebar-width-icon)" : "var(--sidebar-width)"})`,
      }}
    >
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>{currentItem.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto">
        <DateRangePicker
          onDateChange={(range) => setDateRange(range)}
          value={dateRange}
        />
      </div>
    </header>
  );
}
