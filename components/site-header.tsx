"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, Github, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Locale, NavDictionary } from "@/lib/i18n";
import { LOCALES } from "@/lib/i18n";
import { ThemeToggle } from "./theme-toggle";
import { SiteSearchDialog } from "./site-search-dialog";
import { motion, AnimatePresence } from "framer-motion";

type SiteHeaderProps = {
  locale: Locale;
  dict: NavDictionary;
};

export function SiteHeader({ locale, dict }: SiteHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/70 backdrop-blur-sm transition-colors">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
        <Link
          href={`/${locale}`}
          className="text-sm font-bold uppercase tracking-[0.2em] transition-transform duration-300 hover:-translate-y-0.5"
        >
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            Zalliminal
          </motion.span>
        </Link>

        <PrimaryNav
          locale={locale}
          dict={dict}
          onOpenSearch={() => setSearchOpen(true)}
        />

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="rounded-full border border-border p-1.5 text-muted-foreground hover:bg-muted hover:border-primary"
            aria-label={dict.navSearch}
          >
            <Search className="h-4 w-4" />
          </button>

          <ThemeToggle compact />
          <LanguageSwitcher locale={locale} compact />

          <motion.button
            type="button"
            onClick={() => setMenuOpen(true)}
            whileTap={{ scale: 0.9 }}
            className="rounded-full border border-border p-1.5 text-muted-foreground hover:bg-muted"
            aria-label="Open navigation"
          >
            <Menu className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      <MobileMenu
        locale={locale}
        dict={dict}
        open={menuOpen}
        setOpen={setMenuOpen}
      />

      <SiteSearchDialog
        locale={locale}
        open={searchOpen}
        onOpenChange={setSearchOpen}
      />
    </header>
  );
}

function PrimaryNav({ locale, dict, onOpenSearch }: { locale: Locale; dict: NavDictionary; onOpenSearch: () => void; }) {
  const pathname = usePathname();

  const linkClass = (href: string) => {
    // For home page, check exact match
    const isHomeActive = href === `/${locale}/` && pathname === href;
    // For other pages, check if pathname starts with href
    const isActive = isHomeActive || (href !== `/${locale}/` && pathname?.startsWith(href));
    
    return `relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-foreground after:transition-all after:duration-200 ${
      isActive
        ? "text-foreground after:w-full"
        : "text-muted-foreground after:w-0 hover:text-foreground hover:after:w-full"
    }`;
  };

  return (
    <nav className="hidden items-center gap-6 text-sm md:flex">
      <Link href={`/${locale}/`} className={linkClass(`/${locale}/`)}>
        {dict.navHome}
      </Link>
      <Link href={`/${locale}/blog`} className={linkClass(`/${locale}/blog`)}>
        {dict.navBlog}
      </Link>

      <Link href={`/${locale}/tags`} className={linkClass(`/${locale}/tags`)}>
        {dict.navTags}
      </Link>

      <button
        type="button"
        onClick={onOpenSearch}
        className="inline-flex items-center gap-2 rounded-full border border-border hover:border-accent px-3 py-1 text-xs text-muted-foreground hover:bg-muted transition-all duration-150"
      >
        <Search className="h-3.5 w-3.5" />
        <span>{dict.navSearch}</span>
      </button>

      <a
        href="https://github.com/zalliminal"
        target="_blank"
        rel="noreferrer"
        className="text-muted-foreground transition-colors hover:text-foreground"
        aria-label="GitHub"
      >
        <Github className="h-4 w-4" />
      </a>

      <ThemeToggle />
      <LanguageSwitcher locale={locale} />
    </nav>
  );
}

function LanguageSwitcher({ locale, compact }: { locale: Locale; compact?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const otherLocale = LOCALES.find((l) => l !== locale) ?? "en";

  function handleToggle() {
    if (!pathname) return;
    const segments = pathname.split("/");
    if (segments.length > 1 && LOCALES.includes(segments[1] as Locale)) {
      segments[1] = otherLocale;
    } else {
      segments.splice(1, 0, otherLocale);
    }
    router.push(segments.join("/") || "/");
  }

  const label = compact
    ? otherLocale.toUpperCase()
    : otherLocale === "fa"
    ? "فارسی"
    : "EN";

  return (
    <motion.button
      type="button"
      onClick={handleToggle}
      whileTap={{ scale: 0.9 }}
      className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground hover:bg-muted"
    >
      {label}
    </motion.button>
  );
}

function MobileMenu({ locale, dict, open, setOpen }: { locale: Locale; dict: NavDictionary; open: boolean; setOpen: (v: boolean) => void; }) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === containerRef.current) setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-50 flex items-start justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          {/* TRUE GLASS BACKDROP */}
          {/* <div className="absolute inset-0 bg-white/10 dark:bg-black/30 backdrop-blur-xl" /> */}

          {/* Glass Panel */}
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative z-10 mx-4 mt-16 w-full max-w-md rounded-2xl border border-border bg-background/95 p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                Zalliminal
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/20 p-1.5 text-muted-foreground hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-3 text-sm">
              <Link
                href={`/${locale}/`}
                onClick={() => setOpen(false)}
                className="rounded-lg bg-white/20 dark:bg-white/10 px-4 py-2 text-foreground backdrop-blur-md hover:bg-white/30 transition"
              >
                {dict.navHome}
              </Link>
              <Link
                href={`/${locale}/blog`}
                onClick={() => setOpen(false)}
                className="rounded-lg bg-white/20 dark:bg-white/10 px-4 py-2 text-foreground backdrop-blur-md hover:bg-white/30 transition"
              >
                {dict.navBlog}
              </Link>

              <Link
                href={`/${locale}/tags`}
                onClick={() => setOpen(false)}
                className="rounded-lg bg-white/20 dark:bg-white/10 px-4 py-2 text-foreground backdrop-blur-md hover:bg-white/30 transition"
              >
                {dict.navTags}
              </Link>

              <a
                href="https://github.com/zalliminal"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-muted-foreground backdrop-blur-md hover:bg-white/20 transition"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
