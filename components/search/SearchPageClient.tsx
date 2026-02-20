"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import type { Post, TagSummary } from "@/lib/blog";
import type { CategoryId, AuthorId } from "@/lib/categories_and_authors";
import type { SortMode } from "@/hooks/useSearchState";
import { useSearchState } from "@/hooks/useSearchState";
import { useFilteredPosts } from "@/hooks/useFilteredPosts";
import { useDebounce } from "@/hooks/useDebounce";
import { SearchInput } from "./SearchInput";
import { FilterBar } from "./FilterBar";
import { ActiveFilters } from "./ActiveFilters";
import { SearchResults } from "./SearchResults";

type Props = {
  posts: Post[];
  tags: TagSummary[];
  locale: Locale;
  fontClassName?: string;
};

const i18n = {
  en: {
    title: "Advance Search",
    subtitle: "Find posts across all topics, categories, and authors.",
  },
  fa: {
    title: "جستجو پیشرفته",
    subtitle: "در بین همه پست‌ها، دسته‌بندی‌ها و نویسندگان بگرد.",
  },
};

export function SearchPageClient({ posts, tags, locale, fontClassName }: Props) {
  const t = i18n[locale];
  const dir = locale === "fa" ? "rtl" : "ltr";

  const {
    filters,
    isPending,
    hasActiveFilters,
    updateFilters,
    toggleCategory,
    toggleAuthor,
    toggleTag,
    clearAll,
    clearFilter,
  } = useSearchState();

  // Local controlled input value — debounced before committing to URL
  const [inputValue, setInputValue] = useState(filters.query);
  const debouncedQuery = useDebounce(inputValue, 200);
  const lastUpdateRef = useRef<string>(filters.query);

  // Sync debounced value → URL
  useEffect(() => {
    if (debouncedQuery !== filters.query) {
      lastUpdateRef.current = debouncedQuery;
      updateFilters({ query: debouncedQuery });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  // Sync URL → local input (e.g. back/forward nav)
  // Only sync if the change came from external navigation, not from our own debounce
  useEffect(() => {
    if (filters.query !== lastUpdateRef.current) {
      // This is an external change (back/forward nav), sync to input
      setInputValue(filters.query);
    }
    lastUpdateRef.current = filters.query;
  }, [filters.query]);

  const results = useFilteredPosts(posts, {
    ...filters,
    query: debouncedQuery,
  });

  const hasQuery = debouncedQuery.length >= 2;
  const hasFilters =
    filters.categories.length > 0 ||
    filters.authors.length > 0 ||
    filters.tags.length > 0;

  return (
    <div className="space-y-5" dir={dir}>
      {/* Page header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">{t.title}</h1>
        <p className="text-sm text-muted-foreground">{t.subtitle}</p>
      </header>

      {/* Search input */}
      <SearchInput
        value={inputValue}
        onChange={setInputValue}
        isPending={isPending}
        locale={locale}
      />

      {/* Filter bar */}
      <FilterBar
        filters={filters}
        tags={tags}
        locale={locale}
        fontClassName={fontClassName}
        onToggleCategory={toggleCategory}
        onToggleAuthor={toggleAuthor}
        onToggleTag={toggleTag}
        onSort={(s: SortMode) => updateFilters({ sort: s })}
      />

      {/* Active filter chips */}
      <AnimatePresence>
        {hasActiveFilters && (
          <ActiveFilters
            filters={{ ...filters, query: debouncedQuery }}
            locale={locale}
            onRemoveCategory={(id: CategoryId) => clearFilter("categories", id)}
            onRemoveAuthor={(id: AuthorId) => clearFilter("authors", id)}
            onRemoveTag={(tag: string) => clearFilter("tags", tag)}
            onRemoveQuery={() => {
              setInputValue("");
              updateFilters({ query: "" });
            }}
            onClearAll={() => {
              setInputValue("");
              clearAll();
            }}
          />
        )}
      </AnimatePresence>

      {/* Results */}
      <SearchResults
        results={results}
        hasQuery={hasQuery}
        hasFilters={hasFilters}
        isPending={isPending}
        locale={locale}
      />
    </div>
  );
}