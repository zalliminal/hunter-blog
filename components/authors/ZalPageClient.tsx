"use client";

import { useEffect, useRef } from "react";
import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  Bug,
  ExternalLink,
  Clock,
  ArrowUpRight,
  Tag,
  ChevronRight,
  Search,
  Shield,
  Wifi,
  Calendar,
  Lock,
  Terminal,
  Code2,
} from "lucide-react";
import { SiX, SiHackerone } from "react-icons/si";
import { TbCurrencyEthereum } from "react-icons/tb";
import type { Locale } from "@/lib/i18n";
import type { Post } from "@/lib/blog";
import { getCategory, AUTHORS, getAuthorSignatureColors, getAuthorRole, getAuthorBio, getAuthorTagline } from "@/lib/categories_and_authors";

type Props = { 
  locale: Locale; 
  isFa: boolean;
  posts: Post[];
};

// ─── Matrix Rain Background (The "Hacker" Effect) ────────────────────────────

const MATRIX_CHARS =
  "ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF@#$%";

function MatrixRain({ reduced, primaryColor }: { reduced: boolean | null; primaryColor: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const fontSize = 20; // Increased from 13 to 20 for bigger characters
    let cols: number;
    let drops: number[];

    const getDarkMode = () => {
      return document.documentElement.classList.contains("dark");
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * -100);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const isDark = getDarkMode();
      
      if (isDark) {
        ctx.fillStyle = `rgba(0, 6, 3, 0.055)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < drops.length; i++) {
          const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          const y = drops[i] * fontSize;
          ctx.fillStyle = primaryColor;
          ctx.globalAlpha = 0.95;
          ctx.font = `bold ${fontSize}px monospace`;
          ctx.fillText(char, i * fontSize, y);
          ctx.globalAlpha = 1;
          
          const alpha = Math.max(0.04, 0.55 - drops[i] * 0.007);
          ctx.fillStyle = primaryColor;
          ctx.globalAlpha = alpha;
          ctx.font = `${fontSize}px monospace`;
          const prev = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          ctx.fillText(prev, i * fontSize, y - fontSize);
          ctx.globalAlpha = 1;
          
          if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i] += 0.25; // Slowed from 0.5 to 0.25
        }
      } else {
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < drops.length; i++) {
          const char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          const y = drops[i] * fontSize;
          ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
          ctx.font = `bold ${fontSize}px monospace`;
          ctx.fillText(char, i * fontSize, y);
          const alpha = Math.max(0.05, 0.4 - drops[i] * 0.005);
          ctx.fillStyle = `rgba(30, 41, 59, ${alpha})`;
          ctx.font = `${fontSize}px monospace`;
          const prev = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          ctx.fillText(prev, i * fontSize, y - fontSize);
          if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i] += 0.25; // Slowed from 0.5 to 0.25
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [reduced, primaryColor]);

  if (reduced) return null;
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.25] dark:opacity-[0.18]"
    />
  );
}

// ─── Profile Avatar (Real Photo for Zal) ─────────────────────────────────────

function ZalAvatar({ reduced, primaryColor }: { reduced: boolean | null; primaryColor: string }) {
  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      {/* Ambient Glow */}
      {!reduced && (
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, ${primaryColor} / 0.18) 0%, transparent 70%)`,
          }}
          animate={{ scale: [1, 1.14, 1], opacity: [0.7, 0.2, 0.7] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      
      {/* Rotating Border Ring */}
      <motion.div
        className="absolute h-28 w-28 rounded-full"
        style={{
          border: `1px solid ${primaryColor} / 0.35`,
          background: `conic-gradient(from 0deg, transparent 0%, ${primaryColor} / 0.4) 30%, transparent 60%)`,
        }}
        animate={reduced ? {} : { rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner Ring */}
      <motion.div
        className="absolute h-24 w-24 rounded-full"
        style={{
          border: `1px solid ${primaryColor} / 0.2`,
        }}
        animate={reduced ? {} : { rotate: -360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Image Container */}
      <div className="relative z-10 h-20 w-20 overflow-hidden rounded-full border-2 border-background bg-muted shadow-lg">
        <img
          src={AUTHORS.zal.avatar}
          alt="Zal"
          className="h-full w-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            (e.target as HTMLImageElement).parentElement!.classList.add("flex", "items-center", "justify-center", "bg-primary/10");
            (e.target as HTMLImageElement).parentElement!.innerHTML = "<span class='text-xs font-mono text-primary'>ZL</span>";
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

// ─── Post Card ────────────────────────────────────────────────────────────────

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
      {/* Hover accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1.5px]"
        style={{
          background: `linear-gradient(to right, ${primaryColor} / 0.6, transparent)`,
        }}
        initial={{ scaleX: 0, originX: 0 }}
        whileHover={reduced ? {} : { scaleX: 1 }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />

      {/* Category badge */}
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

      {/* Title */}
      <Link href={post.url} className="mb-2 block">
        <h3 
          className="text-sm font-semibold leading-snug text-foreground/90 transition-colors duration-200 hover:opacity-80"
          style={{ color: `${primaryColor} / 0.9` }}
        >
          {post.title}
        </h3>
      </Link>

      {/* Excerpt */}
      <p className="mb-4 flex-1 font-mono text-[11px] leading-relaxed text-muted-foreground">
        {post.description}
      </p>

      {/* Footer */}
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

export default function ZalPageClient({ locale, isFa, posts }: Props) {
  const dir = locale === "fa" ? "rtl" : "ltr";
  const reduced = useReducedMotion();
  
  // Get Zal's signature colors from categories_and_authors.ts
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
  } as const;

  const specialties = [
    { icon: <Lock size={10} />, label: isFa ? "Smart Contract Audit" : "Smart Contract Auditing" },
    { icon: <TbCurrencyEthereum size={11} />, label: "Web3 Security" },
    { icon: <Search size={10} />, label: "SSRF & IDOR" },
    { icon: <Code2 size={10} />, label: isFa ? "Auth Bypass" : "Authentication Bypass" },
    { icon: <Bug size={10} />, label: "DeFi Bug Bounty" },
    { icon: <Wifi size={10} />, label: "Protocol Analysis" },
    { icon: <Shield size={10} />, label: isFa ? "تحلیل آسیب‌پذیری" : "Vuln Research" },
  ];

  const socialLinks = [
    { icon: <SiX size={13} />, label: "X / Twitter", handle: AUTHORS.zal.handle, href: AUTHORS.zal.links.twitter || "#" },
    { icon: <SiHackerone size={13} />, label: "HackerOne", handle: "hackerone.com/zal", href: AUTHORS.zal.links.hackerone || "#" },
    { icon: <TbCurrencyEthereum size={15} />, label: "Immunefi", handle: "immunefi.com/profile/zal", href: AUTHORS.zal.links.immunefi || "#" },
  ];

  return (
    <>
      {/* Fixed backdrop */}
      <div aria-hidden className="fixed inset-0 z-0 bg-background" />

      <MatrixRain reduced={reduced} primaryColor={primaryColor} />

      {/* Ambient glow orbs */}
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

      {/* Page */}
      <div dir={dir} className="-mx-4 md:-mx-6 -mt-8 min-h-screen relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-4xl px-4 py-14 md:px-6 space-y-6"
        >

          {/* Breadcrumb */}
          <motion.nav variants={sectionVariants} aria-label="breadcrumb" dir="ltr"
            className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/60"
          >
            <Link href={`/${locale}`} className="hover:text-muted-foreground transition-colors">kavlabs</Link>
            <ChevronRight size={9} />
            <Link href={`/${locale}/authors`} className="hover:text-muted-foreground transition-colors">authors</Link>
            <ChevronRight size={9} />
            <span style={{ color: primaryColor }}>zal</span>
          </motion.nav>

          {/* Hero card */}
          <motion.section variants={sectionVariants}>
            <GlassCard className="p-6 md:p-8">
              <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">

                {/* Avatar + badges */}
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

                {/* Info */}
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
                    <p className="mt-0.5 font-mono text-[10px] italic text-muted-foreground/60">{copy.tagline}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{copy.bio}</p>
                </div>
              </div>
            </GlassCard>
          </motion.section>

          {/* Specialties + Socials */}
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

          {/* Recent posts */}
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
                  href={`/${locale}/blog?author=zal`}
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
                <Terminal className="h-8 w-8 mx-auto mb-3 text-muted-foreground/40" />
                <p className="text-muted-foreground text-sm">{copy.noPosts}</p>
              </div>
            )}
          </motion.section>

          {/* Footer signature */}
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