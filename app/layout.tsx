import type { Metadata } from "next";
import { Black_Ops_One, Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { trackVisit } from "./actions";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});
const blackOpsOne = Black_Ops_One({
  weight: "400",
  variable: "--font-black-ops-one",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Danny's Blog",
  description: "personal blog",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await trackVisit();
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetBrainsMono.variable}
        ${blackOpsOne.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
