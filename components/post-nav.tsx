import Link from "next/link";
import type { Post } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props = {
  locale: Locale;
  previous?: Post | null;
  next?: Post | null;
};

export function PostNav({ locale, previous, next }: Props) {
  if (!previous && !next) return null;

  const isRtl = locale === "fa";

  const PrevIcon = isRtl ? ArrowRight : ArrowLeft;
  const NextIcon = isRtl ? ArrowLeft : ArrowRight;

  // Add this
  const labels = {
    prev: isRtl ? "قبلی" : "Previous",
    next: isRtl ? "بعدی" : "Next",
  };

  return (
    <div className="mt-10 flex flex-col gap-3 border-t border-border pt-4 text-xs sm:flex-row sm:justify-between">
      {previous ? (
        <Link
          href={`/${locale}/blog/${previous.slug}`}
          className="group inline-flex max-w-xs items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <PrevIcon className="h-3 w-3" />
          <div className="flex flex-col">
            {/* Changed */}
            <span className="text-[11px] uppercase tracking-[0.16em]">
              {labels.prev}
            </span>
            <span className="line-clamp-2 text-xs">{previous.title}</span>
          </div>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`/${locale}/blog/${next.slug}`}
          className="group inline-flex max-w-xs items-center gap-2 text-muted-foreground hover:text-foreground sm:justify-end"
        >
          <div className="flex flex-col text-right">
            {/* Changed */}
            <span className="text-[11px] uppercase tracking-[0.16em]">
              {labels.next}
            </span>
            <span className="line-clamp-2 text-xs">{next.title}</span>
          </div>
          <NextIcon className="h-3 w-3" />
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
