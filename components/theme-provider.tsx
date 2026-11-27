"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

type ThemeProviderProps = React.ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ThemeSync />
      {children}
    </NextThemesProvider>
  );
}

/**
 * React reuses the real `document.documentElement` when the `[locale]` layout
 * remounts on language switch, resetting its attributes to the server-rendered
 * ones (`lang`, `dir`) and wiping the theme class next-themes added on the
 * client. next-themes only applies the class on mount / stored-theme change,
 * so without this the site falls back to light mode until a full refresh.
 *
 * The wipe happens in the navigation commit, which can land after any effect
 * keyed on the pathname, so we observe the `class` attribute and re-apply the
 * resolved theme whenever it stops matching. When the user toggles the theme,
 * next-themes changes `resolvedTheme` first and this effect re-runs before the
 * mutation is observed, so the desired value is never stale.
 */
function ThemeSync() {
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    if (!resolvedTheme) return;
    const root = document.documentElement;
    const want = resolvedTheme === "dark";
    const apply = () => {
      if (root.classList.contains("dark") !== want) {
        root.classList.toggle("dark", want);
        root.style.colorScheme = resolvedTheme;
      }
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(root, { attributeFilter: ["class"], attributes: true });
    return () => observer.disconnect();
  }, [resolvedTheme]);

  return null;
}

