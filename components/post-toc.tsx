"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TocItem } from "@/lib/toc";
import { ListTree } from "lucide-react";

type Props = {
  items: TocItem[];
};

export function PostToc({ items }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  const isRtl = dir === "rtl";

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    const container = document.querySelector<HTMLElement>("[data-locale]");
    const d = container?.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
    setDir(d);
  }, []);

  if (!items.length) return null;

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop TOC Sidebar */}
      <aside
        dir={dir}
        className={`sticky top-28 hidden w-56 self-start shrink-0 text-xs text-muted-foreground lg:block ${
          isRtl ? "text-right" : "text-left"
        }`}
      >
        <p className="mb-3 text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
          {isRtl ? "فهرست" : "Contents"}
        </p>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleClick(item.id)}
                className={`w-full text-left transition-all duration-200 ${
                  isRtl ? "text-right" : "text-left"
                } ${
                  activeId === item.id
                    ? "font-medium text-primary"
                    : "text-muted-foreground/70 hover:text-foreground"
                } ${
                  item.level === 3 ? (isRtl ? "pe-3" : "ps-3") : ""
                }`}
              >
                <span className="inline-block max-w-full truncate text-[11px] leading-relaxed">
                  {item.title}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Mobile TOC Button - Minimal & Stealth */}
      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className={`fixed bottom-6 z-40 flex h-9 w-9 items-center justify-center 
          rounded-md border border-muted-foreground/30 
          bg-background/50 backdrop-blur-sm 
          text-muted-foreground 
          transition-colors duration-300 
          hover:border-primary hover:text-primary hover:bg-primary/10 
          lg:hidden right-4`}
        aria-label="Open table of contents"
      >
        <ListTree className="h-4 w-4" strokeWidth={2.5} />
        
        {/* Subtle glow on hover */}
        <div className="absolute inset-0 -z-10 rounded-md bg-primary/20 blur-md opacity-0 transition-opacity duration-300 hover:opacity-50" />
      </button>

      {/* Mobile TOC Sheet */}
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className={`absolute bottom-0 left-0 right-0 rounded-t-2xl border-t border-border bg-card p-5 ${
                isRtl ? "rounded-tl-3xl" : "rounded-tr-3xl"
              }`}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`mb-4 flex items-center justify-between ${
                  isRtl ? "flex-row-reverse" : ""
                }`}
              >
                <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">
                  {isRtl ? "فهرست" : "Contents"}
                </span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-md border border-border px-3 py-1.5 text-[11px] font-mono text-muted-foreground/70 transition-colors hover:border-primary/50 hover:text-primary"
                >
                  {isRtl ? "بستن" : "Close"}
                </button>
              </div>
              
              {/* Divider */}
              <div className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
              
              <ul className="max-h-72 space-y-2.5 overflow-y-auto">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        setTimeout(() => handleClick(item.id), 80);
                      }}
                      className={`w-full text-left transition-all duration-200 ${
                        isRtl ? "text-right" : "text-left"
                      } ${
                        item.level === 3 ? (isRtl ? "pe-3" : "ps-3") : ""
                      } ${
                        activeId === item.id
                          ? "font-medium text-primary"
                          : "text-muted-foreground/70 hover:text-foreground"
                      }`}
                    >
                      <span className="inline-block max-w-full truncate text-[12px] leading-relaxed">
                        {item.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}