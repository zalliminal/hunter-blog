"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback, useTransition } from "react";

export type GlossaryFilters = {
  query: string;
  category: string | null;
  difficulty: string | null;
};

export function useGlossarySearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateFilters = useCallback(
    (updates: Partial<GlossaryFilters>) => {
      const params = new URLSearchParams(searchParams.toString());

      if (updates.query !== undefined) {
        if (updates.query) params.set("q", updates.query);
        else params.delete("q");
      }
      if (updates.category !== undefined) {
        if (updates.category) params.set("category", updates.category);
        else params.delete("category");
      }
      if (updates.difficulty !== undefined) {
        if (updates.difficulty) params.set("difficulty", updates.difficulty);
        else params.delete("difficulty");
      }

      const qs = params.toString();
      startTransition(() => {
        router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
      });
    },
    [router, pathname, searchParams]
  );

  const clearFilters = useCallback(() => {
    startTransition(() => {
      router.replace(pathname, { scroll: false });
    });
  }, [router, pathname]);

  return {
    isPending,
    updateFilters,
    clearFilters,
  };
}