"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useId } from "react";
import type { Locale } from "@/lib/i18n";
import { Search, X, Loader2, ArrowUpRight, Clock, Hash, FileText } from "lucide-react";

type Result = {
  title: string;
  description: string;
  url: string;
  tags: string[];
  date?: string;
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

  const listboxId = useId();
  const getOptionId = (idx: number) => `${listboxId}-option-${idx}`;

  const isRTL = locale === "fa";
  const dir = isRTL ? "rtl" : "ltr";

  const t = {
    placeholder: isRTL ? "جستجو در پست‌ها…" : "Search posts…",
    submit: isRTL ? "جستجو" : "Search",
    close: isRTL ? "بستن" : "Close",
    minChars: isRTL ? "حداقل دو کاراکتر بنویس." : "Type at least 2 characters.",
    noMatches: isRTL ? "چیزی پیدا نشد." : "No matches found.",
    noMatchesSub: isRTL ? "سعی کنید کلمات کلیدی دیگری امتحان کنید" : "Try different keywords or check your spelling",
    new: isRTL ? "جدید" : "NEW",
    idleHint: isRTL ? "شروع به تایپ کنید تا پست‌ها را جستجو کنید" : "Start typing to search through posts",
    resultsCount: (n: number) => isRTL ? `${n} نتیجه` : `${n} result${n !== 1 ? "s" : ""}`,
  };

  // Focus management
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
      const id = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    } else {
      triggerRef.current?.focus();
      setQuery("");
      setResults([]);
      setSelectedIndex(-1);
    }
  }, [open]);

  // Search with debounce
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
        const res = await fetch(`/api/search?locale=${locale}&q=${encodeURIComponent(q)}`);
        if (!res.ok) throw new Error();
        const data = (await res.json()) as { results: Result[] };
        if (!cancelled) setResults(data.results);
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

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onOpenChange(false);
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((p) => Math.min(p + 1, results.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((p) => Math.max(p - 1, -1));
          break;
        case "Enter":
          if (selectedIndex >= 0) {
            e.preventDefault();
            const selected = results[selectedIndex];
            if (selected) {
              onOpenChange(false);
              router.push(selected.url);
            }
          }
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, results, selectedIndex, router, onOpenChange]);

  // Scroll selected into view
  useEffect(() => {
    if (selectedIndex >= 0 && listRef.current) {
      listRef.current
        .querySelector(`#${getOptionId(selectedIndex)}`)
        ?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  }, [selectedIndex]);

  const isNew = (dateString?: string) => {
    if (!dateString) return false;
    return (Date.now() - new Date(dateString).getTime()) / 86400000 <= 7;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString(isRTL ? "fa-IR" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    onOpenChange(false);
    router.push(`/${locale}/search?q=${encodeURIComponent(query.trim())}`);
  };

  const showEmpty = !loading && results.length === 0 && query.trim().length >= 2;
  const showIdle = query.trim().length < 2;
  const showResults = !loading && results.length > 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            aria-hidden
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={t.placeholder}
            dir={dir}
            className="fixed inset-x-0 top-[8vh] z-50 mx-auto w-full max-w-2xl px-4"
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
          >
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">

              {/* ── Search bar ─────────────────────────────────────── */}
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-2 p-2 border-b border-border">

                  {/* Animated icon */}
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center text-muted-foreground"
                    aria-hidden
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {loading ? (
                        <motion.span
                          key="spin"
                          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        </motion.span>
                      ) : (
                        <motion.span
                          key="icon"
                          initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                          animate={{ opacity: 1, rotate: 0, scale: 1 }}
                          exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                          transition={{ duration: 0.15 }}
                        >
                          <Search className="h-5 w-5" />
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Input */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t.placeholder}
                    dir={dir}
                    role="combobox"
                    aria-expanded={results.length > 0}
                    aria-controls={listboxId}
                    aria-activedescendant={
                      selectedIndex >= 0 ? getOptionId(selectedIndex) : undefined
                    }
                    aria-autocomplete="list"
                    className="h-11 flex-1 bg-transparent text-base font-medium outline-none placeholder:text-muted-foreground/40"
                  />

                  {/* Clear button */}
                  <AnimatePresence>
                    {query.length > 0 && (
                      <motion.button
                        type="button"
                        initial={{ opacity: 0, scale: 0.6 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.6 }}
                        transition={{ duration: 0.12 }}
                        onClick={() => { setQuery(""); inputRef.current?.focus(); }}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        aria-label="Clear"
                      >
                        <X className="h-3.5 w-3.5" />
                      </motion.button>
                    )}
                  </AnimatePresence>

                  {/* Separator */}
                  <div className="h-5 w-px bg-border shrink-0" aria-hidden />

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={query.trim().length < 2}
                    className="flex h-9 shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-95 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Search className="h-3.5 w-3.5" />
                    {t.submit}
                  </button>

                  {/* Close button */}
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    aria-label={t.close}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </form>

              {/* ── Results body ───────────────────────────────────── */}
              <div
                id={listboxId}
                role="listbox"
                ref={listRef}
                className="max-h-[62vh] overflow-y-auto overscroll-contain"
              >

                {/* Idle state */}
                {showIdle && (
                  <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-muted/50">
                      <Search className="h-6 w-6 text-muted-foreground/40" />
                    </div>
                    <p className="text-sm text-muted-foreground max-w-[220px] leading-relaxed">
                      {t.idleHint}
                    </p>
                  </div>
                )}

                {/* Loading skeletons */}
                {loading && (
                  <div className="p-3 space-y-2">
                    {[1, 0.75, 0.5].map((opacity, i) => (
                      <div
                        key={i}
                        className="flex gap-3 rounded-xl border border-border/50 p-3.5"
                        style={{ opacity }}
                      >
                        <div className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-muted" />
                        <div className="flex-1 space-y-2 py-0.5">
                          <div className="h-3.5 w-3/5 animate-pulse rounded-md bg-muted" />
                          <div className="h-2.5 w-4/5 animate-pulse rounded-md bg-muted/70" />
                          <div className="flex gap-1.5 pt-0.5">
                            <div className="h-2 w-12 animate-pulse rounded-full bg-muted/50" />
                            <div className="h-2 w-16 animate-pulse rounded-full bg-muted/50" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* No results */}
                {showEmpty && (
                  <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-muted/50">
                      <FileText className="h-6 w-6 text-muted-foreground/40" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{t.noMatches}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{t.noMatchesSub}</p>
                    </div>
                    <p className="rounded-lg border border-border/60 bg-muted/40 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                      &ldquo;{query}&rdquo;
                    </p>
                  </div>
                )}

                {/* Results list */}
                {showResults && (
                  <motion.div
                    className="p-3 space-y-2"
                    initial="hidden"
                    animate="visible"
                    variants={{ visible: { transition: { staggerChildren: 0.04 } } }}
                  >
                    {/* Count label */}
                    <div className={`flex items-center px-1 pb-1 ${isRTL ? "justify-end" : ""}`}>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                        {t.resultsCount(results.length)}
                      </span>
                    </div>

                    {results.map((result, idx) => {
                      const isSelected = idx === selectedIndex;
                      const fresh = isNew(result.date);
                      const date = formatDate(result.date);

                      return (
                        <motion.div
                          key={result.url}
                          id={getOptionId(idx)}
                          role="option"
                          aria-selected={isSelected}
                          variants={{
                            hidden: { opacity: 0, y: 8 },
                            visible: {
                              opacity: 1,
                              y: 0,
                              transition: { duration: 0.18, ease: "easeOut" },
                            },
                          }}
                        >
                          <Link
                            href={result.url}
                            onClick={() => onOpenChange(false)}
                            className={`
                              group relative flex items-start gap-3.5 rounded-xl border p-3.5
                              outline-none transition-all duration-150
                              ${isSelected
                                ? "border-primary/40 bg-primary/5 shadow-sm shadow-primary/10"
                                : "border-border/60 bg-card hover:border-border hover:bg-muted/40"
                              }
                            `}
                          >
                            {/* Article icon */}
                            <div className={`
                              mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-150
                              ${isSelected
                                ? "border-primary/30 bg-primary/10 text-primary"
                                : "border-border bg-muted/60 text-muted-foreground group-hover:bg-muted"
                              }
                            `}>
                              <FileText className="h-4 w-4" />
                            </div>

                            {/* Text content */}
                            <div className={`min-w-0 flex-1 ${isRTL ? "text-right" : ""}`}>

                              {/* Title + NEW badge */}
                              <div className={`flex items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
                                <span className={`
                                  truncate text-sm font-semibold leading-snug transition-colors duration-150
                                  ${isSelected ? "text-primary" : "text-foreground"}
                                `}>
                                  {result.title}
                                </span>
                                {fresh && (
                                  <span className="shrink-0 inline-flex items-center rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-500 ring-1 ring-emerald-500/20">
                                    {t.new}
                                  </span>
                                )}
                              </div>

                              {/* Description */}
                              {result.description && (
                                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                                  {result.description}
                                </p>
                              )}

                              {/* Tags + date */}
                              <div className={`mt-2 flex flex-wrap items-center gap-1.5 ${isRTL ? "flex-row-reverse" : ""}`}>
                                {result.tags?.slice(0, 3).map((tag) => (
                                  <span
                                    key={tag}
                                    className={`
                                      inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-medium transition-colors
                                      ${isSelected
                                        ? "bg-primary/10 text-primary/70"
                                        : "bg-muted text-muted-foreground"
                                      }
                                    `}
                                  >
                                    <Hash className="h-2.5 w-2.5" />
                                    {tag}
                                  </span>
                                ))}
                                {date && (
                                  <span className={`flex items-center gap-1 text-[10px] text-muted-foreground/50 ${isRTL ? "" : "ml-auto"}`}>
                                    <Clock className="h-2.5 w-2.5" />
                                    {date}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Arrow */}
                            <div
                              className={`
                                mt-0.5 shrink-0 transition-all duration-150
                                ${isSelected
                                  ? "translate-x-0 opacity-100 text-primary"
                                  : "-translate-x-1 opacity-0 text-muted-foreground group-hover:translate-x-0 group-hover:opacity-60"
                                }
                              `}
                              aria-hidden
                            >
                              <ArrowUpRight className="h-4 w-4" />
                            </div>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </div>

              {/* ── Footer: kbd hints + counter ────────────────────── */}
              <div className={`
                flex items-center justify-between border-t border-border/50 px-4 py-2.5
                ${isRTL ? "flex-row-reverse" : ""}
              `}>
                <div className={`flex items-center gap-3 text-[10px] text-muted-foreground/70 ${isRTL ? "flex-row-reverse" : ""}`}>
                  {[
                    { key: "↑↓", label: isRTL ? "ناوبری" : "navigate" },
                    { key: "↵", label: isRTL ? "انتخاب" : "select" },
                    { key: "Esc", label: isRTL ? "بستن" : "close" },
                  ].map(({ key, label }) => (
                    <span key={key} className="flex items-center gap-1">
                      <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[9px]">
                        {key}
                      </kbd>
                      {label}
                    </span>
                  ))}
                </div>

                {results.length > 0 && (
                  <span className="tabular-nums text-[10px] font-medium text-muted-foreground/60">
                    {selectedIndex >= 0
                      ? `${selectedIndex + 1} / ${results.length}`
                      : results.length}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}