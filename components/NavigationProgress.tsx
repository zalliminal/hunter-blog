"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ─── tunables ────────────────────────────────────────────────────────────────
const FAKE_PROGRESS_INTERVAL_MS = 200; // how often we nudge the bar forward
const FAKE_PROGRESS_INCREMENT   = 0.015; // how much to nudge each tick (slows down near 90%)
const COMPLETE_DELAY_MS         = 300;  // how long to show 100% before hiding

// ─── hook: watches route changes ─────────────────────────────────────────────
function useNavigationProgress() {
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress]   = useState<number | null>(null); // null = hidden
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevRoute = useRef(`${pathname}?${searchParams}`);

  // Start the fake progress ticker
  const start = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(0.08); // jump to 8% immediately so the bar is visible at once

    timerRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev === null) return null;
        // Ease toward 90% — the closer we get, the slower it moves
        const remaining = 0.9 - prev;
        return prev + remaining * FAKE_PROGRESS_INCREMENT;
      });
    }, FAKE_PROGRESS_INTERVAL_MS);
  };

  // Complete: snap to 100%, then hide after a short delay
  const complete = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setProgress(1);
    setTimeout(() => setProgress(null), COMPLETE_DELAY_MS);
  };

  // Fire "complete" whenever the actual route changes
  useEffect(() => {
    const current = `${pathname}?${searchParams}`;
    if (current !== prevRoute.current) {
      prevRoute.current = current;
      complete();
    }
  }, [pathname, searchParams]);

  // Listen for link clicks to fire "start"
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      // Only intercept same-origin, non-hash, non-external links
      const isInternal =
        href.startsWith("/") ||
        href.startsWith(window.location.origin);
      const isHash   = href.startsWith("#");
      const hasTarget = anchor.target === "_blank";

      if (isInternal && !isHash && !hasTarget) {
        start();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Cleanup on unmount
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  return progress;
}

// ─── component ───────────────────────────────────────────────────────────────
export function NavigationProgress() {
  const progress      = useNavigationProgress();
  const prefersReduced = useReducedMotion();

  // When user prefers reduced motion, skip the animation entirely
  if (prefersReduced) return null;

  return (
    <AnimatePresence>
      {progress !== null && (
        <motion.div
          key="nav-progress-bar"
          // Mount: slide down from above + fade in
          initial={{ opacity: 0, scaleY: 0.5, originY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          // Unmount: fade out upward
          exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeOut" } }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            height: "2px",
            pointerEvents: "none",
          }}
        >
          {/* Track — subtle background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--primary)",
              opacity: 0.12,
            }}
          />

          {/* Filled bar */}
          <motion.div
            animate={{ width: `${(progress ?? 0) * 100}%` }}
            transition={{
              duration: progress === 1 ? 0.2 : FAKE_PROGRESS_INTERVAL_MS / 1000,
              ease: progress === 1 ? [0.22, 1, 0.36, 1] : "linear",
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              background: "var(--primary)",
              borderRadius: "0 2px 2px 0",
            }}
          >
            {/* Glowing tip */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                width: "60px",
                height: "4px",
                background:
                  "radial-gradient(ellipse at right, var(--primary), transparent)",
                opacity: 0.8,
                filter: "blur(2px)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}