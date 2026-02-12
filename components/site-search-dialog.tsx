"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/lib/i18n";
import { Search } from "lucide-react";

type Result = {
  title: string;
  description: string;
  url: string;
  tags: string[];
  date?: string; // optional – to show "NEW" badge
};

type Props = {
  locale: Locale;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function SiteSearchDialog({ locale, open, onOpenChange }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const isRTL = locale === "fa";
  const dir = isRTL ? "rtl" : "ltr";

  // Localised strings
  const t = {
    placeholder: isRTL ? "جستجو در پست‌ها…" : "Search posts…",
    submit: isRTL ? "جستجو" : "Search",
    close: isRTL ? "بستن" : "Close",
    minChars: isRTL
      ? "حداقل دو کاراکتر بنویس."
      : "Type at least two characters.",
    searching: isRTL ? "در حال جستجو…" : "Searching…",
    noMatches: isRTL ? "چیزی پیدا نشد." : "No matches.",
    new: isRTL ? "جدید" : "NEW",
  };

  // --- Focus management ---
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
      // Small delay to let the animation start
      const id = requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
      return () => cancelAnimationFrame(id);
    } else {
      // Return focus to the element that opened the dialog
      triggerRef.current?.focus();
    }
  }, [open]);

  // --- Search logic (debounced) ---
  useEffect(() => {
    if (!open) return;

    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setLoading(false);
      setSelectedIndex(-1);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setSelectedIndex(-1);

    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?locale=${locale}&q=${encodeURIComponent(q)}`
        );
        if (!res.ok) throw new Error();
        const data = (await res.json()) as { results: Result[] };
        if (!cancelled) {
          setResults(data.results);
        }
      } catch {
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 200);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
    };
  }, [query, locale, open]);

  // --- Keyboard navigation ---
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      }

      if (e.key === "Enter" && selectedIndex >= 0) {
        e.preventDefault();
        const selected = results[selectedIndex];
        if (selected) {
          onOpenChange(false);
          router.push(selected.url);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, results, selectedIndex, router, onOpenChange]);

  // Scroll selected result into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      const items = listRef.current.querySelectorAll<HTMLAnchorElement>("a");
      items[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  // --- Helper: check if post is less than 7 days old ---
  const isNew = (dateString?: string) => {
    if (!dateString) return false;
    const postDate = new Date(dateString);
    const now = new Date();
    const diffDays = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);
    return diffDays <= 7;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onOpenChange(false);
    router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
  };

  // --- Animation variants ---
  const containerVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 300 } },
    exit: { opacity: 0, y: 8, transition: { duration: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 400 } },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center bg-background/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={t.placeholder}
          onClick={(e) => {
            // Close when clicking the backdrop
            if (e.target === e.currentTarget) onOpenChange(false);
          }}
        >
          <motion.div
            className="relative mt-24 w-full max-w-xl rounded-2xl border border-border bg-card/95 p-5 shadow-2xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            dir={dir}
          >
            {/* Close button – visible, always accessible */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-background border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label={t.close}
            >
              <span className="text-lg leading-none">✕</span>
            </button>

            {/* Search form */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <div className="relative flex-1">
                <span
                  className={`absolute inset-y-0 ${isRTL ? "right-3" : "left-3"} flex items-center text-muted-foreground`}
                >
                  <Search />
                </span>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t.placeholder}
                  className={`h-11 w-full rounded-full border border-border bg-background ${
                    isRTL ? "pr-10 pl-4" : "pl-10 pr-4"
                  } text-sm outline-none ring-offset-background transition focus:border-primary focus:ring-1 focus:ring-primary/30`}
                  dir="ltr" // keep search query LTR even in RTL layout
                />
              </div>
              <button
                type="submit"
                className="h-11 rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
              >
                {t.submit}
              </button>
            </form>

            {/* Results panel */}
            <div className="mt-5 max-h-80 overflow-y-auto" ref={listRef}>
              {query.trim().length < 2 ? (
                <p className="py-6 text-center text-xs text-muted-foreground">
                  {t.minChars}
                </p>
              ) : loading ? (
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="h-16 animate-pulse rounded-lg bg-muted/60"
                    />
                  ))}
                </div>
              ) : results.length === 0 ? (
                <p className="py-6 text-center text-xs text-muted-foreground">
                  {t.noMatches}
                </p>
              ) : (
                <motion.div
                  className="space-y-2 p-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: {
                      transition: { staggerChildren: 0.03, delayChildren: 0.1 },
                    },
                  }}
                >
                  {results.map((result, idx) => {
                    const isSelected = idx === selectedIndex;
                    const showNew = isNew(result.date);
                    return (
                      <motion.div key={result.url} variants={itemVariants}>
                        <Link
                          href={result.url}
                          onClick={() => onOpenChange(false)}
                          className={`block rounded-xl px-3 py-2.5 transition-colors border border-border bg-card shadow-sm mb-4 ${
                            isSelected
                              ? "bg-primary/10 text-primary ring-1 ring-primary/30"
                              : "hover:bg-muted"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2 ">
                            <div className="flex-1">
                              <div className="flex items-center gap-1.5 text-xs">
                                <span className="text-muted-foreground">🐛</span>
                                <span className="font-medium">{result.title}</span>
                                {showNew && (
                                  <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                                    {t.new}
                                  </span>
                                )}
                              </div>
                              <p className="line-clamp-2 text-[11px] text-muted-foreground mt-0.5">
                                {result.description}
                              </p>
                              {result.tags && result.tags.length > 0 && (
                                <div className="mt-1.5 flex flex-wrap gap-1">
                                  {result.tags.slice(0, 2).map((tag) => (
                                    <span
                                      key={tag}
                                      className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[9px] uppercase tracking-wider text-muted-foreground"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                  {result.tags.length > 2 && (
                                    <span className="text-[9px] text-muted-foreground">
                                      +{result.tags.length - 2}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            <span
                              className={`text-muted-foreground opacity-0 transition-opacity ${
                                isSelected ? "opacity-100" : "group-hover:opacity-100"
                              }`}
                            >
                              {isRTL ? "←" : "→"}
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </div>

            {/* Keyboard hints */}
            <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-3 text-[10px] text-muted-foreground">
              <div className="flex items-center gap-3">
                <span>↑/↓ • {t.submit}</span>
                <span>ESC • {t.close}</span>
              </div>
              {results.length > 0 && (
                <span>
                  {selectedIndex + 1}/{results.length}
                </span>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}