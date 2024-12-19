import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';

import { Header } from '@/components/layout/Header/Header';
import { AppSidebar } from '@/components/ui/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import QueryProvider from '@/providers/QueryProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
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
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <QueryProvider>
            <SidebarProvider defaultOpen={defaultOpen}>
              <AppSidebar />
              <SidebarInset>
                <Header />
                <QueryProvider>
                  <main className="w-full h-full p-4">{children}</main>
                </QueryProvider>
              </SidebarInset>
            </SidebarProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default RootLayout;
