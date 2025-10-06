import type { Metadata } from "next";
import { Josefin_Sans, EB_Garamond } from "next/font/google";
import "./globals.css";

const siteName = "Walt";
const siteDescription = "Get Early Access to Smart AI Assistance.";
const siteUrl = "https://walt.example";

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
    default: `${siteName} — Smart AI Assistance`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "AI assistant",
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
    title: `${siteName} — Smart AI Assistance`,
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
    title: `${siteName} — Smart AI Assistance`,
    description: siteDescription,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
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
      </body>
    </html>
  );
}
