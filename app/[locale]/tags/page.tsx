import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import { getTagSummaries } from "@/lib/blog";

type PageParams = {
  locale: Locale;
};

export default async function TagsIndexPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const tags = getTagSummaries(locale);

  const isFa = locale === "fa";

  return (
    <div className="relative min-h-screen">
      {/* ── Background grid + glow (uses accent color) ──────────── */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundColor: "hsl(var(--background))",
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: "6rem 4rem",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-full w-full"
        style={{
          background: `radial-gradient(circle 500px at 50% 200px, hsl(var(--primary) / 0.15), transparent)`,
        }}
      />

      {/* ── Content ───────────────────────────────────────────── */}
      <div className="relative z-0 space-y-6">
        <header className="space-y-2">
          <h1 className="text-xl font-semibold tracking-tight">
            {isFa ? "تگ‌ها" : "Tags"}
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            {isFa
              ? "همهٔ موضوعاتی که تا الان درباره‌شان نوشته‌ایم."
              : "Topics and themes that the blog keeps circling back to."}
          </p>
        </header>

        {tags.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {isFa
              ? "فعلاً تگی وجود ندارد."
              : "No tags yet. Posts will grow into clusters over time."}
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {tags.map((tag) => (
              <Link
                key={tag.slug}
                href={`/${locale}/tags/${tag.slug}`}
                className="group flex flex-col gap-1 rounded-2xl border border-border bg-card/60 p-3 text-sm shadow-sm transition hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-md"
              >
                <span className="font-medium group-hover:text-primary">
                  {tag.label}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {tag.count} {tag.count === 1 ? (isFa ? "نوشته" : "post") : (isFa ? "نوشته" : "posts")}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}