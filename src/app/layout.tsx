import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.scss';

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
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/login">Login</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
