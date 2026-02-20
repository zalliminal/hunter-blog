"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileSearch2, Search } from "lucide-react";
import { BlogCard } from "@/components/blog-card";
import type { Post } from "@/lib/blog";
import type { SearchResult } from "@/hooks/useFilteredPosts";

type Props = {
  results: SearchResult[];
  hasQuery: boolean;
  hasFilters: boolean;
  isPending: boolean;
  locale: "en" | "fa";
};

const i18n = {
  en: {
    noResults: "No posts found",
    noResultsHint: "Try a different keyword or remove some filters.",
    startPrompt: "Start typing to search…",
    startPromptSub: "Search by title, description, or tag.",
    resultCount: (n: number) => `${n} result${n === 1 ? "" : "s"}`,
  },
  fa: {
    noResults: "پستی یافت نشد",
    noResultsHint: "کلمه‌ی دیگری رو امتحان کن یا فیلترها رو کم کن.",
    startPrompt: "برای جستجو تایپ کن…",
    startPromptSub: "جستجو بر اساس عنوان، توضیحات یا تگ.",
    resultCount: (n: number) => `${n} نتیجه`,
  },
};

export function SearchResults({
  results,
  hasQuery,
  hasFilters,
  isPending,
  locale,
}: Props) {
  const t = i18n[locale];
  const dir = locale === "fa" ? "rtl" : "ltr";

  const showEmpty = !isPending && results.length === 0 && (hasQuery || hasFilters);
  const showIdle = !hasQuery && !hasFilters;

  const panel: "idle" | "empty" | "results" =
    showIdle && !isPending
      ? "idle"
      : showEmpty
        ? "empty"
        : "results";

  return (
    <div className="min-h-[240px]" dir={dir}>
      <AnimatePresence initial={false}>
        {panel === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col items-center justify-center gap-3 py-20 text-center"
          >
            <div className="rounded-2xl bg-muted/60 p-4">
              <Search className="h-7 w-7 text-muted-foreground/60" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{t.startPrompt}</p>
            <p className="text-xs text-muted-foreground/60">{t.startPromptSub}</p>
          </motion.div>
        )}

        {panel === "empty" && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col items-center justify-center gap-3 py-20 text-center"
          >
            <div className="rounded-2xl bg-muted/60 p-4">
              <FileSearch2 className="h-7 w-7 text-muted-foreground/60" />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{t.noResults}</p>
            <p className="text-xs text-muted-foreground/60">{t.noResultsHint}</p>
          </motion.div>
        )}

        {panel === "results" && results.length > 0 && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="space-y-4"
          >
            {/* Result count — updates in-place */}
            <p className="text-xs text-muted-foreground">
              {t.resultCount(results.length)}
            </p>

            {/* Cards grid — AnimatePresence on children handles add/remove */}
            <div className="grid gap-4 sm:grid-cols-2">
              <AnimatePresence initial={false}>
                {results.map(({ post }) => (
                  <motion.div
                    key={post.slug}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                  >
                    <BlogCard post={post} locale={locale} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}