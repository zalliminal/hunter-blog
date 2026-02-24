"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BackToTop } from "@/components/back-to-top";
import { NavigationProgress } from "@/components/NavigationProgress";
import { LocaleTransition } from "@/components/locale-transition";
import { DEFAULT_LOCALE, isLocale, getDirection, getDictionary, type Locale, type NavDictionary } from "@/lib/i18n";
import NotFoundClient from "@/components/not-found-client";

export default function NotFoundPage() {
  const pathname = usePathname();
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const [dict, setDict] = useState<NavDictionary | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Extract locale from URL path (e.g., /fa/blog -> fa)
    const segments = pathname?.split("/").filter(Boolean);
    const firstSegment = segments?.[0];
    
    if (firstSegment && isLocale(firstSegment)) {
      setLocale(firstSegment);
    }
    setMounted(true);
  }, [pathname]);

  useEffect(() => {
    // Fetch dictionary for the detected locale
    if (mounted) {
      getDictionary(locale).then(setDict);
    }
  }, [locale, mounted]);

  if (!mounted || !dict) {
    return null; // Prevent hydration mismatch
  }

  const dir = getDirection(locale);

  return (
    <div
      dir={dir}
      data-locale={locale}
      className="flex min-h-screen flex-col bg-background text-foreground"
    >
      <NavigationProgress />
      <LocaleTransition locale={locale}>
        <main className="mx-auto max-w-5xl px-4 pb-16 pt-8 md:px-6">
          <NotFoundClient locale={locale} />
          <BackToTop />
        </main>
      </LocaleTransition>
    </div>
  );
}