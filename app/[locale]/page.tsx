// app/[locale]/page.tsx
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale, getDictionary } from "@/lib/i18n";
import { getLatestPosts } from "@/lib/blog";

// Client components
import HeroClient from "@/components/hero/HeroClient";
import AboutSectionClient from "@/components/hero/AboutSectionClient";
import LatestPostsClient from "@/components/hero/LatestPostClient";
import GoalsSectionClient from "@/components/hero/GoalSectionClient";

type PageParams = { locale: Locale };

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = await getDictionary(locale);
  const latestPosts = getLatestPosts(locale, 2);

  const isFa = locale === "fa";

  return (
    <div className="space-y-10">
      <HeroClient locale={locale} isFa={isFa} dict={dict.nav} />

      {/* Latest posts */}
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
        <LatestPostsClient posts={latestPosts} locale={locale} />
      </section>

      {/*
       * Goals — placed ABOVE the About section.
       * variant="both"  → renders the box card first, then the open/lines layout below it.
       * Change to "box" or "open" to show only one version.
       */}
      <GoalsSectionClient locale={locale} isFa={isFa} variant="terminal" />

      {/* About */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {isFa ? "درباره شکار و کد" : "About the hunt & code"}
          </h2>
        </div>
        <AboutSectionClient locale={locale} isFa={isFa} />
      </section>
    </div>
  );
}