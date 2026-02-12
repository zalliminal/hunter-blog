"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Github, Rss, Mail, Shield, Terminal, FileText, Tag, Heart } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type SiteFooterProps = {
  locale: Locale;
};

// ── helpers ─────────────────────────────────────────────────────────
const fmt = (n: number, locale: Locale) =>
  locale === "fa" ? n.toLocaleString("fa-IR") : n.toString();

// ── static data ────────────────────────────────────────────────────
const NAV = {
  en: [
    { href: "/en/blog", icon: FileText, label: "Blog" },
    { href: "/en/tags", icon: Tag, label: "Tags" },
  ],
  fa: [
    { href: "/fa/blog", icon: FileText, label: "نوشته‌ها" },
    { href: "/fa/tags", icon: Tag, label: "تگ‌ها" },
  ],
} as const;

const EXTERNALS = [
  { href: "https://github.com/zalliminal", icon: Github, label: "GitHub" },
  { href: "/rss.xml", icon: Rss, label: "RSS Feed" },
  { href: "mailto:you@example.com", icon: Mail, label: "Email" },
] as const;

// ── pgp / ctf flavour ─────────────────────────────────────────────
const PGP_STUB = "4A3F 8B2C 9D1E 7F60 · 2025";

export function SiteFooter({ locale }: SiteFooterProps) {
  const isRTL = locale === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  const year = new Date().getFullYear();
  const prefersReduced = useReducedMotion();

  const navItems = NAV[locale];

  // ── font classes – Farsi vs English ──────────────────────────────
  const farsiFont = "font-farsi"; // you can change this to any Persian font class
  const defaultFont = isRTL ? farsiFont : "font-mono";

  // ── localised strings ───────────────────────────────────────────
  const copy = {
    tagline: isRTL
      ? " یادداشت های کسی که دوست داره  بیشتر یاد بگیره "
      : "notes from someone who loves to learn more",
    // pgpLabel: isRTL ? "اثر انگشت PGP" : "PGP fingerprint",
    rights: isRTL ? "تمام حقوق محفوظ است" : "all rights reserved",
    brand: "Zalliminal",
    madeWith: isRTL
      ? "ساخته‌شده با عشق توسط"
      : "made with love by",
    and: isRTL ? "و" : "and",
  };

  // ── animation variants ──────────────────────────────────────────
  const containerVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        ease: "easeOut",
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.footer
      dir={dir}
      variants={!prefersReduced ? containerVariants : undefined}
      initial={!prefersReduced ? "hidden" : undefined}
      animate={!prefersReduced ? "show" : undefined}
      className="relative border-t border-border overflow-hidden"
    >
      {/* scanline / grid texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.045]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, currentColor 2px, currentColor 3px)",
          backgroundSize: "100% 4px",
        }}
      />

      {/* top accent line */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"
      />

      <div className="relative mx-auto max-w-5xl px-4 md:px-6 py-10 space-y-8">
        {/* ROW 1 – brand + tagline + external icons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
        >
          {/* brand block */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary shrink-0" aria-hidden />
              <span className={`${defaultFont} text-base font-semibold tracking-widest uppercase`}>
                {copy.brand}
              </span>
            </div>
            <p className={`${defaultFont} text-[11px] text-muted-foreground max-w-xs leading-relaxed`}>
              {copy.tagline}
            </p>
            {/* PGP stub – keep monospace even in Farsi (ASCII) */}
            {/* <div className="flex items-center gap-1.5 pt-1">
              <Terminal className="h-3 w-3 text-muted-foreground/50 shrink-0" aria-hidden />
              <span className="font-mono text-[10px] text-muted-foreground/50 select-all">
                {copy.pgpLabel}: {PGP_STUB}
              </span>
            </div> */}
          </div>

          {/* external icons – no manual flex‑reverse */}
          <div className="flex items-center gap-3">
            {EXTERNALS.map(({ href, icon: Icon, label }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-150 hover:border-primary/60 hover:text-primary hover:bg-primary/5"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden />
              </a>
            ))}
          </div>
        </motion.div>

        {/* DIVIDER – dotted line (keep monospace) */}
        <motion.div
          variants={itemVariants}
          aria-hidden
          className="font-mono text-[10px] text-muted-foreground/30 tracking-[0.3em] overflow-hidden whitespace-nowrap select-none"
        >
          {"· · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·"}
        </motion.div>

        {/* ROW 2 – nav + fingerprint */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <nav
            aria-label={isRTL ? "پیوندهای سایت" : "Site links"}
            className="flex items-center gap-1"
          >
            {navItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center gap-1.5 rounded-md border border-transparent px-2.5 py-1 ${defaultFont} text-xs text-muted-foreground transition-all duration-150 hover:border-border hover:text-foreground hover:bg-muted/50`}
              >
                <Icon className="h-3 w-3" aria-hidden />
                {label}
              </Link>
            ))}
          </nav>
          
        </motion.div>

        {/* ROW 3 – copyright + open source credits */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between gap-4 pt-2"
        >
          {/* copyright – use Farsi font for year and brand */}
          <p className={`${defaultFont} text-[10px] text-muted-foreground/50`}>
            <span className="text-muted-foreground/30 me-1" aria-hidden>©</span>
            {fmt(year, locale)} {copy.brand} — {copy.rights}
          </p>

          {/* credits – use Farsi font for Persian text */}
          <p className={`${defaultFont} text-[10px] text-muted-foreground flex items-center gap-1.5`}>
            <Heart className="h-3 w-3 text-red-400/70" aria-hidden />
            <span>{copy.madeWith}</span>
            <a
              href="https://github.com/parhamf6"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground underline decoration-border underline-offset-2 transition-colors"
            >
              Parham Forati
            </a>
            <span>{copy.and}</span>
            <a
              href="https://github.com/zalliminal"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground underline decoration-border underline-offset-2 transition-colors"
            >
              Zalliminal
            </a>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}