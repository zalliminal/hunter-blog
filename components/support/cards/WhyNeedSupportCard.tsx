// components/support/cards/WhyNeedSupportCard.tsx
"use client";

import { motion } from "framer-motion";
import { Server, Shield, Zap, Database } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  isFa: boolean;
};

export default function WhyNeedSupportCard({ isFa }: Props) {
  const [counts, setCounts] = useState({
    server: 0,
    development: 0,
    content: 0,
  });

  // Counter animation
  useEffect(() => {
    const targets = {
      server: 1,
      development: 1,
      content: 1,
    };

    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounts({
        server: Math.floor(targets.server * progress),
        development: Math.floor(targets.development * progress),
        content: Math.floor(targets.content * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts(targets);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const expenses = [
    {
      icon: Server,
      label: isFa ? "سرورها و زیرساخت" : "Servers & Infrastructure",
      amount: counts.server,
      color: "text-blue-500",
    },
    {
      icon: Zap,
      label: isFa ? "توسعه و نگهداری" : "Development & Maintenance",
      amount: counts.development,
      color: "text-yellow-500",
    },
    {
      icon: Database,
      label: isFa ? "تولید محتوا" : "Content Creation",
      amount: counts.content,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="group relative h-full overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-blue-500/5 via-background/80 to-background/60 p-6 shadow-md hover:shadow-xl transition-all duration-500">
      {/* Animated network lines background */}
      <svg
        className="absolute inset-0 w-full h-full opacity-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.line
          x1="10%"
          y1="20%"
          x2="90%"
          y2="80%"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        <motion.line
          x1="90%"
          y1="20%"
          x2="10%"
          y2="80%"
          stroke="currentColor"
          strokeWidth="1"
          className="text-primary"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
            delay: 1,
          }}
        />
      </svg>

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 space-y-4">
        {/* Icon */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="inline-flex items-center justify-center rounded-lg bg-primary/10 p-3"
        >
          <Server className="h-6 w-6 text-primary" />
        </motion.div>

        {/* Title */}
        <h3 className="text-lg font-semibold">
          {isFa ? "چرا به حمایت نیاز داریم؟" : "Why We Need Support?"}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isFa
            ? "کاولبز کاملاً رایگان و متن‌باز است. ما هیچ تبلیغی نمی‌گذاریم و اطلاعات شما را نمی‌فروشیم پس برای توسعه نیاز به حمایت شما داریم."
            : "KavLabs is completely free and open-source. We don't run ads or sell your data."}
        </p>

        {/* Expenses list */}
        <div className="space-y-3 pt-2">
          {expenses.map((expense, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 + 0.3 }}
              className="flex items-center gap-3"
            >
              <expense.icon className={`h-4 w-4 ${expense.color}`} />
              <span className="text-xs text-muted-foreground flex-1">
                {expense.label}
              </span>
              <span className="text-xs font-mono font-semibold">
                {expense.amount}M
              </span>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <div className="pt-4 space-y-2 border-t border-border/40">
          <p className="text-xs font-medium text-muted-foreground">
            {isFa ? "با حمایت شما:" : "With your support:"}
          </p>
          <ul className="space-y-1.5 text-xs text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              {isFa
                ? "سرویس زنده می‌ماند"
                : "Service stays Alive"}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              {isFa
                ? "ویژگی‌ و محتوا های جدید اضافه می‌شود"
                : "New features and content get added"}
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">✓</span>
              {isFa
                ? "سرعت و کیفیت بهبود می‌یابد"
                : "Speed & quality improve"}
            </li>
          </ul>
        </div>
      </div>

      {/* Hover effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        initial={false}
      />
    </div>
  );
}
