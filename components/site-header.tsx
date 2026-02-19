"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, Github, X, Tag, LayoutGrid, Home, BookOpen } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Locale, NavDictionary } from "@/lib/i18n";
import { LOCALES } from "@/lib/i18n";
import { ThemeToggle } from "./theme-toggle";
import { SiteSearchDialog } from "./site-search-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { getDirection } from "@/lib/i18n";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

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
            KavLabs
          </motion.span>
        </Link>

        <PrimaryNav
          locale={locale}
          dict={dict}
          onOpenSearch={() => setSearchOpen(true)}
        />

        {/* mobile controls  */}
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

      <MobileMenu locale={locale} dict={dict} open={menuOpen} setOpen={setMenuOpen} />

      <SiteSearchDialog locale={locale} open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}

// ─── PrimaryNav — only change: Tags + Search button → NavigationMenu dropdown ─
function PrimaryNav({
  locale,
  dict,
  onOpenSearch,
}: {
  locale: Locale;
  dict: NavDictionary;
  onOpenSearch: () => void;
}) {
  const pathname = usePathname();

  // unchanged active-link helper
  const linkClass = (href: string) => {
    const isHomeActive = href === `/${locale}/` && pathname === href;
    const isActive =
      isHomeActive || (href !== `/${locale}/` && pathname?.startsWith(href));
    return `relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-foreground after:transition-all after:duration-200 ${
      isActive
        ? "text-foreground after:w-full"
        : "text-muted-foreground after:w-0 hover:text-foreground hover:after:w-full"
    }`;
  };

  return (
    <nav className="hidden items-center justify-between gap-4 text-sm md:flex">
      <div className="flex items-center gap-4">
        {/* Home */}
        <Link href={`/${locale}/`} className={linkClass(`/${locale}/`)}>
          {dict.navHome}
        </Link>

        {/* Blog */}
        <Link href={`/${locale}/blog`} className={linkClass(`/${locale}/blog`)}>
          {dict.navBlog}
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "text-sm bg-transparent hover:bg-transparent focus:bg-transparent",
                  "data-[state=open]:bg-transparent data-[active]:bg-transparent",
                  (pathname?.startsWith(`/${locale}/tags`) ||
                    pathname?.startsWith(`/${locale}/blog`) ||
                    pathname?.startsWith(`/${locale}/search`))
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {dict.navMore}
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                {/* wrapper enforces dir for RTL languages */}
                <div dir={getDirection(locale)} className="w-54 ">
                  {/* top: compact list (tags + categories + search) */}
                  <ul className="grid gap-4">
                    <li>
                      {/* move to search page */}
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/${locale}/search`}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                            "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                          )}
                        >
                          <Search className="h-4 w-4 shrink-0" />
                          <span>{dict.navAdvancedSearch}</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>

                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/${locale}/categories`}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                            "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                          )}
                        >
                          <LayoutGrid className="h-4 w-4 shrink-0" />
                          <span>{dict.navCategories}</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>

                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/${locale}/tags`}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                            "text-muted-foreground hover:bg-primary/10 hover:text-primary",
                          )}
                        >
                          <Tag className="h-4 w-4 shrink-0" />
                          <span>{dict.navTags}</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>

                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-3">
        {/* Search icon */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="rounded-full border border-border p-1.5 text-muted-foreground hover:bg-muted hover:border-primary"
          aria-label={dict.navSearch}
        >
          <Search className="h-4 w-4" />
        </button>

        {/* ThemeToggle */}
        <ThemeToggle />

        {/* LanguageSwitcher */}
        <LanguageSwitcher locale={locale} />
      </div>
    </nav>
  );
}

// ─── LanguageSwitcher — unchanged ─────────────────────────────────────────────
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

// ─── MobileMenu — original + two new items (Categories, Advanced Search) ─────
function MobileMenu({
  locale,
  dict,
  open,
  setOpen,
}: {
  locale: Locale;
  dict: NavDictionary;
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === containerRef.current) setOpen(false);
  }

  const itemClass =
    "rounded-sm bg-white/20 dark:bg-white/10 px-4 py-2 text-foreground backdrop-blur-md hover:bg-white/30 transition";

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
          {/* Glass Panel */}
          <motion.div
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="relative z-10 mx-4 mt-16 w-full max-w-md rounded-lg border border-border bg-background/95 p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-[0.2em]">
                KavLabs
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
              {/* original links — now with icons */}
              <Link href={`/${locale}/`} onClick={() => setOpen(false)} className={itemClass}>
                <span className="flex items-center gap-2">
                  <Home className="h-4 w-4 shrink-0" />
                  {dict.navHome}
                </span>
              </Link>
              <Link href={`/${locale}/blog`} onClick={() => setOpen(false)} className={itemClass}>
                <span className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 shrink-0" />
                  {dict.navBlog}
                </span>
              </Link>
              <Link href={`/${locale}/tags`} onClick={() => setOpen(false)} className={itemClass}>
                <span className="flex items-center gap-2">
                  <Tag className="h-4 w-4 shrink-0" />
                  {dict.navTags}
                </span>
              </Link>
              <Link href={`/${locale}/categories`} onClick={() => setOpen(false)} className={itemClass}>
                <span className="flex items-center gap-2">
                  <LayoutGrid className="h-4 w-4 shrink-0" />
                  {dict.navCategories}
                </span>
              </Link>
              <Link href={`/${locale}/search`} onClick={() => setOpen(false)} className={itemClass}>
                <span className="flex items-center gap-2">
                  <Search className="h-4 w-4 shrink-0" />
                  {dict.navAdvancedSearch}
                </span>
              </Link>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}