"use client";

import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  getAllCategories,
  getAllAuthors,
} from "@/lib/categories_and_authors";
import type { CategoryId, AuthorId } from "@/lib/categories_and_authors";
import type { SearchFilters } from "@/hooks/useSearchState";

type Props = {
  filters: SearchFilters;
  locale: "en" | "fa";
  onRemoveCategory: (id: CategoryId) => void;
  onRemoveAuthor: (id: AuthorId) => void;
  onRemoveTag: (tag: string) => void;
  onRemoveQuery: () => void;
  onClearAll: () => void;
};

const i18n = {
  en: {
    clearAll: "Clear all",
    query: "Query",
    remove: "Remove filter",
  },
  fa: {
    clearAll: "پاک کردن همه",
    query: "جستجو",
    remove: "حذف فیلتر",
  },
};

type ChipItem = {
  id: string;
  label: string;
  color?: string;
  onRemove: () => void;
};

export function ActiveFilters({
  filters,
  locale,
  onRemoveCategory,
  onRemoveAuthor,
  onRemoveTag,
  onRemoveQuery,
  onClearAll,
}: Props) {
  const t = i18n[locale];
  const categories = getAllCategories();
  const authors = getAllAuthors();
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

  // Category chips
  for (const id of filters.categories) {
    const cat = categories.find((c) => c.id === id);
    if (cat) {
      chips.push({
        id: `cat-${id}`,
        label: cat.label[locale],
        color: cat.color.oklch,
        onRemove: () => onRemoveCategory(id),
      });
    }
  }

  // Author chips
  for (const id of filters.authors) {
    const author = authors.find((a) => a.id === id);
    if (author) {
      chips.push({
        id: `author-${id}`,
        label: author.name[locale],
        onRemove: () => onRemoveAuthor(id),
      });
    }
  }

  // Tag chips
  for (const tag of filters.tags) {
    chips.push({
      id: `tag-${tag}`,
      label: `#${tag}`,
      onRemove: () => onRemoveTag(tag),
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
      <div
        className="flex flex-wrap items-center gap-1.5 py-1"
        dir={dir}
        lang={locale}
      >
        <AnimatePresence initial={false}>
          {chips.map((chip) => (
            <motion.div
              key={chip.id}
              layout
              // Chips should slide in from the logical start direction.
              // In RTL the start is on the right, so x should be positive.
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
                    : "border-border text-foreground",
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