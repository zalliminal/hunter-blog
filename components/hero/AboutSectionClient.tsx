// components/hero/AboutSectionClient.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState, useEffect, useCallback, type ReactNode } from "react";
import { Mail, FileDown } from "lucide-react";
import { SiReddit, SiMastodon, SiX, SiTelegram } from "react-icons/si";
import type { Locale } from "@/lib/i18n";

type Props = { locale: Locale; isFa: boolean };

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

// ── Brand tints ───────────────────────────────────────────────────────────────
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
// SOCIAL CARD
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

  return (
    <motion.a
      href="#"
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
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ background: "linear-gradient(105deg, transparent 35%, color-mix(in oklch, var(--primary) 6%, transparent) 50%, transparent 65%)" }}
        initial={{ x: "-100%" }}
        animate={hovered && !prefersReduced ? { x: "120%" } : { x: "-100%" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
    </motion.a>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// DRAW-IN RING HOOK
// ══════════════════════════════════════════════════════════════════════════════
const SCROLL_DELAY_MS = 200;
const DRAW_MS         = 1500;
const HOLD_MS         = 1000;
const FADE_MS         = 1000;
const RADIUS          = 16;

function useDrawRing(
  cardRef: React.RefObject<HTMLElement>,
  prefersReduced: boolean | null,
) {
  const glowRef  = useRef<SVGPathElement>(null);
  const crispRef = useRef<SVGPathElement>(null);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
  }, []);

  const fire = useCallback(() => {
    if (prefersReduced || !cardRef.current) return;
    clearTimers();

    const t0 = setTimeout(() => {
      if (!cardRef.current || !glowRef.current || !crispRef.current) return;

      const { width: w, height: h } = cardRef.current.getBoundingClientRect();
      const r = RADIUS;

      const d = [
        `M ${w / 2} 0`,
        `L ${w - r} 0`,
        `A ${r} ${r} 0 0 1 ${w} ${r}`,
        `L ${w} ${h - r}`,
        `A ${r} ${r} 0 0 1 ${w - r} ${h}`,
        `L ${r} ${h}`,
        `A ${r} ${r} 0 0 1 0 ${h - r}`,
        `L 0 ${r}`,
        `A ${r} ${r} 0 0 1 ${r} 0`,
        `L ${w / 2} 0`,
      ].join(" ");

      const perimeter = 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r;
      const paths = [glowRef.current, crispRef.current];

      paths.forEach((p) => {
        p.style.transition       = "none";
        p.style.opacity          = "0";
        p.setAttribute("d", d);
        p.style.strokeDasharray  = `${perimeter}`;
        p.style.strokeDashoffset = `${perimeter}`;
      });

      void glowRef.current.getBoundingClientRect();

      paths.forEach((p) => {
        p.style.transition       = `stroke-dashoffset ${DRAW_MS}ms cubic-bezier(0.45, 0, 0.55, 1), opacity 150ms ease`;
        p.style.opacity          = "1";
        p.style.strokeDashoffset = "0";
      });

      const t1 = setTimeout(() => {
        if (!glowRef.current || !crispRef.current) return;
        paths.forEach((p) => {
          p.style.transition = `opacity ${FADE_MS}ms cubic-bezier(0.4, 0, 0.6, 1)`;
          p.style.opacity    = "0";
        });

        const t2 = setTimeout(() => {
          paths.forEach((p) => {
            p.style.transition       = "none";
            p.style.strokeDashoffset = `${perimeter}`;
          });
        }, FADE_MS + 60);

        timerRefs.current.push(t2);
      }, DRAW_MS + HOLD_MS);

      timerRefs.current.push(t1);
    }, SCROLL_DELAY_MS);

    timerRefs.current.push(t0);
  }, [cardRef, prefersReduced, clearTimers]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  return { glowRef, crispRef, fire };
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════════════════════════════════════════════
export default function AboutSectionClient({ locale, isFa }: Props) {
  const isRTL = locale === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  const prefersReduced = useReducedMotion();

  const socialCardRef = useRef<HTMLElement>(null);
  const { glowRef, crispRef, fire } = useDrawRing(socialCardRef, prefersReduced);

  useEffect(() => {
    window.addEventListener("contactClicked", fire);
    return () => window.removeEventListener("contactClicked", fire);
  }, [fire]);

  const copy = {
    kicker:        isFa ? "پشت پرده کاوش"                   : "Behind the research",
    title:         isFa ? "جایی بین باگ، اسطوره و کد"        : "Somewhere between bugs, myth and code",
    lead:          isFa ? "ما از دریچه‌ی باگ باونتی و OWASP به دنیای وب نگاه می‌کنیم — جایی که هر آسیب‌پذیری هم تهدید است، هم فرصتی برای درک عمیق‌تر سیستم‌ها." : "We look at the web through bug bounty and OWASP lenses — where every vulnerability is both a threat and a chance to understand systems more deeply.",
    story:         isFa ? "کار ما روی مرزهاست؛ جایی که گزارش‌های باگ با راهکارهای عملی و کد واقعی گره می‌خورند. اینجا جایی است که تئوری امنیت به نوشته های ساده، اسکریپت‌های میدانی و write-upهای کوتاه تبدیل می‌شود." : "Our work lives on the edge: where bug reports meet real remediation and actual code. This is where security theory turns into small tools, field scripts and short, practical write-ups.",
    skillsTitle:   isFa ? "چیزهایی که روشون حساب می‌کنیم" : "What we lean on",
    bugBountyBody: isFa ? "از گزارش‌های منطقی تا زنجیره‌های چندمرحله‌ای؛ تمرکز روی باگ‌هایی که واقعاً تاثیر دارند." : "From logic issues to chained bugs with real impact — focused on findings that actually move the needle.",
    owaspBody:     isFa ? "سامان‌دهی ذهن با OWASP Top 10؛ از تزریق و کنترل دسترسی تا سوءاستفاده از misconfigها." : "A mental map built around OWASP Top 10 — from injection and access control to misconfig exploitation.",
    codeLabel:     isFa ? "کد به‌عنوان ابزار"               : "Code as a tool",
    codeBody:      isFa ? "ما از زبان هایی مثل Python و Go و غیره استفاده میکنیم برای تحلیل رفتار ها و اتوماسیون از ساخت PoC تا fuzzing و غیره." : "Python, Go and etc for PoCs, small automation, lightweight fuzzing and smart-contract behavior analysis.",
    socialTitle:   isFa ? "شبکه‌های اجتماعی"               : "Our Socials",
    contactTitle:  isFa ? "در تماس باشید"                  : "Stay in touch",
    contactBody:   isFa ? "اگر روی تحقیق، همکاری یا ایده‌ای امنیتی فکر می‌کنید، یک ایمیل کوتاه کافی است." : "If you're thinking about research, collaboration or a strange security idea, a short email is enough to start.",
    emailCta:      isFa ? "فرستادن ایمیل"                   : "Send an email",
    contactEmail:  "hello@kavlabs.dev", // Update with real email
  } as const;

  const socialCards: Array<{
    key: string;
    name: ReactNode;
    handle: ReactNode;
    icon: ReactNode;
    brand: (typeof socialBrands)[keyof typeof socialBrands];
  }> = [
    { key: "reddit",   name: isFa ? "ردیت" : "Reddit",                           handle: "r/kavlabs",              icon: <SiReddit   size={18} />, brand: socialBrands.reddit   },
    { key: "mastodon", name: isFa ? "ماستودون" : "Mastodon",                     handle: "@kavlabs@infosec.exchange", icon: <SiMastodon size={18} />, brand: socialBrands.mastodon },
    { key: "twitter",  name: isFa ? <Ltr>X / Twitter</Ltr> : "X / Twitter",      handle: <Ltr>@kavlabs</Ltr>,      icon: <SiX        size={17} />, brand: socialBrands.twitter  },
    { key: "telegram", name: isFa ? "تلگرام" : "Telegram",                       handle: <Ltr>@kavlabs_channel</Ltr>, icon: <SiTelegram size={18} />, brand: socialBrands.telegram },
  ];

  const chips = [
    { label: isFa ? <Ltr>Bug bounty</Ltr> : "Bug bounty",                    body: isFa ? <>از گزارش‌های منطقی تا زنجیره‌های چندمرحله‌ای؛ تمرکز روی باگ‌هایی که واقعاً تاثیر دارند.</> : copy.bugBountyBody },
    { label: isFa ? <Ltr>OWASP &amp; web vulns</Ltr> : "OWASP & web vulns",  body: isFa ? <>سامان‌دهی ذهن با <Ltr>OWASP Top 10</Ltr>؛ از تزریق و کنترل دسترسی تا سوءاستفاده از <Ltr>misconfig</Ltr>ها.</> : copy.owaspBody },
    {
      label: copy.codeLabel,
      body: isFa ? (
        <>
          ما از زبان‌هایی مثل <Ltr>Python</Ltr> و <Ltr>Go</Ltr> و غیره استفاده می‌کنیم
          برای تحلیل رفتارها و اتوماسیون؛
          از ساخت <Ltr>PoC</Ltr> تا <Ltr>fuzzing</Ltr> و غیره.
        </>
      ) : copy.codeBody
    },
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
              {isFa ? <>ما از دریچه‌ی باگ باونتی و <Ltr>OWASP</Ltr>  و یادگیری به دنیای دیجیتال نگاه می‌کنیم — جایی که هر آسیب‌پذیری هم تهدید است، هم فرصتی برای درک عمیق‌تر سیستم‌ها.</> : copy.lead}
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground/90">
              {isFa ? <>کار ما روی مرزهاست؛ جایی که گزارش‌های باگ با راهکارهای عملی و کد واقعی گره می‌خورند. اینجا جایی است که تئوری امنیت به نوشته های ساده، اسکریپت‌های میدانی و <Ltr>write-ups</Ltr>های کوتاه تبدیل می‌شود.</> : copy.story}
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

            {/* ── Social card with ring overlay ────────────────────────── */}
            <div className="relative">
              <svg
                aria-hidden
                className="pointer-events-none absolute inset-0 z-20 overflow-visible"
                style={{ width: "100%", height: "100%" }}
              >
                <path
                  ref={glowRef}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth={8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="99999"
                  strokeDashoffset="99999"
                  opacity={0}
                  style={{ filter: "blur(5px)" }}
                />
                <path
                  ref={crispRef}
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="99999"
                  strokeDashoffset="99999"
                  opacity={0}
                />
              </svg>

              <motion.article
                ref={socialCardRef}
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
              </div>
            </motion.article>

          </div>
        </div>
      </motion.div>
    </section>
  );
}