// components/learning-paths/LearningPathsClient.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import type { Locale, Dictionary } from "@/lib/i18n";
import LearningPathsHero from "@/components/learning-paths/LearningPathsHero";
import PathCards from "@/components/learning-paths/PathCards";

type Props = {
  locale: Locale;
  isFa: boolean;
  dict: Dictionary;
  fontClassName?: string;
};

export default function LearningPathsClient({
  locale,
  isFa,
  dict,
  fontClassName,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToCards = () => {
    cardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className={fontClassName} dir={isFa ? "rtl" : "ltr"}>
      {/* Hero Section - Full Screen */}
      <LearningPathsHero isFa={isFa} onScrollClick={scrollToCards} />

      {/* Path Cards Section */}
      <div ref={cardsRef} className="container mx-auto px-4 py-24">
        <PathCards isFa={isFa} locale={locale} />
      </div>
    </div>
  );
}
