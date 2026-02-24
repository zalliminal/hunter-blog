import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import ChangelogClient from "@/components/changelog/changelog-client";

const FA_FONT_CLASS = "font-[family-name:var(--font-farsi)]";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  
  return {
    title: locale === "fa" ? "تغییرات" : "Changelog",
    description: locale === "fa" 
      ? "تاریخچه به‌روزرسانی‌ها و ویژگی‌های جدید" 
      : "History of updates and new features",
  };
}

export default async function ChangelogPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const fontClassName = locale === "fa" ? FA_FONT_CLASS : undefined;

  return (
    <div className={`mx-auto max-w-4xl px-4 py-10 md:py-16 ${fontClassName || ""}`}>
      <ChangelogClient locale={locale} />
    </div>
  );
}