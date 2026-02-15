"use client";

import {
  motion,
  useReducedMotion,
  useInView,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
  isFa: boolean;
  /**
   * "box"      – card grid (similar to About section)
   * "open"     – vertical lines, items slide in on scroll
   * "story"    – timeline: each node opens as you scroll to it
   * "terminal" – hacker shell window, goals typed out as output
   */
  variant?: "box" | "open" | "story" | "terminal";
};

// ─── shared copy ──────────────────────────────────────────────────────────────
const goals = {
  en: [
    {
      id: "bounty",
      number: "01",
      label: "Document Real Bug Bounty Findings",
      body: "Every real finding deserves a proper write-up — from the first hint of something off to the final report. These notes capture that process: the wrong turns, the aha moments, and the exact payload that worked.",
      tag: "Bug Bounty",
      cmd: "document --findings --live",
      statusLine: "Indexing 3 confirmed vulnerabilities…",
    },
    {
      id: "teach",
      number: "02",
      label: "Teach Security in Farsi & English",
      body: "Security knowledge shouldn't be gated behind language. Resources in Farsi are rare — this space exists to change that, publishing the same depth of technical content in both directions.",
      tag: "Bilingual",
      cmd: "teach --lang fa,en --depth full",
      statusLine: "Compiling bilingual knowledge base…",
    },
    {
      id: "tools",
      number: "03",
      label: "Share Tools, Scripts & PoCs",
      body: "Theory becomes real when you can run it. Alongside every concept, expect working code — small Python scripts, Go utilities, and proof-of-concept exploits you can actually use in the field.",
      tag: "Open Source",
      cmd: "release --tools py,go --mode public",
      statusLine: "Pushing artifacts to repository…",
    },
  ],
  fa: [
    {
      id: "bounty",
      number: "01",
      label: "مستندسازی یافته‌های واقعی باگ باونتی",
      body: "هر یافته‌ی واقعی لایق یک write-up درست است — از اولین نشانه‌ی چیز غیرعادی تا گزارش نهایی. این یادداشت‌ها آن فرایند را ثبت می‌کنند: راه‌های اشتباه، لحظات کشف، و دقیقاً همان payload که کار کرد.",
      tag: "Bug Bounty",
      cmd: "document --findings --live",
      statusLine: "Indexing 3 confirmed vulnerabilities…",
    },
    {
      id: "teach",
      number: "02",
      label: "آموزش امنیت به فارسی و انگلیسی",
      body: "دانش امنیت نباید پشت سد زبان بماند. منابع فارسی کمیاب است — این فضا برای تغییر آن وجود دارد، همان عمق محتوای فنی را در هر دو زبان منتشر می‌کند.",
      tag: "دوزبانه",
      cmd: "teach --lang fa,en --depth full",
      statusLine: "Compiling bilingual knowledge base…",
    },
    {
      id: "tools",
      number: "03",
      label: "اشتراک‌گذاری ابزار، اسکریپت و PoC",
      body: "تئوری وقتی واقعی می‌شود که بتوانی اجرایش کنی. کنار هر مفهوم، کد واقعی انتظار داری — اسکریپت‌های کوچک Python، ابزارهای Go، و exploit‌های proof-of-concept که در میدان استفاده می‌کنی.",
      tag: "اوپن‌سورس",
      cmd: "release --tools py,go --mode public",
      statusLine: "Pushing artifacts to repository…",
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════════
// VARIANT 1 — BOX
// ══════════════════════════════════════════════════════════════════════════════
function GoalsBox({ isFa }: { isFa: boolean }) {
  const dir = isFa ? "rtl" : "ltr";
  const prefersReduced = useReducedMotion();
  const list = isFa ? goals.fa : goals.en;

  const containerV = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1, y: 0,
      transition: { duration: 0.45, ease: "easeOut", staggerChildren: 0.09, delayChildren: 0.1 },
    },
  } as const;
  const cardV = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  } as const;

  return (
    <motion.div
      dir={dir}
      variants={prefersReduced ? undefined : containerV}
      initial={prefersReduced ? undefined : "hidden"}
      animate={prefersReduced ? undefined : "show"}
      className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-br from-card/90 via-background/70 to-background/40 p-6 shadow-xl md:p-8"
    >
      {!prefersReduced && (
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div className="absolute -top-20 -left-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
            initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} transition={{ duration: 1.1 }} />
          <motion.div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full bg-secondary/30 blur-3xl"
            initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ duration: 1.3, delay: 0.2 }} />
        </div>
      )}
      <div className="relative z-10 space-y-5">
        <motion.div variants={prefersReduced ? undefined : cardV} className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/80">
            {isFa ? "چرا اینجا؟" : "Why this exists"}
          </p>
          <h2 className="text-lg font-semibold tracking-tight md:text-xl">
            {isFa ? "اهداف این وبلاگ" : "Goals of this blog"}
          </h2>
        </motion.div>
        <div className="grid gap-3 sm:grid-cols-3">
          {list.map((g) => (
            <motion.div key={g.id}
              variants={prefersReduced ? undefined : cardV}
              whileHover={prefersReduced ? undefined : { y: -3, scale: 1.015 }}
              className="group flex flex-col gap-2 rounded-2xl border border-border/70 bg-background/60 p-4 shadow-sm backdrop-blur-md transition-all duration-200 hover:border-primary/50 hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-bold text-primary/60">{g.number}</span>
                <span className="rounded-full border border-border/60 bg-muted/60 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{g.tag}</span>
              </div>
              <p className="text-[12px] font-semibold leading-snug text-foreground">{g.label}</p>
              <p className="text-[11px] leading-relaxed text-muted-foreground">{g.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VARIANT 2 — OPEN / LINES
// ══════════════════════════════════════════════════════════════════════════════
function GoalsOpen({ isFa }: { isFa: boolean }) {
  const isRTL = isFa;
  const dir = isRTL ? "rtl" : "ltr";
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const list = isFa ? goals.fa : goals.en;

  return (
    <div ref={ref} dir={dir} className="space-y-1 px-1">
      <motion.p
        className="mb-5 text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/70"
        initial={prefersReduced ? undefined : { opacity: 0, y: 6 }}
        animate={inView && !prefersReduced ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {isFa ? "چرا اینجا؟" : "Why this exists"}
      </motion.p>
      {list.map((g, i) => (
        <motion.div key={g.id}
          initial={prefersReduced ? undefined : { opacity: 0, x: isRTL ? 20 : -20 }}
          animate={inView && !prefersReduced ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.12 }}
          className="group relative"
        >
          <div className={`absolute top-0 ${isRTL ? "right-0" : "left-0"} h-full w-px overflow-hidden`}>
            <motion.div className="w-full bg-primary/30"
              initial={{ height: 0 }}
              animate={inView ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: prefersReduced ? 0 : 0.15 + i * 0.12 }}
            />
          </div>
          <div className={`flex gap-4 py-4 ${isRTL ? "pr-5" : "pl-5"}`}>
            <span className="mt-0.5 shrink-0 font-mono text-[11px] font-bold text-primary/50 group-hover:text-primary/90 transition-colors duration-200">
              {g.number}
            </span>
            <div className="min-w-0 space-y-1.5">
              <div className="flex flex-wrap items-baseline gap-2">
                <h3 className="text-sm font-semibold leading-snug text-foreground group-hover:text-primary transition-colors duration-200">{g.label}</h3>
                <span className="shrink-0 rounded-full border border-border/60 bg-muted/40 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">{g.tag}</span>
              </div>
              <p className="text-[12px] leading-relaxed text-muted-foreground">{g.body}</p>
            </div>
          </div>
          {i < list.length - 1 && (
            <motion.div
              className={`${isRTL ? "mr-5" : "ml-5"} h-px bg-border/40`}
              initial={prefersReduced ? undefined : { scaleX: 0 }}
              style={{ originX: isRTL ? 1 : 0 }}
              animate={inView && !prefersReduced ? { scaleX: 1 } : undefined}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 + i * 0.12 }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VARIANT 3 — STORY  (scroll-triggered accordion timeline)
// Each goal is a collapsed node. Scrolling to it opens the node: the
// vertical thread traces down, a pulsing dot glows, and the body
// expands from zero height with a smooth spring.
// ══════════════════════════════════════════════════════════════════════════════

function StoryNode({
  g,
  isFa,
  isLast,
}: {
  g: (typeof goals.en)[number];
  isFa: boolean;
  isLast: boolean;
}) {
  const isRTL = isFa;
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isOpen = prefersReduced || inView;

  const bodyV = {
    closed: { height: 0, opacity: 0 },
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
        opacity: { duration: 0.35, delay: 0.15 },
      },
    },
  } as const;

  return (
    <div ref={ref} className={`relative flex ${isRTL ? "flex-row-reverse" : "flex-row"} gap-0`}>

      {/* ── Spine: dot + line ───────────────────────────────────────── */}
      <div
        className={`relative flex shrink-0 flex-col items-center ${isRTL ? "ml-4" : "mr-4"}`}
        style={{ width: 24 }}
      >
        {/* glow dot */}
        <motion.div
          initial={prefersReduced ? undefined : { scale: 0.5, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : undefined}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
          className="relative z-10 mt-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-border/60 bg-background transition-colors duration-400"
          style={isOpen ? {
            borderColor: "var(--primary)",
            boxShadow: "0 0 0 5px color-mix(in oklch, var(--primary) 14%, transparent)",
          } : undefined}
        >
          <motion.span
            initial={prefersReduced ? undefined : { scale: 0 }}
            animate={isOpen ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.12 }}
            className="block h-2 w-2 rounded-full bg-primary"
          />
        </motion.div>

        {/* thread line */}
        {!isLast && (
          <div className="relative mt-1 flex-1 overflow-hidden" style={{ width: 1 }}>
            <div className="absolute inset-0 bg-border/35" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary/60 to-primary/20"
              initial={{ height: 0 }}
              animate={isOpen ? { height: "100%" } : { height: 0 }}
              transition={{ duration: 0.75, ease: "easeOut", delay: 0.28 }}
            />
          </div>
        )}
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="flex-1 pb-9">
        {/* header — always visible */}
        <div className="flex flex-wrap items-center gap-2 pt-0.5">
          <span className="font-mono text-[10px] font-bold text-primary/45">{g.number}</span>
          <h3 className={`text-sm font-semibold leading-snug transition-colors duration-300 ${isOpen ? "text-foreground" : "text-muted-foreground"}`}>
            {g.label}
          </h3>
          <AnimatePresence>
            {isOpen && (
              <motion.span
                key="tag"
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ duration: 0.22, delay: 0.18 }}
                className="rounded-full border border-primary/25 bg-primary/6 px-2 py-0.5 text-[10px] font-medium text-primary/75"
              >
                {g.tag}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* body — expands on scroll */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="body"
              variants={bodyV}
              initial="closed"
              animate="open"
              exit="closed"
              className="overflow-hidden"
            >
              {/* accent line */}
              <motion.div
                className="my-2.5 h-px"
                style={{
                  background: "linear-gradient(to right, color-mix(in oklch, var(--primary) 45%, transparent), transparent)",
                  transformOrigin: isRTL ? "right" : "left",
                  scaleX: 0,
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
              />
              <p className={`text-[12px] leading-relaxed text-muted-foreground ${isRTL ? "text-right" : "text-left"}`}>
                {g.body}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function GoalsStory({ isFa }: { isFa: boolean }) {
  const isRTL = isFa;
  const dir = isRTL ? "rtl" : "ltr";
  const prefersReduced = useReducedMotion();
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-40px" });
  const list = isFa ? goals.fa : goals.en;

  return (
    <div dir={dir} className="px-1">
      <motion.div
        ref={headerRef}
        initial={prefersReduced ? undefined : { opacity: 0, y: 8 }}
        animate={headerInView && !prefersReduced ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-7 space-y-0.5"
      >
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-primary/70">
          {isFa ? "داستان این فضا" : "The story behind this space"}
        </p>
        <p className="text-xs text-muted-foreground">
          {isFa
            ? "هر هدف یک دلیل دارد — با اسکرول کردن کشف کن."
            : "Each goal has a reason — scroll down to discover it."}
        </p>
      </motion.div>

      {list.map((g, i) => (
        <StoryNode key={g.id} g={g} isFa={isFa} isLast={i === list.length - 1} />
      ))}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VARIANT 4 — TERMINAL  (creative variant)
// A fake shell window. Each goal is "executed" as a command. The prompt
// types out, a status line follows, then the goal body and a progress bar
// appear. All three commands run in sequence with staggered delays.
// Monospace throughout; primary green used for prompts and accents.
// ══════════════════════════════════════════════════════════════════════════════

function useTyping(text: string, active: boolean, speed = 22): string {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    if (!active) { setDisplayed(""); return; }
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);
  return displayed;
}

function TerminalBlock({
  g,
  isFa,
  triggerDelay,
  containerInView,
}: {
  g: (typeof goals.en)[number];
  isFa: boolean;
  triggerDelay: number;
  containerInView: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!containerInView) return;
    const t = setTimeout(
      () => setActive(true),
      prefersReduced ? 0 : triggerDelay,
    );
    return () => clearTimeout(t);
  }, [containerInView, triggerDelay, prefersReduced]);

  const cmdText = `zal@blog:~$ ./goal ${g.number}  # ${g.cmd}`;
  const typedCmd = useTyping(cmdText, active, prefersReduced ? 0 : 16);
  const cmdDone = typedCmd.length >= cmdText.length;

  const typedStatus = useTyping(g.statusLine, cmdDone, prefersReduced ? 0 : 26);
  const statusDone = typedStatus.length >= g.statusLine.length;

  return (
    <motion.div
      initial={prefersReduced ? undefined : { opacity: 0 }}
      animate={active ? { opacity: 1 } : undefined}
      transition={{ duration: 0.2 }}
      className="space-y-1"
    >
      {/* ── prompt line ── */}
      <div className="flex items-start gap-1.5 font-mono text-[11px] leading-snug text-primary" dir="ltr">
        <span className="shrink-0 select-none">$</span>
        <span>{typedCmd}</span>
        {active && !cmdDone && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.55, ease: "linear" }}
            className="mt-0.5 inline-block h-[0.9em] w-1.5 shrink-0 bg-primary"
          />
        )}
      </div>

      {/* ── status line ── */}
      {cmdDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="flex items-center gap-1 pl-4 font-mono text-[10px] text-muted-foreground/80"
          dir="ltr"
        >
          <span className="text-primary/60">›</span>
          <span>{typedStatus}</span>
          {!statusDone && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
              className="inline-block h-[0.85em] w-1.25 bg-primary/70"
            />
          )}
        </motion.div>
      )}

      {/* ── output body ── */}
      {statusDone && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          {/* tag + mini bar */}
          <div className="flex items-center gap-2 pl-4 pt-1.5 pb-1.5" dir="ltr">
            <span className="font-mono text-[9px] text-primary/50">[{g.tag}]</span>
            <div className="h-0.5 w-16 overflow-hidden rounded-full bg-border/60">
              <motion.div
                className="h-full rounded-full bg-primary/60"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              />
            </div>
            <span className="font-mono text-[9px] text-primary/60">✓ ok</span>
          </div>
          {/* body paragraph */}
          <p
            className="pl-4 text-[11px] leading-relaxed text-muted-foreground"
            dir={isFa ? "rtl" : "ltr"}
          >
            {g.body}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

function GoalsTerminal({ isFa }: { isFa: boolean }) {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const list = isFa ? goals.fa : goals.en;

  // stagger: each block starts after the previous finishes ~
  // rough estimate: 16ms/char * ~45 chars + status + 300ms buffer
  const delays = [200, 2400, 4600];

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/50 shadow-lg backdrop-blur-md"
    >
      {/* scanline texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, currentColor 3px, currentColor 4px)",
        }}
      />

      {/* subtle noise / grain at corners */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.02]"
        style={{
          background:
            "radial-gradient(ellipse at top left, color-mix(in oklch, var(--primary) 20%, transparent) 0%, transparent 60%), radial-gradient(ellipse at bottom right, color-mix(in oklch, var(--primary) 10%, transparent) 0%, transparent 55%)",
        }}
      />

      {/* ── title bar ── */}
      <div className="relative z-20 flex items-center gap-2 border-b border-border/50 bg-muted/40 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/65" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/55" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/55" />
        <span className="ml-auto select-none font-mono text-[10px] text-muted-foreground/70">
          zal@blog — ~/goals — bash
        </span>
      </div>

      {/* ── shell body ── */}
      <div className="relative z-20 space-y-5 p-5 pb-6">
        {/* comment header */}
        {inView && (
          <motion.div
            initial={prefersReduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="select-none font-mono text-[10px] text-muted-foreground/60"
            dir="ltr"
          >
            # security researcher notes — goal manifest v1.0
          </motion.div>
        )}

        {list.map((g, i) => (
          <TerminalBlock
            key={g.id}
            g={g}
            isFa={isFa}
            triggerDelay={delays[i]}
            containerInView={inView}
          />
        ))}

        {/* idle prompt at the end */}
        {inView && (
          <motion.div
            initial={prefersReduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: prefersReduced ? 0 : (delays[delays.length - 1] + 2200) / 1000,
            }}
            className="flex items-center gap-1.5 pt-1 font-mono text-[11px] text-primary"
            dir="ltr"
          >
            <span>$</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.9, ease: "linear" }}
              className="inline-block h-[1em] w-1.75 bg-primary/55"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ══════════════════════════════════════════════════════════════════════════════
export default function GoalsSectionClient({
  locale,
  isFa,
  variant = "story",
}: Props) {
  return (
    <section aria-label={isFa ? "اهداف وبلاگ" : "Blog goals"} className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
          {isFa ? "اهداف" : "Goals"}
        </h2>
      </div>

      {variant === "box"      && <GoalsBox      isFa={isFa} />}
      {variant === "open"     && <GoalsOpen     isFa={isFa} />}
      {variant === "story"    && <GoalsStory    isFa={isFa} />}
      {variant === "terminal" && <GoalsTerminal isFa={isFa} />}
    </section>
  );
}