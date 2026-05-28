// components/support/LiveStats.tsx
"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Target, Sparkles, Heart } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  isFa: boolean;
};

// ✅ بروزرسانی ساختار داده
type StatsData = {
  totalAmount: number;
  totalCount: number;
  goalProgress: number;
  goalAmount: number; // تغییر از currentGoal به goalAmount
};

export default function LiveStats({ isFa }: Props) {
  const [stats, setStats] = useState<StatsData>({
    totalAmount: 0,
    totalCount: 0,
    goalProgress: 0,
    goalAmount: 50000000,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/support/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat(isFa ? "fa-IR" : "en-US").format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(isFa ? "fa-IR" : "en-US", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(num);
  };

  // ✅ بروزرسانی محاسبه درصد پیشرفت
  const progressPercentage = Math.min(
    (stats.goalProgress / stats.goalAmount) * 100,
    100
  );

  // Calculate circle progress (for SVG circle)
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-destructive/10 to-accent/10 border border-destructive/20 backdrop-blur-sm"
          >
            <Sparkles className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">
              {isFa ? "آمار زنده" : "Live Statistics"}
            </span>
          </motion.div>
          <h2 className="text-2xl md:text-3xl font-bold">
            {isFa ? "پیشرفت حمایت‌ها" : "Support Progress"}
          </h2>
        </div>

        {/* Stats Grid - 2 columns layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          
          {/* Left: Goal Progress with Circular Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative group overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-primary/5 via-background/80 to-accent/5 p-6 shadow-md hover:shadow-xl transition-all duration-500"
          >
            {/* Floating background icon */}
            <motion.div
              className="absolute opacity-5"
              style={{ right: "10%", top: "15%" }}
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Target className="h-16 w-16" />
            </motion.div>

            {/* Mesh gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
              {/* Circular Progress */}
              <div className="relative">
                <svg className="transform -rotate-90" width="180" height="180">
                  {/* Background circle */}
                  <circle
                    cx="90"
                    cy="90"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-muted/20"
                  />
                  
                  {/* Progress circle */}
                  <motion.circle
                    cx="90"
                    cy="90"
                    r={radius}
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: isLoading ? circumference : strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    style={{
                      strokeDasharray: circumference,
                    }}
                  />
                  
                  {/* Gradient definition */}
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="var(--primary)" />
                      <stop offset="100%" stopColor="var(--accent)" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="text-center"
                  >
                    {isLoading ? (
                      <div className="h-8 w-16 bg-muted animate-pulse rounded mx-auto" />
                    ) : (
                      <div className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                        {formatNumber(Math.round(progressPercentage))}%
                      </div>
                    )}
                    <div className="text-xs text-muted-foreground mt-1">
                      {isFa ? "پیشرفت" : "Progress"}
                    </div>
                  </motion.div>
                </div>

                {/* Animated glow */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-2xl"
                  style={{
                    background: `conic-gradient(from 0deg, var(--primary) ${progressPercentage}%, transparent ${progressPercentage}%)`,
                  }}
                  animate={{
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Goal info */}
              <div className="text-center space-y-1 w-full">
                <div className="text-sm text-muted-foreground">
                  {isFa ? "هزینه های سایت" : "Current Goal"}
                </div>
                {isLoading ? (
                  <div className="h-6 w-32 bg-muted animate-pulse rounded mx-auto" />
                ) : (
                  <div className="text-lg font-semibold">
                    {formatCurrency(stats.goalAmount/10)} {isFa ? "تومان" : "IRT"}
                  </div>
                )}
                
                {/* Progress bar */}
                <div className="relative h-2 bg-muted/30 rounded-full overflow-hidden mt-3">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>

                <div className="text-xs text-muted-foreground pt-1">
                  {isLoading ? (
                    <div className="h-4 w-24 bg-muted animate-pulse rounded mx-auto" />
                  ) : (
                    <>
                      {formatCurrency(stats.goalProgress/10)} {isFa ? "تومان جمع‌آوری شده" : "IRT raised"}
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Two stat cards stacked */}
          <div className="flex flex-col gap-4 md:gap-6">
            
            {/* Total Donations Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="relative group overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-green-500/5 via-background/80 to-emerald-500/5 p-6 shadow-md hover:shadow-xl transition-all duration-500 flex-1"
            >
              {/* Floating background icon */}
              <motion.div
                className="absolute opacity-5"
                style={{ right: "10%", top: "20%" }}
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <TrendingUp className="h-12 w-12" />
              </motion.div>

              {/* Mesh gradient overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 flex items-start gap-4">
                {/* Icon with pulse animation */}
                <motion.div
                  className="flex-shrink-0 rounded-lg bg-green-500/10 p-3"
                  whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <TrendingUp className="h-6 w-6 text-green-500" />
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">
                    {isFa ? "مجموع حمایت‌ها" : "Total Donations"}
                  </p>
                  {isLoading ? (
                    <div className="h-8 w-32 bg-muted animate-pulse rounded" />
                  ) : (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4, type: "spring" }}
                      className="space-y-1"
                    >
                      <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                        {formatCurrency(stats.totalAmount)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {isFa ? "تومان" : "IRT"}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Animated coins */}
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="h-4 w-4 text-green-500/50" />
                </motion.div>
              </div>
            </motion.div>

            {/* Supporters Count Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="relative group overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-blue-500/5 via-background/80 to-cyan-500/5 p-6 shadow-md hover:shadow-xl transition-all duration-500 flex-1"
            >
              {/* Floating background icon */}
              <motion.div
                className="absolute opacity-5"
                style={{ right: "10%", top: "20%" }}
                animate={{
                  y: [0, -8, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                <Users className="h-12 w-12" />
              </motion.div>

              {/* Mesh gradient overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 flex items-start gap-4">
                {/* Icon with bounce animation */}
                <motion.div
                  className="flex-shrink-0 rounded-lg bg-blue-500/10 p-3"
                  whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <motion.div
                    animate={{
                      y: [0, -3, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Users className="h-6 w-6 text-blue-500" />
                  </motion.div>
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-muted-foreground mb-1">
                    {isFa ? "تعداد حامیان" : "Supporters"}
                  </p>
                  {isLoading ? (
                    <div className="h-8 w-24 bg-muted animate-pulse rounded" />
                  ) : (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.5, type: "spring" }}
                      className="space-y-1"
                    >
                      <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                        {formatNumber(stats.totalCount)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {isFa ? "نفر" : "people"}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Animated hearts */}
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Heart className="h-4 w-4 text-blue-500/50 fill-blue-500/20" />
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}
