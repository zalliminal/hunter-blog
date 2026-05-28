// components/support/cards/NonFinancialSupportCard.tsx
"use client";

import { motion } from "framer-motion";
import { Share2, MessageSquare, Bell, Users, Check } from "lucide-react";
import { useState } from "react";

type Props = {
  isFa: boolean;
  locale: string;
};

export default function NonFinancialSupportCard({ isFa, locale }: Props) {
  const [copied, setCopied] = useState(false);

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

  const actions = [
    {
      icon: Share2,
      title: isFa ? "اشتراک‌گذاری" : "Share",
      desc: isFa ? "با دوستانتان به اشتراک بگذارید" : "Share with friends",
      action: handleShare,
      color: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-blue-500",
    },
    {
      icon: MessageSquare,
      title: isFa ? "بازخورد" : "Feedback",
      desc: isFa ? "نظرات خود را ارسال کنید" : "Send your feedback",
      action: () => window.open(`/${locale}/contact`, "_blank"),
      color: "from-green-500/10 to-emerald-500/10",
      iconColor: "text-green-500",
    },
    {
      icon: Bell,
      title: isFa ? "عضویت" : "Join",
      desc: isFa ? "در کانال‌ها عضو شوید" : "Join our channels",
      action: () => window.open("https://t.me/kavlabs_official", "_blank"),
      color: "from-purple-500/10 to-pink-500/10",
      iconColor: "text-purple-500",
    },
    {
      icon: Users,
      title: isFa ? "معرفی" : "Refer",
      desc: isFa ? "به دوستان تان معرفی کنید" : "Refer to friends",
      action: handleShare,
      color: "from-orange-500/10 to-yellow-500/10",
      iconColor: "text-orange-500",
    },
  ];

  // Floating icons animation
  const floatingIcons = [
    { Icon: Share2, delay: 0, x: "10%", y: "15%" },
    { Icon: MessageSquare, delay: 0.5, x: "80%", y: "20%" },
    { Icon: Bell, delay: 1, x: "15%", y: "75%" },
    { Icon: Users, delay: 1.5, x: "85%", y: "80%" },
  ];

  return (
    <div className="group relative h-full overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-green-500/5 via-background/80 to-cyan-500/5 p-6 shadow-md hover:shadow-xl transition-all duration-500">
      {/* Floating background icons */}
      {floatingIcons.map(({ Icon, delay, x, y }, idx) => (
        <motion.div
          key={idx}
          className="absolute opacity-5"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        >
          <Icon className="h-8 w-8" />
        </motion.div>
      ))}

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10 space-y-4">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-green-500/10 to-cyan-500/10 p-3"
        >
          <Users className="h-6 w-6 text-green-500" />
        </motion.div>

        {/* Title */}
        <h3 className="text-lg font-semibold">
          {isFa ? "حمایت غیرمالی" : "Non-Financial Support"}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isFa
            ? "هر کمکی ارزشمند است. می‌توانید به روش‌های زیر ما را حمایت کنید:"
            : "Every help matters. You can support us in these ways:"}
        </p>

        {/* Action buttons grid */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {actions.map((item, idx) => (
            <motion.button
              key={idx}
              onClick={item.action}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 + 0.2 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`relative overflow-hidden rounded-lg bg-gradient-to-br ${item.color} p-3 text-left transition-all hover:shadow-md`}
            >
              <div className="relative z-10 space-y-1.5">
                <item.icon className={`h-4 w-4 ${item.iconColor}`} />
                <p className="text-xs font-medium">{item.title}</p>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  {item.desc}
                </p>
              </div>

              {/* Ripple effect on hover */}
              <motion.div
                className="absolute inset-0 bg-white/10"
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 2, opacity: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Copy feedback */}
        {copied && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-xs text-primary"
          >
            <Check className="h-3 w-3" />
            {isFa ? "کپی شد!" : "Copied!"}
          </motion.div>
        )}
      </div>
    </div>
  );
}
