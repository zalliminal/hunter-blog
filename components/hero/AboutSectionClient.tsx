// components/hero/AboutSectionClient.tsx
"use client";

import { motion, useReducedMotion, useAnimate } from "framer-motion";
import { useRef, useState, useEffect, type ReactNode } from "react";
import {
  Twitter,
  Send,
  Mail,
  FileDown,
} from "lucide-react";
import type { Locale } from "@/lib/i18n";

type Props = { locale: Locale; isFa: boolean };

// ── Reddit SVG (no Lucide icon exists) ───────────────────────────────────────
function RedditIcon({ size = 16 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden
      style={{ display: "inline-block", flexShrink: 0 }}>
      <path d="M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm5.878 10.478a1.36 1.36 0 00-1.356-1.357 1.34 1.34 0 00-.91.357C12.596 8.83 11.4 8.5 10.1 8.46l.6-2.817 1.938.41a.96.96 0 101.01-.978.963.963 0 00-.869.552l-2.15-.456a.15.15 0 00-.178.11l-.67 3.137c-1.318.03-2.54.36-3.55 1.01a1.35 1.35 0 10-1.548 2.163c-.028.163-.044.329-.044.497 0 2.536 2.954 4.594 6.593 4.594s6.594-2.058 6.594-4.594c0-.162-.014-.323-.04-.481a1.36 1.36 0 00.092-2.129zM7.1 11.5a.96.96 0 110-1.92.96.96 0 010 1.92zm5.76 2.548c-.71.71-2.078.766-2.87.766-.79 0-2.16-.056-2.87-.766a.2.2 0 01.283-.283c.45.45 1.417.61 2.587.61s2.138-.16 2.587-.61a.2.2 0 01.283.283zm-.06-1.588a.96.96 0 110-1.92.96.96 0 010 1.92z" />
    </svg>
  );
}

// ── Background orbs ───────────────────────────────────────────────────────────
function AboutBackgroundOrbits({ prefersReduced }: { prefersReduced: boolean | null }) {
  if (prefersReduced) return null;
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-24 -right-10 h-64 w-64 rounded-full bg-primary/25 blur-3xl"
        initial={{ opacity: 0, scale: 0.9, y: -12 }}
        animate={{ opacity: 0.85, scale: 1.05, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-secondary/40 dark:bg-secondary/20 blur-3xl"
        initial={{ opacity: 0, scale: 0.9, y: 12 }}
        animate={{ opacity: 0.75, scale: 1.08, y: 0 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.15 }}
      />
    </div>
  );
}

function Ltr({ children }: { children: ReactNode }) {
  return <span dir="ltr" className="inline-block">{children}</span>;
}

// ── Improved social icons with better styling ───────────────────────────────
function MastodonIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" aria-hidden
      style={{ display: "inline-block", flexShrink: 0 }}>
      <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.31 8.15c0-.8 0-1.59-.06-2.37 0-1.24-.98-2.58-2.18-2.58h-.03c-.35 0-.72.1-1.09.26v2.78c0 .88-.38 1.18-1.02 1.3-.64.12-1.48-.08-1.48-.08s-.23 1.2 1.6 1.52.78-.01 1.23-.1v3.25c1.15-.08 2.18-.74 2.4-1.94.06-.29.06-.6.06-.89v-2.1z" />
    </svg>
  );
}

// ── Brand tints (unified styling) ─────────────────────────────────────────────
const socialBrands = {
  reddit:   { bg: "hover:bg-[oklch(0.94_0.04_80)]   dark:hover:bg-[oklch(0.28_0.05_80)]",   border: "hover:border-[oklch(0.75_0.10_80)]   dark:hover:border-[oklch(0.55_0.10_80)]",   text: "group-hover:text-[oklch(0.45_0.12_80)]   dark:group-hover:text-[oklch(0.82_0.12_80)]"   },
  mastodon: { bg: "hover:bg-[oklch(0.94_0.04_290)] dark:hover:bg-[oklch(0.28_0.05_290)]", border: "hover:border-[oklch(0.75_0.10_290)] dark:hover:border-[oklch(0.55_0.10_290)]", text: "group-hover:text-[oklch(0.45_0.12_290)] dark:group-hover:text-[oklch(0.82_0.12_290)]" },
  twitter:  { bg: "hover:bg-[oklch(0.94_0.04_200)] dark:hover:bg-[oklch(0.28_0.05_200)]", border: "hover:border-[oklch(0.75_0.10_200)] dark:hover:border-[oklch(0.55_0.10_200)]", text: "group-hover:text-[oklch(0.45_0.12_200)] dark:group-hover:text-[oklch(0.82_0.12_200)]" },
  telegram: { bg: "hover:bg-[oklch(0.94_0.04_220)] dark:hover:bg-[oklch(0.28_0.05_220)]", border: "hover:border-[oklch(0.75_0.10_220)] dark:hover:border-[oklch(0.55_0.10_220)]", text: "group-hover:text-[oklch(0.45_0.12_220)] dark:group-hover:text-[oklch(0.82_0.12_220)]" },
} as const;

// ── Framer variants ───────────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut", staggerChildren: 0.08, delayChildren: 0.08 } },
} as const;
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
} as const;
const chipVariants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
} as const;

// ══════════════════════════════════════════════════════════════════════════════
// SOCIAL CARD WITH SELF-CONTAINED RING
// Click → SVG ring draws around that card, smooth in + smooth out.
// ══════════════════════════════════════════════════════════════════════════════
type SocialCardProps = {
  card: {
    key: string;
    name: ReactNode;
    handle: ReactNode;
    icon: ReactNode;
    brand: { bg: string; border: string; text: string };
  };
  prefersReduced: boolean | null;
};

function SocialCard({ card, prefersReduced }: SocialCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [scope, animate] = useAnimate();

  async function handleClick() {
    if (prefersReduced || !cardRef.current) return;

    const { width: w, height: h } = cardRef.current.getBoundingClientRect();
    const radius = 12; // rounded-xl ≈ 0.75rem = 12 px

    // Perimeter of the rounded rect
    const perimeter =
      2 * (w - 2 * radius) + 2 * (h - 2 * radius) + 2 * Math.PI * radius;

    // Path starts at top-center, travels clockwise back to start
    const rp = [
      `M ${w / 2} 0`,
      `L ${w - radius} 0`,
      `A ${radius} ${radius} 0 0 1 ${w} ${radius}`,
      `L ${w} ${h - radius}`,
      `A ${radius} ${radius} 0 0 1 ${w - radius} ${h}`,
      `L ${radius} ${h}`,
      `A ${radius} ${radius} 0 0 1 0 ${h - radius}`,
      `L 0 ${radius}`,
      `A ${radius} ${radius} 0 0 1 ${radius} 0`,
      `L ${w / 2} 0`,
    ].join(" ");

    // Draw in → hold → fade out
    await animate(
      "[data-ring]",
      { d: rp, strokeDashoffset: [perimeter, 0], opacity: [0.85, 0.85] },
      { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
    );
    await new Promise<void>((res) => setTimeout(res, 180));
    await animate(
      "[data-ring]",
      { opacity: 0 },
      { duration: 0.6, ease: [0.4, 0, 0.6, 1] },
    );
  }

  return (
    <div ref={scope} className="relative h-full w-full">
      {/* SVG ring — positioned absolute over the card, pointer-events-none */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-visible"
        style={{ width: "100%", height: "100%", zIndex: 10 }}
      >
        {/* glow */}
        <path
          data-ring
          fill="none"
          stroke="var(--primary)"
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={9999}
          strokeDashoffset={9999}
          opacity={0}
          style={{ filter: "blur(3px)" }}
        />
        {/* crisp */}
        <path
          data-ring
          fill="none"
          stroke="var(--primary)"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={9999}
          strokeDashoffset={9999}
          opacity={0}
        />
      </svg>

      <motion.a
        ref={cardRef}
        href="#"
        onClick={handleClick}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileTap={prefersReduced ? undefined : { scale: 0.96 }}
        className={[
          "group relative flex h-full flex-col gap-2 overflow-hidden rounded-xl border border-border/60 bg-card/20 p-3.5 backdrop-blur-md transition-colors duration-200",
          card.brand.bg,
          card.brand.border,
        ].join(" ")}
      >
        <motion.span
          className={["flex justify-center text-muted-foreground transition-colors duration-200", card.brand.text].join(" ")}
          animate={hovered && !prefersReduced ? { y: -1.5, scale: 1.15 } : { y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          {card.icon}
        </motion.span>

        <motion.span
          className={["text-[11px] font-semibold text-foreground transition-colors duration-200 leading-tight text-center", card.brand.text].join(" ")}
          animate={hovered && !prefersReduced ? { x: 0.5 } : { x: 0 }}
          transition={{ type: "spring", stiffness: 350, damping: 24 }}
        >
          {card.name}
        </motion.span>

        <span className="text-[10px] text-muted-foreground/75 leading-tight text-center" dir="ltr">
          {card.handle}
        </span>

        {/* shimmer sweep */}
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ background: "linear-gradient(105deg, transparent 35%, color-mix(in oklch, var(--primary) 6%, transparent) 50%, transparent 65%)" }}
          initial={{ x: "-100%" }}
          animate={hovered && !prefersReduced ? { x: "120%" } : { x: "-100%" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        />
      </motion.a>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function AboutSectionClient({ locale, isFa }: Props) {
  const isRTL = locale === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  const prefersReduced = useReducedMotion();
  const [scope, animate] = useAnimate();
  const socialContainerRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  // Initialize SVG paths after mount
  useEffect(() => {
    const initializePaths = () => {
      if (!socialContainerRef.current || !svgContainerRef.current) return;
      const { width: w, height: h } = socialContainerRef.current.getBoundingClientRect();
      const radius = 16;
      
      const initialPath = [
        `M ${w / 2} 0`,
        `L ${w - radius} 0`,
        `A ${radius} ${radius} 0 0 1 ${w} ${radius}`,
        `L ${w} ${h - radius}`,
        `A ${radius} ${radius} 0 0 1 ${w - radius} ${h}`,
        `L ${radius} ${h}`,
        `A ${radius} ${radius} 0 0 1 0 ${h - radius}`,
        `L 0 ${radius}`,
        `A ${radius} ${radius} 0 0 1 ${radius} 0`,
        `L ${w / 2} 0`,
      ].join(" ");

      const paths = svgContainerRef.current.querySelectorAll("[data-social-ring]");
      paths.forEach((path) => {
        path.setAttribute("d", initialPath);
      });
    };

    // Give the DOM time to render
    const timer = setTimeout(initializePaths, 0);
    return () => clearTimeout(timer);
  }, [socialContainerRef]);

  useEffect(() => {
    function handleContactClick() {
      if (prefersReduced || !socialContainerRef.current) return;

      const { width: w, height: h } = socialContainerRef.current.getBoundingClientRect();
      const radius = 16; // rounded-2xl ≈ 1rem = 16 px

      // Perimeter of the rounded rect
      const perimeter =
        2 * (w - 2 * radius) + 2 * (h - 2 * radius) + 2 * Math.PI * radius;

      // Path starts at top-center, travels clockwise back to start
      const rp = [
        `M ${w / 2} 0`,
        `L ${w - radius} 0`,
        `A ${radius} ${radius} 0 0 1 ${w} ${radius}`,
        `L ${w} ${h - radius}`,
        `A ${radius} ${radius} 0 0 1 ${w - radius} ${h}`,
        `L ${radius} ${h}`,
        `A ${radius} ${radius} 0 0 1 0 ${h - radius}`,
        `L 0 ${radius}`,
        `A ${radius} ${radius} 0 0 1 ${radius} 0`,
        `L ${w / 2} 0`,
      ].join(" ");

      // Draw in → hold → fade out
      animate(
        "[data-social-ring]",
        { d: rp, strokeDashoffset: [perimeter, 0], opacity: [0.85, 0.85] },
        { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
      ).then(() =>
        new Promise<void>((res) => setTimeout(res, 180)).then(() =>
          animate(
            "[data-social-ring]",
            { opacity: 0 },
            { duration: 0.6, ease: [0.4, 0, 0.6, 1] },
          )
        )
      );
    }

    window.addEventListener("contactClicked", handleContactClick);
    return () => window.removeEventListener("contactClicked", handleContactClick);
  }, [prefersReduced, animate]);

  const copy = {
    kicker:        isFa ? "پشت پرده شکار"                   : "Behind the hunt",
    title:         isFa ? "جایی بین باگ، اسطوره و کد"        : "Somewhere between bugs, myth and code",
    lead:          isFa ? "من از دریچه‌ی باگ باونتی و OWASP به دنیای وب نگاه می‌کنم؛ جایی که هر باگ می‌تواند هم تهدید باشد، هم فرصت برای فهم عمیق‌تر سیستم‌ها." : "I look at the web through bug bounty and OWASP lenses, where every bug is both a threat and a chance to understand systems more deeply.",
    story:         isFa ? "کار من روی مرزهاست؛ جایی که گزارش‌های باگ با راهکارهای عملی و کد واقعی گره می‌خورند. اینجا همان جایی است که تئوری امنیت به ابزارهای روزمره، اسکریپت‌های میدانی و write‑upهای کوتاه و قابل اجرا تبدیل می‌شود." : "Most of my work lives on the edge: where bug reports meet real remediation and actual code. This is where security theory turns into small tools, field scripts and short, practical write‑ups.",
    skillsTitle:   isFa ? "چیزهایی که روی‌شان حساب می‌کنم" : "What I lean on",
    bugBountyBody: isFa ? "از گزارش‌های منطقی تا زنجیره‌های چندمرحله‌ای؛ تمرکز روی باگ‌هایی که واقعاً impact دارند." : "From logic issues to chained bugs with real impact — focused on findings that actually move the needle.",
    owaspBody:     isFa ? "سامان‌دهی ذهن با OWASP Top 10؛ از تزریق و کنترل دسترسی تا سوءاستفاده از misconfigها." : "A mental map built around OWASP Top 10 — from injection and access control to misconfig exploitation.",
    codeLabel:     isFa ? "کد به‌عنوان ابزار"               : "Code as a tool",
    codeBody:      isFa ? "Python، Go و Solidity برای ساخت PoC، اتوماسیون، fuzzing سبک و تحلیل رفتار قراردادهای هوشمند." : "Python, Go and Solidity for PoCs, small automation, lightweight fuzzing and smart‑contract behavior analysis.",
    socialTitle:   isFa ? "شبکه‌های اجتماعی"               : "Our Socials",
    contactTitle:  isFa ? "در تماس بمانیم"                  : "Stay in touch",
    contactBody:   isFa ? "اگر روی تحقیق، همکاری یا ایده‌ای امنیتی فکر می‌کنی، یک ایمیل کوتاه کافی است." : "If you're thinking about research, collaboration or a strange security idea, a short email is enough to start.",
    emailCta:      isFa ? "فرستادن ایمیل"                   : "Send an email",
    cvSoon:        isFa ? "به‌زودی"                         : "Coming soon",
    cvLabel:       isFa ? "دانلود رزومه"                    : "Download CV",
    contactEmail: "you@example.com",
  } as const;

  const socialCards: Array<{
    key: string;
    name: ReactNode;
    handle: ReactNode;
    icon: ReactNode;
    brand: (typeof socialBrands)[keyof typeof socialBrands];
  }> = [
    { key: "reddit",   name: isFa ? "ردیت" : "Reddit",       handle: "r/your-space",   icon: <RedditIcon size={18} />,                        brand: socialBrands.reddit   },
    { key: "mastodon", name: isFa ? "ماستودون" : "Mastodon", handle: "@you@instance",  icon: <MastodonIcon size={18} />,                      brand: socialBrands.mastodon },
    { key: "twitter",  name: isFa ? <Ltr>X / Twitter</Ltr> : "X / Twitter", handle: <Ltr>@your-handle</Ltr>,   icon: <Twitter size={18} strokeWidth={1.75} />, brand: socialBrands.twitter  },
    { key: "telegram", name: isFa ? "تلگرام" : "Telegram", handle: <Ltr>@your-channel</Ltr>, icon: <Send size={17} strokeWidth={1.75} />,     brand: socialBrands.telegram },
  ];

  const chips = [
    { label: isFa ? <Ltr>Bug bounty</Ltr> : "Bug bounty",         body: isFa ? <>از گزارش‌های منطقی تا زنجیره‌های چندمرحله‌ای؛ تمرکز روی باگ‌هایی که واقعاً <Ltr>impact</Ltr> دارند.</> : copy.bugBountyBody },
    { label: isFa ? <Ltr>OWASP &amp; web vulns</Ltr> : "OWASP & web vulns", body: isFa ? <>سامان‌دهی ذهن با <Ltr>OWASP Top 10</Ltr>؛ از تزریق و کنترل دسترسی تا سوءاستفاده از <Ltr>misconfig</Ltr>ها.</> : copy.owaspBody },
    { label: copy.codeLabel, body: isFa ? <><Ltr>Python</Ltr>، <Ltr>Go</Ltr> و <Ltr>Solidity</Ltr> برای ساخت <Ltr>PoC</Ltr>، اتوماسیون، <Ltr>fuzzing</Ltr> سبک و تحلیل رفتار قراردادهای هوشمند.</> : copy.codeBody },
  ];

  const baseContainerProps = prefersReduced
    ? {}
    : { variants: containerVariants, initial: "hidden" as const, animate: "show" as const };

  return (
    <section aria-labelledby="about-section-heading" dir={dir} className="relative">
      <motion.div
        {...baseContainerProps}
        className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card/90 via-background/70 to-background/40 p-6 shadow-xl md:p-8"
      >
        <AboutBackgroundOrbits prefersReduced={prefersReduced} />

        <div className="relative z-10 grid gap-5 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.2fr)]">

          {/* ── Main about card ─────────────────────────────────────────── */}
          <motion.article
            variants={prefersReduced ? undefined : itemVariants}
            className="space-y-4 rounded-2xl border border-border/70 bg-card/80 p-5 shadow-md backdrop-blur-md md:p-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">{copy.kicker}</p>
            <h2 id="about-section-heading" className="text-lg font-semibold tracking-tight md:text-xl">{copy.title}</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {isFa ? <>من از دریچه‌ی باگ باونتی و <Ltr>OWASP</Ltr> به دنیای وب نگاه می‌کنم؛ جایی که هر باگ می‌تواند هم تهدید باشد، هم فرصت برای فهم عمیق‌تر سیستم‌ها.</> : copy.lead}
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground/90">
              {isFa ? <>کار من روی مرزهاست؛ جایی که گزارش‌های باگ با راهکارهای عملی و کد واقعی گره می‌خورند. اینجا همان جایی است که تئوری امنیت به ابزارهای روزمره، اسکریپت‌های میدانی و <Ltr>write‑ups</Ltr>های کوتاه و قابل اجرا تبدیل می‌شود.</> : copy.story}
            </p>
            <div className="pt-3">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{copy.skillsTitle}</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {chips.map((chip, idx) => (
                  <motion.button
                    key={idx} type="button"
                    variants={prefersReduced ? undefined : chipVariants}
                    whileHover={prefersReduced ? undefined : { y: -1, scale: 1.01 }}
                    className="flex flex-col items-start rounded-xl border border-border/80 bg-background/70 px-3 py-2 text-left text-[11px] shadow-sm backdrop-blur-md transition-all duration-200 hover:border-primary/60 hover:shadow-md"
                  >
                    <span className="mb-1 text-[11px] font-semibold text-foreground">{chip.label}</span>
                    <span className="text-[11px] text-muted-foreground">{chip.body}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.article>

          {/* ── Side column ─────────────────────────────────────────────── */}
          <div className="space-y-4">

            {/* ── Social 2×2 grid ──────────────────────────────────────── */}
            <div ref={svgContainerRef} className="relative">
              {/* SVG ring — positioned absolute over the social cards, pointer-events-none */}
              <svg
                ref={scope}
                aria-hidden
                className="pointer-events-none absolute inset-0 overflow-visible"
                style={{ width: "100%", height: "100%", zIndex: 10 }}
              >
                {/* glow */}
                <path
                  data-social-ring
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth={6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={9999}
                  strokeDashoffset={9999}
                  opacity={0}
                  style={{ filter: "blur(3px)" }}
                />
                {/* crisp */}
                <path
                  data-social-ring
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={9999}
                  strokeDashoffset={9999}
                  opacity={0}
                />
              </svg>
              <motion.article
                ref={socialContainerRef}
                id="contact"
                variants={prefersReduced ? undefined : itemVariants}
                className="rounded-2xl border border-border/70 bg-background/60 p-4 shadow-md backdrop-blur-xl"
              >
              <p className="mb-3 text-xs font-medium text-foreground">{copy.socialTitle}</p>
                <div className="grid grid-cols-2 gap-3">
                  {socialCards.map((card) => (
                    <SocialCard key={card.key} card={card} prefersReduced={prefersReduced} />
                  ))}
                </div>
              </motion.article>
            </div>

            {/* ── Contact / CV card ─────────────────────────────────────── */}
            <motion.article
              variants={prefersReduced ? undefined : itemVariants}
              className="rounded-2xl border border-border/70 bg-background/60 p-4 shadow-md backdrop-blur-xl"
            >
              <p className="text-xs font-medium text-foreground">{copy.contactTitle}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{copy.contactBody}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <motion.a
                  href={`mailto:${copy.contactEmail}`}
                  whileHover={prefersReduced ? undefined : { y: -1 }}
                  whileTap={prefersReduced ? undefined : { scale: 0.97 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/80 px-3 py-1.5 text-[11px] font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:brightness-110"
                >
                  <Mail size={11} strokeWidth={2} />
                  <span>{copy.emailCta}</span>
                </motion.a>
                <div className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border/70 bg-background/40 px-3 py-1.5 text-[11px] text-muted-foreground/80">
                  <FileDown size={11} strokeWidth={1.75} />
                  <span>{copy.cvLabel}</span>
                  <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">{copy.cvSoon}</span>
                </div>
              </div>
            </motion.article>

          </div>
        </div>
      </motion.div>
    </section>
  );
}