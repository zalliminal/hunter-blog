"use client";

import Link from "next/link";
import type { GlossaryTerm } from "@/lib/glossary-helpers";
import type { Locale } from "@/lib/i18n";
import { getDifficultyColor } from "@/lib/glossary-helpers";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

type GlossaryCardProps = {
  term: GlossaryTerm;
  locale: Locale;
};

const difficultyLabels = {
  en: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
  fa: { beginner: "مبتدی", intermediate: "متوسط", advanced: "پیشرفته" },
};

export function GlossaryCard({ term, locale }: GlossaryCardProps) {
  const isRTL = locale === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  
  const difficultyColor = getDifficultyColor(term.difficulty);
  const difficultyLabel = term.difficulty 
    ? difficultyLabels[locale][term.difficulty as keyof typeof difficultyLabels.en]
    : null;

  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <Link
      href={term.url}
      className={cn(
        "group flex h-full flex-col rounded-xl border border-border bg-card/60 p-4",
        "shadow-sm transition-all duration-200",
        "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md hover:bg-card",
        isRTL ? "text-right" : "text-left"
      )}
      dir={dir}
      lang={locale}
    >
      {/* Top row: category + difficulty + abbreviation */}
      <div className={cn("mb-3 flex items-center justify-between gap-2", isRTL ? "flex-row-reverse" : "flex-row")}>
        <div className={cn("flex items-center gap-1.5", isRTL ? "flex-row-reverse" : "flex-row")}>
          {/* Category Badge - Reduced rounding */}
          <span className="inline-flex items-center rounded-md bg-primary/5 px-2 py-0.5 text-[10px] font-medium text-primary">
            {term.category}
          </span>
          
          {/* Difficulty Badge */}
          {term.difficulty && difficultyLabel && (
            <span
              className={cn(
                "inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-medium",
                difficultyColor.bg,
                difficultyColor.text,
                difficultyColor.border
              )}
              style={{
                backgroundColor: difficultyColor.bg ? undefined : undefined,
                color: difficultyColor.text ? undefined : undefined,
                borderColor: difficultyColor.border ? undefined : undefined,
              }}
            >
              {difficultyLabel}
            </span>
          )}
        </div>
        
        {/* Abbreviation */}
        {term.abbreviation && (
          <span className="font-mono text-[10px] text-muted-foreground">
            {term.abbreviation}
          </span>
        )}
      </div>

      {/* Term name */}
      <h3 className="mb-2 line-clamp-1 min-h-[1.5rem] text-base font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
        {term.term}
      </h3>

      {/* Short definition */}
      <div className="mb-3 flex-grow">
        <p className="line-clamp-3 min-h-[3.75rem] text-sm leading-5 text-muted-foreground">
          {term.shortDefinition}
        </p>
      </div>

      {/* Tags */}
      {term.tags.length > 0 && (
        <div className={cn("mb-3 flex flex-wrap items-center gap-1.5", isRTL ? "flex-row-reverse" : "flex-row")}>
          {term.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {term.tags.length > 3 && (
            <span className="text-[10px] text-muted-foreground">
              +{term.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Bottom bar with arrow indicator */}
      <div className={cn("mt-auto flex items-center gap-1.5 pt-2", isRTL ? "flex-row-reverse" : "flex-row")}>
        <span className="text-xs font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {isRTL ? "بیشتر بخوانید" : "Read more"}
        </span>
        <ArrowIcon className="h-3 w-3 text-primary opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
      </div>
    </Link>
  );
}