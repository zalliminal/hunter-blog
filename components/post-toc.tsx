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
  
    // Use a smaller rootMargin so headings are marked active
    // when they are near the top of the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting heading that is actually visible
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
  
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px", // Tune these values to your liking
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
      <aside
        dir={dir}
        className={`sticky top-28 hidden w-56 self-start shrink-0 text-xs text-muted-foreground lg:block ${
          isRtl ? "text-right" : "text-left"
        }`}
      >
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em]">
          {isRtl ? "در این صفحه" : "On this page"}
        </p>
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => handleClick(item.id)}
                className={`w-full ${
                  isRtl ? "text-right" : "text-left"
                } transition ${
                  activeId === item.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                } ${
                  item.level === 3 ? (isRtl ? "pe-4" : "ps-4") : ""
                }`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        className={`fixed bottom-5 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground shadow-md backdrop-blur lg:hidden ${
          isRtl ? "left-4" : "right-4"
        }`}
        aria-label="Open table of contents"
      >
        <ListTree className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute bottom-0 left-0 right-0 rounded-t-3xl border-t border-border bg-card p-4"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
            >
              <div
                className={`mb-3 flex items-center justify-between text-xs font-medium ${
                  isRtl ? "flex-row-reverse" : ""
                }`}
              >
                <span>{isRtl ? "در این صفحه" : "On this page"}</span>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full border border-border px-3 py-1 text-[11px] text-muted-foreground"
                >
                  Close
                </button>
              </div>
              <ul className="max-h-64 space-y-1.5 overflow-y-auto text-xs">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false);
                        setTimeout(() => handleClick(item.id), 80);
                      }}
                      className={`w-full ${
                        isRtl ? "text-right" : "text-left"
                      } ${
                        item.level === 3 ? (isRtl ? "pe-4" : "ps-4") : ""
                      } ${
                        activeId === item.id
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {item.title}
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

