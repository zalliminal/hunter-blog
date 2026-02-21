"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  Code2,
  ExternalLink,
  Clock,
  Github,
  ArrowUpRight,
  Tag,
  ChevronRight,
  ChevronLeft,
  Terminal,
  Users,
  Cpu,
  ShieldCheck,
  Calendar,
} from "lucide-react";
import { SiX, SiTelegram } from "react-icons/si";
import type { Locale } from "@/lib/i18n";
import type { Post } from "@/lib/blog";
import { getCategory, AUTHORS, getAuthorSignatureColors, getAuthorRole, getAuthorBio, getAuthorTagline } from "@/lib/categories_and_authors";
import MinimalParhamBackground from "./ParhamBackground";
import Image from "next/image";
import { BiSolidCity, BiLogoGoLang, BiLogoPython, BiLogoPhp } from "react-icons/bi";

type Props = { 
  locale: Locale; 
  isFa: boolean;
  posts: Post[];
};

// ─── Memoized Avatar ──────────────────────────────────────────────────────────
const ParhamAvatar = React.memo(
  ({ reduced, primaryColor }: { reduced: boolean | null; primaryColor: string }) => {
    const [errored, setErrored] = useState(false);

    return (
      <div className="relative flex items-center justify-center w-28 h-28">
        {!reduced && (
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: `radial-gradient(circle, ${primaryColor} 0%, transparent 70%)`,
              opacity: 0.15,
              filter: "blur(10px)"
            }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        <div
          className="absolute h-28 w-28 rounded-full border border-border/50"
          style={{ borderColor: `${primaryColor} / 0.3` }}
        />

        <div className="relative z-10 h-24 w-24 overflow-hidden rounded-full border-2 border-background bg-muted shadow-lg flex items-center justify-center">
          {!errored ? (
            <Image
              src={AUTHORS.parhamf.avatar}
              alt="Parham"
              fill
              priority
              className="object-cover"
              onError={() => setErrored(true)}
            />
          ) : (
            <span className="text-xs font-mono text-primary">PH</span>
          )}
        </div>
      </div>
    );
  }
);
ParhamAvatar.displayName = "ParhamAvatar";

// ─── Glass Card ───────────────────────────────────────────────────────────────
const GlassCard = React.memo(({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-2xl border border-border/60",
        "bg-card/60 dark:bg-card/40",
        "backdrop-blur-md shadow-sm dark:shadow-md",
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
  icon, label, primaryColor, secondaryColor, locale,
}: {
  icon: React.ReactNode; label: string; primaryColor: string; secondaryColor: string; locale: Locale;
}) => {
  const isFarsi = locale === "fa";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-[11px] font-medium cursor-default transition-all duration-300 hover:scale-105"
      lang={locale}
      style={{
        borderColor: `${primaryColor} / 0.2`,
        backgroundColor: `${primaryColor} / 0.05`,
        color: primaryColor,
        ...(isFarsi ? { fontFamily: "var(--font-farsi), var(--font-mono)" } : {}),
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${secondaryColor} / 0.4`;
        e.currentTarget.style.backgroundColor = `${secondaryColor} / 0.1`;
        e.currentTarget.style.color = secondaryColor;
        e.currentTarget.style.boxShadow = `0 0 15px ${secondaryColor}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${primaryColor} / 0.2`;
        e.currentTarget.style.backgroundColor = `${primaryColor} / 0.05`;
        e.currentTarget.style.color = primaryColor;
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {icon}
      {label}
    </span>
  );
});
SpecialtyChip.displayName = "SpecialtyChip";

// ─── Social Link ──────────────────────────────────────────────────────────────
const SocialLink = React.memo(({
  icon, label, handle, href, primaryColor, secondaryColor, locale,
}: {
  icon: React.ReactNode; label: string; handle: string; href: string; primaryColor: string; secondaryColor: string; locale: Locale;
}) => {
  const isFarsi = locale === "fa";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-xl border border-border/50 bg-background/40 dark:bg-background/20 px-4 py-2.5 transition-all duration-300 hover:-translate-y-0.5"
      lang={locale}
      style={{ borderColor: `${primaryColor} / 0.1` }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${secondaryColor} / 0.3`;
        e.currentTarget.style.backgroundColor = `${secondaryColor} / 0.05`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = `${primaryColor} / 0.1`;
        e.currentTarget.style.backgroundColor = `transparent`;
        e.currentTarget.classList.add('bg-background/40', 'dark:bg-background/20');
      }}
    >
      <span className="flex items-center gap-3">
        <span 
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-muted/50 text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
          style={{ borderColor: `${primaryColor} / 0.2`, color: primaryColor }}
        >
          {icon}
        </span>
        <span className="flex flex-col">
          <span className="text-xs font-medium text-foreground/80">{label}</span>
          <span className="font-mono text-[10px] text-muted-foreground" dir="ltr" style={isFarsi ? { fontFamily: "var(--font-farsi), var(--font-mono)" } : undefined}>{handle}</span>
        </span>
      </span>
      <ArrowUpRight size={13} className="text-muted-foreground/40 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: primaryColor }} />
    </a>
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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function ParhamPageClient({ locale, isFa, posts }: Props) {
  const dir = locale === "fa" ? "rtl" : "ltr";
  const reduced = useReducedMotion();
  const colors = React.useMemo(() => getAuthorSignatureColors("parhamf"), []);
  const primaryColor = colors.primary.oklch || colors.primary.hex;
  const secondaryColor = colors.secondary.oklch || colors.secondary.hex;

  const copy = React.useMemo(() => ({
    role: getAuthorRole("parhamf", locale),
    statusLabel: isFa ? "مشغول": "available",
    bio: getAuthorBio("parhamf", locale),
    tagline: getAuthorTagline("parhamf", locale) || "",
    specialtiesTitle: isFa ? "تخصص‌ها و لینک‌ها" : "Specialties & Links",
    postsTitle: isFa ? "آخرین نوشته‌ها" : "Recent Writing",
    postsSubtitle: isFa ? "آموزش‌های امنیتی، سواد دیجیتال و تحلیل کد" : "Security education, digital literacy, and code analysis",
    viewAll: isFa ? "همه نوشته‌ها" : "View all posts",
    noPosts: isFa ? "هنوز پستی نوشته نشده" : "No posts yet",
    // i18n Social Labels
    socialX: isFa ? "ایکس / توییتر" : "X / Twitter",
    socialGithub: isFa ? "گیت‌هاب" : "Github",
    socialTelegram: isFa ? "تلگرام" : "Telegram",
  }), [locale, isFa]);

  const specialties = React.useMemo(() => [
  {
    icon: <BookOpen size={10} />,
    label: isFa ? "محقق امنیت" : "Security Researcher"
  },

  {
    icon: <BiLogoPython size={10} />,
    label: isFa ? "پایتون" : "Python"
  },
  {
    icon: <BiLogoGoLang size={10} />,
    label: isFa ? "گو" : "Go"
  },
  {
    icon: <BiLogoPhp size={10} />,
    label: isFa ? "پی‌اچ‌پی" : "PHP"
  },

  {
    icon: <Terminal size={10} />,
    label: isFa ? "توسعه سالیدیتی" : "Solidity Development"
  },
  {
    icon: <ShieldCheck size={10} />,
    label: isFa ? "تحلیل کد" : "Code Review"
  },
  {
    icon: <Cpu size={10} />,
    label: isFa ? "ابزارسازی" : "Tooling"
  },
], [isFa]);

  const socialLinks = React.useMemo(() => [
    { icon: <SiX size={13} />, label: copy.socialX, handle: "x.com/kavlabs", href: AUTHORS.parhamf.links.twitter || "#" },
    { icon: <Github size={13} />, label: copy.socialGithub, handle: "github.com/parhamf6", href: AUTHORS.parhamf.links.github || "#" },
    { icon: <SiTelegram size={15} />, label: copy.socialTelegram, handle: "t.me/kavlabs", href: AUTHORS.parhamf.links.telegram || "#" },
  ], [copy]);

  return (
    <>
      <MinimalParhamBackground reduced={reduced} primaryColor={primaryColor} secondaryColor={secondaryColor} />
      {/* Added lang={locale} to trigger global CSS font rules */}
      <div dir={dir} lang={locale} className="-mx-4 md:-mx-6 -mt-8 min-h-screen relative z-10">
        <div className="mx-auto max-w-4xl px-4 py-14 md:px-6 space-y-8">
          <nav aria-label="breadcrumb" dir="ltr" className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/60">
            <Link href={`/${locale}`} className="hover:text-foreground transition-colors">kavlabs</Link>
            <ChevronRight size={9} />
            <Link href={`/${locale}/authors`} className="hover:text-foreground transition-colors">authors</Link>
            <ChevronRight size={9} />
            <span className="font-medium" style={{ color: primaryColor }}>parham</span>
          </nav>

          <section>
            <GlassCard className="p-6 md:p-8">
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <ParhamAvatar reduced={reduced} primaryColor={primaryColor} />
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <Users size={8} />
                      {isFa ? "عمومی" : "public"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider" style={{ borderColor: `${primaryColor} / 0.3`, backgroundColor: `${primaryColor} / 0.1`, color: primaryColor }}>
                      <span className="h-1.5 w-1.5 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
                      {copy.statusLabel}
                    </span>
                  </div>
                </div>
                <div className="flex-1 space-y-3 text-center md:text-start">
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{AUTHORS.parhamf.name[locale]}</h1>
                    <span className="mt-1 block font-mono text-[10px] text-muted-foreground/50" dir="ltr">{AUTHORS.parhamf.handle} · Dev & Educator</span>
                    <p className="mt-1.5 text-xs font-medium" style={{ color: primaryColor }}>{copy.role}</p>
                    {/* Tagline now inherits font-farsi via lang="fa" on parent */}
                    <p className="mt-0.5 font-mono text-[10px] italic text-muted-foreground/60">{copy.tagline}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground max-w-xl mx-auto md:mx-0">{copy.bio}</p>
                </div>
              </div>
            </GlassCard>
          </section>

          <section>
            <GlassCard className="p-5 md:p-6 space-y-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: `${primaryColor} / 0.6` }}>{copy.specialtiesTitle}</p>
              <div className="flex flex-wrap gap-2">
                {specialties.map((s, i) => (<SpecialtyChip key={i} icon={s.icon} label={s.label} primaryColor={primaryColor} secondaryColor={secondaryColor} locale={locale} />))}
              </div>
              <div className="border-t border-border/40" />
              <div className="grid gap-2 sm:grid-cols-3">
                {socialLinks.map((link, i) => (<SocialLink key={i} {...link} primaryColor={primaryColor} secondaryColor={secondaryColor} locale={locale} />))}
              </div>
            </GlassCard>
          </section>

          <section className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-sm font-semibold tracking-tight text-foreground/90">{copy.postsTitle}</h2>
                <p className="mt-0.5 text-[11px] text-muted-foreground/60">{copy.postsSubtitle}</p>
              </div>
              <Link href={`/${locale}/blog?author=parhamf`} className="inline-flex shrink-0 items-center gap-1 rounded-lg border px-3 py-1.5 font-mono text-[10px] font-medium transition-all duration-200 hover:bg-primary/10 hover:border-primary/30" style={{ borderColor: `${primaryColor} / 0.2`, color: primaryColor }}>
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
          </section>

          <div className="flex items-center justify-center gap-2 py-4 font-mono text-[9px] text-muted-foreground/60" dir="ltr">
            <span style={{ color: `${primaryColor} / 0.5` }}>◆</span>
            <span>kavlabs.dev · parham · {new Date().getFullYear()}</span>
            <span style={{ color: `${primaryColor} / 0.5` }}>◆</span>
          </div>
        </div>
      </div>
    </>
  );
}