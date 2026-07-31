import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { MobileBottomNav } from "@/components/site-header";
import { LocaleTransition } from "@/components/locale-transition";
import {
  DEFAULT_LOCALE,
  LOCALES,
  getDirection,
  getDictionary,
  isLocale,
} from "@/lib/i18n";
import "../globals.css";
import { SiteFooter } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { NavigationProgress } from "@/components/NavigationProgress";
import { ThemeProvider } from "@/components/theme-provider";
import { getSiteUrl } from "@/lib/site";
import { StructuredData } from "@/components/structured-data";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = await getDictionary(locale);
  const { brandName, siteTagline, siteDescription, keywords } = dict.nav;
  const siteUrl = getSiteUrl();
  const titleStr = `${brandName} — ${siteTagline}`;
  const canonical = `${siteUrl}/${locale}`;

  return {
    title: {
      default: titleStr,
      template: `%s — ${brandName}`,
    },
    description: siteDescription,
    keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        fa: "/fa",
        en: "/en",
        "x-default": "/fa",
      },
    },
    openGraph: {
      title: titleStr,
      description: siteDescription,
      url: canonical,
      siteName: brandName,
      locale: locale === "fa" ? "fa_IR" : "en_US",
      type: "website",
      images: ["/og-default.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: titleStr,
      description: siteDescription,
    },
  };
}

export default async function LocaleLayout(props: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { children, params } = props;
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dir = getDirection(locale);
  const dict = await getDictionary(locale);
  const siteUrl = getSiteUrl();
  const { brandName, siteTagline, siteDescription } = dict.nav;

  const websiteJsonLd = {
    "@type": "WebSite",
    "@context": "https://schema.org",
    name: `${brandName} — ${siteTagline}`,
    url: `${siteUrl}/${locale}`,
    inLanguage: locale === "fa" ? "fa-IR" : "en-US",
    description: siteDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/${locale}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const orgJsonLd = {
    "@type": "Organization",
    "@context": "https://schema.org",
    name: "KavLabs",
    url: siteUrl,
    sameAs: [
      "https://github.com/parhamf6/hunter-blog",
      "https://t.me/kavlabs_official",
      "https://x.com/kavlabs_official",
    ],
  };

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <StructuredData data={[websiteJsonLd, orgJsonLd]} />
      </head>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div data-locale={locale} className="flex min-h-screen flex-col">
            <SiteHeader locale={locale} dict={dict.nav} />
            <Suspense fallback={null}>
              <NavigationProgress />
            </Suspense>
            <LocaleTransition locale={locale}>
              <main className="mx-auto max-w-5xl px-4 pb-16 pt-8 md:px-6">
                {children}
                <BackToTop />
              </main>
            </LocaleTransition>
            <MobileBottomNav locale={locale} dict={dict.nav} />
            <SiteFooter locale={locale} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
