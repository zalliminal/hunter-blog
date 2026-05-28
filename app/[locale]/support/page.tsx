// app/[locale]/support/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale, getDictionary } from "@/lib/i18n";
import SupportPageClient from "@/components/support/SupportPageClient";

const FA_FONT_CLASS = "font-[family-name:var(--font-farsi)]";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const isFa = locale === "fa";

  return {
    title: isFa ? "حمایت از کاولبز" : "Support KavLabs",
    description: isFa
      ? "از کاولبز حمایت کنید و به ما کمک کنید تا محتوای آموزشی رایگان و باکیفیت تولید کنیم"
      : "Support KavLabs and help us create free, high-quality educational content",
  };
}

function SupportPageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 animate-pulse">
      <div className="h-12 w-64 rounded-lg bg-muted mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 rounded-xl bg-muted" />
        ))}
      </div>
    </div>
  );
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = await getDictionary(locale);
  const isFa = locale === "fa";
  const fontClassName = isFa ? FA_FONT_CLASS : undefined;

  return (
    <div className="min-h-screen">
      <Suspense fallback={<SupportPageSkeleton />}>
        <SupportPageClient
          locale={locale}
          isFa={isFa}
          dict={dict}
          fontClassName={fontClassName}
        />
      </Suspense>
    </div>
  );
}
