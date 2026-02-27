"use client";

// components/hero/BelowFoldSections.tsx
// This is the only client component needed to use ssr:false with dynamic().
// It lazy-loads the three heavy below-fold sections as separate JS chunks.

import dynamic from "next/dynamic";
import type { Locale } from "@/lib/i18n";

const GoalsSectionClient = dynamic(
  () => import("@/components/hero/GoalSectionClient"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] rounded-2xl border border-border/70 bg-card/50 animate-pulse" />
    ),
  },
);

const AboutSectionClient = dynamic(
  () => import("@/components/hero/AboutSectionClient"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[380px] rounded-3xl border border-border/70 bg-card/40 animate-pulse" />
    ),
  },
);

const TeamSectionClient = dynamic(
  () => import("@/components/hero/TeamSectionClient"),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-6 md:grid-cols-2">
        <div className="h-64 rounded-3xl border border-border/60 bg-card/20 animate-pulse" />
        <div className="h-64 rounded-3xl border border-border/60 bg-card/20 animate-pulse" />
      </div>
    ),
  },
);

type Props = {
  locale: Locale;
  isFa: boolean;
};

export default function BelowFoldSections({ locale, isFa }: Props) {
  return (
    <>
      <GoalsSectionClient locale={locale} isFa={isFa} variant="terminal" />

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {isFa ? "یه کم درباره ما" : "a little bit about us"}
          </h2>
        </div>
        <AboutSectionClient locale={locale} isFa={isFa} />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {isFa ? "تیم ما" : "Our Team"}
          </h2>
        </div>
        <TeamSectionClient locale={locale} isFa={isFa} />
      </section>
    </>
  );
}