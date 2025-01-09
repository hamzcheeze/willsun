import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}