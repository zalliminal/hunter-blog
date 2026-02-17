"use client";

import { forwardRef, useState } from "react";
import { ChevronDown, Check, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getAllCategories, getAllAuthors } from "@/lib/categories_and_authors";
import type { CategoryId, AuthorId } from "@/lib/categories_and_authors";
import type { TagSummary } from "@/lib/blog";
import type { SearchFilters, SortMode } from "@/hooks/useSearchState";

type Props = {
  filters: SearchFilters;
  tags: TagSummary[];
  locale: "en" | "fa";
  /**
   * Pass your app's Persian font className here so it's forwarded into the
   * Popover/Dropdown portals which don't inherit from the page tree.
   *
   * Example (in SearchPageClient or page.tsx):
   *   import { vazir } from "@/lib/fonts"
   *   <FilterBar fontClassName={locale === "fa" ? vazir.className : undefined} ... />
   */
  fontClassName?: string;
  onToggleCategory: (id: CategoryId) => void;
  onToggleAuthor: (id: AuthorId) => void;
  onToggleTag: (tag: string) => void;
  onSort: (sort: SortMode) => void;
};

const i18n = {
  en: {
    categories: "Categories",
    authors: "Authors",
    tags: "Tags",
    sortRelevance: "Best match",
    sortDate: "Newest first",
    noTags: "No tags yet",
  },
  fa: {
    categories: "دسته‌بندی‌ها",
    authors: "نویسندگان",
    tags: "تگ‌ها",
    sortRelevance: "بهترین نتیجه",
    sortDate: "جدیدترین",
    noTags: "تگی وجود ندارد",
  },
};

// ─── FilterPill ────────────────────────────────────────────────────────────────
//
// WHY forwardRef:
//   PopoverTrigger's `asChild` merges the trigger's ref + onClick onto the
//   immediate child element. Without forwardRef, Radix can't attach to our
//   button — so it used to wrap it in a <span>, which caused a bug where
//   clicking the trigger while the popover was open fired two events:
//   1. pointer-down-outside → close
//   2. span's onClick → re-open
//   This caused the popover to flicker and multi-select to behave erratically.
//   forwardRef lets asChild attach directly to the <button> element.
const FilterPill = forwardRef<
  HTMLButtonElement,
  {
    label: string;
    count: number;
    isOpen: boolean;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(function FilterPill({ label, count, isOpen, className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={cn(
        "inline-flex h-8 select-none items-center gap-1.5 rounded-full border px-3 text-xs font-medium",
        "transition-all duration-150 outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary/40",
        count > 0 || isOpen
          ? "border-primary/40 bg-primary/10 text-primary"
          : "border-border bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground",
        className,
      )}
    >
      {label}
      {count > 0 && (
        <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
          {count}
        </span>
      )}
      <ChevronDown
        className={cn(
          "h-3 w-3 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180",
        )}
      />
    </button>
  );
});

// ─── Portal class helper ───────────────────────────────────────────────────────
//
// Popover and Dropdown portals render outside the React/DOM tree, so they do
// NOT inherit `dir`, `lang`, or font classes from their parents. We pass them
// explicitly via this helper.
function portalContentClass(fontClassName?: string) {
  return cn(fontClassName);
}

// ─── CategoryFilter ────────────────────────────────────────────────────────────
function CategoryFilter({
  filters,
  locale,
  fontClassName,
  onToggle,
  t,
}: {
  filters: SearchFilters;
  locale: "en" | "fa";
  fontClassName?: string;
  onToggle: (id: CategoryId) => void;
  t: (typeof i18n)["en"];
}) {
  const [open, setOpen] = useState(false);
  const categories = getAllCategories();
  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FilterPill
          label={t.categories}
          count={filters.categories.length}
          isOpen={open}
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={8}
        // Must set dir explicitly — the portal is outside the RTL tree
        dir={dir}
        className={cn("w-64 p-2", portalContentClass(fontClassName))}
      >
        <div className="space-y-0.5" lang={locale}>
          {categories.map((cat) => {
            const active = filters.categories.includes(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onToggle(cat.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  // text-start respects dir; text-left is always LTR-pinned
                  "text-start",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: cat.color.oklch }}
                />
                <span className="flex-1">{cat.label[locale]}</span>
                {active && (
                  <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                )}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ─── AuthorFilter ──────────────────────────────────────────────────────────────
function AuthorFilter({
  filters,
  locale,
  fontClassName,
  onToggle,
  t,
}: {
  filters: SearchFilters;
  locale: "en" | "fa";
  fontClassName?: string;
  onToggle: (id: AuthorId) => void;
  t: (typeof i18n)["en"];
}) {
  const [open, setOpen] = useState(false);
  const authors = getAllAuthors();
  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FilterPill
          label={t.authors}
          count={filters.authors.length}
          isOpen={open}
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={8}
        dir={dir}
        className={cn("w-52 p-2", portalContentClass(fontClassName))}
      >
        <div className="space-y-0.5" lang={locale}>
          {authors.map((author) => {
            const active = filters.authors.includes(author.id);
            return (
              <button
                key={author.id}
                type="button"
                onClick={() => onToggle(author.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-start text-sm transition-colors",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
              >
                <span className="flex-1 font-medium">{author.name[locale]}</span>
                {active && (
                  <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
                )}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ─── TagFilter ─────────────────────────────────────────────────────────────────
function TagFilter({
  filters,
  tags,
  locale,
  fontClassName,
  onToggle,
  t,
}: {
  filters: SearchFilters;
  tags: TagSummary[];
  locale: "en" | "fa";
  fontClassName?: string;
  onToggle: (tag: string) => void;
  t: (typeof i18n)["en"];
}) {
  const [open, setOpen] = useState(false);
  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FilterPill
          label={t.tags}
          count={filters.tags.length}
          isOpen={open}
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={8}
        dir={dir}
        className={cn("w-72 p-3", portalContentClass(fontClassName))}
      >
        {tags.length === 0 ? (
          <p className="px-2 py-1 text-xs text-muted-foreground" lang={locale}>
            {t.noTags}
          </p>
        ) : (
          <div className="flex flex-wrap gap-1.5" lang={locale}>
            {tags.map((tag) => {
              const active = filters.tags.includes(tag.label);
              return (
                <button
                  key={tag.slug}
                  type="button"
                  onClick={() => onToggle(tag.label)}
                  className={cn(
                    "inline-flex h-7 items-center gap-1 rounded-lg border px-2.5 text-xs transition-all",
                    active
                      ? "border-primary/40 bg-primary/10 font-medium text-primary"
                      : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {tag.label}
                  <span className="text-[10px] opacity-50">{tag.count}</span>
                </button>
              );
            })}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

// ─── SortToggle ────────────────────────────────────────────────────────────────
function SortToggle({
  sort,
  locale,
  fontClassName,
  onSort,
  t,
}: {
  sort: SortMode;
  locale: "en" | "fa";
  fontClassName?: string;
  onSort: (s: SortMode) => void;
  t: (typeof i18n)["en"];
}) {
  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            "inline-flex h-8 select-none items-center gap-1.5 rounded-full border px-3 text-xs font-medium",
            "border-border bg-muted/40 text-muted-foreground outline-none",
            "transition-all hover:bg-muted hover:text-foreground",
            "focus-visible:ring-2 focus-visible:ring-primary/40",
          )}
        >
          <ArrowUpDown className="h-3 w-3 shrink-0" />
          {sort === "relevance" ? t.sortRelevance : t.sortDate}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        // In LTR: opens at right edge of button (visual right)
        // In RTL: "end" is the logical end = visual left, which is correct
        dir={dir}
        className={cn("w-44", portalContentClass(fontClassName))}
      >
        <DropdownMenuRadioGroup
          value={sort}
          onValueChange={(v) => onSort(v as SortMode)}
        >
          <DropdownMenuRadioItem value="relevance" lang={locale}>
            {t.sortRelevance}
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="date" lang={locale}>
            {t.sortDate}
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── FilterBar ─────────────────────────────────────────────────────────────────
export function FilterBar({
  filters,
  tags,
  locale,
  fontClassName,
  onToggleCategory,
  onToggleAuthor,
  onToggleTag,
  onSort,
}: Props) {
  const t = i18n[locale];
  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      dir={dir}
      // lang on this container applies to the pill labels rendered inline here
      lang={locale}
    >
      <CategoryFilter
        filters={filters}
        locale={locale}
        fontClassName={fontClassName}
        onToggle={onToggleCategory}
        t={t}
      />
      <AuthorFilter
        filters={filters}
        locale={locale}
        fontClassName={fontClassName}
        onToggle={onToggleAuthor}
        t={t}
      />
      <TagFilter
        filters={filters}
        tags={tags}
        locale={locale}
        fontClassName={fontClassName}
        onToggle={onToggleTag}
        t={t}
      />

      {/*
        ms-auto = margin-inline-start: auto (CSS logical property).
        In LTR this pushes the sort button to the RIGHT.
        In RTL this pushes it to the LEFT.
        The old ml-auto always pushed right, breaking RTL layout.
      */}
      <div className="ms-auto">
        <SortToggle
          sort={filters.sort}
          locale={locale}
          fontClassName={fontClassName}
          onSort={onSort}
          t={t}
        />
      </div>
    </div>
  );
}