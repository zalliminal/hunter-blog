// app/[locale]/search/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import { getAllPosts, getTagSummaries } from "@/lib/blog";
import { SearchPageClient } from "@/components/search/SearchPageClient";

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

function SearchPageLoader() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="h-8 bg-muted animate-pulse rounded" />
          <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
        </div>
        <div className="h-10 bg-muted animate-pulse rounded" />
      </div>
    </div>
  );
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
      <Suspense fallback={<SearchPageLoader />}>
        <SearchPageClient
          posts={posts}
          tags={tags}
          locale={locale}
        />
      </Suspense>
    </div>
  );
}