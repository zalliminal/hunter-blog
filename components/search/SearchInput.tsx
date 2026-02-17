"use client";

import { useRef, useEffect } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  value: string;
  onChange: (value: string) => void;
  isPending?: boolean;
  locale: "en" | "fa";
  className?: string;
};

const i18n = {
  en: {
    placeholder: "Search posts, topics, tags…",
    label: "Search",
    clear: "Clear search",
  },
  fa: {
    placeholder: "جستجوی پست‌ها، موضوعات، تگ‌ها…",
    label: "جستجو",
    clear: "پاک کردن",
  },
};

export function SearchInput({ value, onChange, isPending, locale, className }: Props) {
  const t = i18n[locale];
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className={cn(
        "group relative flex items-center",
        className,
      )}
    >
      {/* Search icon / spinner */}
      <div
        className="pointer-events-none absolute left-4 text-muted-foreground transition-colors group-focus-within:text-primary"
        aria-hidden
      >
        <AnimatePresence mode="wait" initial={false}>
          {isPending ? (
            <motion.div
              key="spinner"
              initial={{ opacity: 0, scale: 0.7, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.7, rotate: 90 }}
              transition={{ duration: 0.15 }}
            >
              <Loader2 className="h-4 w-4 animate-spin" />
            </motion.div>
          ) : (
            <motion.div
              key="search"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.15 }}
            >
              <Search className="h-4 w-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <input
        ref={inputRef}
        type="search"
        aria-label={t.label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t.placeholder}
        dir={locale === "fa" ? "rtl" : "ltr"}
        className={cn(
          "h-12 w-full rounded-2xl border border-border bg-muted/40",
          "pl-11 pr-10 text-sm font-medium",
          "placeholder:text-muted-foreground/60",
          "outline-none ring-0",
          "transition-all duration-200",
          "focus:border-primary/60 focus:bg-background focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.08)]",
          "[&::-webkit-search-cancel-button]:hidden",
          locale === "fa" && "pl-10 pr-11 text-right",
        )}
      />

      {/* Clear button */}
      <AnimatePresence>
        {value.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.15 }}
            type="button"
            aria-label={t.clear}
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            className={cn(
              "absolute right-3 flex h-6 w-6 items-center justify-center rounded-full",
              "text-muted-foreground hover:bg-muted hover:text-foreground",
              "transition-colors",
              locale === "fa" && "left-3 right-auto",
            )}
          >
            <X className="h-3.5 w-3.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}