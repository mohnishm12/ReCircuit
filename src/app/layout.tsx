import type { Metadata, Viewport } from "next";
import { Geist, Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mohnishm12.github.io/ReCircuit"),
  title: {
    default: "ReCircuit | AI for the Circular Economy",
    template: "%s | ReCircuit"
  },
  description:
    "ReCircuit is a founder-led climate AI research project building the intelligence layer for circular electronics, e-waste recovery, reverse logistics, and ESG intelligence.",
  keywords: [
    "Climate Tech",
    "Artificial Intelligence",
    "Circular Economy",
    "ESG",
    "E-Waste",
    "Sustainability",
    "Recycling",
    "Carbon Intelligence"
  ],
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "ReCircuit | Building Intelligence for the Circular Economy",
    description:
      "Founder-led climate AI research project for smarter e-waste recovery, reverse logistics, and ESG intelligence.",
    url: "https://mohnishm12.github.io/ReCircuit",
    siteName: "ReCircuit",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "ReCircuit",
    description: "Building the Intelligence Layer for the Circular Economy"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  themeColor: "#050505",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${geist.variable}`}>
      <body>{children}</body>
    </html>
  );
}
