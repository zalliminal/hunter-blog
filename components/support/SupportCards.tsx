// components/support/SupportCards.tsx
"use client";

import { motion } from "framer-motion";
import { Server, Users, Heart } from "lucide-react";
import WhyNeedSupportCard from "./cards/WhyNeedSupportCard";
import NonFinancialSupportCard from "./cards/NonFinancialSupportCard";
import FinancialSupportCard from "./cards/FinancialSupportCard";

type Props = {
  isFa: boolean;
  locale: string;
};

export default function SupportCards({ isFa, locale }: Props) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 md:grid-cols-3"
    >
      <motion.div variants={cardVariants}>
        <WhyNeedSupportCard isFa={isFa} />
      </motion.div>

      <motion.div variants={cardVariants}>
        <NonFinancialSupportCard isFa={isFa} locale={locale} />
      </motion.div>

      <motion.div variants={cardVariants}>
        <FinancialSupportCard isFa={isFa} />
      </motion.div>
    </motion.div>
  );
}
