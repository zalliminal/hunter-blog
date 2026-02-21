"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  Bug,
  ExternalLink,
  Clock,
  ArrowUpRight,
  Tag,
  ChevronRight,
  ChevronLeft,
  Search,
  Shield,
  Wifi,
  Calendar,
  Lock,
  BookOpen,
  Code2,
  Github,
} from "lucide-react";
import { SiX, SiTelegram } from "react-icons/si";
import { TbCurrencyEthereum } from "react-icons/tb";
import type { Locale } from "@/lib/i18n";
import type { Post } from "@/lib/blog";
import { getCategory, AUTHORS, getAuthorSignatureColors, getAuthorRole, getAuthorBio, getAuthorTagline } from "@/lib/categories_and_authors";
import ZalBackground from "./ZalBackground";
import Image from "next/image";
import { SiOwasp } from "react-icons/si";

type Props = { 
  locale: Locale; 
  isFa: boolean;
  posts: Post[];
};

// ─── Memoized Avatar ──────────────────────────────────────────────────────────
const ZalAvatar = React.memo(
  ({ reduced, primaryColor }: { reduced: boolean | null; primaryColor: string }) => {
    const [errored, setErrored] = useState(false);

    return (
      <div className="relative flex items-center justify-center w-28 h-28">
        {!reduced && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${primaryColor} / 0.18 0%, transparent 70%)`,
            }}
            animate={{ scale: [1, 1.14, 1], opacity: [0.7, 0.2, 0.7] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <motion.div
          className="absolute h-28 w-28 rounded-full"
          style={{
            border: `1px solid ${primaryColor} / 0.35`,
            background: `conic-gradient(from 0deg, transparent 0%, ${primaryColor} / 0.4 30%, transparent 60%)`,
          }}
          animate={reduced ? {} : { rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="absolute h-24 w-24 rounded-full"
          style={{
            border: `1px solid ${primaryColor} / 0.2`,
          }}
          animate={reduced ? {} : { rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        <div className="relative z-10 h-20 w-20 overflow-hidden rounded-full border-2 border-background bg-muted shadow-lg flex items-center justify-center">
          {!errored ? (
            <Image
              src={AUTHORS.zal.avatar}
              alt="Zal"
              fill
              className="object-cover"
              onError={() => setErrored(true)}
            />
          ) : (
            <span className="text-xs font-mono text-primary">ZL</span>
          )}
        </div>
      </div>
    );
  }
);
ZalAvatar.displayName = "ZalAvatar";

// ─── Glass Card ───────────────────────────────────────────────────────────────

const GlassCard = React.memo(({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={[
        "rounded-2xl border border-border/60",
        "bg-card/70 dark:bg-card/50",
        "backdrop-blur-xl shadow-md dark:shadow-lg",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
});
GlassCard.displayName = "GlassCard";

// ─── Specialty Chip ───────────────────────────────────────────────────────────

const SpecialtyChip = React.memo(({
  icon, label, reduced, primaryColor, secondaryColor, locale,
}: {
  icon: React.ReactNode; label: string; reduced: boolean | null; primaryColor: string; secondaryColor: string; locale: Locale;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const isFarsi = locale === "fa";
  
  return (
    <motion.span
      whileHover={reduced ? undefined : { y: -2, scale: 1.02 }}
      onHoverStart={() => !reduced && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-[11px] font-medium cursor-default transition-all duration-200"
      lang={locale}
      style={{
        borderColor: isHovered ? `${secondaryColor} / 0.4` : `${primaryColor} / 0.2`,
        backgroundColor: isHovered ? `${secondaryColor} / 0.15` : `${primaryColor} / 0.1`,
        color: isHovered ? secondaryColor : primaryColor,
        ...(isFarsi ? { fontFamily: "var(--font-farsi), var(--font-mono)" } : {}),
      }}
    >
      {icon}
      {label}
    </motion.span>
  );
});
SpecialtyChip.displayName = "SpecialtyChip";

// ─── Social Link ──────────────────────────────────────────────────────────────

const SocialLink = React.memo(({
  icon, label, handle, href, reduced, primaryColor, secondaryColor, locale,
}: {
  icon: React.ReactNode; label: string; handle: string; href: string; reduced: boolean | null; primaryColor: string; secondaryColor: string; locale: Locale;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const isFarsi = locale === "fa";
  
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={reduced ? undefined : { x: 3 }}
      onHoverStart={() => !reduced && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className="group flex items-center justify-between rounded-xl border border-border/50 bg-background/50 dark:bg-background/30 px-4 py-2.5 transition-all duration-200"
      lang={locale}
      style={{
        borderColor: isHovered ? `${secondaryColor} / 0.3` : `${primaryColor} / 0.2`,
        backgroundColor: isHovered ? `${secondaryColor} / 0.12` : `${primaryColor} / 0.05`,
      }}
    >
      <span className="flex items-center gap-3">
        <span 
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-muted text-muted-foreground transition-colors duration-200"
          style={{
            borderColor: isHovered ? `${secondaryColor} / 0.4` : `${primaryColor} / 0.3`,
            color: isHovered ? secondaryColor : primaryColor,
          }}
        >
          {icon}
        </span>
        <span className="flex flex-col">
          <span className="text-xs font-medium text-foreground/80">{label}</span>
          <span className="font-mono text-[10px] text-muted-foreground" dir="ltr" style={isFarsi ? { fontFamily: "var(--font-farsi), var(--font-mono)" } : undefined}>{handle}</span>
        </span>
      </span>
      <ArrowUpRight
        size={13}
        className="text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ color: isHovered ? secondaryColor : primaryColor }}
      />
    </motion.a>
  );
});
SocialLink.displayName = "SocialLink";

// ─── Post Card ────────────────────────────────────────────────────────────────

const PostCard = React.memo(({
  post, isFa, locale, reduced, primaryColor,
}: {
  post: Post; isFa: boolean; locale: Locale; reduced: boolean | null; primaryColor: string;
}) => {
  const category = getCategory(post.category);
  
  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -3 }}
      transition={{ type: "spring", stiffness: 350, damping: 26 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/70 dark:bg-card/50 p-5 backdrop-blur-xl shadow-sm dark:shadow-md transition-shadow duration-200 hover:shadow-md dark:hover:shadow-lg"
      style={{
        borderColor: `${primaryColor} / 0.3`,
      }}
    >
      <motion.div
        className="absolute bottom-0 left-0 h-[1.5px]"
        style={{
          background: `linear-gradient(to right, ${primaryColor} / 0.6, transparent)`,
        }}
        initial={{ scaleX: 0, originX: 0 }}
        whileHover={reduced ? {} : { scaleX: 1 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />

      <span
        className={[
          "mb-3 inline-flex w-fit items-center gap-1 rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider",
          category.color.bg,
          category.color.text,
        ].join(" ")}
      >
        <Tag size={9} />
        {category.label[locale]}
      </span>

      <Link href={post.url} className="mb-2 block">
        <h3 
          className="text-sm font-semibold leading-snug text-foreground/90 transition-colors duration-200 hover:opacity-80"
          style={{ color: `${primaryColor} / 0.9` }}
        >
          {post.title}
        </h3>
      </Link>

      <p className="mb-4 flex-1 font-mono text-[11px] leading-relaxed text-muted-foreground">
        {post.description}
      </p>

      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground/60">
          <span className="flex items-center gap-1">
            <Clock size={9} />
            {post.readingTime}{isFa ? " دقیقه" : " min"}
          </span>
          <span className="flex items-center gap-1">
            <Calendar size={9} />
            {new Date(post.date).toLocaleDateString(
              locale === "fa" ? "fa-IR" : "en-US",
              { year: "numeric", month: "short", day: "numeric" }
            )}
          </span>
        </div>
        <Link
          href={post.url}
          className="flex items-center gap-1 font-mono text-[10px] transition-colors duration-200 hover:opacity-80"
          style={{ color: `${primaryColor} / 0.6` }}
        >
          {isFa ? "بیشتر" : "read"}
          {/* Flip arrow direction for RTL */}
          {isFa ? <ChevronLeft size={10} /> : <ChevronRight size={10} />}
        </Link>
      </div>
    </motion.article>
  );
});
PostCard.displayName = "PostCard";

// ─── Framer Variants ──────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const sectionVariants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ZalPageClient({ locale, isFa, posts }: Props) {
  const dir = locale === "fa" ? "rtl" : "ltr";
  const reduced = useReducedMotion();
  
  const colors = getAuthorSignatureColors("zal");
  const primaryColor = colors.primary.oklch || colors.primary.hex;
  const secondaryColor = colors.secondary.oklch || colors.secondary.hex;

  const copy = {
    role: getAuthorRole("zal", locale),
    anonLabel: isFa ? "ناشناس" : "anonymous",
    statusLabel: isFa ? "فعال" : "active",
    bio: getAuthorBio("zal", locale),
    tagline: getAuthorTagline("zal", locale) || "",
    specialtiesTitle: isFa ? "تخصص‌ها و لینک‌ها" : "Specialties & Links",
    postsTitle: isFa ? "آخرین نوشته‌ها" : "Recent Writing",
    postsSubtitle: isFa
      ? "یادداشت‌های فنی از اکسپلویت‌ها، باگ باونتی و تحقیقات بلاکچین"
      : "Technical notes from exploits, bug bounty findings, and blockchain research",
    viewAll: isFa ? "همه نوشته‌ها" : "View all posts",
    noPosts: isFa ? "هنوز پستی نوشته نشده" : "No posts yet",
    // i18n Social Labels
    socialX: isFa ? "ایکس / توییتر" : "X / Twitter",
    socialGithub: isFa ? "گیت‌هاب" : "Github",
    socialTelegram: isFa ? "تلگرام" : "Telegram",
  } as const;

const specialties = [
  {
    icon: <TbCurrencyEthereum size={11} />,
    label: isFa ? "امنیت وب۳" : "Web3 Security"
  },
  {
    icon: <Search size={10} />,
    label: "SSRF & IDOR" // short technical terms stay as-is
  },
  {
    icon: <Code2 size={10} />,
    label: isFa ? "دور زدن احراز هویت" : "Authentication Bypass"
  },
  {
    icon: <Bug size={10} />,
    label: isFa ? "باگ بانتی دیفای" : "DeFi Bug Bounty"
  },
  {
    icon: <Wifi size={10} />,
    label: isFa ? "تحلیل پروتکل" : "Protocol Analysis"
  },
  {
    icon: <Shield size={10} />,
    label: isFa ? "پژوهش آسیب‌پذیری" : "Vulnerability Research"
  },
  {
    icon: <SiOwasp size={10} />,
    label: isFa ? "اوواسپ ۱۰ برتر" : "OWASP Top 10"
  },
];

  const socialLinks = [
    { icon: <SiX size={13} />, label: copy.socialX, handle: "x.com/kavlabs", href: AUTHORS.zal.links.twitter || "#" },
    { icon: <Github size={13} />, label: copy.socialGithub, handle: "github.com/zalliminal", href: AUTHORS.zal.links.hackerone || "#" },
    { icon: <SiTelegram size={15} />, label: copy.socialTelegram, handle: "t.me/kavlabs", href: AUTHORS.zal.links.immunefi || "#" },
  ];

  return (
    <>
      <div aria-hidden className="fixed inset-0 z-0 bg-background" />

      <ZalBackground reduced={reduced} primaryColor={primaryColor} />

      <div aria-hidden className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
        <div 
          className="absolute -top-40 left-1/3 h-80 w-80 rounded-full blur-[90px]"
          style={{ backgroundColor: `${primaryColor} / 0.07` }}
        />
        <div 
          className="absolute bottom-1/4 -right-20 h-60 w-60 rounded-full blur-[80px]"
          style={{ backgroundColor: `${primaryColor} / 0.05` }}
        />
      </div>

      {/* Added lang={locale} to trigger global CSS font rules */}
      <div dir={dir} lang={locale} className="-mx-4 md:-mx-6 -mt-8 min-h-screen relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl px-4 py-14 md:px-6 space-y-6"
        >

          <motion.nav variants={sectionVariants} aria-label="breadcrumb" dir="ltr"
            className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/60"
          >
            <Link href={`/${locale}`} className="hover:text-muted-foreground transition-colors">kavlabs</Link>
            <ChevronRight size={9} />
            <Link href={`/${locale}/authors`} className="hover:text-muted-foreground transition-colors">authors</Link>
            <ChevronRight size={9} />
            <span style={{ color: primaryColor }}>zal</span>
          </motion.nav>

          <motion.section variants={sectionVariants}>
            <GlassCard className="p-6 md:p-8">
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <ZalAvatar reduced={reduced} primaryColor={primaryColor} />
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <Lock size={8} />
                      {copy.anonLabel}
                    </span>
                    <span 
                      className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider"
                      style={{
                        borderColor: `${primaryColor} / 0.3`,
                        backgroundColor: `${primaryColor} / 0.1`,
                        color: primaryColor,
                      }}
                    >
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: primaryColor }}
                        animate={reduced ? {} : { opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      />
                      {copy.statusLabel}
                    </span>
                  </div>
                </div>

                <div className="flex-1 space-y-3 text-center md:text-start">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{AUTHORS.zal.name[locale]}</h1>
                    <span className="mt-1 block font-mono text-[10px] text-muted-foreground/50" dir="ltr">
                      {AUTHORS.zal.handle} · 0x∗∗∗∗∗∗∗
                    </span>
                    <p 
                      className="mt-1.5 text-xs font-medium"
                      style={{ color: primaryColor }}
                    >
                      {copy.role}
                    </p>
                    {/* Tagline now inherits font-farsi via lang="fa" on parent */}
                    <p className="mt-0.5 font-mono text-[10px] italic text-muted-foreground/60">{copy.tagline}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{copy.bio}</p>
                </div>
              </div>
            </GlassCard>
          </motion.section>

          <motion.section variants={sectionVariants}>
            <GlassCard className="p-5 md:p-6 space-y-5">
              <p 
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: `${primaryColor} / 0.6` }}
              >
                {copy.specialtiesTitle}
              </p>

              <div className="flex flex-wrap gap-2">
                {specialties.map((s, i) => (
                  <SpecialtyChip key={i} icon={s.icon} label={s.label} reduced={reduced} primaryColor={primaryColor} secondaryColor={secondaryColor} locale={locale} />
                ))}
              </div>

              <div className="border-t border-border/40" />

              <div className="grid gap-2 sm:grid-cols-3">
                {socialLinks.map((link, i) => (
                  <SocialLink key={i} {...link} reduced={reduced} primaryColor={primaryColor} secondaryColor={secondaryColor} locale={locale} />
                ))}
              </div>
            </GlassCard>
          </motion.section>

          <motion.section variants={sectionVariants} className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-foreground/90">{copy.postsTitle}</h2>
                <p className="mt-0.5 text-[11px] text-muted-foreground/60">{copy.postsSubtitle}</p>
              </div>
              <Link
                href={`/${locale}/blog?author=zal`}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg border px-3 py-1.5 font-mono text-[10px] font-medium transition-all duration-200 hover:opacity-80"
                style={{
                  borderColor: `${primaryColor} / 0.2`,
                  backgroundColor: `${primaryColor} / 0.1`,
                  color: primaryColor,
                }}
              >
                {copy.viewAll}
                <ExternalLink size={9} />
              </Link>
            </div>

            {posts.length > 0 ? (
              <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (<PostCard key={post.slug} post={post} isFa={isFa} locale={locale} primaryColor={primaryColor} />))}
              </div>
            ) : (
              <div className="text-center py-12 border border-border/40 rounded-2xl bg-card/30">
                <BookOpen className="h-8 w-8 mx-auto mb-3 text-muted-foreground/40" />
                <p className="text-muted-foreground text-sm">{copy.noPosts}</p>
              </div>
            )}
          </motion.section>

          <motion.div
            variants={sectionVariants}
            className="flex items-center justify-center gap-2 py-4 font-mono text-[9px] text-muted-foreground/60"
            dir="ltr"
          >
            <span style={{ color: `${primaryColor} / 0.5` }}>◆</span>
            <span>kavlabs.dev · zal · {new Date().getFullYear()}</span>
            <span style={{ color: `${primaryColor} / 0.5` }}>◆</span>
          </motion.div>

        </motion.div>
      </div>
    </>
  );
}