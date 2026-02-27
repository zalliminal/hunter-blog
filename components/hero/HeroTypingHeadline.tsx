"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";

type Props = {
  text: string;
  isRTL: boolean;
};

export default function HeroTypingHeadline({ text, isRTL }: Props) {
  const [displayed, setDisplayed] = useState("");
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) {
      setDisplayed(text);
      return;
    }
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i === text.length) clearInterval(interval);
    }, 90);
    return () => clearInterval(interval);
  }, [text, prefersReduced]);

  return (
    <span className="inline-block" dir={isRTL ? "rtl" : "ltr"}>
      {displayed}
      {displayed.length < text.length && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="inline-block w-[2px] h-[1.2em] bg-primary/70 ml-1 align-middle"
          aria-hidden
        />
      )}
    </span>
  );
}