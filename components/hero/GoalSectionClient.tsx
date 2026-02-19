"use client";

/**
 * FIX — GHOST LAYER HEIGHT RESERVATION
 *
 * Problem: typing animation causes layout shift as content grows.
 * Problem 2: fixed height wastes space on large screens.
 *
 * Solution:
 *   1. Render ALL content invisibly (aria-hidden, invisible) immediately.
 *      This "ghost" layer makes the wrapper claim its full final height
 *      from the very first paint — zero layout shift.
 *   2. The live animated layer sits absolute on top, typing out
 *      visibly inside the already-reserved space.
 *   3. max-h-[90dvh] caps height on small screens so it never overflows.
 *   4. No fixed px height → no wasted empty space on large screens.
 */

import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// ── copy ─────────────────────────────────────────────────────────────────────
const goals = {
  en: [
    {
      id: "bounty",
      number: "01",
      label: "Document Real Bug Bounty Findings",
      body: "Every real finding deserves a proper write-up — from the first hint of something off to the final report. We capture that process: the wrong turns, the aha moments, and the exact payload that worked.",
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
      body: "هر یافته‌ی واقعی لایق یک write-up درست است — از اولین نشانه‌ی چیز غیرعادی تا گزارش نهایی. ما آن فرایند را ثبت می‌کنیم: راه‌های اشتباه، لحظات کشف، و دقیقاً همان payload که کار کرد.",
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

type Goal = (typeof goals.en)[number];

// ── typing hook ───────────────────────────────────────────────────────────────
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

// ── ghost block: full static content, invisible, for height reservation ───────
function GhostBlock({ g, isFa }: { g: Goal; isFa: boolean }) {
  const cmdText = `team@kavlabs:~$ ./goal ${g.number}  # ${g.cmd}`;
  return (
    <div className="space-y-1 invisible select-none" aria-hidden>
      <div className="flex items-start gap-1.5 font-mono text-[11px] md:text-[12px] leading-snug" dir="ltr">
        <span className="shrink-0">$</span>
        <span>{cmdText}</span>
      </div>
      <div className="flex items-center gap-1 pl-4 font-mono text-[10px]" dir="ltr">
        <span>›</span>
        <span>{g.statusLine}</span>
      </div>
      <div>
        <div className="flex items-center gap-2 pl-4 pt-1.5 pb-1.5" dir="ltr">
          <span className="font-mono text-[9px]">[{g.tag}]</span>
          <div className="h-0.5 w-16 rounded-full" />
          <span className="font-mono text-[9px]">✓ ok</span>
        </div>
        <p className="pl-4 text-[11px] md:text-[12px] leading-relaxed" dir={isFa ? "rtl" : "ltr"}>
          {g.body}
        </p>
      </div>
    </div>
  );
}

// ── live animated block ───────────────────────────────────────────────────────
function TerminalBlock({
  g,
  isFa,
  triggerDelay,
  containerInView,
  scrollRef,
}: {
  g: Goal;
  isFa: boolean;
  triggerDelay: number;
  containerInView: boolean;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}) {
  const prefersReduced = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!containerInView) return;
    const t = setTimeout(() => setActive(true), prefersReduced ? 0 : triggerDelay);
    return () => clearTimeout(t);
  }, [containerInView, triggerDelay, prefersReduced]);

  useEffect(() => {
    if (active && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  const cmdText = `team@kavlabs:~$ ./goal ${g.number}  # ${g.cmd}`;
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
      {/* prompt */}
      <div className="flex items-start gap-1.5 font-mono text-[11px] md:text-[12px] leading-snug text-primary" dir="ltr">
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

      {/* status */}
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
              className="inline-block h-[0.85em] w-1.5 bg-primary/70"
            />
          )}
        </motion.div>
      )}

      {/* output */}
      {statusDone && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
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
          <p className="pl-4 text-[11px] md:text-[12px] leading-relaxed text-muted-foreground" dir={isFa ? "rtl" : "ltr"}>
            {g.body}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}

// ── title bar ─────────────────────────────────────────────────────────────────
function TitleBar() {
  return (
    <div className="relative z-20 flex shrink-0 items-center gap-2 border-b border-border/50 bg-muted/40 px-4 py-2.5">
      <span className="h-2.5 w-2.5 rounded-full bg-destructive/65" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-400/55" />
      <span className="h-2.5 w-2.5 rounded-full bg-primary/55" />
      <span className="ml-auto select-none font-mono text-[10px] text-muted-foreground/70">
        team@kavlabs — ~/goals — bash
      </span>
    </div>
  );
}

// ── main export ───────────────────────────────────────────────────────────────
/**
 * Terminal-based goals section component.
 * Only supports the terminal variant for displaying goals.
 */
export default function GoalSectionClient({
  locale,
  isFa = false,
  variant = "terminal",
}: {
  locale?: string;
  isFa?: boolean;
  variant?: "terminal";
}) {
  // Only terminal variant is supported
  if (variant !== "terminal") {
    console.warn(`Unsupported variant: ${variant}. Only 'terminal' is supported.`);
  }
  
  // Validate locale format (optional, for consistency with other components)
  if (locale && !["en", "fa"].includes(locale)) {
    console.warn(`Unsupported locale: ${locale}`);
  }
  
  const prefersReduced = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-50px" });
  const list = isFa ? goals.fa : goals.en;
  const delays = [200, 2400, 4600];

  // shared padding classes for both ghost and live layers
  const bodyPadding = "space-y-5 p-5 pb-6 md:p-6 md:pb-8 md:space-y-6";

  return (
    <motion.div
      ref={wrapRef}
      initial={prefersReduced ? undefined : { opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/50 shadow-lg backdrop-blur-md max-h-[90dvh] flex flex-col"
    >
      {/* scanline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.015] dark:opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, currentColor 3px, currentColor 4px)",
        }}
      />
      {/* corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.02]"
        style={{
          background:
            "radial-gradient(ellipse at top left, color-mix(in oklch, var(--primary) 20%, transparent) 0%, transparent 60%), radial-gradient(ellipse at bottom right, color-mix(in oklch, var(--primary) 10%, transparent) 0%, transparent 55%)",
        }}
      />

      <TitleBar />

      {/* ── GHOST LAYER ────────────────────────────────────────────────────
          Fully invisible, renders all content immediately.
          Its natural height is what the wrapper uses — no layout shift.
      ─────────────────────────────────────────────────────────────────── */}
      <div className={`relative z-0 ${bodyPadding}`} aria-hidden>
        {/* comment line */}
        <div className="invisible select-none font-mono text-[10px]" dir="ltr">
          # kavlabs security research — goal manifest v1.0
        </div>
        {list.map((g) => (
          <GhostBlock key={g.id} g={g} isFa={isFa} />
        ))}
        {/* idle prompt */}
        <div className="invisible select-none font-mono text-[11px]" dir="ltr">
          $ ▌
        </div>
      </div>

      {/* ── LIVE LAYER ─────────────────────────────────────────────────────
          Absolutely positioned over the ghost, same padding.
          Animates inside the already-reserved space.
      ─────────────────────────────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        className={`absolute inset-x-0 bottom-0 z-30 overflow-y-auto ${bodyPadding}`}
        style={{
          top: "calc(2.5rem + 1px)", // titlebar height (py-2.5 * 2 + icon h + border)
          scrollbarWidth: "none",
        }}
      >
        {inView && (
          <motion.div
            initial={prefersReduced ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="select-none font-mono text-[10px] text-muted-foreground/60"
            dir="ltr"
          >
            # kavlabs security research — goal manifest v1.0
          </motion.div>
        )}

        {list.map((g, i) => (
          <TerminalBlock
            key={g.id}
            g={g}
            isFa={isFa}
            triggerDelay={delays[i]}
            containerInView={inView}
            scrollRef={scrollRef}
          />
        ))}

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
              className="inline-block h-[1em] w-1.5 bg-primary/55"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}