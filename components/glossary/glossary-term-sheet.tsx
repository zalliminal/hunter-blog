"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ExternalLink } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import type { GlossaryTerm as GlossaryTermType } from "@/lib/glossary-helpers";
import { getDifficultyColor } from "@/lib/glossary-helpers";
import type { Locale } from "@/lib/i18n";

type GlossaryTermProps = {
  term: GlossaryTermType;
  locale: Locale;
  children: React.ReactNode;
  relatedTerms?: GlossaryTermType[];
};

const difficultyLabels = {
  en: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
  fa: { beginner: "مبتدی", intermediate: "متوسط", advanced: "پیشرفته" },
};

export function GlossaryTerm({
  term,
  locale,
  children,
  relatedTerms = [],
}: GlossaryTermProps) {
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState<"bottom" | "right">("bottom");
  const isRTL = locale === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  
  const difficultyColor = getDifficultyColor(term.difficulty);
  const difficultyLabel = term.difficulty 
    ? difficultyLabels[locale][term.difficulty as keyof typeof difficultyLabels.en]
    : null;

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setDirection(window.innerWidth >= 768 ? "right" : "bottom");
    }
  };

  return (
    <Drawer
      open={open}
      onOpenChange={handleOpenChange}
      direction={direction === "bottom" ? undefined : direction}
    >
      <DrawerTrigger asChild>
        <button
          className="inline-flex cursor-pointer items-center gap-1 text-primary underline decoration-dotted underline-offset-4 transition-colors hover:text-primary/80"
          onClick={() => handleOpenChange(true)}
          lang={locale}
        >
          {children}
        </button>
      </DrawerTrigger>

      <DrawerContent
        className={cn(
          "font-[family-name:var(--font-farsi)]",
          // Mobile: max 50% height from bottom
          "data-[vaul-drawer-direction=bottom]:max-h-[50vh]",
          // Desktop: FULL height from right (no cut off)
          "data-[vaul-drawer-direction=right]:h-full data-[vaul-drawer-direction=right]:w-full md:data-[vaul-drawer-direction=right]:w-[450px]",
          isRTL ? "text-right" : "text-left"
        )}
        dir={dir}
        lang={locale}
      >
        {/* Handle Bar - Mobile only */}
        {direction === "bottom" && (
          <div className="mx-auto mt-3 h-1.5 w-12 shrink-0 rounded-full bg-muted-foreground/20" />
        )}

        <DrawerHeader className="border-b border-border pb-2">
          <div className={cn("flex items-start justify-between gap-2", isRTL ? "flex-row-reverse" : "flex-row")}>
            <div className="flex-1 space-y-1.5">
              <DrawerTitle className="text-base font-semibold sm:text-lg">
                {term.term}
              </DrawerTitle>
              
              {/* Badges */}
              <div className={cn("flex flex-wrap items-center gap-1.5", isRTL ? "flex-row-reverse" : "flex-row")}>
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                  {term.category}
                </span>
                {term.difficulty && difficultyLabel && (
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium capitalize",
                      difficultyColor.bg,
                      difficultyColor.text,
                      difficultyColor.border
                    )}
                  >
                    {difficultyLabel}
                  </span>
                )}
              </div>
            </div>
            
            <DrawerClose asChild>
              <button className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md transition-colors hover:bg-muted">
                <X className="h-3.5 w-3.5" />
                <span className="sr-only">Close</span>
              </button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-4 py-3">
          {/* Short Definition */}
          <DrawerDescription className="mb-3 text-sm leading-relaxed text-foreground">
            {term.shortDefinition}
          </DrawerDescription>

          {/* Tags - Desktop only */}
          {term.tags.length > 0 && direction === "right" && (
            <div className="mb-3">
              <div className={cn("flex flex-wrap gap-1", isRTL ? "flex-row-reverse" : "flex-row")}>
                {term.tags.slice(0, 5).map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Terms - Desktop only */}
          {relatedTerms.length > 0 && direction === "right" && (
            <div className="mb-3">
              <div className={cn("flex flex-wrap gap-1.5", isRTL ? "flex-row-reverse" : "flex-row")}>
                {relatedTerms.slice(0, 3).map((relatedTerm) => (
                  <Link
                    key={relatedTerm.slug}
                    href={relatedTerm.url}
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-1 text-[10px] font-medium transition-colors hover:border-primary hover:text-primary"
                  >
                    {relatedTerm.term}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Read Full Button - Smaller, minimal */}
          <Link
            href={term.url}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90",
              isRTL ? "flex-row-reverse" : "flex-row"
            )}
            onClick={() => setOpen(false)}
          >
            <span>{isRTL ? "مطالعه کامل" : "Read Full"}</span>
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
}