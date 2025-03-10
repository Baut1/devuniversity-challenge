import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import React, { Suspense } from 'react';
import './globals.scss';
const Navbar = React.lazy(() => import('@/components/Navbar/Navbar')); // lazy load nav

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "To do list App",
  description: "Challenge DevUniversity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <UserProvider>
          <header>
            <Suspense fallback={<div>Loading Navbar...</div>}>
              <Navbar />
            </Suspense>
          </header>
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
