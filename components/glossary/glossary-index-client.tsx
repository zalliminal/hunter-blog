"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import type { GlossaryTerm } from "@/lib/glossary-helpers";
import { useDebounce } from "@/hooks/useDebounce";
import { GlossarySearchInput } from "./glossary-search-input";
import { GlossaryFilterBar } from "./glossary-filter-bar";
import { ActiveGlossaryFilters } from "./active-glossary-filters";
import { GlossaryResults } from "./glossary-results";
import { cn } from "@/lib/utils";

type Props = {
  terms: GlossaryTerm[];
  categories: string[];
  locale: Locale;
  fontClassName?: string;
};

type Filters = {
  query: string;
  category: string | null;
  difficulty: string | null;
};

const i18n = {
  en: {
    title: "Security Glossary",
    subtitle: "Comprehensive guide to cybersecurity concepts, terms, and techniques.",
  },
  fa: {
    title: "واژه‌نامه امنیت",
    subtitle: "راهنمای جامع مفاهیم، اصطلاحات و تکنیک‌های امنیت سایبری.",
  },
};

export function GlossaryIndexClient({
  terms,
  categories,
  locale,
  fontClassName,
}: Props) {
  const t = i18n[locale];
  const dir = locale === "fa" ? "rtl" : "ltr";

  const [filters, setFilters] = useState<Filters>({
    query: "",
    category: null,
    difficulty: null,
  });

  // Local controlled input value — debounced before committing to filters
  const [inputValue, setInputValue] = useState("");
  const debouncedQuery = useDebounce(inputValue, 200);
  const lastUpdateRef = useRef<string>("");

  // Sync debounced value → filters
  useEffect(() => {
    if (debouncedQuery !== filters.query) {
      lastUpdateRef.current = debouncedQuery;
      setFilters((prev) => ({ ...prev, query: debouncedQuery }));
    }
  }, [debouncedQuery]);

  // Sync URL → local input (e.g. back/forward nav)
  useEffect(() => {
    if (filters.query !== lastUpdateRef.current) {
      setInputValue(filters.query);
    }
    lastUpdateRef.current = filters.query;
  }, [filters.query]);

  const hasQuery = debouncedQuery.length >= 2;
  const hasFilters =
    filters.category !== null ||
    filters.difficulty !== null;

  const updateFilter = (key: keyof Filters, value: string | null) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAll = () => {
    setInputValue("");
    setFilters({ query: "", category: null, difficulty: null });
  };

  return (
    <div className={cn("space-y-5", fontClassName)} dir={dir}>
      {/* Page header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t.title}</h1>
        <p className="text-sm text-muted-foreground">{t.subtitle}</p>
      </header>

      {/* Search input */}
      <GlossarySearchInput
        value={inputValue}
        onChange={setInputValue}
        locale={locale}
      />

      {/* Filter bar */}
      <GlossaryFilterBar
        filters={filters}
        categories={categories}
        locale={locale}
        fontClassName={fontClassName}
        onToggleCategory={(cat) =>
          updateFilter("category", filters.category === cat ? null : cat)
        }
        onToggleDifficulty={(diff) =>
          updateFilter("difficulty", filters.difficulty === diff ? null : diff)
        }
      />

      {/* Active filter chips */}
      <AnimatePresence>
        {(hasQuery || hasFilters) && (
          <ActiveGlossaryFilters
            filters={{ ...filters, query: debouncedQuery }}
            locale={locale}
            onRemoveQuery={() => {
              setInputValue("");
              updateFilter("query", "");
            }}
            onRemoveCategory={() => updateFilter("category", null)}
            onRemoveDifficulty={() => updateFilter("difficulty", null)}
            onClearAll={clearAll}
          />
        )}
      </AnimatePresence>

      {/* Results - Shows ALL terms with alphabetical grouping */}
      <GlossaryResults
        terms={terms}
        filters={filters}
        hasQuery={hasQuery}
        hasFilters={hasFilters}
        locale={locale}
      />
    </div>
  );
}