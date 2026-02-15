"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import type { Locale, NavDictionary } from "@/lib/i18n";
import ZalliminalCard from "./ZalliminalCard";

type Props = {
  locale: Locale;
  isFa: boolean;
  dict: NavDictionary;
};

// ── Typing animation component ────────────────────────────────────────────────
function TypingText({ text, isRTL }: { text: string; isRTL: boolean }) {
  const [displayed, setDisplayed] = useState("");
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setDisplayed(text);
      return;
    }
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i === text.length) clearInterval(interval);
    }, 90);
    return () => clearInterval(interval);
  }, [text, prefersReduced]);

  return (
    <span className="inline-block" dir={isRTL ? "rtl" : "ltr"}>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="inline-block w-[2px] h-[1.2em] bg-primary/70 ml-1 align-middle"
          aria-hidden
        />
      )}
    </span>
  );
}

const heroVariants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

// ── Contact click: plain smooth scroll ───────────────────────────────────────
function handleContactClick(e: React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "center" });
  // Dispatch custom event to trigger ring animation on social cards
  window.dispatchEvent(new CustomEvent("contactClicked"));
}

export default function HeroClient({ locale, isFa, dict }: Props) {
  const isRTL = locale === "fa";
  const headline = isFa
    ? "یادداشت‌های یک محقق امنیت"
    : "security researcher notes";

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background/60 to-background/40 p-6 shadow-lg">
      <motion.div
        className="relative z-10 grid gap-6 md:grid-cols-2"
        initial="hidden"
        animate="show"
        variants={heroVariants}
      >
        <motion.div variants={item} className="space-y-4">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl pb-3">
            <TypingText text={headline} isRTL={isRTL} />
          </h1>

          <p className="max-w-xl text-sm text-muted-foreground leading-relaxed">
            {isFa ? (
              <>
                میتونی منو زال صدام کنی.این‌جا جایی است برای ایده‌ها، چیزهایی که یاد
                می‌گیرم و write-up‌های میدانی و مینیمال،مستقیم سر اصل مطلب.
              </>
            ) : (
              <>
                You can Call me Zal. This is a quiet place for ideas, notes, field
                write-ups and short technical essays. Minimal and focused — with one foot
                in myth and the other in the in-between.
              </>
            )}
          </p>

          <motion.div variants={item} className="flex flex-wrap gap-3 pt-4">
            {/* Latest posts */}
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 rounded-md bg-primary/80 px-4 py-2 text-sm font-medium text-white shadow-sm hover:brightness-110"
            >
              {isFa ? "جدیدترین مطالب" : "Latest posts"}
            </Link>


            {/* ── Contact us ──────────────────────────────────────────── */}
            <motion.button
              type="button"
              onClick={handleContactClick}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className={[
                "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium",
                "border border-primary/60 text-primary",
                "ring-1 ring-primary/40 ring-offset-1 ring-offset-background",
                "hover:bg-primary/8 hover:ring-primary/70 hover:ring-2",
                "transition-all duration-200",
              ].join(" ")}
            >
              <Mail size={14} strokeWidth={2} aria-hidden />
              {isFa ? "تماس با ما" : "Contact us"}
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div variants={item}>
          <ZalliminalCard isFa={isFa} locale={locale} />
        </motion.div>
      </motion.div>

      {/* decorative orb */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="pointer-events-none absolute -right-8 -top-8 h-56 w-56 rounded-full bg-gradient-to-tr from-primary/30 to-transparent blur-3xl"
      />
    </section>
  );
}