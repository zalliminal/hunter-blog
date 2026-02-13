// components/hero/AboutSectionClient.tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  isFa: boolean;
};

// ── Background animation behind the main card ─────────────────────────
function AboutBackgroundOrbits({
  prefersReduced,
}: {
  prefersReduced: boolean | null;
}) {
  if (prefersReduced) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
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
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.13 }}
        transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 0 0, rgba(255,255,255,0.25) 0, transparent 55%), radial-gradient(circle at 100% 100%, rgba(255,255,255,0.06) 0, transparent 60%)",
        }}
      />
    </div>
  );
}

function Ltr({ children }: { children: ReactNode }) {
  return (
    <span dir="ltr" className="inline-block mx-0.5">
      {children}
    </span>
  );
}

// ── Animation variants ────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
} as const;

const chipVariants = {
  hidden: { opacity: 0, y: 6 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
} as const;

export default function AboutSectionClient({ locale, isFa }: Props) {
  const isRTL = locale === "fa";
  const dir = isRTL ? "rtl" : "ltr";
  const prefersReduced = useReducedMotion();

  const copy = {
    kicker: isFa ? "پشت پرده شکار" : "Behind the hunt",
    title: isFa
      ? "جایی بین باگ، اسطوره و کد"
      : "Somewhere between bugs, myth and code",
    lead: isFa
      ? "من از دریچه‌ی باگ باونتی و OWASP به دنیای وب نگاه می‌کنم؛ جایی که هر باگ می‌تواند هم تهدید باشد، هم فرصت برای فهم عمیق‌تر سیستم‌ها."
      : "I look at the web through bug bounty and OWASP lenses, where every bug is both a threat and a chance to understand systems more deeply.",
    story: isFa
      ? "کار من روی مرزهاست؛ جایی که گزارش‌های باگ با راهکارهای عملی و کد واقعی گره می‌خورند. اینجا همان جایی است که تئوری امنیت به ابزارهای روزمره، اسکریپت‌های میدانی و write‑upهای کوتاه و قابل اجرا تبدیل می‌شود."
      : "Most of my work lives on the edge: where bug reports meet real remediation and actual code. This is where security theory turns into small tools, field scripts and short, practical write‑ups.",
    skillsTitle: isFa ? "چیزهایی که روی‌شان حساب می‌کنم" : "What I lean on",
    bugBountyLabel: isFa ? "Bug bounty" : "Bug bounty",
    bugBountyBody: isFa
      ? "از گزارش‌های منطقی تا زنجیره‌های چندمرحله‌ای؛ تمرکز روی باگ‌هایی که واقعاً impact دارند."
      : "From logic issues to chained bugs with real impact — focused on findings that actually move the needle.",
    owaspLabel: isFa ? "OWASP & web vulns" : "OWASP & web vulns",
    owaspBody: isFa
      ? "سامان‌دهی ذهن با OWASP Top 10؛ از تزریق و کنترل دسترسی تا سوءاستفاده از misconfigها."
      : "A mental map built around OWASP Top 10 — from injection and access control to misconfig exploitation.",
    codeLabel: isFa ? "کد به‌عنوان ابزار" : "Code as a tool",
    codeBody: isFa
      ? "Python، Go و Solidity برای ساخت PoC، اتوماسیون، fuzzing سبک و تحلیل رفتار قراردادهای هوشمند."
      : "Python, Go and Solidity for PoCs, small automation, lightweight fuzzing and smart‑contract behavior analysis.",
    socialTitle: isFa ? "رد پای من در شبکه‌ها" : "Where I surface online",
    socialHint: isFa
      ? "لینک‌ها را می‌توانی بعداً با پروفایل‌های واقعی‌ات جایگزین کنی."
      : "Swap these URLs with your real profiles whenever you’re ready.",
    contactTitle: isFa ? "در تماس بمانیم" : "Stay in touch",
    contactBody: isFa
      ? "اگر روی تحقیق، همکاری یا ایده‌ای امنیتی فکر می‌کنی، یک ایمیل کوتاه کافی است."
      : "If you’re thinking about research, collaboration or a strange security idea, a short email is enough to start.",
    emailCta: isFa ? "فرستادن ایمیل" : "Send an email",
    cvSoon: isFa ? "به‌زودی" : "Coming soon",
    cvLabel: isFa ? "دانلود رزومه" : "Download CV",
    contactEmail: "you@example.com",
    redditLabel: isFa ? "حرفه‌ای ولی بی‌سر و صدا" : "Quietly technical",
    mastodonLabel: isFa ? "پراکنده اما عمیق" : "Distributed & deep",
    twitterLabel: isFa ? "کوتاه، سریع، لبه‌دار" : "Short, fast, slightly sharp",
  } as const;

  const socialRows = [
    {
      name: isFa ? "Reddit" : "Reddit",
      handle: "r/your-space",
      label: copy.redditLabel,
    },
    {
      name: isFa ? "Mastodon" : "Mastodon",
      handle: "@you@instance",
      label: copy.mastodonLabel,
    },
    {
      name: isFa ? "Twitter / X" : "Twitter / X",
      handle: "@your-handle",
      label: copy.twitterLabel,
    },
  ] as const;

  const baseContainerProps = prefersReduced
    ? {}
    : {
        variants: containerVariants,
        initial: "hidden" as const,
        animate: "show" as const,
      };

  return (
    <section
      aria-labelledby="about-section-heading"
      dir={dir}
      className="relative"
    >
      <motion.div
        {...baseContainerProps}
        className="relative overflow-hidden rounded-3xl border border-border/70 bg-linear-to-br from-card/90 via-background/70 to-background/40 p-6 shadow-xl md:p-8"
      >
        <AboutBackgroundOrbits prefersReduced={prefersReduced} />

        <div className="relative z-10 grid gap-5 md:grid-cols-[minmax(0,2.2fr)_minmax(0,1.2fr)]">
          {/* Main about card */}
          <motion.article
            variants={prefersReduced ? undefined : itemVariants}
            className="space-y-4 rounded-2xl border border-border/70 bg-card/80/80 p-5 shadow-md backdrop-blur-md md:p-6"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">
              {copy.kicker}
            </p>
            <h2
              id="about-section-heading"
              className="text-lg font-semibold tracking-tight md:text-xl"
            >
              {copy.title}
            </h2>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {isFa ? (
                <>
                  من از دریچه‌ی باگ باونتی و <Ltr>OWASP</Ltr> به دنیای وب نگاه می‌کنم؛
                  جایی که هر باگ می‌تواند هم تهدید باشد، هم فرصت برای فهم عمیق‌تر
                  سیستم‌ها.
                </>
              ) : (
                copy.lead
              )}
            </p>

            <p className="text-xs leading-relaxed text-muted-foreground/90">
              {isFa ? (
                <>
                  کار من روی مرزهاست؛ جایی که گزارش‌های باگ با راهکارهای عملی و کد
                  واقعی گره می‌خورند. اینجا همان جایی است که تئوری امنیت به
                  ابزارهای روزمره، اسکریپت‌های میدانی و{" "}
                  <Ltr>write‑ups</Ltr>های کوتاه و قابل اجرا تبدیل می‌شود.
                </>
              ) : (
                copy.story
              )}
            </p>

            <div className="pt-3">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                {copy.skillsTitle}
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                <motion.button
                  type="button"
                  variants={prefersReduced ? undefined : chipVariants}
                  whileHover={{ y: -1, scale: 1.01 }}
                  className="flex flex-col items-start rounded-xl border border-border/80 bg-background/70 px-3 py-2 text-left text-[11px] shadow-sm backdrop-blur-md transition-all duration-200 hover:border-primary/60 hover:shadow-md"
                >
                  <span className="mb-1 text-[11px] font-semibold text-foreground">
                    {isFa ? <Ltr>Bug bounty</Ltr> : copy.bugBountyLabel}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {isFa ? (
                      <>
                        از گزارش‌های منطقی تا زنجیره‌های چندمرحله‌ای؛ تمرکز روی
                        باگ‌هایی که واقعاً <Ltr>impact</Ltr> دارند.
                      </>
                    ) : (
                      copy.bugBountyBody
                    )}
                  </span>
                </motion.button>

                <motion.button
                  type="button"
                  variants={prefersReduced ? undefined : chipVariants}
                  whileHover={{ y: -1, scale: 1.01 }}
                  className="flex flex-col items-start rounded-xl border border-border/80 bg-background/70 px-3 py-2 text-left text-[11px] shadow-sm backdrop-blur-md transition-all duration-200 hover:border-primary/60 hover:shadow-md"
                >
                  <span className="mb-1 text-[11px] font-semibold text-foreground">
                    {isFa ? <Ltr>OWASP &amp; web vulns</Ltr> : copy.owaspLabel}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {isFa ? (
                      <>
                        سامان‌دهی ذهن با <Ltr>OWASP Top 10</Ltr>؛ از تزریق و کنترل
                        دسترسی تا سوءاستفاده از <Ltr>misconfig</Ltr>ها.
                      </>
                    ) : (
                      copy.owaspBody
                    )}
                  </span>
                </motion.button>

                <motion.button
                  type="button"
                  variants={prefersReduced ? undefined : chipVariants}
                  whileHover={{ y: -1, scale: 1.01 }}
                  className="flex flex-col items-start rounded-xl border border-border/80 bg-background/70 px-3 py-2 text-left text-[11px] shadow-sm backdrop-blur-md transition-all duration-200 hover:border-primary/60 hover:shadow-md"
                >
                  <span className="mb-1 text-[11px] font-semibold text-foreground">
                    {copy.codeLabel}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {isFa ? (
                      <>
                        <Ltr>Python</Ltr>، <Ltr>Go</Ltr> و <Ltr>Solidity</Ltr> برای
                        ساخت <Ltr>PoC</Ltr>، اتوماسیون، <Ltr>fuzzing</Ltr> سبک و
                        تحلیل رفتار قراردادهای هوشمند.
                      </>
                    ) : (
                      copy.codeBody
                    )}
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.article>

          {/* Side column: socials + contact */}
          <div className="space-y-4">
            {/* Social profiles card */}
            <motion.article
              variants={prefersReduced ? undefined : itemVariants}
              className="rounded-2xl border border-border/70 bg-background/60 p-4 shadow-md backdrop-blur-xl"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium text-foreground">
                  {copy.socialTitle}
                </p>
              </div>

              <p className="mt-1 text-[11px] text-muted-foreground">
                {copy.socialHint}
              </p>

              <ul className="mt-3 space-y-2 text-xs">
                {socialRows.map((row) => (
                  <li
                    key={row.name}
                    className="group flex items-center justify-between gap-2 rounded-xl border border-border/60 bg-card/20 px-3 py-2 backdrop-blur-md transition-all duration-200 hover:border-primary/60 hover:bg-primary/5"
                  >
                    <div className="flex flex-col">
                      <span className="text-[11px] font-semibold text-foreground">
                        {isFa ? <Ltr>{row.name}</Ltr> : row.name}
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        <Ltr>{row.handle}</Ltr>
                      </span>
                    </div>
                    <span className="text-[10px] text-muted-foreground/80 group-hover:text-primary">
                      {row.label}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>

            {/* Contact / CV card */}
            <motion.article
              variants={prefersReduced ? undefined : itemVariants}
              className="rounded-2xl border border-border/70 bg-background/60 p-4 shadow-md backdrop-blur-xl"
            >
              <p className="text-xs font-medium text-foreground">
                {copy.contactTitle}
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                {copy.contactBody}
              </p>

              <div className="mt-3 flex flex-wrap gap-2">
                <motion.a
                  href={`mailto:${copy.contactEmail}`}
                  whileHover={{ y: -1, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary/80 px-3 py-1.5 text-[11px] font-medium text-primary-foreground shadow-sm transition-all duration-200 hover:brightness-110"
                >
                  <span>✉</span>
                  <span>{copy.emailCta}</span>
                </motion.a>

                <div className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-border/70 bg-background/40 px-3 py-1.5 text-[11px] text-muted-foreground/80">
                  <span>{copy.cvLabel}</span>
                  <span className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                    {copy.cvSoon}
                  </span>
                </div>
              </div>
            </motion.article>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

