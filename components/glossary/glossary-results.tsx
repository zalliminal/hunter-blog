"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileSearch2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import type { GlossaryTerm } from "@/lib/glossary-helpers";
import { GlossaryCard } from "./glossary-card";
import { useMemo } from "react";

type Filters = {
  query: string;
  category: string | null;
  difficulty: string | null;
};

type Props = {
  terms: GlossaryTerm[];
  filters: Filters;
  hasQuery: boolean;
  hasFilters: boolean;
  locale: Locale;
};

const i18n = {
  en: {
    noResults: "No terms found",
    noResultsHint: "Try a different keyword or remove some filters.",
    resultCount: (n: number) => `${n} term${n === 1 ? "" : "s"}`,
    allTerms: "All Terms",
    jumpTo: "Jump to:",
  },
  fa: {
    noResults: "هیچ اصطلاحی یافت نشد",
    noResultsHint: "کلمه‌ی دیگری را امتحان کنید یا فیلترها را حذف کنید.",
    resultCount: (n: number) => `${n} اصطلاح`,
    allTerms: "همه اصطلاحات",
    jumpTo: "پرش به:",
  },
};

export function GlossaryResults({
  terms,
  filters,
  hasQuery,
  hasFilters,
  locale,
}: Props) {
  const t = i18n[locale];
  const dir = locale === "fa" ? "rtl" : "ltr";
  const isRTL = locale === "fa";

  // Filter terms based on filters
  const filteredTerms = useMemo(() => {
    let results = terms;

    // Filter by category
    if (filters.category) {
      results = results.filter((term) => term.category === filters.category);
    }

    // Filter by difficulty
    if (filters.difficulty) {
      results = results.filter((term) => term.difficulty === filters.difficulty);
    }

    // Search by query (only if 2+ characters)
    if (filters.query && filters.query.trim().length >= 2) {
      const query = filters.query.toLowerCase().trim();
      results = results.filter((term) => {
        const searchableText = [
          term.term,
          term.abbreviation,
          term.shortDefinition,
          term.category,
          ...term.tags,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return searchableText.includes(query);
      });
    }

    return results;
  }, [terms, filters]);

  // Group terms by first letter (only when not filtering)
  const groupedTerms = useMemo(() => {
    if (hasQuery || hasFilters) return null;
    
    const groups = new Map<string, GlossaryTerm[]>();

    filteredTerms.forEach((term) => {
      const firstChar = term.term.charAt(0).toUpperCase();
      if (!groups.has(firstChar)) {
        groups.set(firstChar, []);
      }
      groups.get(firstChar)!.push(term);
    });

    return new Map(
      [...groups.entries()].sort((a, b) => a[0].localeCompare(b[0], locale))
    );
  }, [filteredTerms, locale, hasQuery, hasFilters]);

  // Get all first letters for navigation
  const letters = useMemo(() => {
    if (!groupedTerms) return [];
    return Array.from(groupedTerms.keys());
  }, [groupedTerms]);

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const showEmpty = filteredTerms.length === 0 && (hasQuery || hasFilters);
  const showAll = filteredTerms.length > 0;

  return (
    <div className="min-h-[240px]" dir={dir}>
      <AnimatePresence initial={false}>
        {showEmpty && (
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

        {showAll && (
          <motion.div
            key="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="space-y-4"
          >
            {/* Result count / Section title */}
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {hasQuery || hasFilters
                  ? t.resultCount(filteredTerms.length)
                  : t.allTerms}
              </p>
              <p className="text-xs text-muted-foreground">
                {t.resultCount(filteredTerms.length)}
              </p>
            </div>

            {/* Alphabetical Navigation Bar (only when browsing all terms) */}
            {!hasQuery && !hasFilters && letters.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "sticky top-16 z-10 rounded-lg border border-border bg-background/95 p-3 shadow-sm backdrop-blur-sm",
                  isRTL ? "text-right" : "text-left"
                )}
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t.jumpTo}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {letters.map((letter) => (
                      <button
                        key={letter}
                        onClick={() => scrollToLetter(letter)}
                        className="flex h-7 w-7 items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Cards grid - Grouped by letter or flat list */}
            {groupedTerms ? (
              <div className="space-y-12">
                {Array.from(groupedTerms.entries()).map(([letter, letterTerms]) => (
                  <motion.div
                    key={letter}
                    id={`letter-${letter}`}
                    className="scroll-mt-32"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Letter heading */}
                    <h2
                      className={cn(
                        "mb-4 text-2xl font-bold tracking-tight text-primary",
                        isRTL ? "text-right" : "text-left"
                      )}
                    >
                      {letter}
                    </h2>

                    {/* Grid of terms */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <AnimatePresence initial={false}>
                        {letterTerms.map((term) => (
                          <motion.div
                            key={term.slug}
                            layout
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                          >
                            <GlossaryCard term={term} locale={locale} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                <AnimatePresence initial={false}>
                  {filteredTerms.map((term) => (
                    <motion.div
                      key={term.slug}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                      <GlossaryCard term={term} locale={locale} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}