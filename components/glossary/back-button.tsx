"use client";

import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export function BackButton({ locale }: Props) {
  const router = useRouter();
  const isRTL = locale === "fa";

  const handleBack = () => {
    router.back();
  };

  const BackIcon = isRTL ? ChevronRight : ChevronLeft;

  return (
    <button
      onClick={handleBack}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium border border-accent-foreground",
        "transition-colors",
        "hover:text-primary hover:bg-muted"
      )}
    >
      <BackIcon className="h-3.5 w-3.5" />
      <span>{isRTL ? "بازگشت به صفحه قبل" : "Back to the last page"}</span>
    </button>
  );
}