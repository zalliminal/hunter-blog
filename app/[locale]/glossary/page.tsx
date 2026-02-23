import type { Metadata } from "next";
import { Suspense } from "react";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/lib/i18n";
import { getAllGlossaryTerms, getAllGlossaryCategories } from "@/lib/glossary";
import { GlossaryIndexClient } from "@/components/glossary/glossary-index-client";

const FA_FONT_CLASS = "font-[family-name:var(--font-farsi)]";

export async function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  return {
    title: locale === "fa" ? "واژه‌نامه امنیت" : "Security Glossary",
    description:
      locale === "fa"
        ? "راهنمای جامع مفاهیم، اصطلاحات و تکنیک‌های امنیت سایبری"
        : "Comprehensive guide to cybersecurity concepts, terms, and techniques",
  };
}

function GlossarySkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="space-y-1.5">
        <div className="h-8 w-48 rounded-lg bg-muted" />
        <div className="h-4 w-72 rounded bg-muted" />
      </div>
      <div className="h-12 w-full rounded-2xl bg-muted" />
      <div className="flex gap-2">
        {[80, 72, 56, 64].map((w, i) => (
          <div key={i} className="h-8 rounded-full bg-muted" style={{ width: w }} />
        ))}
      </div>
    </div>
  );
}

export default async function GlossaryPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  // Load ALL terms (no filtering)
  const terms = getAllGlossaryTerms(locale);
  const categories = getAllGlossaryCategories(locale);

  const fontClassName = locale === "fa" ? FA_FONT_CLASS : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Suspense fallback={<GlossarySkeleton />}>
        <GlossaryIndexClient
          terms={terms}
          categories={categories}
          locale={locale}
          fontClassName={fontClassName}
        />
      </Suspense>
    </div>
  );
}