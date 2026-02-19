import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DEFAULT_LOCALE } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const vazir = Vazirmatn({
  variable: "--font-farsi",
  subsets: ["arabic"],
});

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
    <html lang={DEFAULT_LOCALE} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazir.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}


