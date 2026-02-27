// app/[locale]/page.tsx
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale, getDictionary } from "@/lib/i18n";
import { getPinnedPosts } from "@/lib/blog";

import HeroServer from "@/components/hero/HeroServer";
import LatestPostsClient from "@/components/hero/LatestPostClient";
import BelowFoldSections from "@/components/hero/BelowFoldSecions";

type PageParams = { locale: Locale };

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const [dict, pinnedPosts] = await Promise.all([
    getDictionary(locale),
    Promise.resolve(getPinnedPosts(locale)),
  ]);

  const isFa = locale === "fa";

  return (
    <div className="space-y-10">
      {/* Server rendered — h1 is LCP element, paints with first HTML byte */}
      <HeroServer locale={locale} isFa={isFa} dict={dict.nav} />

      {/* Pinned posts — data from server, cards animate client-side */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {isFa ? "پست‌های منتخب" : "Pinned posts"}
          </h2>
          <Link
            href={`/${locale}/blog`}
            className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {dict.nav.viewAllPosts}
          </Link>
        </div>
        <LatestPostsClient posts={pinnedPosts} locale={locale} />
      </section>

      {/* All below-fold heavy sections — lazy loaded, separate JS chunks */}
      <BelowFoldSections locale={locale} isFa={isFa} />
    </div>
  );
}