import { Inter } from 'next/font/google';
import Head from 'next/head';
import type { Metadata } from 'next';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'True crime'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link
          href="https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css"
          rel="stylesheet"
        />
      </Head>
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}