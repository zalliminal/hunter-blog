import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import {  BookOpen, ExternalLink, Languages, ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale, LOCALES, getDirection } from "@/lib/i18n";
import {
  getGlossaryTermBySlug,
  getAllGlossarySlugs,
  getRelatedGlossaryTerms,
  type GlossaryTerm,
} from "@/lib/glossary";
import { getDifficultyColor } from "@/lib/glossary-helpers";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { cn } from "@/lib/utils";
import { getSiteUrl } from "@/lib/site";
import { PostShare } from "@/components/post-share";
import { BackButton } from "@/components/glossary/back-button";

type PageParams = {
  locale: Locale;
  slug: string;
};

export function generateStaticParams(): PageParams[] {
  return LOCALES.flatMap((locale) =>
    getAllGlossarySlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const term = getGlossaryTermBySlug(locale, slug);

  if (!term) return {};

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${term.url}`;

  return {
    title: term.term,
    description: term.shortDefinition,
    openGraph: {
      title: term.term,
      description: term.shortDefinition,
      url,
      type: "article",
      siteName: "Hunter Notes",
    },
    twitter: {
      card: "summary",
      title: term.term,
      description: term.shortDefinition,
    },
  };
}

export default async function GlossaryTermPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const term = getGlossaryTermBySlug(locale, slug);

  if (!term) notFound();

  const dir = getDirection(locale);
  const isRTL = locale === "fa";
  const relatedTerms = getRelatedGlossaryTerms(term, locale);
  const difficultyColor = getDifficultyColor(term.difficulty);

  const difficultyLabels = {
    en: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
    fa: { beginner: "مبتدی", intermediate: "متوسط", advanced: "پیشرفته" },
  };

  

  return (
    <article className="relative" dir={dir}>
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="min-w-0 flex-1">
          {/* Back Button - Styled like blog navigation */}
          <div className="mb-6 flex items-center justify-between sm:mb-8">
        {/* Browser History Back Button */}
        <BackButton locale={locale} />
        
        {/* Link to Glossary Index */}
        <Link
          href={`/${locale}/glossary`}
          className="text-xs text-muted-foreground transition-colors hover:text-primary sm:text-sm"
        >
          {isRTL ? "واژه‌نامه" : "Glossary"}
        </Link>
      </div>

          <header className="mb-6 space-y-3">
            {/* Metadata row - matches blog style */}
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {term.lastUpdated && (
                <>
                  <span>
                    {new Date(term.lastUpdated).toLocaleDateString(locale, {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    })}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                </>
              )}
              <span>{term.category}</span>
              {term.difficulty && (
                <>
                  <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                  <span
                    className={cn(
                      "capitalize",
                      difficultyColor.text
                    )}
                  >
                    {difficultyLabels[locale][term.difficulty as keyof typeof difficultyLabels.en]}
                  </span>
                </>
              )}
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
              <span>{locale === "fa" ? "زبان: فارسی" : "Language: English"}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {term.term}
              {term.abbreviation && (
                <span className="ml-2 text-xl font-normal text-muted-foreground">
                  ({term.abbreviation})
                </span>
              )}
            </h1>

            {/* Category & Difficulty badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span
                className={cn(
                  "inline-flex rounded-md px-3 py-1.5 text-xs font-semibold",
                  difficultyColor.bg,
                  difficultyColor.text
                )}
              >
                {term.difficulty
                  ? difficultyLabels[locale][term.difficulty as keyof typeof difficultyLabels.en]
                  : isRTL
                  ? "عمومی"
                  : "General"}
              </span>
              {term.hasTranslation && term.translationSlug && (
                <Link
                  href={`/${locale === "en" ? "fa" : "en"}/glossary/${term.translationSlug}`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
                >
                  <Languages className="h-3.5 w-3.5" />
                  {isRTL ? "نسخه انگلیسی" : "Persian version"}
                </Link>
              )}
            </div>

            {/* Short definition */}
            {term.shortDefinition && (
              <p className="max-w-2xl text-sm text-muted-foreground">
                {term.shortDefinition}
              </p>
            )}

            {/* Tags */}
            {term.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                {term.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <div className="space-y-6">
            {/* Main MDX Content */}
            <div id="definition" className="prose max-w-none dark:prose-invert">
              <MDXRemote source={term.content} components={mdxComponents} />
            </div>

            {/* Sources Section */}
            {term.sources.length > 0 && (
              <div id="sources" className="mt-8 border-t border-border pt-6">
                <div className="mb-4 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <h2 className="text-sm font-semibold">
                    {isRTL ? "منابع و مراجع" : "Sources & References"}
                  </h2>
                </div>
                <ul className="space-y-2 text-sm">
                  {term.sources.map((source: string, index: number) => (
                    <li key={index}>
                      <a
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                      >
                        <span className="truncate">
                          {source.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        </span>
                        <ExternalLink className="h-3 w-3 shrink-0 opacity-50" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Share Component */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <PostShare title={term.term} locale={locale} />
            </div>

            {/* Related Terms */}
            {relatedTerms.length > 0 && (
              <section id="related" className="mt-12 border-t border-border pt-8">
                <h2 className="mb-4 text-lg font-semibold">
                  {isRTL ? "مفاهیم مرتبط" : "Related Concepts"}
                </h2>
                <div className="grid gap-3 sm:gap-4 sm:grid-cols-2">
                  {relatedTerms.map((related, idx) => (
                    <Link
                      key={related.slug}
                      href={related.url}
                      className="group rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/40 hover:bg-muted/50"
                    >
                      <h3 className="text-sm font-medium text-foreground group-hover:text-primary">
                        {related.term}
                        {related.abbreviation && (
                          <span className="ml-1 text-xs text-muted-foreground">
                            ({related.abbreviation})
                          </span>
                        )}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                        {related.shortDefinition}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

      </div>
    </article>
  );
}