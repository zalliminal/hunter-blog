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
import TeamSectionClient from "@/components/hero/TeamSectionClient";

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

      {/* Goals — terminal variant */}
      <GoalsSectionClient locale={locale} isFa={isFa} variant="terminal" />

      {/* About */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {isFa ? "یه کم درباره ما" : "a little bit about us"}
          </h2>
        </div>
        <AboutSectionClient locale={locale} isFa={isFa} />
      </section>

      {/* Team Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {isFa ? "تیم ما" : "Our Team"}
          </h2>
        </div>
        <TeamSectionClient locale={locale} isFa={isFa} />
      </section>
    </div>
  );
}