// components/learning-paths/LearningPathsHero.tsx
"use client";

import { motion } from "framer-motion";
import { ChevronDown, Shield, Lock, Network, Eye, Code, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  isFa: boolean;
  onScrollClick: () => void;
};

export default function LearningPathsHero({ isFa, onScrollClick }: Props) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-background">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-br from-foreground via-foreground to-primary bg-clip-text text-transparent">
              {isFa ? "مسیر یادگیری خود را" : "Choose Your"}
            </span>
            <br />
            <span className="bg-gradient-to-br from-primary via-accent-foreground to-primary bg-clip-text text-transparent">
              {isFa ? "انتخاب کنید" : "Learning Path"}
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl text-center mb-12"
        >
          {isFa
            ? "از سواد دیجیتال تا امنیت سایبری حرفه‌ای، هر مسیری که نیاز داری اینجاست"
            : "From digital literacy to professional cybersecurity, every path you need is here"}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <Button
            onClick={onScrollClick}
            size="lg"
            className="group relative overflow-hidden rounded-lg px-8 py-6 text-lg font-medium shadow-xl transition-all hover:shadow-2xl hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-2">
              {isFa ? "کاوش مسیرها" : "Explore Paths"}
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent-foreground to-primary opacity-0 transition-opacity group-hover:opacity-100" />
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">{isFa ? "اسکرول کنید" : "Scroll"}</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Animated Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -80, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-1/4 right-1/4 h-[32rem] w-[32rem] rounded-full bg-accent/20 blur-3xl"
      />

      {/* Floating Icons */}
      <FloatingIcon Icon={Shield} delay={0} />
      <FloatingIcon Icon={Lock} delay={2} />
      <FloatingIcon Icon={Network} delay={4} />
      <FloatingIcon Icon={Eye} delay={1} />
      <FloatingIcon Icon={Code} delay={3} />
      <FloatingIcon Icon={Terminal} delay={5} />
    </div>
  );
}

function FloatingIcon({ Icon, delay }: { Icon: any; delay: number }) {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0, 0.1, 0],
        y: [0, -100, -200],
        x: [0, Math.random() * 50 - 25, 0],
        rotate: [0, 360],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
      className="absolute"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
      }}
    >
      <Icon className="h-8 w-8 text-primary/20" strokeWidth={1.5} />
    </motion.div>
  );
}
