import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DynamicBackground } from "@/components/background/DynamicBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://inspire.adyk.in"),
  title: {
    default: "ADYK Inspire — Learn. Build. Share. Inspire.",
    template: "%s | ADYK Inspire",
  },
  description:
    "ADYK Inspire is an open community for students, developers, creators, founders, entrepreneurs and technology enthusiasts to connect, exchange ideas, learn and build together.",
  keywords: [
    "ADYK Inspire",
    "ADYK",
    "technology community",
    "startup community",
    "student startup community",
    "developers",
    "entrepreneurs",
    "startup ideas",
    "technology community India",
    "build startups",
    "software engineering",
    "AI community",
  ],
  authors: [{ name: "ADYK — A Multi-Venture Technology Company" }],
  creator: "ADYK",
  publisher: "ADYK",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "ADYK Inspire",
    title: "ADYK Inspire — Learn. Build. Share. Inspire.",
    description:
      "An open community for students, developers, creators, founders, entrepreneurs and technology enthusiasts to exchange ideas, explore opportunities and build together.",
    images: [
      {
        url: "/logo/adyk_logo.jpg",
        width: 1200,
        height: 630,
        alt: "ADYK Inspire Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ADYK Inspire — Learn. Build. Share. Inspire.",
    description:
      "An open community for students, developers, creators, founders, entrepreneurs and technology enthusiasts to exchange ideas, explore opportunities and build together.",
    images: ["/logo/adyk_logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-black text-[#ededed] font-sans antialiased selection:bg-white selection:text-black relative flex flex-col justify-between">
        <DynamicBackground />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
