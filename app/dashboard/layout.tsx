import { cookies } from "next/headers";

import { Header } from "@/components/layout/Header/Header";
import { AppSidebar } from "@/components/ui/AppSidebar";
import { DateRangeProvider } from "@/providers/DateRangeProvider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "True crime - User",
};

async function UserLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DateRangeProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <section className="w-full h-full">{children}</section>
        </SidebarInset>
      </DateRangeProvider>
    </SidebarProvider>
  );
}

export default UserLayout;
