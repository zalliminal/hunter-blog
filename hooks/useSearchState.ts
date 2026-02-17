"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useMemo, useTransition } from "react";
import type { CategoryId, AuthorId } from "@/lib/categories_and_authors";

export type SortMode = "relevance" | "date";

export type SearchFilters = {
  query: string;
  categories: CategoryId[];
  authors: AuthorId[];
  tags: string[];
  sort: SortMode;
};

const EMPTY_FILTERS: SearchFilters = {
  query: "",
  categories: [],
  authors: [],
  tags: [],
  sort: "relevance",
};

function parseArray<T extends string>(value: string | null): T[] {
  if (!value) return [];
  return value.split(",").filter(Boolean) as T[];
}

export function useSearchState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const filters: SearchFilters = useMemo(
    () => ({
      query: searchParams.get("q") ?? "",
      categories: parseArray<CategoryId>(searchParams.get("categories")),
      authors: parseArray<AuthorId>(searchParams.get("authors")),
      tags: parseArray<string>(searchParams.get("tags")),
      sort: (searchParams.get("sort") as SortMode) ?? "relevance",
    }),
    [searchParams],
  );

  const updateFilters = useCallback(
    (updates: Partial<SearchFilters>) => {
      const next = { ...filters, ...updates };
      const params = new URLSearchParams();

      if (next.query) params.set("q", next.query);
      if (next.categories.length) params.set("categories", next.categories.join(","));
      if (next.authors.length) params.set("authors", next.authors.join(","));
      if (next.tags.length) params.set("tags", next.tags.join(","));
      if (next.sort !== "relevance") params.set("sort", next.sort);

      const qs = params.toString();
      startTransition(() => {
        router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
      });
    },
    [filters, router, pathname],
  );

  const toggleCategory = useCallback(
    (id: CategoryId) => {
      const next = filters.categories.includes(id)
        ? filters.categories.filter((c) => c !== id)
        : [...filters.categories, id];
      updateFilters({ categories: next });
    },
    [filters.categories, updateFilters],
  );

  const toggleAuthor = useCallback(
    (id: AuthorId) => {
      const next = filters.authors.includes(id)
        ? filters.authors.filter((a) => a !== id)
        : [...filters.authors, id];
      updateFilters({ authors: next });
    },
    [filters.authors, updateFilters],
  );

  const toggleTag = useCallback(
    (tag: string) => {
      const next = filters.tags.includes(tag)
        ? filters.tags.filter((t) => t !== tag)
        : [...filters.tags, tag];
      updateFilters({ tags: next });
    },
    [filters.tags, updateFilters],
  );

  const clearAll = useCallback(() => {
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }, [router, pathname]);

  const clearFilter = useCallback(
    (key: keyof SearchFilters, value?: string) => {
      if (!value) {
        updateFilters({ [key]: EMPTY_FILTERS[key] });
        return;
      }
      if (key === "categories") {
        updateFilters({ categories: filters.categories.filter((c) => c !== value) });
      } else if (key === "authors") {
        updateFilters({ authors: filters.authors.filter((a) => a !== value) });
      } else if (key === "tags") {
        updateFilters({ tags: filters.tags.filter((t) => t !== value) });
      }
    },
    [filters, updateFilters],
  );

  const hasActiveFilters =
    filters.query.length >= 2 ||
    filters.categories.length > 0 ||
    filters.authors.length > 0 ||
    filters.tags.length > 0;

  const activeFilterCount =
    filters.categories.length +
    filters.authors.length +
    filters.tags.length +
    (filters.query.length >= 2 ? 1 : 0);

  return {
    filters,
    isPending,
    hasActiveFilters,
    activeFilterCount,
    updateFilters,
    toggleCategory,
    toggleAuthor,
    toggleTag,
    clearAll,
    clearFilter,
  };
}