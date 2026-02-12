"use client";
import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Variant = "mesh" | "linear";
type Speed = "slow" | "normal" | "fast";

type AnimatedGradientProps = {
  variant?: Variant;
  colors?: string[]; // CSS variable names without `--`, e.g. ['primary', 'accent']
  speed?: Speed;
  className?: string;
  children?: ReactNode;
};

export function AnimatedGradient({
  variant = "mesh",
  colors = ["primary", "accent"],
  speed = "normal",
  className = "",
  children,
}: AnimatedGradientProps) {
  const prefersReduced = useReducedMotion();

  const speedMap: Record<Speed, number> = {
    slow: 20,
    normal: 10,
    fast: 5,
  };
  const duration = speedMap[speed];

  // helper to resolve CSS var fallback
  const colorVar = (name: string) => `var(--${name}, rgba(99,102,241,0.8))`;

  // If the user prefers reduced motion, render static blobs
  if (prefersReduced) {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <div
          className="absolute -right-12 -top-8 w-[420px] h-[420px] rounded-full blur-3xl opacity-25"
          style={{ background: colorVar(colors[0]) }}
        />
        <div
          className="absolute -left-10 -bottom-8 w-[380px] h-[380px] rounded-full blur-3xl opacity-20"
          style={{ background: colorVar(colors[1] || colors[0]) }}
        />
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  }

  if (variant === "mesh") {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
          style={{ background: colorVar(colors[0]) }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full blur-3xl opacity-28"
          style={{ background: colorVar(colors[1] || colors[0]) }}
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
            scale: [1, 1.25, 1],
          }}
          transition={{ duration: duration * 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 left-1/2 w-[360px] h-[360px] rounded-full blur-3xl opacity-18"
          style={{ background: colorVar(colors[0]) }}
          animate={{
            x: [-100, 100, -100],
            y: [-50, 50, -50],
            scale: [1.06, 0.98, 1.06],
          }}
          transition={{ duration: duration * 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0">{children}</div>
      </div>
    );
  }

  // fallback: simple linear gradient drift
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(120deg, ${colorVar(colors[0])}, ${colorVar(colors[1] || colors[0])})`,
          opacity: 0.25,
          filter: "blur(40px)",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: duration * 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
