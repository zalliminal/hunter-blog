"use client";

import { forwardRef } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

type Props = {
  value: string;
  onChange: (value: string) => void;
  locale: Locale;
  isPending?: boolean;
};

const i18n = {
  en: {
    placeholder: "Search terms by name, definition, or tag…",
    clear: "Clear search",
  },
  fa: {
    placeholder: "جستجو بر اساس نام، تعریف یا تگ…",
    clear: "پاک کردن جستجو",
  },
};

export const GlossarySearchInput = forwardRef<HTMLInputElement, Props>(
  function GlossarySearchInput({ value, onChange, locale, isPending }, ref) {
    const t = i18n[locale];
    const isRTL = locale === "fa";
    const dir = isRTL ? "rtl" : "ltr";

    return (
      <div className="relative" dir={dir}>
        <Search
          className={cn(
            "absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60",
            isRTL ? "right-4" : "left-4"
          )}
        />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.placeholder}
          className={cn(
            "h-12 w-full rounded-2xl border border-border bg-background px-11 py-2 text-sm",
            "transition-all duration-200 outline-none",
            "placeholder:text-muted-foreground/60",
            "focus:border-primary/40 focus:ring-4 focus:ring-primary/10",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            isRTL ? "text-right" : "text-left"
          )}
          dir={dir}
          lang={locale}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label={t.clear}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 rounded-full p-1.5",
              "transition-colors hover:bg-muted",
              isRTL ? "left-2" : "right-2"
            )}
          >
            <X className="h-3.5 w-3.5 text-muted-foreground" />
          </button>
        )}
        {isPending && (
          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent",
              isRTL ? "left-4" : "right-4"
            )}
          />
        )}
      </div>
    );
  }
);

GlossarySearchInput.displayName = "GlossarySearchInput";