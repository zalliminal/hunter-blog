import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { LocaleTransition } from "@/components/locale-transition";
import {
  DEFAULT_LOCALE,
  LOCALES,
  type Locale,
  getDirection,
  getDictionary,
  isLocale,
} from "@/lib/i18n";
import "../globals.css";
import { SiteFooter } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout(props: {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}) {
  const { children, params } = props;
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dir = getDirection(locale);
  const dict = await getDictionary(locale);

  return (
    <div
      dir={dir}
      data-locale={locale}
      className="flex min-h-screen flex-col bg-background text-foreground"
    >
      <SiteHeader locale={locale} dict={dict.nav} />
      <LocaleTransition locale={locale}>
        <main className="mx-auto max-w-5xl px-4 pb-16 pt-8 md:px-6">
          {children}
          <BackToTop/>
        </main>
      </LocaleTransition>
      <SiteFooter locale={locale} />
    </div>
  );
}

