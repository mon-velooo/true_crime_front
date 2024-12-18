'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { Home, Map } from 'lucide-react';
import { cn } from '@/lib/utils';

export const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home
  },
  {
    title: 'Interactive map',
    url: '/map',
    icon: Map
  }
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>True crime</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className={cn('w-full', isActive && 'bg-accent text-accent-foreground')}>
                      <Link href={item.url} className="flex items-center gap-2">
                        <item.icon className={cn('h-4 w-4', isActive && 'text-accent-foreground')} />
                        <span className={cn(isActive && 'font-semibold')}>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
