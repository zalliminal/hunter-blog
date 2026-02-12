"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Terminal, RotateCcw, Home, FileText } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type NotFoundClientProps = {
  locale: Locale;
};

// ── i18n dictionary ─────────────────────────────────────────────────
const dict = {
  en: {
    windowTitle: "zsh — traceroute",
    errorLine: "ERROR 404 :: this path does not exist in the archive",
    homeLabel: "~/home",
    blogLabel: "~/blog",
    retryLabel: "retry",
    bottomHint: "// node lost at the threshold — path does not resolve",
  },
  fa: {
    windowTitle: "zsh — مسیریابی",
    errorLine: "خطای ۴۰۴ :: این مسیر در آرشیو وجود ندارد",
    homeLabel: "~/خانه",
    blogLabel: "~/نوشته‌ها",
    retryLabel: "تلاش دوباره",
    bottomHint: "// گره در آستانه گم شد — مسیر یافت نشد",
  },
} as const;

// ── traceroute lines (technical – kept in English) ─────────────────
const TRACE_LINES = [
  { delay: 0,    text: "$ traceroute --max-hops=8 zalliminal.dev/[path]" },
  { delay: 600,  text: " 1  gateway.local (192.168.1.1)   0.412 ms" },
  { delay: 1100, text: " 2  10.0.0.1 (10.0.0.1)          1.883 ms" },
  { delay: 1700, text: " 3  transit-node-3 (185.x.x.x)   22.41 ms" },
  { delay: 2300, text: " 4  * * *" },
  { delay: 2800, text: " 5  * * *" },
  { delay: 3300, text: " 6  * * *" },
  { delay: 3800, text: " 7  Request timeout for icmp_seq 7" },
  { delay: 4200, text: " 8  Request timeout for icmp_seq 8" },
  { delay: 4700, text: "traceroute: unknown host — node unreachable" },
  // The last line will be replaced with localized error
];

// ── glitch characters ──────────────────────────────────────────────
const GLITCH_CHARS = ["▓", "░", "█", "▒", "4", "0", "■", "□"];
function glitchChar(orig: string, active: boolean) {
  if (!active) return orig;
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

export function NotFoundClient({ locale }: NotFoundClientProps) {
  const isRTL = locale === "fa";
  const prefersReduced = useReducedMotion();
  const pathname = usePathname();

  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [done, setDone] = useState(false);
  const [glitch, setGlitch] = useState(false);

  // Get current path for traceroute line
  const currentPath = pathname ?? "/unknown";
  const traceLines = TRACE_LINES.map((line, i) => {
    if (i === 0) {
      return {
        ...line,
        text: line.text.replace("[path]", currentPath),
      };
    }
    if (i === TRACE_LINES.length - 1) {
      return {
        ...line,
        text: dict[locale].errorLine,
      };
    }
    return line;
  });

  // ── animation timers ────────────────────────────────────────────
  useEffect(() => {
    const timers = traceLines.map((line, i) =>
      setTimeout(() => {
        setVisibleLines((prev) => [...prev, i]);
        if (i === traceLines.length - 1) {
          setTimeout(() => setDone(true), 400);
        }
      }, line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [traceLines]);

  // ── periodic glitch on 404 numbers ─────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 120);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  // ── reset function ─────────────────────────────────────────────
  const handleRetry = () => {
    setVisibleLines([]);
    setDone(false);
    setTimeout(() => {
      const timers = traceLines.map((line, i) =>
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, i]);
          if (i === traceLines.length - 1) {
            setTimeout(() => setDone(true), 400);
          }
        }, line.delay)
      );
      return () => timers.forEach(clearTimeout);
    }, 50);
  };

  // ── font classes ───────────────────────────────────────────────
  const farsiFont = "font-farsi";
  const defaultFont = isRTL ? farsiFont : "font-mono";

  // ── glitched digits ────────────────────────────────────────────
  const [g0, g1, g2] = ["4", "0", "4"].map((c) =>
    glitchChar(c, glitch)
  );

  // ── number formatting for Farsi digits ────────────────────────
  const fmtYear = (n: number) =>
    isRTL ? n.toLocaleString("fa-IR", { useGrouping: false }) : n.toString();
  const year = fmtYear(new Date().getFullYear()); // not used but available

  // ── animation variants ────────────────────────────────────────
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-16 select-none"
    >
      {/* ── BIG 404 (always LTR) ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mb-8"
        aria-label={isRTL ? "۴۰۴" : "404"}
        dir="ltr"
      >
        <span
          aria-hidden
          className="absolute inset-0 font-mono text-[clamp(7rem,20vw,11rem)] font-black leading-none tracking-tighter text-primary/5 blur-sm translate-x-1 translate-y-1 select-none"
        >
          404
        </span>
        <span className="relative font-mono text-[clamp(7rem,20vw,11rem)] font-black leading-none tracking-tighter text-foreground/90">
          {g0}
          {g1}
          {g2}
        </span>
        <motion.div
          className="absolute -bottom-2 left-0 h-0.5 bg-primary/60"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
        />
      </motion.div>

      {/* ── TERMINAL WINDOW (forced LTR for code alignment) ───── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-xl rounded-xl border border-border bg-card/60 overflow-hidden shadow-lg mb-8"
        dir="ltr" // always LTR – terminal output is code
      >
        {/* Title bar */}
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 bg-muted/40">
          <Terminal className="h-3.5 w-3.5 text-muted-foreground" aria-hidden />
          <span className="font-mono text-xs text-muted-foreground tracking-wide">
            {dict[locale].windowTitle}
          </span>
          <div className="ml-auto flex gap-1.5" aria-hidden>
            {["bg-red-400/70", "bg-yellow-400/70", "bg-green-400/70"].map((c) => (
              <span key={c} className={`h-2.5 w-2.5 rounded-full ${c}`} />
            ))}
          </div>
        </div>

        {/* Output */}
        <div className="px-4 py-4 space-y-0.5 min-h-[200px]">
          {traceLines.map((line, i) => (
            <AnimatePresence key={i}>
              {visibleLines.includes(i) && (
                <motion.p
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.18 }}
                  className={`font-mono text-xs leading-relaxed ${
                    i === traceLines.length - 1
                      ? "text-red-400/80 font-semibold"
                      : i >= 3 && i <= 8
                      ? "text-muted-foreground/50"
                      : "text-muted-foreground"
                  }`}
                >
                  {line.text}
                </motion.p>
              )}
            </AnimatePresence>
          ))}

          {/* Blinking cursor */}
          {!done && (
            <span
              aria-hidden
              className="inline-block w-2 h-3.5 bg-primary/70 animate-pulse ml-0.5"
            />
          )}
        </div>
      </motion.div>

      {/* ── NAVIGATION BUTTONS ───────────────────────────────── */}
      <AnimatePresence>
        {done && (
          <motion.div
            variants={!prefersReduced ? containerVariants : undefined}
            initial={!prefersReduced ? "hidden" : undefined}
            animate={!prefersReduced ? "show" : undefined}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            <motion.div variants={itemVariants}>
              <Link
                href={`/${locale}`}
                className={`inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-2 ${defaultFont} text-sm text-muted-foreground transition-all duration-150 hover:border-primary/50 hover:text-primary hover:bg-primary/5`}
              >
                <Home className="h-3.5 w-3.5" aria-hidden />
                {dict[locale].homeLabel}
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href={`/${locale}/blog`}
                className={`inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-2 ${defaultFont} text-sm text-muted-foreground transition-all duration-150 hover:border-primary/50 hover:text-primary hover:bg-primary/5`}
              >
                <FileText className="h-3.5 w-3.5" aria-hidden />
                {dict[locale].blogLabel}
              </Link>
            </motion.div>

            <motion.div variants={itemVariants}>
              <button
                type="button"
                onClick={handleRetry}
                className={`inline-flex items-center gap-2 rounded-lg border border-border bg-card/60 px-4 py-2 ${defaultFont} text-sm text-muted-foreground transition-all duration-150 hover:border-primary/50 hover:text-primary hover:bg-primary/5`}
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden />
                {dict[locale].retryLabel}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── BOTTOM HINT ─────────────────────────────────────── */}
      <AnimatePresence>
        {done && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className={`mt-8 ${defaultFont} text-[10px] text-muted-foreground/40 tracking-widest`}
            dir={isRTL ? "rtl" : "ltr"}
          >
            {dict[locale].bottomHint}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}