import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight } from "lucide-react";
import { getCategory, getAuthor } from "@/lib/categories_and_authors";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import { useBlogCard } from "@/hooks/useBlogCard";

type EnhancedBlogCardProps = {
  post: Post;
  locale: Locale;
  index?: number;
  priority?: boolean;
};

export function EnhancedBlogCard({ post, locale, index = 0, priority = false }: EnhancedBlogCardProps) {
  // Fix #1: Shared hook - no more duplicate logic
  const { isRTL, dir, textAlign, readMoreText, newText, minReadText, formatDate, isNew } =
    useBlogCard(locale);

  // Fix #3: Computed once at top of component, not inside render
  const category = post.category ? getCategory(post.category) : null;
  const author = post.author ? getAuthor(post.author) : null;
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    // Fix #2: AnimatedCard is the only "use client" part
    <AnimatedCard index={index} className="h-full">
      <Link
        href={`/${locale}/blog/${post.slug}`}
        dir={dir}
        className={`
          group relative flex flex-col sm:flex-row h-full
          rounded-2xl border border-border bg-card/60
          shadow-sm overflow-hidden
          transition-all duration-200
          hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md
          ${isRTL ? "sm:flex-row-reverse" : "sm:flex-row"}
        `}
      >
        {/* Thumbnail */}
        <div className="relative w-full sm:w-44 md:w-52 flex-shrink-0 aspect-video overflow-hidden bg-muted">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, 208px"
              // Fix #7: priority passed from parent for above-the-fold images
              priority={priority}
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/8 via-muted to-secondary/8">
              <span className="text-3xl opacity-30 select-none">✦</span>
            </div>
          )}

          {isNew(post.date) && (
            <span
              className={`
                absolute top-2 ${isRTL ? "left-2" : "right-2"}
                inline-flex items-center rounded-full
                bg-primary/90 backdrop-blur-sm
                px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white shadow-sm
              `}
            >
              {newText}
            </span>
          )}

          <div
            className={`
              hidden sm:block absolute inset-y-0 w-6 pointer-events-none
              ${isRTL
                ? "left-0 bg-gradient-to-r from-card/60 to-transparent"
                : "right-0 bg-gradient-to-l from-card/60 to-transparent"}
            `}
          />
        </div>

        {/* Content */}
        <div className={`flex flex-1 flex-col p-4 sm:p-5 ${textAlign}`}>
          {/* Meta row */}
          <div
            className={`
              flex flex-wrap items-center gap-x-3 gap-y-1
              text-xs text-muted-foreground
              ${isRTL ? "flex-row-reverse" : "flex-row"}
            `}
          >
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3 shrink-0" aria-hidden />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>

            {post.readingTime && (
              <>
                <span className="text-border" aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3 shrink-0" aria-hidden />
                  {post.readingTime}&thinsp;{minReadText}
                </span>
              </>
            )}

            {/* Fix #10: category computed above, no IIFE */}
            {category && (
              <>
                <span className="text-border" aria-hidden>·</span>
                <span
                  className={`
                    inline-flex items-center rounded-full
                    px-2 py-0.5 text-[11px] font-semibold
                    ${category.color.bg} ${category.color.text}
                  `}
                >
                  {category.label[locale]}
                </span>
              </>
            )}

            {/* Fix #10: author computed above, no IIFE */}
            {author && (
              <>
                <span className="text-border" aria-hidden>·</span>
                <div className="flex items-center gap-1.5">
                  {author.avatar && (
                    <Image
                      src={author.avatar}
                      alt={author.name[locale]}
                      width={20}
                      height={20}
                      className="rounded-full object-cover border border-border"
                      title={author.name[locale]}
                    />
                  )}
                  <span className="font-medium text-muted-foreground">
                    {author.name[locale]}
                  </span>
                </div>
              </>
            )}
          </div>

          <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-tight group-hover:text-primary transition-colors duration-200 mt-2">
            {post.title}
          </h3>

          {post.description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground mt-2">
              {post.description}
            </p>
          )}

          <div className="flex-1 min-h-2" />

          {/* Footer */}
          <div
            className={`
              flex items-center justify-between gap-2 pt-3 mt-auto border-t
              ${isRTL ? "flex-row-reverse" : "flex-row"}
            `}
          >
            <div
              className={`flex flex-wrap items-center gap-1 ${isRTL ? "flex-row-reverse" : "flex-row"}`}
            >
              {post.tags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full bg-muted/70 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                >
                  <Tag className="h-2 w-2 shrink-0 opacity-60" aria-hidden />
                  {tag}
                </span>
              ))}
              {post.tags && post.tags.length > 2 && (
                <span className="text-[11px] text-muted-foreground/60">
                  +{post.tags.length - 2}
                </span>
              )}
            </div>

            <span
              className={`
                inline-flex items-center gap-1 text-xs font-medium text-primary
                opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0
              `}
            >
              {readMoreText}
              <ArrowIcon className="h-3 w-3" aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </AnimatedCard>
  );
}