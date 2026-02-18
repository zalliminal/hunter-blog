"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  index?: number;
  children: ReactNode;
  className?: string;
};

export function AnimatedCard({ index = 0, children, className }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        // Fix #8: cap stagger so last card never waits more than 300ms
        delay: Math.min(index * 0.06, 0.3),
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}