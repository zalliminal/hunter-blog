"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { TocItem } from "@/lib/toc";
import { ListTree } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

type Props = {
  items: TocItem[];
};

export function PostToc({ items }: Props) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dir, setDir] = useState<"ltr" | "rtl">("ltr");

  // Detect document direction
  useEffect(() => {
    const htmlDir = document.documentElement.dir;
    const containerDir = document.querySelector<HTMLElement>("[data-locale]")?.getAttribute("dir");
    setDir((containerDir || htmlDir || "ltr") as "ltr" | "rtl");
  }, []);

  const isRtl = dir === "rtl";

  // 1. Intersection Observer to track active heading
  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 100;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* --- Desktop Sidebar --- */}
      <aside
        dir={dir}
        className="sticky top-28 hidden h-[calc(100vh-8rem)] w-56 shrink-0 overflow-y-auto lg:block font-farsi"
      >
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
            {isRtl ? "فهرست مطالب" : "On this page"}
          </h4>

          <nav
            className={`relative border-border ${
              isRtl ? "border-r pr-4" : "border-l pl-4"
            }`}
          >
            {items.map((item) => {
              const isActive = activeId === item.id;
              const isH3 = item.level === 3;

              return (
                <div
                  key={item.id}
                  className={`relative transition-colors duration-300 ${
                    isH3 ? (isRtl ? "mr-4" : "ml-4") : ""
                  }`}
                >
                  {/* Active Indicator Line */}
                  {isActive && (
                    <motion.div
                      layoutId="active-toc"
                      className={`absolute top-1/2 h-3 w-0.5 -translate-y-1/2 rounded-full bg-primary ${
                        isRtl ? "-right-[17px]" : "-left-[17px]"
                      }`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}

                  <button
                    onClick={() => scrollToId(item.id)}
                    className={`block w-full py-1 text-[11px] leading-relaxed transition-colors hover:text-foreground ${
                      isRtl ? "text-right" : "text-left"
                    } ${
                      isActive
                        ? "font-medium text-primary"
                        : "text-muted-foreground/80 hover:text-foreground"
                    } ${isH3 ? "text-[10px] opacity-75" : ""}`}
                  >
                    <span className="inline-block max-w-full truncate">
                      {item.title}
                    </span>
                  </button>
                </div>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* --- Mobile TOC Drawer (shadcn) --- */}
      <Drawer open={mobileOpen} onOpenChange={setMobileOpen}>
        {/* Mobile Button - ALWAYS on the RIGHT */}
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-6 right-6 z-40 h-10 w-10 rounded-full border-border bg-background/80 backdrop-blur-md shadow-lg transition-transform active:scale-95 lg:hidden font-farsi"
            aria-label="Open table of contents"
          >
            <ListTree className="h-4 w-4" />
          </Button>
        </DrawerTrigger>

        <DrawerContent className="max-h-[50vh] lg:hidden font-farsi" dir={dir}>
          <DrawerHeader className="pb-2">
            <div className="flex items-center justify-between">
              <DrawerTitle className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/70">
                {isRtl ? "فهرست مطالب" : "On this page"}
              </DrawerTitle>
              <DrawerClose asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-[11px] font-farsi"
                >
                  {isRtl ? "بستن" : "Close"}
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="overflow-y-auto px-4 pb-4">
            <nav
              className={`relative border-border ${
                isRtl ? "border-r pr-4" : "border-l pl-4"
              }`}
            >
              {items.map((item) => {
                const isActive = activeId === item.id;
                const isH3 = item.level === 3;

                return (
                  <div
                    key={item.id}
                    className={`relative transition-colors duration-300 ${
                      isH3 ? (isRtl ? "mr-4" : "ml-4") : ""
                    }`}
                  >
                    {isActive && (
                      <div
                        className={`absolute top-1/2 h-3 w-0.5 -translate-y-1/2 rounded-full bg-primary ${
                          isRtl ? "-right-[17px]" : "-left-[17px]"
                        }`}
                      />
                    )}

                    <button
                      onClick={() => {
                        setMobileOpen(false);
                        setTimeout(() => scrollToId(item.id), 50);
                      }}
                      className={`block w-full py-2 text-[12px] leading-relaxed transition-colors hover:text-foreground ${
                        isRtl ? "text-right" : "text-left"
                      } ${
                        isActive
                          ? "font-medium text-primary"
                          : "text-muted-foreground/80 hover:text-foreground"
                      } ${isH3 ? "text-[11px] opacity-75" : ""}`}
                    >
                      <span className="inline-block max-w-full truncate">
                        {item.title}
                      </span>
                    </button>
                  </div>
                );
              })}
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}