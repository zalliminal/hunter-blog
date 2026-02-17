// app/[locale]/categories/page.tsx
import Link from "next/link";
import { ArrowRight, Grid2X2 } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import { CATEGORY_IDS, getCategory } from "@/lib/categories_and_authors";
import { getPostsByCategory } from "@/lib/blog";

type PageParams = { locale: Locale };

export default async function CategoriesPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;

  const isRTL = locale === "fa";
  const dir = isRTL ? "rtl" : "ltr";

  // Get post count for each category
  const categoriesWithCounts = CATEGORY_IDS.map((categoryId) => {
    const category = getCategory(categoryId);
    const postCount = getPostsByCategory(locale, categoryId).length;
    return { category, postCount, categoryId };
  });

  const noPosts = locale === "fa" ? "هنوز پستی نیست" : "No posts yet";
  const viewPosts = locale === "fa" ? "نمایش پست‌ها" : "View posts";
  const browseAll = locale === "fa" ? "مرور همه" : "Browse all categories";

  return (
    <div className="min-h-screen" dir={dir}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        {/* ── HEADER ─────────────────────────────────────────────── */}
        <header className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="mt-1 rounded-xl bg-primary/10 p-3 ring-1 ring-primary/20">
              <Grid2X2 className="h-6 w-6 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {browseAll}
              </h1>
              <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
                {locale === "fa"
                  ? "هر دسته بندی برای یک سطح مختلف از یادگیری طراحی شده‌است. انتخاب کنید و شروع کنید."
                  : "Each category is tailored for a different learning level. Choose one and dive in."}
              </p>
            </div>
          </div>
          <div className="border-t border-border" />
        </header>

        {/* ── CATEGORIES GRID ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoriesWithCounts.map(({ category, postCount, categoryId }) => (
            <div
              key={categoryId}
              className={`group relative overflow-hidden rounded-2xl border-2 border-border bg-card p-6 sm:p-8 transition-all hover:border-primary/50 hover:shadow-lg duration-300`}
            >
              {/* Color accent at top */}
              <div
                className="absolute top-0 right-0 h-1 w-12 transition-all group-hover:w-full duration-300"
                style={{
                  backgroundColor: category.color.oklch,
                }}
              />

              {/* Content */}
              <div className="space-y-4">
                {/* Category label + post count */}
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground max-w-xs">
                    {category.label[locale]}
                  </h2>
                  <span
                    className={`${category.color.bg} ${category.color.text} rounded-full px-3 py-1 text-sm font-semibold whitespace-nowrap shrink-0`}
                  >
                    {postCount > 0
                      ? postCount
                      : locale === "fa"
                        ? "۰"
                        : "0"}
                  </span>
                </div>

                {/* Description */}
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {category.description[locale]}
                </p>

                {/* No posts placeholder or button */}
                {postCount === 0 ? (
                  <div className="pt-4 text-xs text-muted-foreground italic">
                    {noPosts}
                  </div>
                ) : (
                  <div className="pt-4">
                    <Link
                      href={`/${locale}/blog?category=${category.slug}`}
                      className={`inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${category.color.bg} ${category.color.text} hover:opacity-80`}
                    >
                      {viewPosts}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
