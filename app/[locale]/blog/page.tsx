// app/[locale]/blog/page.tsx
import { BlogYearSection } from "@/components/blog-year-section";
import { BlogCategoryFilter } from "@/components/blog-category-filter";
import { getAllPosts, getPostsByCategory } from "@/lib/blog";
import { getCategory, isCategoryId } from "@/lib/categories_and_authors";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale, getDictionary } from "@/lib/i18n";
import { FileText, Layers, Clock, Calendar } from "lucide-react";

type PageParams = { locale: Locale };

function groupPostsByYear(posts: ReturnType<typeof getAllPosts>, locale: Locale) {
  const grouped: Record<string, Record<string, typeof posts>> = {};
  posts.forEach((post) => {
    const date = new Date(post.date);
    const year = date.getFullYear().toString();
    const month = date.toLocaleDateString(locale, { month: "long" });
    if (!grouped[year]) grouped[year] = {};
    if (!grouped[year][month]) grouped[year][month] = [];
    grouped[year][month].push(post);
  });
  return grouped;
}

export default async function BlogIndexPage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const dict = await getDictionary(locale);
  
  const rawSearchParams = await searchParams;
  const categoryParam = rawSearchParams.category as string | undefined;
  const categoryId = isCategoryId(categoryParam) ? categoryParam : null;

  // Get posts — filtered by category if specified
  let posts = getAllPosts(locale);
  let selectedCategory = null;
  
  if (categoryId) {
    posts = getPostsByCategory(locale, categoryId);
    selectedCategory = getCategory(categoryId);
  }

  const groupedPosts = groupPostsByYear(posts, locale);
  const sortedYears = Object.keys(groupedPosts).sort(
    (a, b) => parseInt(b) - parseInt(a),
  );

  const isRTL = locale === "fa";
  const dir = isRTL ? "rtl" : "ltr";

  const totalReadingTime = posts.reduce(
    (sum, p) => sum + (p.readingTime ?? 0),
    0,
  );
  const earliestYear =
    sortedYears.length > 0 ? sortedYears[sortedYears.length - 1] : null;

  const fmt = (n: number) =>
    locale === "fa" ? n.toLocaleString("fa-IR") : n.toString();

  const fmtYear = (n: number) =>
    locale === "fa" ? n.toLocaleString("fa-IR", { useGrouping: false }) : n.toString(); 

  // i18n shorthands
  const t = {
    articles: locale === "fa" ? "مقاله" : "articles",
    minRead: locale === "fa" ? "دقیقه خواندنی" : "min of reading",
    since: locale === "fa" ? "از سال" : "since",
    jumpTo: locale === "fa" ? "برو به سال" : "Jump to year",
    noPosts: locale === "fa" ? "هنوز پستی برای این دسته نیست" : "No posts in this category yet",
  };

  return (
    <div
      className="min-h-screen"
      dir={dir}
    >
      {/* ── Page wrapper ───────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

        {/* ── HEADER ─────────────────────────────────────────────── */}
        <header className="space-y-8">
          {/* Icon + title */}
          <div className="flex items-start gap-4">
            <div className="mt-1 rounded-xl bg-primary/10 p-3 ring-1 ring-primary/20">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {selectedCategory
                  ? selectedCategory.label[locale]
                  : dict.nav.blogIndexTitle}
              </h1>
              <p className="text-muted-foreground text-base leading-relaxed max-w-xl">
                {selectedCategory
                  ? selectedCategory.description[locale]
                  : dict.nav.blogIndexDescription}
              </p>
            </div>
          </div>

          {/* Category Filter */}
          <BlogCategoryFilter locale={locale} />

          {/* Stats row — readingTime is always present after the blog.ts update */}
          <div className="grid grid-cols-3 gap-px rounded-xl overflow-hidden border border-border bg-border">
            {[
              {
                icon: <Layers className="h-4 w-4" />,
                value: fmt(posts.length),
                label: t.articles,
              },
              {
                icon: <Clock className="h-4 w-4" />,
                value: fmt(totalReadingTime),
                label: t.minRead,
              },
              {
                icon: <Calendar className="h-4 w-4" />,
                value: earliestYear ? fmtYear(parseInt(earliestYear)) : "—",
                label: t.since,
              },
            ].map(({ icon, value, label }, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 bg-card px-4 py-4 text-center"
              >
                {icon && (
                  <span className="text-primary opacity-70">{icon}</span>
                )}
                <span className="text-2xl font-bold tabular-nums">{value}</span>
                <span className="text-xs text-muted-foreground">{label}</span>
              </div>
            ))}
          </div>

          {/* Year-jump nav */}
          {sortedYears.length > 1 && (
            <nav aria-label={t.jumpTo}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs text-muted-foreground self-center shrink-0">
                  {t.jumpTo}:
                </span>
                <div className="flex flex-wrap gap-2">
                  {sortedYears.map((year) => (
                    <a
                      key={year}
                      href={`#year-${year}`}
                      className="inline-flex items-center gap-1 rounded-md border border-border bg-muted/50 px-3 py-1 text-xs font-semibold text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-colors duration-150"
                    >
                      {fmtYear(parseInt(year))}
                      <span className="text-[10px] opacity-60">
                        ({fmt(Object.values(groupedPosts[year]).reduce((s, arr) => s + arr.length, 0))})
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          )}

          {/* Divider */}
          <div className="border-t border-border" />
        </header>

        {/* ── NO POSTS MESSAGE ───────────────────────────────────── */}
        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">{t.noPosts}</p>
          </div>
        )}

        {/* ── YEAR SECTIONS ──────────────────────────────────────── */}
        {posts.length > 0 && (
          <div className="space-y-16">
            {sortedYears.map((year, i) => (
              <BlogYearSection
                key={year}
                year={year}
                months={groupedPosts[year]}
                locale={locale}
                isFirst={i === 0}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}