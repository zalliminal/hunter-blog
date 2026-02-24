"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef, useState, useMemo } from "react";
import type { Locale } from "@/lib/i18n";
import { getDirection } from "@/lib/i18n";
import {
  CHANGELOG_DATA,
  TYPE_CONFIG,
  type ChangelogEntry,
  type ChangelogType,
} from "@/lib/changelog";
import TimelineItem from "./timeline-item";

type FilterType = "all" | ChangelogType;

const FILTER_KEYS: FilterType[] = ["all", "feat", "fix", "rebrand", "patch", "chore"];

// ─────────────────────────────────────────────────────────────────────────────

function groupByMonth(entries: ChangelogEntry[], locale: Locale) {
  const groups: { key: string; entries: ChangelogEntry[] }[] = [];
  const seen = new Map<string, number>();

  for (const entry of entries) {
    const key = new Date(entry.date).toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
    });
    if (seen.has(key)) {
      groups[seen.get(key)!].entries.push(entry);
    } else {
      seen.set(key, groups.length);
      groups.push({ key, entries: [entry] });
    }
  }
  return groups;
}

// ─────────────────────────────────────────────────────────────────────────────

export default function ChangelogClient({ locale }: { locale: Locale }) {
  const dir = getDirection(locale);
  const isRTL = locale === "fa";
  const prefersReduced = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  
  // Ref for the scroll container to calculate progress
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform scroll progress to scale Y (0 to 1)
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString(locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const filtered = useMemo(
    () =>
      activeFilter === "all"
        ? CHANGELOG_DATA
        : CHANGELOG_DATA.filter((e) => e.type === activeFilter),
    [activeFilter]
  );

  const groups = useMemo(() => groupByMonth(filtered, locale), [filtered, locale]);

  const totalByType = useMemo(() => {
    const counts: Partial<Record<FilterType, number>> = { all: CHANGELOG_DATA.length };
    for (const e of CHANGELOG_DATA) {
      counts[e.type] = (counts[e.type] ?? 0) + 1;
    }
    return counts;
  }, []);

  return (
    // Added ref here for scroll calculation
    <div ref={containerRef} dir={dir} className="relative min-h-screen pb-20">

      {/* ── Page header ──────────────────────────────────────────────── */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-12 space-y-2"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          {locale === "fa" ? "تاریخچه" : "History"}
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          {locale === "fa" ? "تغییرات و به‌روزرسانی‌ها" : "Changelog"}
        </h1>
        <p className="max-w-md text-sm text-muted-foreground">
          {locale === "fa"
            ? "هر به‌روزرسانی، بهبود و رفع اشکال در یک مکان."
            : "Every update, improvement and fix — in one place."}
        </p>
      </motion.div>

      {/* ── Filters ──────────────────────────────────────────────────── */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="mb-10 flex flex-wrap gap-2"
      >
        {FILTER_KEYS.map((key) => {
          const isActive = activeFilter === key;
          const count = totalByType[key] ?? 0;
          if (key !== "all" && count === 0) return null;

          const label =
            key === "all"
              ? locale === "fa"
                ? "همه"
                : "All"
              : TYPE_CONFIG[key as ChangelogType].label[locale];

          return (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={`
                inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5
                text-[11px] font-medium transition-all duration-150
                ${
                  isActive
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border/50 bg-card/40 text-muted-foreground hover:border-border hover:text-foreground"
                }
              `}
            >
              {label}
              <span
                className={`
                  rounded-full px-1.5 py-px text-[9px] font-bold tabular-nums
                  ${isActive ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}
                `}
              >
                {count}
              </span>
            </button>
          );
        })}
      </motion.div>

      {/* ── Timeline ─────────────────────────────────────────────────── */}
      <div className="relative">
        
        {/* 
           Vertical Rule Container 
           Positioned absolutely to align with the dots in TimelineItem 
        */}
        <div
          className={`
            pointer-events-none absolute top-[1.15rem] bottom-0 w-px
            ${isRTL ? "right-2" : "left-2"}
          `}
        >
          {/* Background Track (The empty part of the line) */}
          <div className="absolute inset-0 bg-border/40" />

          {/* Progress Fill (The colored part that grows) */}
          <motion.div
            style={{ scaleY }}
            className="absolute top-0 w-full origin-top bg-gradient-to-b from-primary to-primary/40"
          />
        </div>

        <div className="space-y-12">
          {groups.map(({ key: month, entries }, groupIdx) => (
            <motion.section
              key={month}
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: groupIdx * 0.08 }}
            >
              {/* Month divider */}
              <div
                className={`
                  mb-5 flex items-center gap-3
                  ${isRTL ? "pr-10 md:pr-14" : "pl-10 md:pl-14"}
                `}
              >
                <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground/60">
                  {month}
                </span>
                <div className="h-px flex-1 bg-border/40" />
              </div>

              {/* Entries */}
              <div className="space-y-4">
                {entries.map((entry, i) => (
                  <TimelineItem
                    key={`${entry.date}-${entry.title.en}`}
                    entry={entry}
                    locale={locale}
                    formatDate={formatDate}
                    index={i}
                    prefersReduced={prefersReduced}
                    isRTL={isRTL}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* Empty state */}
        {groups.length === 0 && (
          <div className="py-16 text-center text-sm text-muted-foreground">
            {locale === "fa" ? "موردی یافت نشد." : "No entries found."}
          </div>
        )}
      </div>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <p className="mt-16 text-center text-[10px] text-muted-foreground/40">
        {locale === "fa" ? "ساخته شده با عشق و قهوه ☕" : "Built with love and coffee ☕"}
      </p>
    </div>
  );
}