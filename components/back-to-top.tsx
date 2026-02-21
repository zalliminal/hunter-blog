"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 left-4 z-50
                    flex h-9 w-9 items-center justify-center 
                    rounded-md border border-muted-foreground/30 
                    bg-background/50 backdrop-blur-sm 
                    text-muted-foreground 
                    transition-colors duration-300 
                    hover:border-primary hover:text-primary hover:bg-primary/10 
                    focus:outline-none focus:ring-2 focus:ring-primary/50 sm:left-auto sm:right-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.4, y: 0 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, y: 10 }}
          aria-label="Back to top"
        >
          <ChevronUp className="h-5 w-5 font-mono" strokeWidth={2.5} />
          <div className="absolute inset-0 -z-10 rounded-md bg-primary/20 blur-md opacity-0 transition-opacity duration-300 hover:opacity-50" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}