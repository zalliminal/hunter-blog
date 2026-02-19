"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import { 
  SiX, 
  SiGithub, 
  SiTelegram, 
  SiBugcrowd, 
  SiEthereum 
} from "react-icons/si";
import { 
  ShieldCheck, 
  Code2, 
  ExternalLink, 
  Mail, 
  Users, 
  ArrowRight, 
  User 
} from "lucide-react";
import { getAuthor, type AuthorId, type Locale } from "@/lib/categories_and_authors";
import Image from "next/image";

type Props = {
  locale: Locale;
  isFa: boolean;
};

// ── Animated Background Orbs (matches AboutSection style) ─────────────────────
function TeamBackgroundOrbs({ 
  primary, 
  secondary, 
  hovered 
}: { 
  primary: string; 
  secondary: string; 
  hovered: boolean;
}) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Primary Orb */}
      <motion.div
        className="absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl"
        style={{ backgroundColor: primary, opacity: 0.2 }}
        initial={{ opacity: 0, scale: 0.9, y: -8 }}
        animate={{ 
          opacity: 0.2, 
          scale: 1.02, 
          y: -4,
          x: [-4, 4, -4],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      {/* Secondary Orb */}
      <motion.div
        className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full blur-3xl"
        style={{ backgroundColor: secondary, opacity: 0.12 }}
        initial={{ opacity: 0, scale: 0.9, y: 8 }}
        animate={{ 
          opacity: 0.12, 
          scale: 0.98, 
          y: 4,
          x: [4, -4, 4],
        }}
        transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.5 }}
      />
    </div>
  );
}

// ── Icon Mapping ───────────────────────────────────────────────────────────────
const getSocialIcon = (platform: string, className: string) => {
  switch (platform) {
    case "twitter": return <SiX className={className} />;
    case "github": return <SiGithub className={className} />;
    case "telegram": return <SiTelegram className={className} />;
    case "hackerone": return <SiBugcrowd className={className} />;
    case "immunefi": return <SiEthereum className={className} />;
    default: return <ExternalLink className={className} />;
  }
};

// ── Framer Variants (matches AboutSection) ─────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" } 
  },
};

// ══════════════════════════════════════════════════════════════════════════════
//  TEAM CARD (matches AboutSection aesthetic exactly)
// ══════════════════════════════════════════════════════════════════════════════
function TeamCard({ 
  authorId, 
  locale, 
  isFa 
}: { 
  authorId: AuthorId; 
  locale: Locale; 
  isFa: boolean;
}) {
  const author = getAuthor(authorId);
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const colors = author.signature.colors;
  const name = author.name[locale];
  const role = author.role[locale];
  const bio = author.bio[locale];

  // Use OKLCH from signature colors for consistency
  const primaryColor = colors.primary.oklch || colors.primary.hex;
  const secondaryColor = colors.secondary.oklch || colors.secondary.hex;

  // CTA Copy
  const ctaCopy = {
    label: isFa ? "مشاهده پروفایل" : "View Profile",
    subtext: isFa ? "بیوگرافی کامل و نوشته‌ها" : "Full bio & posts",
  };

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileTap={prefersReduced ? undefined : { scale: 0.98 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card/20 p-5 shadow-lg backdrop-blur-xl md:p-6 transition-all duration-300"
      style={{
        borderColor: hovered ? `${primaryColor}50` : undefined,
        boxShadow: hovered ? `0 0 20px -8px ${primaryColor}20` : undefined,
      }}
    >
      {/* Animated Background Orbs */}
      <TeamBackgroundOrbs primary={primaryColor} secondary={secondaryColor} hovered={hovered} />

      {/* Content Layer */}
      <div className="relative z-10 flex flex-1 flex-col">
        
        {/* Header: Avatar + Name */}
        <div className="mb-5 flex items-center gap-4">
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border/60 shadow-sm transition-transform duration-300 group-hover:scale-105">
            <Image
              src={author.avatar}
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <h3 className="text-base font-semibold tracking-tight text-foreground md:text-lg">
              {name}
            </h3>
            <span className="text-[11px] text-muted-foreground font-mono">
              {author.handle}
            </span>
          </div>
        </div>

        {/* Body: Role Badge + Bio */}
        <div className="mb-6 flex-1">
          {/* Role Badge (top of bio row) */}
          <motion.div 
            className="mb-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors duration-200"
            style={{ 
              borderColor: hovered ? `${primaryColor}40` : 'var(--border)', 
              backgroundColor: 'var(--background)',
              color: hovered ? primaryColor : 'var(--muted-foreground)'
            }}
          >
            {authorId === 'zal' ? <ShieldCheck size={12} /> : <Code2 size={12} />}
            {role}
          </motion.div>

          {/* Bio Text */}
          <p className="text-xs leading-relaxed text-muted-foreground md:text-sm">
            {bio}
          </p>
        </div>

        {/* Footer: Social Links + CTA Button */}
        <div className="mt-auto border-t border-border/60 pt-4 flex justify-between items-center gap-4">
          {/* Social Links Row */}
          <div className="flex items-center gap-2">
            {Object.entries(author.links).map(([key, url]) => (
              url && (
                <motion.a
                  key={key}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={prefersReduced ? undefined : { y: -2, scale: 1.1 }}
                  whileTap={prefersReduced ? undefined : { scale: 0.95 }}
                  className="group/icon flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 bg-background/40 text-muted-foreground transition-all duration-200 hover:shadow-md"
                  style={{ 
                    color: 'inherit',
                  }}
                  aria-label={key}
                >
                  <motion.span
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="group-hover/icon:text-inherit"
                  >
                    {getSocialIcon(key, "h-4 w-4")}
                  </motion.span>
                </motion.a>
              )
            ))}
          </div>

          {/* ── CTA Button (View Profile) - Last Row ───────────────────────── */}
          <Link
            href={isFa ? `/fa/authors/${authorId}` : `/authors/${authorId}`}
            className="group/btn inline-flex items-center justify-center gap-1.5 rounded-full border border-border/70 bg-background/60 px-4 py-2 text-[11px] font-medium text-foreground shadow-sm transition-all duration-200 hover:border-primary/60 hover:bg-primary/10 hover:text-primary hover:shadow-md"
            style={{
              borderColor: hovered ? `${primaryColor}60` : undefined,
              color: hovered ? primaryColor : undefined,
            }}
          >
            <User size={12} strokeWidth={2} />
            <span>{ctaCopy.label}</span>
            <motion.span
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              className={isFa ? "rotate-180" : ""}
            >
              <ArrowRight size={12} strokeWidth={2} />
            </motion.span>
          </Link>

        </div>
      </div>

      {/* Subtle shine effect on hover (matches AboutSection) */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-3xl pointer-events-none"
        style={{ 
          background: `linear-gradient(105deg, transparent 35%, ${primaryColor}10 50%, transparent 65%)` 
        }}
        initial={{ x: "-100%" }}
        animate={hovered && !prefersReduced ? { x: "120%" } : { x: "-100%" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
//  MAIN SECTION
// ══════════════════════════════════════════════════════════════════════════════
export default function TeamSectionClient({ locale, isFa }: Props) {
  const dir = isFa ? "rtl" : "ltr";

  const copy = {
    kicker: isFa ? "تیم تحقیقاتی" : "Research Team",
    title: isFa ? "دو دیدگاه، یک هدف" : "Two Perspectives, One Goal",
    subtitle: isFa 
      ? "آموزش و شکار؛ دو روی یک سکه برای درک عمیق‌تر امنیت." 
      : "Education and hunting; two sides of the same coin for deeper security understanding.",
  };

  return (
    <section className="relative w-full py-2 md:py-4" dir={dir}>
      <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid gap-6 md:grid-cols-2"
        >
          {/* Parham Card */}
          <TeamCard authorId="parham" locale={locale} isFa={isFa} />
          
          {/* Zal Card */}
          <TeamCard authorId="zal" locale={locale} isFa={isFa} />
        </motion.div>
    </section>
  );
}