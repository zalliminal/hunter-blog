"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Radar, Home, Search, ArrowLeft } from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { getDirection } from "@/lib/i18n";
import { useState, useEffect } from "react";

type Props = { locale: Locale };

// Apply Farsi font class conditionally
const FA_FONT_CLASS = "font-[family-name:var(--font-farsi)]";

// ── Background orbs with enhanced animation ──────────────────────────────────
function NotFoundBackgroundOrbs({ prefersReduced }: { prefersReduced: boolean | null }) {
  if (prefersReduced) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-32 -right-16 h-72 w-72 rounded-full bg-primary/15 blur-3xl"
        initial={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
        animate={{ 
          opacity: [0.4, 0.6, 0.4], 
          scale: [1, 1.05, 1],
          x: [0, -10, 0],
          y: [0, 10, 0]
        }}
        transition={{ 
          duration: 4, 
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-secondary/25 dark:bg-secondary/10 blur-3xl"
        initial={{ opacity: 0, scale: 0.8, x: -20, y: 20 }}
        animate={{ 
          opacity: [0.3, 0.5, 0.3], 
          scale: [1, 1.08, 1],
          x: [0, 10, 0],
          y: [0, -10, 0]
        }}
        transition={{ 
          duration: 5, 
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
          delay: 0.5
        }}
      />
    </div>
  );
}

// ── Framer variants ──────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: { 
    opacity: 1, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut", 
      staggerChildren: 0.08,
      delayChildren: 0.15
    } 
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 0.45, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
} as const;

const buttonVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.35, ease: "easeOut" }
  },
  hover: { 
    y: -2, 
    scale: 1.02,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  tap: { 
    scale: 0.97,
    transition: { duration: 0.1 }
  },
} as const;

// ── Translations ─────────────────────────────────────────────────────────────
const COPY = {
  en: {
    code: "404",
    title: "Signal Lost",
    desc: "The endpoint you're looking for doesn't exist or has been moved. Let's get you back on track.",
    homeBtn: "Return to Base",
    searchBtn: "Try Search",
    backBtn: "Go Back",
    techNote: "Error: RESOURCE_NOT_FOUND",
  },
  fa: {
    code: "۴۰۴",
    title: "سیگنال قطع شد",
    desc: "مسیری که جستجو می‌کنید وجود نداره یا جابجا شده. بیایید مسیر جدید پیدا کنیم.",
    homeBtn: "بازگشت به صفحه اصلی",
    searchBtn: "جستجو رو امتحان کنید",
    backBtn: "بازگشت به صفحه قبل",
    techNote: "خطا: RESOURCE_NOT_FOUND",
  },
} as const;

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function NotFoundClient({ locale }: Props) {
  const router = useRouter();
  const dir = getDirection(locale);
  const isRTL = locale === "fa";
  const prefersReduced = useReducedMotion();
  const content = COPY[locale];
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    setCanGoBack(window.history.length > 1);
  }, []);

  const handleGoBack = () => {
    if (canGoBack) {
      router.back();
    }
  };

  const baseContainerProps = prefersReduced
    ? {}
    : { variants: containerVariants, initial: "hidden" as const, animate: "show" as const };

  // Apply Farsi font class conditionally
  const fontClass = locale === "fa" ? FA_FONT_CLASS : "";

  return (
    <div 
      dir={dir} 
      className={`relative flex min-h-[calc(100vh-200px)] w-full items-center justify-center py-12 md:py-20 ${fontClass}`}
    >
      <motion.div
        {...baseContainerProps}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border/70 bg-card/40 px-6 py-10 shadow-2xl backdrop-blur-md sm:px-8 sm:py-12 md:px-10 md:py-14"
      >
        <NotFoundBackgroundOrbs prefersReduced={prefersReduced} />

        <div className="relative z-10 flex flex-col items-center text-center">
          
          {/* ── Animated Icon ─────────────────────────────────────────── */}
          <motion.div variants={itemVariants} className="mb-6">
            <div className="relative inline-flex items-center justify-center">
              <motion.div 
                className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              <motion.div 
                className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-border/60 bg-background/60 shadow-lg backdrop-blur-xl"
                whileHover={prefersReduced ? undefined : { 
                  rotate: [0, -5, 5, 0],
                  scale: 1.05,
                  borderColor: "var(--primary)"
                }}
                transition={{ duration: 0.4 }}
              >
                <Radar className="h-10 w-10 text-primary" strokeWidth={1.5} />
              </motion.div>
            </div>

            <motion.div 
              className="mt-6 text-[5rem] font-bold leading-none tracking-tighter text-foreground/10 dark:text-foreground/20 sm:text-[6rem]"
              initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.7, 
                delay: 0.4,
                ease: [0.34, 1.56, 0.64, 1]
              }}
            >
              {content.code}
            </motion.div>
          </motion.div>

          {/* ── Text Content ────────────────────────────────────────── */}
          <motion.h1 
            variants={itemVariants} 
            className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl md:text-3xl"
          >
            {content.title}
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {content.desc}
          </motion.p>

          <motion.div 
            variants={itemVariants} 
            className="mt-3 flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-1.5"
          >
            <motion.div
              className="h-2 w-2 rounded-full bg-destructive"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-[10px] font-mono text-muted-foreground/70">
              {content.techNote}
            </span>
          </motion.div>

          {/* ── Action Buttons ──────────────────────────────────────── */}
          <motion.div 
            variants={itemVariants} 
            className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            {canGoBack && (
              <motion.button
                onClick={handleGoBack}
                variants={buttonVariants}
                whileHover={prefersReduced ? undefined : "hover"}
                whileTap={prefersReduced ? undefined : "tap"}
                className="group inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/60 px-4 py-2.5 text-[11px] font-semibold text-foreground shadow-sm backdrop-blur-md transition-all duration-200 hover:border-primary/50 sm:px-5 sm:py-3 sm:text-xs"
              >
                <ArrowLeft className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary sm:h-4 sm:w-4" />
                {content.backBtn}
              </motion.button>
            )}

            <Link
              href={`/${locale}/`}
              className="group inline-flex items-center gap-2 rounded-md bg-primary/80 px-4 py-2.5 text-[11px] font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:brightness-110 hover:shadow-md sm:px-5 sm:py-3 sm:text-xs"
            >
              <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {content.homeBtn}
            </Link>

            <Link
              href={`/${locale}/search`}
              className="group inline-flex items-center gap-2 rounded-md border border-border/60 bg-background/60 px-4 py-2.5 text-[11px] font-semibold text-foreground shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-muted hover:border-primary/50 sm:px-5 sm:py-3 sm:text-xs"
            >
              <Search className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary sm:h-4 sm:w-4" />
              {content.searchBtn}
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}