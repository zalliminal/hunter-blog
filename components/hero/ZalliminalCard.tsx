// components/hero/ZalliminalCard.tsx
"use client";

import Link from "next/link";
import type { Locale } from "@/lib/i18n";

export default function ZalliminalCard({ isFa, locale }: { isFa: boolean; locale: Locale }) {
  const zalliminal = {
    en: {
      breakdown: `Zal (a legendary figure from Persian epic tradition) + liminal (from Latin limen, meaning "threshold"; describing a state of transition — existing between what was and what is becoming).`,
      pron: "zuh-LIM-in-al (approx.) — liminal: ˈli-mə-nəl",
    },
    
    fa: {
      breakdown: `زال (شخصیتی اساطیری در شاهنامه) + لیمینال (از واژهٔ لاتین limen به معنای «آستانه»؛ اشاره به وضعیتِ گذار، میانِ دو حالت یا دو هویت).`,
      pron: "زالی‌مینال — خوانش تقریبی: زال-ی-مینال",
    },
    
  };

  return (
    <div className="rounded-xl border border-border/60 bg-card/60 p-4">
      <h3 className="text-sm font-semibold">{isFa ? "زالیمینال" : "Zalliminal"}</h3>

      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
        {isFa ? zalliminal.fa.breakdown : zalliminal.en.breakdown}
      </p>

      <div className="mt-3 text-xs text-muted-foreground">
        <strong>{isFa ? "تلفظ (تقریبی):" : "Pronunciation (approx.):"}</strong>
        <div className="mt-1">{isFa ? zalliminal.fa.pron : zalliminal.en.pron}</div>
      </div>

      <div className="mt-3 flex gap-2">
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
