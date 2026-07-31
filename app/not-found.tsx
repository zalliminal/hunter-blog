// app/not-found.tsx
import type { Metadata } from "next";
import NotFoundClient from "@/components/not-found-client";
import { DEFAULT_LOCALE, getDirection } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "404",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootNotFound() {
  const dir = getDirection(DEFAULT_LOCALE);
  return (
    <div dir={dir} data-locale={DEFAULT_LOCALE} className="min-h-screen">
      <NotFoundClient locale={DEFAULT_LOCALE} />
    </div>
  );
}
