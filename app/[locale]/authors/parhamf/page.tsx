// app/[locale]/authors/parham/page.tsx
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import ParhamPageClient from "@/components/authors/ParhamPageClient";
import { getLatestPostsByAuthor } from "@/lib/blog";
import { AUTHORS } from "@/lib/categories_and_authors";

type PageParams = { locale: Locale };

export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const author = AUTHORS.parhamf;
  
  return {
    title: `${author.name[locale]} — ${author.role[locale]}`,
    description: author.bio[locale],
  };
}

export default async function ParhamPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const isFa = locale === "fa";
  
  // Fetch real posts by Parham
  const posts = getLatestPostsByAuthor(locale, "parhamf", 6);

  return (
    <ParhamPageClient 
      locale={locale} 
      isFa={isFa} 
      posts={posts} 
    />
  );
}