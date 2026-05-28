// components/learning-paths/PathCards.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, Shield, Target, Clock, ArrowRight, Footprints} from "lucide-react";
import type { Locale } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  isFa: boolean;
  locale: Locale;
};

type PathData = {
  id: string;
  titleFa: string;
  titleEn: string;
  steps: number;
  duration: string;
  durationFa: string;
  descriptionFa: string;
  descriptionEn: string;
  questionFa: string;
  questionEn: string;
  icon: any;
  gradient: string;
  bgGradient: string;
  primaryColor: string;
  lightColor: string;
};

const paths: PathData[] = [
  {
    id: "digital-literacy",
    titleFa: "سواد دیجیتال",
    titleEn: "Digital Literacy",
    steps: 8,
    duration: "4 weeks",
    durationFa: "۴ هفته",
    descriptionFa:
      'یاد بگیرید چطور در دنیای اینترنت امن بمانید، از اطلاعات‌تان محافظت کنید و تهدیدات رایج را تشخیص دهید',
    descriptionEn:
      'Learn how to stay safe online, protect your information, and recognize common threats',
    questionFa: "میخوای تو دیجیتال امن باشی؟",
    questionEn: "Ready to explore the digital world?",
    icon: BookOpen,
    gradient: "from-cyan-500 via-blue-500 to-indigo-500",
    bgGradient: "from-cyan-500/10 via-blue-500/5 to-transparent",
    primaryColor: "text-cyan-500",
    lightColor: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    id: "security-fundamentals",
    titleFa: "مبانی امنیت",
    titleEn: "Security Fundamentals",
    steps: 12,
    duration: "8 weeks",
    durationFa: "۸ هفته",
    descriptionFa:
      "اصول و مفاهیم اصلی امنیت سایبری را فرا بگیرید. از تهدیدات رایج تا دفاع در عمق و مدیریت ریسک.",
    descriptionEn:
      "Master core cybersecurity principles. From common threats to defense in depth and risk management.",
    questionFa: "می‌خوای متخصص امنیت بشی؟",
    questionEn: "Want to become a security expert?",
    icon: Shield,
    gradient: "from-emerald-500 via-green-500 to-teal-500",
    bgGradient: "from-emerald-500/10 via-green-500/5 to-transparent",
    primaryColor: "text-emerald-500",
    lightColor: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    id: "professional-security",
    titleFa: "امنیت حرفه‌ای",
    titleEn: "Professional Security",
    steps: 20,
    duration: "16 weeks",
    durationFa: "۱۶ هفته",
    descriptionFa:
      "به یک متخصص امنیت سایبری تبدیل شوید. پنتست، تحلیل بدافزار، SOC و incident response را بیاموزید.",
    descriptionEn:
      "Become a cybersecurity professional. Learn pentesting, malware analysis, SOC, and incident response.",
    questionFa: "حاضری به سطح حرفه‌ای برسی؟",
    questionEn: "Ready to reach professional level?",
    icon: Target,
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    bgGradient: "from-violet-500/10 via-purple-500/5 to-transparent",
    primaryColor: "text-violet-500",
    lightColor: "bg-violet-500/10 border-violet-500/20",
  },
];

export default function PathCards({ isFa, locale }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
      {paths.map((path, index) => (
        <PathCard key={path.id} path={path} isFa={isFa} index={index} />
      ))}
    </div>
  );
}

function PathCard({
  path,
  isFa,
  index,
}: {
  path: PathData;
  isFa: boolean;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 60, scale: 0.95 }
      }
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative max-w-md mx-auto w-full"
    >
      {/* Card Container - Fixed Height */}
      <div className="relative h-[580px] overflow-hidden rounded-3xl border border-border/50 bg-card backdrop-blur-xl shadow-lg transition-all duration-500 hover:shadow-2xl hover:border-border">
        {/* Animated Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${path.bgGradient} opacity-50`} />
        
        {/* Gradient Orb */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gradient-to-br ${path.gradient} blur-3xl opacity-20`}
        />

        {/* Content */}
        <div className="relative z-10 p-8 flex flex-col h-full">
          {/* Icon - Small */}
          {/* <motion.div
            whileHover={{ rotate: 15, scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl ${path.lightColor} backdrop-blur-sm`}
          >
            <path.icon className={`h-6 w-6 ${path.primaryColor}`} strokeWidth={2} />
          </motion.div> */}

          {/* Title */}
          <h3 className="text-3xl font-bold mb-4 tracking-tight bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text">
            {isFa ? path.titleFa : path.titleEn}
          </h3>

          {/* Question Box */}
          <div className={`relative overflow-hidden rounded-2xl ${path.lightColor} p-4 mb-6`}>
            <div className={`absolute inset-0 bg-gradient-to-br ${path.gradient} opacity-5`} />
            <p className={`relative z-10 text-sm font-semibold ${path.primaryColor}`}>
              {isFa ? path.questionFa : path.questionEn}
            </p>
          </div>

          {/* Description */}
          <p className="text-base leading-relaxed text-muted-foreground mb-8 flex-grow">
            {isFa ? path.descriptionFa : path.descriptionEn}
          </p>

          {/* Bottom Section - Button + Meta */}
          <div className="space-y-4">
            {/* CTA Button */}
            <Button
                asChild
                className={`w-full h-12 rounded-xl font-semibold text-base bg-gradient-to-r ${path.gradient} hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl group/btn`}
              >
                <Link href={`learning-paths/${path.id}`}>
                  <span className="flex items-center justify-center gap-2">
                    {isFa ? "شروع مسیر" : "Start Path"}
                    <ArrowRight
                      className={`h-4 w-4 transition-transform group-hover/btn:translate-x-1 ${
                        isFa ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </Link>
              </Button>


            {/* Meta Info */}
            <div className="flex items-center justify-between text-sm text-muted-foreground px-1">
              <div className="flex items-center gap-1.5">
                <Footprints className={`h-4 w-4 ${path.primaryColor}`} />
                <span className="font-medium">
                  {path.steps} {isFa ? "قدم" : "steps"}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className={`h-4 w-4 ${path.primaryColor}`} />
                <span className="font-medium">{isFa ? path.durationFa : path.duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Shine Effect on Hover */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 pointer-events-none">
          <motion.div
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          />
        </div>
      </div>
    </motion.div>
  );
}
