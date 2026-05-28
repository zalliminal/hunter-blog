// components/support/SupportHero.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Locale } from "@/lib/i18n";
import { Check, Heart, Share2 } from "lucide-react";

type Props = {
  locale: Locale;
  isFa: boolean;
};

export default function SupportHero({ locale, isFa }: Props) {
  const [copied, setCopied] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const fullText = isFa ? "کاولبز رو زنده نگه دارید" : "Keep KavLabs Alive";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 80);

    return () => clearInterval(interval);
  }, [fullText]);

  const handleShare = async () => {
    const shareText = isFa
      ? "کاولبز جاییه که می‌تونید یاد بگیرید چطور در فضای سایبری امن بمونید و حتی دنیا رو برای دیگران امن‌تر کنید. 🔐\n\nکاولبز یعنی یادداشت‌هایی از ذهن‌های کاوشگر، برای ذهن‌های کنجکاو.\n\nhttps://kavlabs.ir\nتلگرام: @kavlabs_official"
      : "KavLabs is a place to learn how to stay safe in cyberspace — and even help make the world safer for others. 🔐\n\nKavLabs means notes from exploring minds, for curious minds.\n\nhttps://kavlabs.ir\nTelegram: @kavlabs_official";

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);

      if (navigator.share) {
        await navigator.share({
          title: isFa ? "کاولبز" : "KavLabs",
          text: shareText,
        });
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-background via-accent/5 to-background p-8 md:p-12 shadow-lg">
      {/* Animated SVG background patterns */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "oklch(0.8686 0.2776 144.4661)", stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: "oklch(0.5638 0.1872 143.2450)", stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>

        {/* Animated flowing paths */}
        <motion.path
          d="M0,100 Q150,50 300,100 T600,100"
          stroke="url(#grad1)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path
          d="M100,200 Q250,150 400,200 T700,200"
          stroke="url(#grad1)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        />
        <motion.path
          d="M-50,300 Q100,250 250,300 T550,300"
          stroke="url(#grad1)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse", delay: 1 }}
        />

        {/* Animated circles along paths */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            r="3"
            fill="oklch(0.8686 0.2776 144.4661)"
            initial={{ cx: 0, cy: 100 + i * 50, opacity: 0 }}
            animate={{
              cx: [0, 300, 600],
              cy: [100 + i * 50, 50 + i * 50, 100 + i * 50],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.4,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Geometric shapes */}
        <motion.rect
          x="80%"
          y="10%"
          width="40"
          height="40"
          fill="none"
          stroke="oklch(0.8686 0.2776 144.4661)"
          strokeWidth="1"
          opacity="0.2"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "50% 50%" }}
        />
        <motion.polygon
          points="10,80 30,40 50,80"
          fill="none"
          stroke="oklch(0.8686 0.2776 144.4661)"
          strokeWidth="1"
          opacity="0.2"
          animate={{
            rotate: [0, -360],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ transformOrigin: "30px 60px" }}
        />
      </svg>

      {/* Floating code-like particles */}
      {["{ }", "< />", "=>", "//", "&&"].map((symbol, i) => (
        <motion.div
          key={i}
          className="absolute text-primary/20 font-mono text-sm pointer-events-none"
          style={{
            left: `${15 + i * 18}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            x: [0, 10, 0],
            opacity: [0.1, 0.3, 0.1],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut",
          }}
        >
          {symbol}
        </motion.div>
      ))}

      <div className="relative z-10 mx-auto max-w-3xl text-center space-y-6">
        {/* Animated heart icon with pulse */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.1,
          }}
          className="mx-auto w-fit relative"
        >
          <motion.div
            className="inline-flex items-center justify-center rounded-full p-4 relative bg-accent/30 backdrop-blur-sm"
            animate={{
              boxShadow: [
                "0 0 20px oklch(0.8686 0.2776 144.4661 / 0.3)",
                "0 0 40px oklch(0.8686 0.2776 144.4661 / 0.5)",
                "0 0 20px oklch(0.8686 0.2776 144.4661 / 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart 
                className="h-8 w-8 text-primary relative z-10" 
                style={{ fill: "oklch(0.8686 0.2776 144.4661 / 0.3)" }}
              />
            </motion.div>

            {/* Ripple effect */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary"
              animate={{
                scale: [1, 1.5, 2],
                opacity: [0.5, 0.2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Typing animation headline with green text */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold tracking-tight"
        >
          <span className="text-primary">
            {displayedText}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-0.5 h-8 md:h-10 bg-primary ml-1 align-middle"
            />
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          {isFa
            ? "با حمایت شما، کاولبز برای همیشه رایگان می‌ماند و می‌توانیم آموزش امنیت سایبری را برای همه در دسترس نگه داریم."
            : "With your support, KavLabs stays free forever and we can keep cybersecurity education accessible to everyone."}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          {/* Financial Support Button */}
          <motion.a
            href="https://daramet.com/kavlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium text-primary-foreground shadow-md w-full sm:w-auto justify-center overflow-hidden bg-primary"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />

            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1.5 }}
            >
              <Heart className="h-4 w-4 relative z-10" style={{ fill: "currentColor" }} />
            </motion.div>
            <span className="relative z-10">
              {isFa ? "حمایت مالی" : "Financial Support"}
            </span>
          </motion.a>

          {/* Share Button */}
          <motion.button
            onClick={handleShare}
            className="group relative inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-foreground shadow-sm w-full sm:w-auto justify-center overflow-hidden bg-background/80 backdrop-blur-sm"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              className="absolute inset-0 bg-accent/50"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            {copied ? (
              <>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  <Check className="h-4 w-4 text-primary relative z-10" />
                </motion.div>
                <span className="relative z-10">{isFa ? "کپی شد!" : "Copied!"}</span>
              </>
            ) : (
              <>
                <motion.div
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <Share2 className="h-4 w-4 relative z-10" />
                </motion.div>
                <span className="relative z-10">
                  {isFa ? "معرفی به دوستان" : "Share with Friends"}
                </span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-xs text-muted-foreground pt-2"
        >
          {isFa
            ? "هر کمک کوچک یا بزرگ، تفاوت می‌سازد"
            : "Every contribution, big or small, makes a difference"}
        </motion.p>
      </div>
    </section>
  );
}
