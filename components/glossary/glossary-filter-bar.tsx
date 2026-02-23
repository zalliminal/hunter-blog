"use client";

import { forwardRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import type { Locale } from "@/lib/i18n";

type Filters = {
  query: string;
  category: string | null;
  difficulty: string | null;
};

type Props = {
  filters: Filters;
  categories: string[];
  locale: Locale;
  fontClassName?: string;
  onToggleCategory: (category: string) => void;
  onToggleDifficulty: (difficulty: string) => void;
};

const i18n = {
  en: {
    categories: "Categories",
    difficulty: "Difficulty",
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  },
  fa: {
    categories: "دسته‌بندی‌ها",
    difficulty: "سطح دشواری",
    beginner: "مبتدی",
    intermediate: "متوسط",
    advanced: "پیشرفته",
  },
};

const difficultyColors = {
  beginner: "bg-primary/10 text-primary border-primary/20",
  intermediate: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  advanced: "bg-destructive/10 text-destructive border-destructive/20",
};

const FilterPill = forwardRef<
  HTMLButtonElement,
  {
    label: string;
    count?: number;
    isOpen: boolean;
    isActive?: boolean;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
>(function FilterPill({ label, count, isOpen, isActive, className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      {...props}
      className={cn(
        "inline-flex h-8 select-none items-center gap-1.5 rounded-md border px-3 text-xs font-medium",
        "transition-all duration-150 outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary/40",
        isActive || isOpen || (count && count > 0)
          ? "border-primary/40 bg-primary/10 text-primary"
          : "border-border bg-muted/40 text-muted-foreground hover:bg-muted hover:text-foreground",
        className
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
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
});

FilterPill.displayName = "FilterPill";

function portalContentClass(fontClassName?: string) {
  return cn("w-56 p-2", fontClassName);
}

function CategoryFilter({
  filters,
  categories,
  locale,
  fontClassName,
  onToggle,
  t,
}: {
  filters: Filters;
  categories: string[];
  locale: Locale;
  fontClassName?: string;
  onToggle: (category: string) => void;
  t: (typeof i18n)["en"];
}) {
  const [open, setOpen] = useState(false);
  const dir = locale === "fa" ? "rtl" : "ltr";
  const activeCount = filters.category ? 1 : 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FilterPill
          label={t.categories}
          count={activeCount}
          isOpen={open}
          isActive={!!filters.category}
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={8}
        dir={dir}
        className={portalContentClass(fontClassName)}
      >
        <div className="space-y-0.5" lang={locale}>
          {categories.map((category) => {
            const active = filters.category === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => {
                  onToggle(category);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
                  "text-start",
                  active
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <span className="flex-1">{category}</span>
                {active && <Check className="h-3.5 w-3.5 shrink-0 text-primary" />}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

function DifficultyFilter({
  filters,
  locale,
  fontClassName,
  onToggle,
  t,
}: {
  filters: Filters;
  locale: Locale;
  fontClassName?: string;
  onToggle: (difficulty: string) => void;
  t: (typeof i18n)["en"];
}) {
  const [open, setOpen] = useState(false);
  const dir = locale === "fa" ? "rtl" : "ltr";
  const difficulties = ["beginner", "intermediate", "advanced"] as const;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FilterPill
          label={t.difficulty}
          count={filters.difficulty ? 1 : 0}
          isOpen={open}
          isActive={!!filters.difficulty}
        />
      </PopoverTrigger>
      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={8}
        dir={dir}
        className={portalContentClass(fontClassName)}
      >
        <div className="space-y-0.5" lang={locale}>
          {difficulties.map((difficulty) => {
            const active = filters.difficulty === difficulty;
            return (
              <button
                key={difficulty}
                type="button"
                onClick={() => {
                  onToggle(difficulty);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                  "text-start",
                  active
                    ? difficultyColors[difficulty]
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <span
                  className={cn(
                    "h-2 w-2 shrink-0 rounded-full",
                    difficulty === "beginner" && "bg-primary",
                    difficulty === "intermediate" && "bg-chart-4",
                    difficulty === "advanced" && "bg-destructive"
                  )}
                />
                <span className="flex-1">
                  {t[difficulty as keyof typeof t]}
                </span>
                {active && <Check className="h-3.5 w-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function GlossaryFilterBar({
  filters,
  categories,
  locale,
  fontClassName,
  onToggleCategory,
  onToggleDifficulty,
}: Props) {
  const t = i18n[locale];
  const dir = locale === "fa" ? "rtl" : "ltr";

  return (
    <div
      className="flex flex-wrap items-center gap-2"
      dir={dir}
      lang={locale}
    >
      <CategoryFilter
        filters={filters}
        categories={categories}
        locale={locale}
        fontClassName={fontClassName}
        onToggle={onToggleCategory}
        t={t}
      />
      <DifficultyFilter
        filters={filters}
        locale={locale}
        fontClassName={fontClassName}
        onToggle={onToggleDifficulty}
        t={t}
      />
    </div>
  );
}