// app/[locale]/page.tsx
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale, getDictionary } from "@/lib/i18n";
import { getLatestPosts } from "@/lib/blog";

// Client components (must contain "use client" inside their files)
import HeroClient from "@/components/hero/HeroClient";
import LatestPostsClient from "@/components/hero/LatestPostClient";

type PageParams = { locale: Locale };

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  // server-only: resolve locale + dictionary + posts
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = await getDictionary(locale);
  // ensure posts are serializable (strings, numbers, arrays). Avoid functions or classes.
  const latestPosts = getLatestPosts(locale, 2);

  const isFa = locale === "fa";

  return (
    <div className="space-y-10">
      {/* HeroClient is a client component (framer-motion, AnimatedGradient).
          Keep it as a small client component so the page can remain async/server. */}
      <HeroClient locale={locale} isFa={isFa} dict={dict} />

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {dict.nav.latestPosts}
          </h2>
          <Link
            href={`/${locale}/blog`}
            className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            {dict.nav.viewAllPosts}
          </Link>
        </div>

        {/* LatestPostsClient is a client component that receives serializable posts
            and applies staggered entrance animations. */}
        <LatestPostsClient posts={latestPosts} locale={locale} />
      </section>
    </div>
  );
}
