// components/blog-category-filter.tsx
'use client';

import { useSearchParams, useRouter } from "next/navigation";
import { CATEGORY_IDS, getCategory } from "@/lib/categories_and_authors";
import type { Locale } from "@/lib/i18n";
import { X } from "lucide-react";

interface BlogCategoryFilterProps {
  locale: Locale;
}

export function BlogCategoryFilter({ locale }: BlogCategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");

  const handleCategorySelect = (categorySlug: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (categorySlug) {
      params.set("category", categorySlug);
    } else {
      params.delete("category");
    }
    router.push(`?${params.toString()}`);
  };

  const isRTL = locale === "fa";

  const filterLabel = locale === "fa" ? "فیلتر حسب دسته" : "Filter by category";
  const clearLabel = locale === "fa" ? "پاک کردن فیلتر" : "Clear filter";

  return (
    <div className="space-y-3 pb-6 border-b border-border" dir={isRTL ? "rtl" : "ltr"}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">
          {filterLabel}
        </span>
        {selectedCategory && (
          <button
            onClick={() => handleCategorySelect(null)}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            <X className="h-3 w-3" />
            {clearLabel}
          </button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {CATEGORY_IDS.map((categoryId) => {
          const category = getCategory(categoryId);
          const isSelected = selectedCategory === category.slug;

          return (
            <button
              key={categoryId}
              onClick={() =>
                handleCategorySelect(isSelected ? null : category.slug)
              }
              className={`relative group px-4 py-2 rounded-sm text-sm font-medium transition-all duration-200 ${
                isSelected
                  ? `${category.color.bg} ${category.color.text} border border-${category.color.bg}`
                  : `border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground`
              }`}
            >
              {category.label[locale]}
              {isSelected && (
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-full rounded-sm transition-all duration-200"
                  style={{
                    backgroundColor: category.color.oklch,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
