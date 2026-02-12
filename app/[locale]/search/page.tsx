import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import { searchPosts } from "@/lib/search";
import { BlogCard } from "@/components/blog-card";

type PageParams = {
  locale: Locale;
};

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<PageParams>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  const results = searchPosts(locale, query);

  return (
    <div className="space-y-6 min-h-screen">
      <header className="space-y-2">
        <h1 className="text-xl font-semibold tracking-tight">
          {locale === "fa" ? "جستجو در بلاگ" : "Search the blog"}
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground">
          {locale === "fa"
            ? "برای شروع، چند حرف از چیزی که دنبالش هستی را بنویس."
            : "Type a few characters from what you’re hunting for."}
        </p>
      </header>

      <form className="flex gap-2" action={`/${locale}/search`}>
        <input
          name="q"
          defaultValue={query}
          placeholder={locale === "fa" ? "مثلاً: xss, recon, jwt" : "e.g. xss, recon, jwt"}
          className="h-10 flex-1 rounded-full border border-border bg-background px-4 text-sm outline-none focus:border-primary"
          dir="ltr"
        />
        <button
          type="submit"
          className="h-10 rounded-full bg-primary px-4 text-xs font-medium text-primary-foreground hover:opacity-90"
        >
          {locale === "fa" ? "جستجو" : "Search"}
        </button>
      </form>

      {query && query.length < 2 ? (
        <p className="text-sm text-muted-foreground">
          {locale === "fa"
            ? "برای نتایج بهتر حداقل دو کاراکتر بنویس."
            : "Use at least two characters to see results."}
        </p>
      ) : null}

      {query && results.length === 0 && query.length >= 2 ? (
        <p className="text-sm text-muted-foreground">
          {locale === "fa"
            ? "چیزی پیدا نشد. شاید با واژهٔ دیگری امتحان کنی."
            : "No results. Try a nearby term or different keyword."}
        </p>
      ) : null}

      {results.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

