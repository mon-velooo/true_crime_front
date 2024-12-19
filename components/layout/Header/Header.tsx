"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { items } from "@/components/ui/AppSidebar";
import { DateRangePicker } from "@/components/ui/DateRangePicker";
import { useDateRange } from "@/providers/DateRangeProvider";

export function Header() {
  const { dateRange, setDateRange } = useDateRange();
  const pathname = usePathname();

  const currentItem = items.find((item) => item.url === pathname) || {
    title: "Interactive map",
    url: pathname,
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
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
