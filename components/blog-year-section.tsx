"use client";
// components/blog-year-section.tsx

import { motion } from "framer-motion";
import { EnhancedBlogCard } from "./index-page-blog-card";
import type { Post } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";

type BlogYearSectionProps = {
  year: string;
  months: Record<string, Post[]>;
  locale: Locale;
  isFirst?: boolean;
};

export function BlogYearSection({
  year,
  months,
  locale,
  isFirst = false,
}: BlogYearSectionProps) {
  const isRTL = locale === "fa";

  const fmt = (n: number) =>
    locale === "fa" ? n.toLocaleString("fa-IR") : n.toString();
  const fmtYear = (n: number) =>
    locale === "fa" ? n.toLocaleString("fa-IR", { useGrouping: false }) : n.toString();

  const totalPosts = Object.values(months).reduce(
    (sum, posts) => sum + posts.length,
    0,
  );

  // Sort months newest-first. Month keys are locale month names so we
  // reconstruct a sortable index by parsing them against a known year.
  const sortedMonths = Object.keys(months).sort((a, b) => {
    const dateA = new Date(`${a} 1, ${year}`);
    const dateB = new Date(`${b} 1, ${year}`);
    // If parsing fails (Persian month names), fall back to insertion order
    if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) return 0;
    return dateB.getTime() - dateA.getTime();
  });

  const postsBadge =
    locale === "fa"
      ? `${fmt(totalPosts)} مقاله`
      : `${fmt(totalPosts)} post${totalPosts !== 1 ? "s" : ""}`;

  return (
    <motion.section
      id={`year-${year}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="scroll-mt-24"
      aria-label={`${year} — ${postsBadge}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* ── Year heading ──────────────────────────────────────── */}
      <div
        className={`flex items-baseline gap-3 mb-8 ${isRTL ? "flex-row-reverse" : ""}`}
      >
        {/* Big year number */}
        <h2
          className="text-5xl sm:text-6xl font-black tabular-nums tracking-tighter text-foreground/90 leading-none"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          {fmtYear(parseInt(year))}
        </h2>

        {/* Post count pill */}
        <span className="inline-flex items-center rounded-full border border-border bg-muted/60 px-2.5 py-1 text-xs font-semibold text-muted-foreground">
          {postsBadge}
        </span>

        {/* Accent line fills the rest of the row */}
        <div className="flex-1 h-px bg-border self-center" aria-hidden />
      </div>

      {/* ── Month groups ──────────────────────────────────────── */}
      <div
        className={`
          relative space-y-10
          ${isRTL ? "pr-6 border-r-2 border-border/40" : "pl-6 border-l-2 border-border/40"}
        `}
      >
        {sortedMonths.map((month, monthIdx) => {
          const posts = months[month];

          return (
            <motion.div
              key={`${year}-${month}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.4,
                delay: monthIdx * 0.05,
                ease: "easeOut",
              }}
              className="space-y-4"
            >
              {/* Month label — sticky while scrolling through its posts */}
              <div
                className={`
                  sticky top-[4.5rem] z-10
                  flex items-center gap-2
                  ${isRTL ? "flex-row-reverse" : ""}
                `}
              >
                {/* Timeline dot */}
                <span
                  className={`
                    absolute w-2.5 h-2.5 rounded-full
                    bg-primary ring-2 ring-background
                    ${isRTL ? "-right-[1.375rem]" : "-left-[1.375rem]"}
                    top-1/2 -translate-y-1/2
                  `}
                  aria-hidden
                />

                <span className="inline-flex items-center gap-2 rounded-lg bg-background/90 backdrop-blur-sm border border-border px-3 py-1.5 text-sm font-semibold text-foreground shadow-sm">
                  {month}
                  <span className="text-xs font-normal text-muted-foreground">
                    ·{" "}
                    {locale === "fa"
                      ? `${fmt(posts.length)} مقاله`
                      : `${fmt(posts.length)} post${posts.length !== 1 ? "s" : ""}`}
                  </span>
                </span>
              </div>

              {/* Cards */}
              <div className="grid gap-3 sm:gap-4">
                {posts.map((post, postIdx) => (
                  <EnhancedBlogCard
                    key={post.slug}
                    post={post}
                    locale={locale}
                    index={monthIdx * 10 + postIdx}
                  />
                ))}
              </div>
            </motion.div>
          );
        })}

        {/* Timeline cap at the bottom of each year */}
        <div
          className={`
            absolute bottom-0 w-2.5 h-2.5 rounded-full
            bg-border
            ${isRTL ? "-right-[1.375rem]" : "-left-[1.375rem]"}
          `}
          aria-hidden
        />
      </div>
    </motion.section>
  );
}