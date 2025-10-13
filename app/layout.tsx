import type { Metadata } from "next";
import { Josefin_Sans, EB_Garamond } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

const siteName = "Desktop Apps";
const siteDescription = "Get Early Access to Desktop Apps.";
const siteUrl = "https://hero-one-tau.vercel.app/";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Desktop Apps`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Desktop Apps",
    "smart assistance",
    "artificial intelligence",
    "productivity",
    "waitlist",
  ],
  authors: [{ name: siteName }],
  category: "Technology",
  generator: "Next.js",
  applicationName: siteName,
  openGraph: {
    type: "website",
    siteName,
    title: `${siteName} — Desktop Apps`,
    description: siteDescription,
    url: siteUrl,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${siteName} OpenGraph image`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Desktop Apps`,
    description: siteDescription,
    images: ["/og.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${josefinSans.variable} ${ebGaramond.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
