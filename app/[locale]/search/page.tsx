// app/[locale]/search/page.tsx
// Fix #13: fontClassName now passed so Persian font works in filter popovers
// Fix #15: fontClassName threaded from page all the way to portals
import type { Metadata } from "next";
import { Suspense } from "react";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import { getAllPosts, getTagSummaries } from "@/lib/blog";
import { SearchPageClient } from "@/components/search/SearchPageClient";

// We read the Vazir font variable name from CSS — same variable set in layout.tsx
// via `const vazir = Vazirmatn({ variable: "--font-farsi", ... })`
// We pass the CSS variable class so portals pick up the font.
const FA_FONT_CLASS = "font-[family-name:var(--font-farsi)]";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  return {
    title: locale === "fa" ? "جستجو پیشرفته" : "Advanced Search",
    description:
      locale === "fa"
        ? "جستجو در پست‌های بلاگ"
        : "Search blog posts by title, tag, category or author.",
  };
}

// Fix #13: skeleton matches the real layout so there's no layout shift
// when Suspense resolves and SearchPageClient mounts + auto-focuses
function SearchPageSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      <div className="space-y-1.5">
        <div className="h-8 w-48 rounded-lg bg-muted" />
        <div className="h-4 w-72 rounded bg-muted" />
      </div>
      {/* Input skeleton — same height as real SearchInput (h-12) */}
      <div className="h-12 w-full rounded-2xl bg-muted" />
      {/* Filter bar skeleton */}
      <div className="flex gap-2">
        {[80, 72, 56, 64].map((w, i) => (
          <div key={i} className="h-8 rounded-full bg-muted" style={{ width: w }} />
        ))}
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

  // Fix #15: pass font class so Popover/Dropdown portals render with correct font
  const fontClassName = locale === "fa" ? FA_FONT_CLASS : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      {/* Fix #13: Suspense boundary with matching skeleton prevents focus flash */}
      <Suspense fallback={<SearchPageSkeleton />}>
        <SearchPageClient
          posts={posts}
          tags={tags}
          locale={locale}
          fontClassName={fontClassName}
        />
      </Suspense>
    </div>
  );
}