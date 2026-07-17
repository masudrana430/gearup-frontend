import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import "lenis/dist/lenis.css";

import { AppProviders } from "@/providers/app-providers";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "GearUp — Premium Gear Rental",
    template: "%s | GearUp",
  },

  description:
    "Discover and rent premium outdoor, travel and professional gear from trusted providers.",

  applicationName: "GearUp",

  keywords: [
    "gear rental",
    "outdoor equipment",
    "camera rental",
    "travel gear",
    "Bangladesh",
  ],

  authors: [
    {
      name: "Masud Rana",
    },
  ],

  creator: "Masud Rana",
  publisher: "GearUp",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "GearUp",
    title: "GearUp — Premium Gear Rental",
    description:
      "Rent premium gear from trusted providers and explore without limits.",
  },

  twitter: {
    card: "summary_large_image",
    title: "GearUp — Premium Gear Rental",
    description:
      "Rent premium gear from trusted providers and explore without limits.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#f7f7f2",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#0d120f",
    },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} min-h-svh bg-background font-sans text-foreground antialiased`}
      >
        <AppProviders>
          <div className="relative min-h-svh overflow-x-clip">{children}</div>
        </AppProviders>
      </body>
    </html>
  );
}