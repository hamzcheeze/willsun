import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import localFont from "next/font/local";
import './globals.css';
// import Footer from '@/components/Footer';
// import { Analytics } from '@vercel/analytics/react';
// import PlausibleProvider from 'next-plausible';

const inter = Inter({ subsets: ['latin'] });

const title = 'WillSUN';
const description = 'Generate probate document';
const url = 'https://willsun.vercel.app';
const ogimage = '';
const sitename = '';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title,
  description,
  icons: {
    icon: '/doc-document-file-3-svgrepo-com.svg',
  },
  openGraph: {
    images: [ogimage],
    title,
    description,
    url: url,
    siteName: sitename,
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [ogimage],
    title,
    description,
  },
};

const myFont = localFont({
  src: "/fonts/Sarabun-Medium.ttf",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={inter.className}>
      {/* <body className={`${myFont.className} antialiased`}> */}
        <div className="relative flex flex-col h-screen">
          <Suspense>
            <Navbar />
            <main className="container mx-auto max-w-12xl pt-16 px-6 flex-grow">
              {children}
            </main>
          </Suspense>
        </div>
      </body>
    </html>
  );
}