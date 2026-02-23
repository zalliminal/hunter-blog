"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

type Filters = {
  query: string;
  category: string | null;
  difficulty: string | null;
};

type Props = {
  filters: Filters;
  locale: Locale;
  onRemoveQuery: () => void;
  onRemoveCategory: () => void;
  onRemoveDifficulty: () => void;
  onClearAll: () => void;
};

const i18n = {
  en: {
    clearAll: "Clear all",
    remove: "Remove filter",
    query: "Query",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  },
  fa: {
    clearAll: "پاک کردن همه",
    remove: "حذف فیلتر",
    query: "جستجو",
    beginner: "مبتدی",
    intermediate: "متوسط",
    advanced: "پیشرفته",
  },
};

type ChipItem = {
  id: string;
  label: string;
  color?: string;
  onRemove: () => void;
};

export function ActiveGlossaryFilters({
  filters,
  locale,
  onRemoveQuery,
  onRemoveCategory,
  onRemoveDifficulty,
  onClearAll,
}: Props) {
  const t = i18n[locale];
  const dir = locale === "fa" ? "rtl" : "ltr";

  const chips: ChipItem[] = [];

  // Query chip
  if (filters.query.length >= 2) {
    chips.push({
      id: "q",
      label: `"${filters.query}"`,
      onRemove: onRemoveQuery,
    });
  }

  // Category chip
  if (filters.category) {
    chips.push({
      id: "category",
      label: filters.category,
      onRemove: onRemoveCategory,
    });
  }

  // Difficulty chip
  if (filters.difficulty) {
    const difficultyLabels: Record<string, string> = {
      beginner: t.beginner,
      intermediate: t.intermediate,
      advanced: t.advanced,
    };
    const difficultyColors: Record<string, string> = {
      beginner: "hsl(221 83% 53%)",
      intermediate: "hsl(173 80% 40%)",
      advanced: "hsl(0 84% 60%)",
    };
    chips.push({
      id: "difficulty",
      label: difficultyLabels[filters.difficulty],
      color: difficultyColors[filters.difficulty],
      onRemove: onRemoveDifficulty,
    });
  }

  if (chips.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div className="flex flex-wrap items-center gap-1.5 py-1" dir={dir} lang={locale}>
        <AnimatePresence initial={false}>
          {chips.map((chip) => (
            <motion.div
              key={chip.id}
              layout
              initial={{ opacity: 0, scale: 0.8, x: dir === "rtl" ? 4 : -4 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.7, x: dir === "rtl" ? 4 : -4 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <span
                className={cn(
                  "inline-flex h-7 items-center gap-1.5 rounded-lg px-2.5 text-xs font-medium",
                  "border bg-muted/60",
                  chip.color
                    ? "border-transparent"
                    : "border-border text-foreground"
                )}
                style={
                  chip.color
                    ? {
                        borderColor: `color-mix(in oklch, ${chip.color} 30%, transparent)`,
                        backgroundColor: `color-mix(in oklch, ${chip.color} 12%, transparent)`,
                        color: chip.color,
                      }
                    : undefined
                }
              >
                {chip.label}
                <button
                  type="button"
                  aria-label={t.remove}
                  onClick={chip.onRemove}
                  className="flex h-3.5 w-3.5 items-center justify-center rounded-full opacity-60 transition-opacity hover:opacity-100"
                >
                  <X className="h-2.5 w-2.5" />
                </button>
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {chips.length > 1 && (
          <motion.button
            layout
            type="button"
            onClick={onClearAll}
            className="h-7 rounded-lg px-2 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline transition-colors"
          >
            {t.clearAll}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}