// components/support/SupportPageClient.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/i18n";
import SupportHero from "@/components/support/SupportHero";
import SupportCards from "@/components/support/SupportCards";
import LiveStats from "@/components/support/LiveStats";
import LatestSupporters from "@/components/support/LatestSupporters";
import ThankYouCard from "@/components/support/ThankYouCard";

type Props = {
  locale: Locale;
  isFa: boolean;
  dict: Dictionary;
  fontClassName?: string;
};

function AnimatedSection({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function SupportPageClient({ 
  locale, 
  isFa, 
  dict,
  fontClassName 
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={fontClassName} dir={isFa ? "rtl" : "ltr"}>
      {/* Hero Section */}
      <AnimatedSection>
        <div className="container mx-auto py-8 md:py-12">
          <SupportHero locale={locale} isFa={isFa} dict={dict} />
        </div>
      </AnimatedSection>

      {/* Main Content */}
      <div className="container mx-auto space-y-16 md:space-y-24 pb-16">
        {/* Support Cards */}
        <AnimatedSection>
          <SupportCards isFa={isFa} locale={locale} dict={dict} />
        </AnimatedSection>

        {/* Live Stats */}
        <AnimatedSection>
          <LiveStats isFa={isFa} />
        </AnimatedSection>

        {/* Latest Supporters */}
        <AnimatedSection>
          <LatestSupporters isFa={isFa} />
        </AnimatedSection>

        {/* Thank You Card */}
        <AnimatedSection>
          <ThankYouCard isFa={isFa} />
        </AnimatedSection>
      </div>
    </div>
  );
}
