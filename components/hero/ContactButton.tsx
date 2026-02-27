"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

type Props = { isFa: boolean };

function handleContactClick(e: React.MouseEvent<HTMLButtonElement>) {
  e.preventDefault();
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "center" });
  window.dispatchEvent(new CustomEvent("contactClicked"));
}

export default function ContactButton({ isFa }: Props) {
  return (
    <motion.button
      type="button"
      onClick={handleContactClick}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={[
        "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium",
        "border border-primary/60 text-primary",
        "ring-1 ring-primary/40 ring-offset-1 ring-offset-background",
        "hover:bg-primary/8 hover:ring-primary/70 hover:ring-2",
        "transition-all duration-200",
      ].join(" ")}
    >
      <Mail size={14} strokeWidth={2} aria-hidden />
      {isFa ? "ارتباط با ما" : "Contact us"}
    </motion.button>
  );
}