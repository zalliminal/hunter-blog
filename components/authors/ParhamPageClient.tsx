"use client";

import { motion, useReducedMotion } from "framer-motion";
import * as React from "react";
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
import ParhamBackground from "./ParhamBackground";

type Props = { 
  locale: Locale; 
  isFa: boolean;
  posts: Post[];
};

// ─── Public Avatar (Real Photo) ──────────────────────────────────────────────

function ParhamAvatar({ reduced, primaryColor }: { reduced: boolean | null; primaryColor: string }) {
  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      {!reduced && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${primaryColor} / 0.2) 0%, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      
      <motion.div
        className="absolute h-28 w-28 rounded-full"
        style={{
          border: `1px solid ${primaryColor} / 0.4`,
          background: `conic-gradient(from 0deg, transparent 0%, ${primaryColor} / 0.3) 40%, transparent 80%)`,
        }}
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="absolute h-24 w-24 rounded-full"
        style={{
          border: `1px solid ${primaryColor} / 0.2`,
        }}
        animate={reduced ? {} : { rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 h-20 w-20 overflow-hidden rounded-full border-2 border-background bg-muted shadow-lg">
        <img
          src={AUTHORS.parhamf.avatar}
          alt="Parham"
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            (e.target as HTMLImageElement).parentElement!.classList.add("flex", "items-center", "justify-center", "bg-primary/10");
            (e.target as HTMLImageElement).parentElement!.innerHTML = "<span class='text-xs font-mono text-primary'>PH</span>";
          }}
        />
      </div>
    </div>
  );
}

// ─── Glass Card ───────────────────────────────────────────────────────────────

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
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
}

// ─── Specialty Chip ───────────────────────────────────────────────────────────

function SpecialtyChip({
  icon, label, reduced, primaryColor, secondaryColor,
}: {
  icon: React.ReactNode; label: string; reduced: boolean | null; primaryColor: string; secondaryColor: string;
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <motion.span
      whileHover={reduced ? undefined : { y: -2, scale: 1.02 }}
      onHoverStart={() => !reduced && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-[11px] font-medium cursor-default transition-all duration-200 hover:border-opacity-40 hover:bg-opacity-20"
      style={{
        borderColor: isHovered ? `${secondaryColor} / 0.4` : `${primaryColor} / 0.2`,
        backgroundColor: isHovered ? `${secondaryColor} / 0.15` : `${primaryColor} / 0.1`,
        color: isHovered ? secondaryColor : primaryColor,
      }}
    >
      {icon}
      {label}
    </motion.span>
  );
}

// ─── Social Link ──────────────────────────────────────────────────────────────

function SocialLink({
  icon, label, handle, href, reduced, primaryColor, secondaryColor,
}: {
  icon: React.ReactNode; label: string; handle: string; href: string; reduced: boolean | null; primaryColor: string; secondaryColor: string;
}) {
  const [isHovered, setIsHovered] = React.useState(false);
  
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={reduced ? undefined : { x: 3 }}
      onHoverStart={() => !reduced && setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      transition={{ type: "spring", stiffness: 400, damping: 24 }}
      className="group flex items-center justify-between rounded-xl border border-border/50 bg-background/50 dark:bg-background/30 px-4 py-2.5 transition-all duration-200 hover:border-opacity-40 hover:bg-opacity-20"
      style={{
        borderColor: isHovered ? `${secondaryColor} / 0.3` : `${primaryColor} / 0.2`,
        backgroundColor: isHovered ? `${secondaryColor} / 0.12` : `${primaryColor} / 0.05`,
      }}
    >
      <span className="flex items-center gap-3">
        <span 
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border/60 bg-muted text-muted-foreground transition-colors duration-200 hover:border-opacity-30"
          style={{
            borderColor: isHovered ? `${secondaryColor} / 0.4` : `${primaryColor} / 0.3`,
            color: isHovered ? secondaryColor : primaryColor,
          }}
        >
          {icon}
        </span>
        <span className="flex flex-col">
          <span className="text-xs font-medium text-foreground/80">{label}</span>
          <span className="font-mono text-[10px] text-muted-foreground" dir="ltr">{handle}</span>
        </span>
      </span>
      <ArrowUpRight
        size={13}
        className="text-muted-foreground/40 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        style={{ color: isHovered ? secondaryColor : primaryColor }}
      />
    </motion.a>
  );
}

// ─── Post Card (Real Posts) ───────────────────────────────────────────────────

function PostCard({
  post, isFa, locale, reduced, primaryColor,
}: {
  post: Post; isFa: boolean; locale: Locale; reduced: boolean | null; primaryColor: string;
}) {
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
          <ChevronRight size={10} />
        </Link>
      </div>
    </motion.article>
  );
}

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

export default function ParhamPageClient({ locale, isFa, posts }: Props) {
  const dir = locale === "fa" ? "rtl" : "ltr";
  const reduced = useReducedMotion();
  
  // Get Parham's signature colors from categories_and_authors.ts
  const colors = getAuthorSignatureColors("parhamf");
  const primaryColor = colors.primary.oklch || colors.primary.hex;
  const secondaryColor = colors.secondary.oklch || colors.secondary.hex;

  const copy = {
    role: getAuthorRole("parhamf", locale),
    statusLabel: isFa ? "در دسترس" : "available",
    bio: getAuthorBio("parhamf", locale),
    tagline: getAuthorTagline("parhamf", locale) || "",
    specialtiesTitle: isFa ? "تخصص‌ها و لینک‌ها" : "Specialties & Links",
    postsTitle: isFa ? "آخرین نوشته‌ها" : "Recent Writing",
    postsSubtitle: isFa
      ? "آموزش‌های امنیتی، سواد دیجیتال و تحلیل کد"
      : "Security education, digital literacy, and code analysis",
    viewAll: isFa ? "همه نوشته‌ها" : "View all posts",
    noPosts: isFa ? "هنوز پستی نوشته نشده" : "No posts yet",
  } as const;

  const specialties = [
    { icon: <BookOpen size={10} />, label: isFa ? "آموزش امنیت" : "Security Education" },
    { icon: <Code2 size={10} />, label: "Python & Go" },
    { icon: <Terminal size={10} />, label: "Solidity Dev" },
    { icon: <ShieldCheck size={10} />, label: isFa ? "تحلیل کد" : "Code Review" },
    { icon: <Users size={10} />, label: isFa ? "منتورینگ" : "Mentorship" },
    { icon: <Cpu size={10} />, label: "Tooling" },
    { icon: <BookOpen size={10} />, label: isFa ? "آموزش محور" : "Dev-Focused" },
  ];

  const socialLinks = [
    { icon: <SiX size={13} />, label: "X / Twitter", handle: AUTHORS.parhamf.handle, href: AUTHORS.parhamf.links.twitter || "#" },
    { icon: <Github size={13} />, label: "GitHub", handle: "github.com/parham", href: AUTHORS.parhamf.links.github || "#" },
    { icon: <SiTelegram size={15} />, label: "Telegram", handle: "t.me/parham_channel", href: AUTHORS.parhamf.links.telegram || "#" },
  ];

  return (
    <>
      <div aria-hidden className="fixed inset-0 z-0 bg-background" />

      <ParhamBackground reduced={reduced} primaryColor={primaryColor} />

      <div aria-hidden className="pointer-events-none fixed inset-0 z-[2] overflow-hidden">
        <div 
          className="absolute -top-40 left-1/3 h-80 w-80 rounded-full blur-[90px]"
          style={{ backgroundColor: `${primaryColor} / 0.07` }}
        />
        <div 
          className="absolute bottom-1/4 -right-20 h-60 w-60 rounded-full blur-[80px]"
          style={{ backgroundColor: `${colors.secondary.oklch || colors.secondary.hex} / 0.05` }}
        />
      </div>

      <div dir={dir} className="-mx-4 md:-mx-6 -mt-8 min-h-screen relative z-10">
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
            <span style={{ color: primaryColor }}>parham</span>
          </motion.nav>

          <motion.section variants={sectionVariants}>
            <GlassCard className="p-6 md:p-8">
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
                <div className="flex flex-col items-center gap-3 shrink-0">
                  <ParhamAvatar reduced={reduced} primaryColor={primaryColor} />
                  <div className="flex flex-wrap justify-center gap-1.5">
                    <span className="inline-flex items-center gap-1 rounded-full border border-border/60 bg-muted/60 px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <Users size={8} />
                      {isFa ? "عمومی" : "public"}
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
                    <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{AUTHORS.parhamf.name[locale]}</h1>
                    <span className="mt-1 block font-mono text-[10px] text-muted-foreground/50" dir="ltr">
                      {AUTHORS.parhamf.handle} · Dev & Educator
                    </span>
                    <p 
                      className="mt-1.5 text-xs font-medium"
                      style={{ color: primaryColor }}
                    >
                      {copy.role}
                    </p>
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
                  <SpecialtyChip key={i} icon={s.icon} label={s.label} reduced={reduced} primaryColor={primaryColor} secondaryColor={secondaryColor} />
                ))}
              </div>

              <div className="border-t border-border/40" />

              <div className="grid gap-2 sm:grid-cols-3">
                {socialLinks.map((link, i) => (
                  <SocialLink key={i} {...link} reduced={reduced} primaryColor={primaryColor} secondaryColor={secondaryColor} />
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
              <motion.div
                whileHover={reduced ? {} : { scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                onMouseEnter={(e) => {
                  if (!reduced) {
                    (e.currentTarget as HTMLElement).style.borderColor = `${secondaryColor} / 0.4`;
                    (e.currentTarget as HTMLElement).style.backgroundColor = `${secondaryColor} / 0.15`;
                    const linkElem = (e.currentTarget as HTMLElement).querySelector('a');
                    if (linkElem) {
                      linkElem.style.color = secondaryColor;
                    }
                  }
                }}
                onMouseLeave={(e) => {
                  if (!reduced) {
                    (e.currentTarget as HTMLElement).style.borderColor = `${primaryColor} / 0.2`;
                    (e.currentTarget as HTMLElement).style.backgroundColor = `${primaryColor} / 0.1`;
                    const linkElem = (e.currentTarget as HTMLElement).querySelector('a');
                    if (linkElem) {
                      linkElem.style.color = primaryColor;
                    }
                  }
                }}
              >
                <Link
                  href={`/${locale}/blog?author=parhamf`}
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg border px-3 py-1.5 font-mono text-[10px] font-medium transition-all duration-200 hover:border-opacity-40 hover:bg-opacity-20"
                  style={{
                    borderColor: `${primaryColor} / 0.2`,
                    backgroundColor: `${primaryColor} / 0.1`,
                    color: primaryColor,
                  }}
                >
                  {copy.viewAll}
                  <ExternalLink size={9} />
                </Link>
              </motion.div>
            </div>

            {posts.length > 0 ? (
              <div className="grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => (
                  <motion.div
                    key={post.slug}
                    className="flex"
                    variants={reduced ? {} : {
                      hidden: { opacity: 0, y: 10 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.38, ease: "easeOut", delay: 0.08 * i } },
                    }}
                  >
                    <PostCard post={post} isFa={isFa} locale={locale} reduced={reduced} primaryColor={primaryColor} />
                  </motion.div>
                ))}
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
            <span>kavlabs.dev · parham · {new Date().getFullYear()}</span>
            <span style={{ color: `${primaryColor} / 0.5` }}>◆</span>
          </motion.div>

        </motion.div>
      </div>
    </>
  );
}