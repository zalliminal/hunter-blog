// app/[locale]/authors/zal/page.tsx
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import ZalPageClient from "@/components/authors/ZalPageClient";
import { getLatestPostsByAuthor } from "@/lib/blog";
import { AUTHORS } from "@/lib/categories_and_authors";

type PageParams = { locale: Locale };

export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const author = AUTHORS.zal;
  
  return {
    title: `${author.name[locale]} — ${author.role[locale]}`,
    description: author.bio[locale],
  };
}

export default async function ZalPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const isFa = locale === "fa";
  
  // Fetch real posts by Zal
  const posts = getLatestPostsByAuthor(locale, "zal", 6);

  return (
    <ZalPageClient 
      locale={locale} 
      isFa={isFa} 
      posts={posts} 
    />
  );
}