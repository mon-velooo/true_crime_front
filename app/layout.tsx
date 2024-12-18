import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import QueryProvider from '@/providers/QueryProvider';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'True crime'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <main>{children}</main>
          <Toaster/>
        </QueryProvider>
      </body>
    </html>
  );
}
