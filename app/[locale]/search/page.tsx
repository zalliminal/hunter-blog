// app/[locale]/search/page.tsx
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import { getAllPosts, getTagSummaries } from "@/lib/blog";
import { SearchPageClient } from "@/components/search/SearchPageClient";
// ▼ Replace with your actual Persian font import.
//   The font must be loaded via next/font and its .className forwarded into
//   SearchPageClient so portals (Popover, Dropdown) also render in Persian font.
// import { vazir } from "@/lib/fonts";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return {
    title: locale === "fa" ? "جستجو پیشرفته" : "Advance Search",
    description:
      locale === "fa"
        ? "جستجو در پست‌های بلاگ"
        : "Search blog posts by title, tag, category or author.",
  };
}

export default async function SearchPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const posts = getAllPosts(locale);
  const tags = getTagSummaries(locale);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <SearchPageClient
        posts={posts}
        tags={tags}
        locale={locale}
        // Pass your Persian font className here so filter popovers use it too:
        // fontClassName={locale === "fa" ? vazir.className : undefined}
      />
    </div>
  );
}