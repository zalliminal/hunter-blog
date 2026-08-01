import type { Metadata } from "next";
import { LOCALES, type Locale, DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import { getPostsByTag, getTagLabelBySlug, getTagSummaries } from "@/lib/blog";
import { BlogCard } from "@/components/blog-card";

type PageParams = {
  locale: Locale;
  tagSlug: string;
};

export const dynamicParams = false;

export function generateStaticParams(): PageParams[] {
  return LOCALES.flatMap((locale) =>
    getTagSummaries(locale).map((tag) => ({ locale, tagSlug: tag.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale: rawLocale, tagSlug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const label = getTagLabelBySlug(locale, tagSlug) ?? tagSlug;
  const title = locale === "fa" ? `پست‌ها با تگ «${label}»` : `Posts tagged “${label}”`;
  const description =
    locale === "fa"
      ? "نوشته‌هایی که به این موضوع نزدیک هستند."
      : "Posts that orbit around this topic.";
  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `/${locale}/tags/${tagSlug}`,
      languages: { fa: `/fa/tags/${tagSlug}`, en: `/en/tags/${tagSlug}`, "x-default": `/fa/tags/${tagSlug}` },
    },
  };
}

export default async function TagDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale: rawLocale, tagSlug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const label = getTagLabelBySlug(locale, tagSlug) ?? tagSlug;
  const posts = getPostsByTag(locale, label);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">
          {locale === "fa" ? `پست‌ها با تگ «${label}»` : `Posts tagged “${label}”`}
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          {locale === "fa"
            ? "نوشته‌هایی که به این موضوع نزدیک هستند."
            : "Posts that orbit around this topic."}
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {locale === "fa"
            ? "فعلاً پستی با این تگ وجود ندارد."
            : "No posts with this tag yet."}
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
