"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Post } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight } from "lucide-react";

type EnhancedBlogCardProps = {
  post: Post;
  locale: Locale;
  index?: number;
};

export function EnhancedBlogCard({ post, locale, index = 0 }: EnhancedBlogCardProps) {
  const isRTL = locale === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  const textAlign = isRTL ? "text-right" : "text-left";

  // Localised strings
  const readMoreText = locale === "fa" ? "ادامه مطلب" : "Read more";
  const newText = locale === "fa" ? "🔥 جدید" : "🔥 NEW";
  const minReadText = locale === "fa" ? "دقیقه خواندن" : "min read";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isNew = (dateString: string) => {
    const postDate = new Date(dateString);
    const now = new Date();
    const diffDays = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="h-full"
    >
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
        {/* ── THUMBNAIL – fixed 16:9 on all screens ────────────── */}
        <div className="relative w-full sm:w-44 md:w-52 flex-shrink-0 aspect-video overflow-hidden bg-muted">
          {post.thumbnail ? (
            <Image
              src={post.thumbnail}
              alt={post.title}
              fill
              sizes="(max-width: 640px) 100vw, 208px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/8 via-muted to-secondary/8">
              <span className="text-3xl opacity-30 select-none">✦</span>
            </div>
          )}

          {/* NEW badge */}
          {isNew(post.date) && (
            <span
              className={`
                absolute top-2 ${isRTL ? "left-2" : "right-2"}
                inline-flex items-center rounded-full
                bg-primary/90 backdrop-blur-sm
                px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white
                shadow-sm
              `}
            >
              {newText}
            </span>
          )}

          {/* Subtle gradient overlay – remains unchanged */}
          <div
            className={`
              hidden sm:block absolute inset-y-0 w-6
              pointer-events-none
              ${isRTL
                ? "left-0 bg-gradient-to-r from-card/60 to-transparent"
                : "right-0 bg-gradient-to-l from-card/60 to-transparent"}
            `}
          />
        </div>

        {/* ── CONTENT – flex column with spacer to push footer down ── */}
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

            {post.tags && post.tags.length > 0 && (
              <span
                className={`
                  inline-flex items-center gap-1 rounded-full
                  bg-muted px-2 py-0.5 text-[11px] font-medium
                  ${isRTL ? "mr-auto" : "ml-auto"}
                `}
              >
                <Tag className="h-2.5 w-2.5 shrink-0 opacity-60" aria-hidden />
                {post.tags[0]}
                {post.tags.length > 1 && (
                  <span className="text-muted-foreground/70">+{post.tags.length - 1}</span>
                )}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="line-clamp-2 text-base font-semibold leading-snug tracking-tight group-hover:text-primary transition-colors duration-200 mt-2">
            {post.title}
          </h3>

          {/* Description (optional) */}
          {post.description && (
            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground mt-2">
              {post.description}
            </p>
          )}

          {/* SPACER – pushes footer to the bottom */}
          <div className="flex-1 min-h-2" />

          {/* Footer: extra tags + read‑more arrow */}
          <div
            className={`
              flex items-center justify-between gap-2 pt-3 mt-1 border-t
              ${isRTL ? "flex-row-reverse" : "flex-row"}
            `}
          >
            {/* Overflow tags */}
            <div
              className={`
                flex flex-wrap items-center gap-1
                ${isRTL ? "flex-row-reverse" : "flex-row"}
              `}
            >
              {post.tags && post.tags.slice(1, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-muted/70 px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
              {post.tags && post.tags.length > 3 && (
                <span className="text-[11px] text-muted-foreground/60">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>

            {/* Read more – fades in on hover */}
            <span
              className={`
                inline-flex items-center gap-1
                text-xs font-medium text-primary
                opacity-0 group-hover:opacity-100
                transition-opacity duration-200
                shrink-0
              `}
            >
              {readMoreText}
              <ArrowIcon className="h-3 w-3" aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}