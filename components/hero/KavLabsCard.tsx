// components/hero/KavLabsCard.tsx
"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export default function KavLabsCard({ isFa, locale }: { isFa: boolean; locale: Locale }) {
  const kavlabs = {
    en: {
      breakdown: `Kav (from Persian کاو, meaning "explorer" or "seeker") + Labs (a collaborative space for research and experimentation).`,
      pron: "KAV-labs — approx. /kɑːv læbz/",
    },
    
    fa: {
      breakdown: `کاو (از ریشهٔ کاوش، به معنای جستجوگر و پژوهشگر) + لبز (Labs؛ فضایی برای تحقیق و آزمایش مشترک).`,
      pron: "کاولبز — خوانش تقریبی: کاو-لبز",
    },
    
  };

  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-4">
      <h3 className="text-sm font-semibold">{isFa ? "کاولبز" : "KavLabs"}</h3>

      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
        {isFa ? kavlabs.fa.breakdown : kavlabs.en.breakdown}
      </p>

      <div className="mt-6 text-xs text-muted-foreground">
        <strong>{isFa ? "تلفظ (تقریبی):" : "Pronunciation (approx.):"}</strong>
        <div className="mt-1">{isFa ? kavlabs.fa.pron : kavlabs.en.pron}</div>
      </div>

      <div className="mt-6 flex gap-2">
        <Link href={`/${locale}/tags`} className="inline-block rounded-md border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted">
          {isFa ? "همهٔ تگ‌ها" : "View tags"}
        </Link>

        <a href="/rss.xml" className="inline-block rounded-md border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted">
          RSS
        </a>
      </div>
    </div>
  );
}