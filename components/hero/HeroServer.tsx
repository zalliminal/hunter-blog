// components/hero/HeroServer.tsx
// Server component — renders on the server, no JS bundle cost.
// The h1 text paints immediately as the LCP element.
// Only the two interactive pieces (typing animation, contact button)
// are client components and load after hydration.

import Link from "next/link";
import type { Locale, NavDictionary } from "@/lib/i18n";
import KavLabsCard from "./KavLabsCard";
import HeroTypingHeadline from "./HeroTypingHeadline";
import ContactButton from "./ContactButton";

type Props = {
  locale: Locale;
  isFa: boolean;
  dict: NavDictionary;
};

export default function HeroServer({ locale, isFa, dict }: Props) {
  const isRTL = locale === "fa";
  const headline = isFa
    ? "یادداشت‌های تحقیقاتی امنیت"
    : "Security research notes";

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background/60 to-background/40 p-6 shadow-lg">
      <div className="relative z-10 grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          {/*
           * h1 is rendered server-side — LCP element paints with the first HTML byte.
           * HeroTypingHeadline hydrates on top and starts the animation.
           * The static text is the accessible content; the animation is cosmetic.
           */}
          <h1 className="text-lg font-semibold tracking-tight sm:text-2xl pb-3">
            <HeroTypingHeadline text={headline} isRTL={isRTL} />
            {/*
             * noscript fallback: if JS is disabled the headline still renders.
             * The noscript tag is invisible when JS is on.
             */}
            <noscript>
              <span dir={isRTL ? "rtl" : "ltr"}>{headline}</span>
            </noscript>
          </h1>

          <p className="max-w-xl text-sm text-muted-foreground leading-relaxed">
            {isFa ? (
              <>
                ما اینجا هستیم تا به‌صورت آزاد، یادگیری امنیت و سواد دیجیتال را برای همه آسان کنیم — یادداشت‌های
                میدانی، آموزش‌های عملی و نقشه‌ی راهی برای شما.
              </>
            ) : (
              <>
                We're here to freely make security and Digital Literacy learning accessible — field notes, hands-on
                tutorials, and a roadmap for you.
              </>
            )}
          </p>

          <div className="flex flex-wrap gap-3 pt-6">
            {/* Static link — server rendered, zero JS */}
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 rounded-md bg-primary/80 px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110"
            >
              {isFa ? "همه مطالب" : "All posts"}
            </Link>

            {/* Only this button needs client JS */}
            <ContactButton isFa={isFa} />
          </div>
        </div>

        <div>
          <KavLabsCard isFa={isFa} locale={locale} />
        </div>
      </div>

      {/* decorative orb — static CSS gradient, no JS needed */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-56 w-56 rounded-full bg-gradient-to-tr from-primary/30 to-transparent blur-3xl opacity-100"
      />
    </section>
  );
}