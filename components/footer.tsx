"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Rss, Mail, Shield, FileText, Search, Map, Github, Heart } from "lucide-react";
import type { Locale } from "@/lib/i18n";

type SiteFooterProps = {
  locale: Locale;
};

// ── helpers ─────────────────────────────────────────────────────────
const fmt = (n: number, locale: Locale) =>
  locale === "fa" ? n.toLocaleString("fa-IR") : n.toString();

// ── author data ────────────────────────────────────────────────────
const AUTHORS = {
  parham: {
    name: "Parham",
    nameFa: "پرهام",
    github: "https://github.com/parhamf6",
    mail: "mailto:parhamfdev@proton.me",
    // oklch primary yellow from i18n.ts signature
    colorLight: "#b45309",   // amber-700 equivalent for text
    colorBg: "#fef3c7",      // amber-100
    colorBgDark: "#451a03",  // amber-950
    hoverBorder: "#fbbf24",  // amber-400
    hoverText: "#d97706",    // amber-600
    // CSS custom property approach for dark mode awareness
    hoverClass: "hover:border-amber-400 hover:text-amber-500 hover:bg-amber-50 dark:hover:border-amber-500 dark:hover:text-amber-400 dark:hover:bg-amber-950/40",
    dotClass: "bg-amber-400",
  },
  zal: {
    name: "Zal",
    nameFa: "زال",
    github: "https://github.com/zalliminal",
    mail: "mailto:zalliminal@proton.me",
    hoverClass: "hover:border-green-400 hover:text-green-500 hover:bg-green-50 dark:hover:border-green-500 dark:hover:text-green-400 dark:hover:bg-green-950/40",
    dotClass: "bg-green-400",
  },
} as const;

// ── nav items ──────────────────────────────────────────────────────
const NAV = {
  en: [
    { href: "/en/blog", icon: FileText, label: "Blog" },
    { href: "/en/categories", icon: Map, label: "Categories" },
    { href: "/en/search", icon: Search, label: "Advanced Search" },
  ],
  fa: [
    { href: "/fa/blog", icon: FileText, label: "نوشته‌ها" },
    { href: "/fa/categories", icon: Map, label: "دسته‌بندی‌ها" },
    { href: "/fa/search", icon: Search, label: "جستجوی پیشرفته" },
  ],
} as const;

// ── i18n copy ──────────────────────────────────────────────────────
const COPY = {
  en: {
    tagline: "Notes from exploratory minds, for curious minds",
    rights: "all rights reserved",
    brand: "KavLabs",
    madeWith: "made with love by",
    and: "and",
    rssFeed: "RSS Feed",
    sitemap: "Sitemap",
    github: "GitHub",
    email: "Email",
    authorSection: "Authors",
    navSection: "Navigation",
  },
  fa: {
    tagline: "یادداشت‌هایی از ذهن‌های کاوشگر، برای ذهن‌های کنجکاو",
    rights: "تمام حقوق محفوظ است",
    brand: "KavLabs",
    madeWith: "ساخته‌شده با عشق توسط",
    and: "و",
    rssFeed: "فید RSS",
    sitemap: "نقشه سایت",
    github: "گیت‌هاب",
    email: "ایمیل",
    authorSection: "نویسندگان",
    navSection: "ناوبری",
  },
} as const;

export function SiteFooter({ locale }: SiteFooterProps) {
  const isRTL = locale === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  const year = new Date().getFullYear();
  const prefersReduced = useReducedMotion();

  const navItems = NAV[locale];
  const copy = COPY[locale];

  // ── font classes ───────────────────────────────────────────────
  const monoFont = isRTL ? "font-farsi" : "font-mono";
  const sansFont = isRTL ? "font-farsi" : "font-sans";

  // ── animation variants ─────────────────────────────────────────
  const containerVariants = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.08, delayChildren: 0.15, ease: "easeOut", duration: 0.5 },
    },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <motion.footer
      dir={dir}
      variants={!prefersReduced ? containerVariants : undefined}
      initial={!prefersReduced ? "hidden" : undefined}
      animate={!prefersReduced ? "show" : undefined}
      className="relative border-t border-border overflow-hidden"
    >
      {/* scanline texture */}
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

        {/* ROW 1 – brand + tagline */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
        >
          {/* brand block */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className={`${monoFont} text-base font-semibold tracking-widest uppercase mr-2`}>
                {copy.brand}
              </span>
              {/* RSS + Sitemap icon row */}
              <div className="flex items-center gap-2">
                <a
                  href="/rss.xml"
                  aria-label={copy.rssFeed}
                  title={copy.rssFeed}
                  className="group flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-150 hover:border-orange-400/70 hover:text-orange-500 hover:bg-orange-50 dark:hover:border-orange-500/50 dark:hover:text-orange-400 dark:hover:bg-orange-950/30"
                >
                  <Rss className="h-3.5 w-3.5" aria-hidden />
                </a>
                <a
                  href="/sitemap.xml"
                  aria-label={copy.sitemap}
                  title={copy.sitemap}
                  className="group flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-150 hover:border-primary/60 hover:text-primary hover:bg-primary/5"
                >
                  <Map className="h-3.5 w-3.5" aria-hidden />
                </a>
              </div>
            </div>
            <p className={`${monoFont} text-[11px] text-muted-foreground max-w-xs leading-relaxed`}>
              {copy.tagline}
            </p>
          </div>

          {/* author badges + rss/sitemap icons */}
          <div className="flex flex-col gap-3 items-start sm:items-end">

            {/* Author badges row */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Parham GitHub */}
              <AuthorBadge
                href={AUTHORS.parham.github}
                icon={<Github className="h-3 w-3" aria-hidden />}
                label={isRTL ? AUTHORS.parham.nameFa : AUTHORS.parham.name}
                sublabel={copy.github}
                hoverClass={AUTHORS.parham.hoverClass}
                dotClass={AUTHORS.parham.dotClass}
                isRTL={isRTL}
                monoFont={monoFont}
                external
              />
              {/* Parham Mail */}
              <AuthorBadge
                href={AUTHORS.parham.mail}
                icon={<Mail className="h-3 w-3" aria-hidden />}
                label={isRTL ? AUTHORS.parham.nameFa : AUTHORS.parham.name}
                sublabel={copy.email}
                hoverClass={AUTHORS.parham.hoverClass}
                dotClass={AUTHORS.parham.dotClass}
                isRTL={isRTL}
                monoFont={monoFont}
              />
              {/* Zal GitHub */}
              <AuthorBadge
                href={AUTHORS.zal.github}
                icon={<Github className="h-3 w-3" aria-hidden />}
                label={isRTL ? AUTHORS.zal.nameFa : AUTHORS.zal.name}
                sublabel={copy.github}
                hoverClass={AUTHORS.zal.hoverClass}
                dotClass={AUTHORS.zal.dotClass}
                isRTL={isRTL}
                monoFont={monoFont}
                external
              />
              {/* Zal Mail */}
              <AuthorBadge
                href={AUTHORS.zal.mail}
                icon={<Mail className="h-3 w-3" aria-hidden />}
                label={isRTL ? AUTHORS.zal.nameFa : AUTHORS.zal.name}
                sublabel={copy.email}
                hoverClass={AUTHORS.zal.hoverClass}
                dotClass={AUTHORS.zal.dotClass}
                isRTL={isRTL}
                monoFont={monoFont}
              />
            </div>
          </div>
        </motion.div>

        {/* DIVIDER */}
        <motion.div
          variants={itemVariants}
          aria-hidden
          className="font-mono text-[10px] text-muted-foreground/30 tracking-[0.3em] overflow-hidden whitespace-nowrap select-none"
        >
          {"· · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · · ·"}
        </motion.div>

        {/* ROW 2 – nav links */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <nav
            aria-label={isRTL ? "پیوندهای سایت" : "Site links"}
            className="flex items-center gap-1 flex-wrap"
          >
            {navItems.map(({ href, icon: Icon, label }) => (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center gap-1.5 rounded-md border border-transparent px-2.5 py-1 ${monoFont} text-xs text-muted-foreground transition-all duration-150 hover:border-border hover:text-foreground hover:bg-muted/50`}
              >
                <Icon className="h-3 w-3" aria-hidden />
                {label}
              </Link>
            ))}
          </nav>
        </motion.div>

        {/* ROW 3 – copyright + credits */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between gap-4 pt-2"
        >
          <p className={`${monoFont} text-[10px] text-muted-foreground/50`}>
            <span className="text-muted-foreground/30 me-1" aria-hidden>©</span>
            {fmt(year, locale)} {copy.brand} — {copy.rights}
          </p>

          <p className={`${sansFont} text-[10px] text-muted-foreground flex items-center gap-1.5`}>
            <Heart className="h-3 w-3 text-red-400/70 shrink-0" aria-hidden />
            <span>
              {copy.madeWith}{" "}
              <a
                href="https://github.com/parhamf6"
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-500 underline decoration-border underline-offset-2 transition-colors"
              >
                {isRTL ? AUTHORS.parham.nameFa : AUTHORS.parham.name}
              </a>
              {" "}{copy.and}{" "}
              <a
                href="https://github.com/zalliminal"
                target="_blank"
                rel="noreferrer"
                className="hover:text-green-500 underline decoration-border underline-offset-2 transition-colors"
              >
                {isRTL ? AUTHORS.zal.nameFa : AUTHORS.zal.name}
              </a>
            </span>
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

// ── AuthorBadge sub-component ─────────────────────────────────────
type AuthorBadgeProps = {
  href: string;
  icon: React.ReactNode;
  label: string;
  sublabel: string;
  hoverClass: string;
  dotClass: string;
  isRTL: boolean;
  monoFont: string;
  external?: boolean;
};

function AuthorBadge({
  href,
  icon,
  label,
  sublabel,
  hoverClass,
  dotClass,
  isRTL,
  monoFont,
  external,
}: AuthorBadgeProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      aria-label={`${label} — ${sublabel}`}
      className={`
        group inline-flex items-center gap-1.5
        rounded-md border border-border
        px-2.5 py-1
        text-muted-foreground
        transition-all duration-150
        ${hoverClass}
      `}
    >
      {/* colored dot indicator for author */}
      <span
        className={`h-1.5 w-1.5 rounded-md shrink-0 opacity-60 group-hover:opacity-100 transition-opacity ${dotClass}`}
        aria-hidden
      />
      <span className={`${monoFont} text-[10px] font-medium`}>{label}</span>
      <span className="text-muted-foreground/40 group-hover:text-current transition-colors" aria-hidden>·</span>
      {icon}
    </a>
  );
}