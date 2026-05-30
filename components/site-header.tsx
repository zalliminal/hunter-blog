"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Search, X, Tag, LayoutGrid, Home, BookOpen, BrainCircuit, Route, GraduationCap, HelpCircle, Coffee, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Locale, NavDictionary } from "@/lib/i18n";
import { LOCALES } from "@/lib/i18n";
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
      {/* Desktop: RTL → KavLabs سمت راست، نوبار سمت چپ */}
      <div
        dir="rtl"
        className="mx-auto hidden max-w-5xl items-center justify-between px-4 py-3 md:flex md:px-6"
      >
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
      </div>

      {/* Mobile: LTR → KavLabs سمت چپ، دکمه‌ها سمت راست */}
      <div
        dir="ltr"
        className="flex items-center justify-between px-4 py-3 md:hidden"
      >
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
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="rounded-full border border-border p-1.5 text-muted-foreground hover:bg-muted hover:border-primary"
            aria-label={dict.navSearch}
          >
            <Search className="h-4 w-4" />
          </button>
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
      <div className="flex items-center gap-6">
        <Link href={`/${locale}/`} className={linkClass(`/${locale}/`)}>
          {dict.navHome}
        </Link>
        <Link href={`/${locale}/blog`} className={linkClass(`/${locale}/blog`)}>
          {dict.navBlog}
        </Link>
        <Link href={`/${locale}/support`} className={linkClass(`/${locale}/support`)}>
          {dict.navSupport}
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "text-sm bg-transparent hover:bg-transparent focus:bg-transparent px-0",
                  "data-[state=open]:bg-transparent data-[active]:bg-transparent",
                  (pathname?.startsWith(`/${locale}/tags`) ||
                    pathname?.startsWith(`/${locale}/glossary`) ||
                    pathname?.startsWith(`/${locale}/categories`) ||
                    pathname?.startsWith(`/${locale}/search`))
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {dict.navMore}
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <div dir={getDirection(locale)} className="w-54 p-2">
                  <ul className="grid gap-1">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/${locale}/search`}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all text-muted-foreground hover:bg-primary/10 hover:text-primary"
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
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all text-muted-foreground hover:bg-primary/10 hover:text-primary"
                        >
                          <LayoutGrid className="h-4 w-4 shrink-0" />
                          <span>{dict.navCategories}</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/${locale}/glossary`}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all text-muted-foreground hover:bg-primary/10 hover:text-primary"
                        >
                          <BrainCircuit className="h-4 w-4 shrink-0" />
                          <span>{dict.navGlossary}</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/${locale}/tags`}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all text-muted-foreground hover:bg-primary/10 hover:text-primary"
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
        <button
          type="button"
          onClick={onOpenSearch}
          className="rounded-full border border-border p-1.5 text-muted-foreground hover:bg-muted hover:border-primary transition-colors"
          aria-label={dict.navSearch}
        >
          <Search className="h-4 w-4" />
        </button>
        <LanguageSwitcher locale={locale} />

        {locale === "fa" && (
          <Link href={`/${locale}/academy`}>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex items-center gap-2 overflow-hidden rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary/90 hover:shadow-primary/25"
            >
              <GraduationCap className="h-4 w-4 transition-transform group-hover:-rotate-12" />
              <span>ورود به آکادمی</span>
            </motion.button>
          </Link>
        )}
      </div>
    </nav>
  );
}

function LanguageSwitcher({
  locale,
  compact,
}: {
  locale: Locale;
  compact?: boolean;
}) {
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

  const label = otherLocale === "fa" ? "فارسی" : otherLocale.toUpperCase();

  return (
    <motion.button
      onClick={handleToggle}
      whileTap={{ scale: 0.95 }}
      className={`px-3 py-1.5 rounded-full border border-white/10 bg-background/5 backdrop-blur-md text-xs font-medium text-muted-foreground hover:bg-primary/10 transition ${
        otherLocale === "fa" ? "font-farsi" : ""
      }`}
    >
      {compact ? otherLocale.toUpperCase() : label}
    </motion.button>
  );
}

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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-background/20 backdrop-blur-sm"
          />

          <motion.div
            dir="ltr"
            initial={{ y: -20, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -10, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed left-4 right-4 top-16 z-50 mx-auto max-w-md rounded-2xl border border-border bg-background/95 p-6 shadow-2xl backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold uppercase tracking-[0.2em]">
                KavLabs
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-border p-1.5 text-muted-foreground hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-2 text-sm">
              <MobileMenuItem href={`/${locale}/`} icon={<Home className="h-4 w-4" />} label={dict.navHome} onClick={() => setOpen(false)} />
              <MobileMenuItem href={`/${locale}/blog`} icon={<BookOpen className="h-4 w-4" />} label={dict.navBlog} onClick={() => setOpen(false)} />
              <MobileMenuItem href={`/${locale}/support`} icon={<Heart className="h-4 w-4" />} label={dict.navSupport} onClick={() => setOpen(false)} />
              <MobileMenuItem href={`/${locale}/categories`} icon={<LayoutGrid className="h-4 w-4" />} label={dict.navCategories} onClick={() => setOpen(false)} />
              <MobileMenuItem href={`/${locale}/glossary`} icon={<BrainCircuit className="h-4 w-4" />} label={dict.navGlossary} onClick={() => setOpen(false)} />
              <MobileMenuItem href={`/${locale}/tags`} icon={<Tag className="h-4 w-4" />} label={dict.navTags} onClick={() => setOpen(false)} />
              <MobileMenuItem href={`/${locale}/search`} icon={<Search className="h-4 w-4" />} label={dict.navAdvancedSearch} onClick={() => setOpen(false)} />

              {locale === "fa" && (
                <div className="mt-4 pt-4 border-t border-border">
                  <Link
                    href={`/${locale}/academy`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-4 font-bold text-primary-foreground shadow-lg shadow-primary/20 active:scale-95 transition-transform"
                  >
                    <GraduationCap className="h-5 w-5" />
                    ورود به آکادمی
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function MobileMenuItem({
  href,
  icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3 text-foreground transition-all hover:bg-primary/10 hover:text-primary active:scale-[0.98]"
    >
      {icon}
      {label}
    </Link>
  );
}




export function MobileBottomNav({
  locale,
  dict,
}: {
  locale: Locale;
  dict: NavDictionary;
}) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 0) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current + 10) {
        setVisible(false);
      } else if (currentScrollY < lastScrollY.current - 10) {
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    { href: `/${locale}/`, icon: Home, label: dict.navHome },
    { href: `/${locale}/blog`, icon: BookOpen, label: dict.navBlog },
    { href: `/${locale}/support`, icon: Heart, label: dict.navSupport },
    ...(locale === "fa"
      ? [
          {
            href: `/${locale}/academy`,
            icon: GraduationCap,
            label: "آکادمی",
          },
        ]
      : []),
  ];

  const isHomeActive = () => {
    const homeBase = `/${locale}`;
    return pathname === homeBase || pathname === `${homeBase}/`;
  };

  return (
    <motion.nav
      initial={{ y: 0, opacity: 1 }}
      animate={{
        y: visible ? 0 : 80,
        opacity: visible ? 1 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 25,
      }}
      className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 md:hidden"
    >
      <div
        className="grid rounded-2xl border border-white/10 bg-zinc-900/90 p-1.5 shadow-2xl backdrop-blur-lg"
        style={{
          gridTemplateColumns: `repeat(${links.length}, minmax(60px, 1fr))`,
        }}
      >
        {links.map((link) => {
          const isActive =
            link.href === `/${locale}/`
              ? isHomeActive()
              : pathname?.startsWith(link.href);
    
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex min-w-[60px] flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1.5 text-xs font-medium transition-colors",
                isActive
                  ? "text-primary-foreground"
                  : "text-zinc-400 hover:text-zinc-200"
              )}
            >
              <link.icon className="h-4.5 w-4.5" />
    
              <span className="text-[10px] leading-none">
                {link.label}
              </span>
    
              {isActive && (
                <motion.div
                  layoutId="activeBox"
                  className="absolute inset-0 -z-10 rounded-xl bg-primary"
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 25,
                  }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}