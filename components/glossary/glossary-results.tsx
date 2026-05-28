"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FileSearch2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import type { GlossaryTerm } from "@/lib/glossary-helpers";
import { GlossaryCard } from "./glossary-card";
import { useMemo, useState, useEffect, useRef } from "react";

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

  // استیت برای ذخیره حرف فعال در نوار ناوبری
  const [activeLetter, setActiveLetter] = useState<string | null>(null);

  // فیلتر کردن اصطلاحات بر اساس ورودی‌ها
  const filteredTerms = useMemo(() => {
    let results = terms;

    if (filters.category) {
      results = results.filter((term) => term.category === filters.category);
    }

    if (filters.difficulty) {
      results = results.filter((term) => term.difficulty === filters.difficulty);
    }

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

  // گروه‌بندی اصطلاحات بر اساس حروف الفبا
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

  const letters = useMemo(() => {
    if (!groupedTerms) return [];
    return Array.from(groupedTerms.keys());
  }, [groupedTerms]);

  // منطق تشخیص بخش فعال هنگام اسکرول (Scroll Sync)
  useEffect(() => {
    if (hasQuery || hasFilters || letters.length === 0) return;

    const observerOptions: IntersectionObserverInit = {
      root: null,
      // rootMargin: تشخیص نقطه فعال حدود 120 پیکسل از بالای صفحه
      rootMargin: "-120px 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const letter = entry.target.id.replace("letter-", "");
          setActiveLetter(letter);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    letters.forEach((letter) => {
      const element = document.getElementById(`letter-${letter}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [letters, hasQuery, hasFilters]);

  const scrollToLetter = (letter: string) => {
    const element = document.getElementById(`letter-${letter}`);
    if (element) {
      // محاسبه فاصله با احتساب هدر ثابت (Sticky)
      const offset = 140; 
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
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
            {/* تعداد نتایج */}
            <div className="flex items-center justify-between px-1">
              <p className="text-xs text-muted-foreground font-medium">
                {hasQuery || hasFilters
                  ? t.resultCount(filteredTerms.length)
                  : t.allTerms}
              </p>
              {(hasQuery || hasFilters) && (
                <p className="text-xs text-primary font-bold">
                   {t.resultCount(filteredTerms.length)}
                </p>
              )}
            </div>

            {/* نوار ناوبری حروف (Sticky Alphabet Bar) */}
            {!hasQuery && !hasFilters && letters.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "sticky top-16 z-20 rounded-xl border border-border bg-background/80 p-2 shadow-sm backdrop-blur-md",
                  "my-4"
                )}
              >
                <div className="flex flex-wrap items-center gap-2 px-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                    {t.jumpTo}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {letters.map((letter) => {
                      const isActive = activeLetter === letter;
                      return (
                        <button
                          key={letter}
                          onClick={() => scrollToLetter(letter)}
                          className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all duration-200",
                            isActive
                              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* لیست اصطلاحات */}
            {groupedTerms ? (
              <div className="space-y-12 pt-4">
                {Array.from(groupedTerms.entries()).map(([letter, letterTerms]) => (
                  <motion.div
                    key={letter}
                    id={`letter-${letter}`}
                    className="scroll-mt-32"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* سربرگ هر حرف */}
                    <div className="relative mb-6 flex items-center gap-4">
                      <h2
                        className={cn(
                          "text-3xl font-black tracking-tight text-primary",
                          isRTL ? "text-right" : "text-left"
                        )}
                      >
                        {letter}
                      </h2>
                      <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
                    </div>

                    {/* گرید کارت‌ها */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <AnimatePresence mode="popLayout">
                        {letterTerms.map((term) => (
                          <motion.div
                            key={term.slug}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
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
              <div className="grid gap-4 sm:grid-cols-2 pt-4">
                <AnimatePresence mode="popLayout">
                  {filteredTerms.map((term) => (
                    <motion.div
                      key={term.slug}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
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
