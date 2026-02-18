import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";
import { getCategory, getAuthor } from "@/lib/categories_and_authors";
import { useBlogCard } from "@/hooks/useBlogCard";

type BlogCardProps = {
  post: Post;
  locale: Locale;
  priority?: boolean;
};

export function BlogCard({ post, locale, priority = false }: BlogCardProps) {
  // Fix #1: Shared hook - no duplicate date/isNew/text logic
  const { isRTL, dir, textAlign, readMoreText, newText, formatDate, isNew } =
    useBlogCard(locale);

  // Fix #3 & #10: Computed once at top, no IIFE in JSX
  const category = post.category ? getCategory(post.category) : null;
  const author = post.author ? getAuthor(post.author) : null;
  const rowReverse = isRTL ? "flex-row-reverse" : "flex-row";

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className={`group flex flex-col h-full rounded-2xl border border-border bg-card/60 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md ${textAlign}`}
      dir={dir}
    >
      {/* Thumbnail - optional */}
      {/* {post.thumbnail && (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-muted mb-3">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )} */}

      {/* Top row: date + category badge + NEW badge */}
      <div className={`flex items-center justify-between gap-2 text-xs text-muted-foreground mb-2 ${rowReverse}`}>
        <div className="flex items-center gap-1.5">
          <time dateTime={post.date} className="font-medium">
            🐛 {formatDate(post.date)}
          </time>
          {isNew(post.date) && (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
              {newText}
            </span>
          )}
        </div>

        {/* Fix #10: no IIFE */}
        {category && (
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${category.color.bg} ${category.color.text}`}>
            {category.label[locale]}
          </span>
        )}
      </div>

      <h3 className="line-clamp-1 min-h-[1.5rem] leading-6 text-base font-medium tracking-tight group-hover:text-primary transition-colors duration-200 mb-3">
        {post.title}
      </h3>

      <div className="flex-grow">
        <p className={`line-clamp-2 min-h-[2.5rem] leading-5 text-sm text-muted-foreground ${textAlign}`}>
          {post.description}
        </p>
      </div>

      <div className={`mt-3 flex items-center justify-between gap-2 ${rowReverse}`}>
        {/* Fix #10: no IIFE */}
        {author && (
          <span className="text-xs text-muted-foreground">
            {author.name[locale]}
          </span>
        )}
        <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {readMoreText} →
        </span>
      </div>
    </Link>
  );
}