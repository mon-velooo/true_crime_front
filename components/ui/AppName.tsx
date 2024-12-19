'use client';
import * as React from 'react';

export function AppName({ name, logo: Logo, plan }: { name: string; logo: React.ElementType; plan: string }) {
  return (
    <div className="flex items-center p-2 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:h-[49.5px] group-data-[collapsible=icon]:bg-transparent">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <Logo className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight ml-2">
        <span className="truncate font-semibold">{name}</span>
        <span className="truncate text-xs">{plan}</span>
      </div>
    </div>
  );
}
