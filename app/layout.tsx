import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

import { AppSidebar } from '@/components/ui/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import QueryProvider from '@/providers/QueryProvider';
import type { Metadata } from 'next';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'True crime'
};

async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar:state')?.value === 'true';

  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main>
              <SidebarTrigger />
              {children}
            </main>
          </SidebarProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

export default RootLayout;
