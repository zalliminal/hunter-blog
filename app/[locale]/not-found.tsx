// app/[locale]/not-found.tsx
import type { Metadata } from "next";
import { DEFAULT_LOCALE, getDirection, type Locale } from "@/lib/i18n";
import NotFoundClient from "@/components/not-found-client";

export const metadata: Metadata = {
  title: "404",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LocaleNotFound() {
  const locale: Locale = DEFAULT_LOCALE;
  const dir = getDirection(locale);

  return (
    <div
      dir={dir}
      data-locale={locale}
      className="flex min-h-screen flex-col bg-background text-foreground"
    >
      <NotFoundClient locale={locale} />
    </div>
  );
}
