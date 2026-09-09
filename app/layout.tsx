import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./fonts.css";
import { ThemeProvider } from "@/components/theme-provider";
import { getSiteUrl } from "@/lib/site";
import Script from "next/script";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  verification: {
    google: "DFB-Ev3KX6Ofu24zMPweEXoHSwKcw195ZJ1SCZTbKyc",
  },

  other: {
    enamad: "67547108",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Script
        src="https://umami-production-f85e.up.railway.app/script.js"
        data-website-id="3a65cca8-4044-447a-92ca-5df9da5b0742"
        strategy="afterInteractive"
      />
    </ThemeProvider>
  );
}
