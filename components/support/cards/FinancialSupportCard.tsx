// components/support/cards/FinancialSupportCard.tsx
"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Shield } from "lucide-react";
import { useState } from "react";

type Props = {
  isFa: boolean;
};

export default function FinancialSupportCard({ isFa }: Props) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative h-full overflow-hidden rounded-xl border border-border/60 bg-gradient-to-br from-yellow-500/5 via-background/80 to-orange-500/5 p-6 shadow-md hover:shadow-xl transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating background icons */}
      <motion.div
        className="absolute opacity-5"
        style={{ left: "15%", top: "20%" }}
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
        <Heart className="h-8 w-8" />
      </motion.div>

      <motion.div
        className="absolute opacity-5"
        style={{ left: "80%", top: "70%" }}
        animate={{
          y: [0, -10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 0.5,
          ease: "easeInOut",
        }}
      >
        <Sparkles className="h-8 w-8" />
      </motion.div>

      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative z-10 space-y-4">
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 12, scale: 1.1 }}
          className="inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-3"
        >
          <Heart className="h-6 w-6 text-yellow-500" />
        </motion.div>

        {/* Title */}
        <h3 className="text-lg font-semibold">
          {isFa ? "حمایت مالی" : "Financial Support"}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {isFa
            ? "از طریق دارمت می‌توانید ما را حمایت کنید. تمام مبالغ صرف بهبود و توسعه سرویس و بخشی صرف خیریه می‌شود."
            : "Support us through Daramet. All funds go directly to improving the service."}
        </p>

        {/* CTA Button */}
        <motion.a
          href="https://daramet.com/kavlabs"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="relative mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 text-sm font-medium text-white shadow-md hover:shadow-lg transition-all overflow-hidden"
        >
          <Heart className="h-4 w-4" />
          {isFa ? "حمایت از کاولبز" : "Support KavLabs"}

          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 0.6 }}
          />
        </motion.a>

        {/* Security badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-xs text-muted-foreground pt-1"
        >
          <Shield className="h-3 w-3" />
          {isFa ? "پرداخت امن از طریق دارمت" : "Secure payment via Daramet"}
        </motion.div>
      </div>
    </div>
  );
}
