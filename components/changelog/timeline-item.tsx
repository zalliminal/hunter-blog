"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Wrench,
  GitCommitHorizontal,
  Settings2,
  Palette,
} from "lucide-react";
import { type ChangelogEntry, type ChangelogType, TYPE_CONFIG } from "@/lib/changelog";
import type { Locale } from "@/lib/i18n";

// Map icon name strings to actual Lucide components
const ICON_MAP = {
  Sparkles,
  Wrench,
  GitCommitHorizontal,
  Settings2,
  Palette,
} as const;

type Props = {
  entry: ChangelogEntry;
  locale: Locale;
  formatDate: (date: string) => string;
  index: number;
  prefersReduced: boolean | null;
  isRTL: boolean;
};

export default function TimelineItem({
  entry,
  locale,
  formatDate,
  index,
  prefersReduced,
  isRTL,
}: Props) {
  const cfg = TYPE_CONFIG[entry.type];
  const IconComponent = ICON_MAP[cfg.icon as keyof typeof ICON_MAP];
  const label = cfg.label[locale];

  // We use a specific pixel value to ensure the dot center aligns 
  // perfectly with the timeline line in the parent.
  const dotPositionClass = "top-[1.15rem]"; 

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04, ease: "easeOut" }}
      className={`relative flex items-start gap-5 ${isRTL ? "pr-10 md:pr-14" : "pl-10 md:pl-14"}`}
    >
      {/* ── Timeline dot ────────────────────────────────────────────── */}
      <div
        className={`
          absolute flex h-5 w-5 items-center justify-center rounded-full border-2
          ${isRTL ? "right-0" : "left-0"}
          ${dotPositionClass}
          ${cfg.dot}
          bg-card
        `}
      >
        {/* Pulse effect for important items */}
        {entry.important && !prefersReduced && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30"
            animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        
        {/* Icon inside the dot */}
        <IconComponent className={`h-2.5 w-2.5 ${cfg.text}`} />
      </div>

      {/* ── Card ────────────────────────────────────────────────────── */}
      <div
        className={`
          group w-full rounded-2xl border bg-card/60 p-4 backdrop-blur-sm
          transition-all duration-200
          hover:border-primary/30 hover:bg-card/80 hover:shadow-sm
          ${entry.important
            ? "border-primary/20 bg-primary/[0.03]"
            : "border-border/50"
          }
        `}
      >
        {/* Top row: badge + date + important pill */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Type badge with icon */}
          <span
            className={`
              inline-flex items-center gap-1 rounded-full border px-2 py-0.5
              text-[10px] font-semibold uppercase tracking-wider
              ${cfg.pill}
            `}
          >
            <IconComponent className="h-2.5 w-2.5" aria-hidden />
            {label}
          </span>

          {/* Date */}
          <span className="text-[11px] tabular-nums text-muted-foreground/60">
            {formatDate(entry.date)}
          </span>

          {/* Important marker */}
          {entry.important && (
            <span className="ms-auto rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-primary">
              {locale === "fa" ? "مهم" : "Key"}
            </span>
          )}
        </div>

        {/* Title */}
        <p className="mt-2 text-[13px] font-semibold leading-snug text-foreground md:text-sm">
          {entry.title[locale]}
        </p>

        {/* Description */}
        {entry.description && (
          <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground md:text-[13px]">
            {entry.description[locale]}
          </p>
        )}

        {/* Author */}
        <p className="mt-3 text-[10px] text-muted-foreground/40">
          @{entry.author}
        </p>
      </div>
    </motion.div>
  );
}