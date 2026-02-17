import Link from "next/link";
import type { Post } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";
import { getCategory, getAuthor } from "@/lib/categories_and_authors";

type BlogCardProps = {
  post: Post;
  locale: Locale;
};

export function BlogCard({ post, locale }: BlogCardProps) {
  const isRTL = locale === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  const textAlign = isRTL ? "text-right" : "text-left";
  const rowReverse = isRTL ? "flex-row-reverse" : "flex-row";

  // Localised strings
  const readMoreText = locale === "fa" ? "ادامه مطلب ←" : "Read more →";
  const newText = locale === "fa" ? "🔥 جدید" : "🔥 NEW";

  // Format date: "Jan 15, 2024" or Persian equivalent
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Is the post less than 7 days old?
  const isNew = (dateString: string) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffDays = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };

  return (
    <Link
      href={`/${locale}/blog/${post.slug}`}
      className={`group flex flex-col h-full rounded-2xl border border-border bg-card/60 p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md ${textAlign}`}
      dir={dir}
    >
      {/* Top row: date (with bug) + category badge + NEW badge */}
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
        {post.category && (() => {
          const category = getCategory(post.category);
          return (
            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${category.color.bg} ${category.color.text}`}>
              {category.label[locale]}
            </span>
          );
        })()}
      </div>

      {/* Title – always exactly one line */}
      <h3 className="line-clamp-1 min-h-[1.5rem] leading-6 text-base font-medium tracking-tight group-hover:text-primary transition-colors duration-200 mb-3">
        {post.title}
      </h3>

      {/* Description – always exactly two lines */}
      <div className="flex-grow">
        <p className={`line-clamp-2 min-h-[2.5rem] leading-5 text-sm text-muted-foreground ${textAlign}`}>
          {post.description}
        </p>
      </div>

      {/* Read more – fades in on hover, respects RTL */}
      <div className={`mt-3 flex items-center justify-between gap-2 ${rowReverse}`}>
        {post.author && (() => {
          const author = getAuthor(post.author);
          return (
            <span className="text-xs text-muted-foreground">
              {author.name[locale]}
            </span>
          );
        })()}
        <span className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {readMoreText}
        </span>
      </div>
    </Link>
  );
}