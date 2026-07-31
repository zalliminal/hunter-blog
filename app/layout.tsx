import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "./fonts.css"
import { ThemeProvider } from "@/components/theme-provider";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";
import Script from "next/script";


const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: {
    default: "KavBlog — security research & writeups by KavLabs",
    template: "%s — KavBlog",
  },
  description:
    "KavLabs security research team. Real-world writeups, notes and ideas in English and Farsi.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "KavBlog — security research & writeups by KavLabs",
    description:
      "KavLabs security research team. Real-world writeups, notes and ideas in English and Farsi.",
    url: siteUrl,
    siteName: "KavBlog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KavBlog — security research & writeups by KavLabs",
    description:
      "KavLabs security research team. Real-world writeups, notes and ideas in English and Farsi.",
  },
  verification: {
    google: "DFB-Ev3KX6Ofu24zMPweEXoHSwKcw195ZJ1SCZTbKyc",
  },
  authors: [
    { name: "KavLabs Team", url: siteUrl },
  ],

  keywords: [
    "bug bounty",
    "security research",
    "writeups",
    "penetration testing",
    "ethical hacking",
    "CTF",
    "web security",
  ],
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`bg-background text-foreground antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
        <Script
          src="https://umami-production-f85e.up.railway.app/script.js"
          data-website-id="3a65cca8-4044-447a-92ca-5df9da5b0742"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}


