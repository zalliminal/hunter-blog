// app/[locale]/authors/zal/page.tsx
import type { Metadata } from "next";
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import ZalPageClient from "@/components/authors/ZalPageClient";
import { getLatestPostsByAuthor } from "@/lib/blog";
import { AUTHORS } from "@/lib/categories_and_authors";
import { getSiteUrl } from "@/lib/site";
import { StructuredData } from "@/components/structured-data";

type PageParams = { locale: Locale };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const author = AUTHORS.zal;
  return {
    title: `${author.name[locale]} — ${author.role[locale]}`,
    description: author.bio[locale],
    alternates: {
      canonical: `/${locale}/authors/zal`,
      languages: {
        fa: "/fa/authors/zal",
        en: "/en/authors/zal",
        "x-default": "/fa/authors/zal",
      },
    },
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
  const posts = getLatestPostsByAuthor(locale, "zal", 6);
  const siteUrl = getSiteUrl();
  const author = AUTHORS.zal;

  const sameAs = [
    author.links.twitter,
    author.links.github,
    author.links.telegram,
    author.links.hackerone,
    author.links.immunefi,
  ].filter((u): u is string => Boolean(u));

  const personJsonLd = {
    "@type": "Person",
    "@context": "https://schema.org",
    name: author.name[locale],
    url: `${siteUrl}/${locale}/authors/zal`,
    jobTitle: author.role[locale],
    description: author.bio[locale],
    inLanguage: locale === "fa" ? "fa-IR" : "en-US",
    sameAs,
  };

  return (
    <>
      <StructuredData data={personJsonLd} />
      <ZalPageClient locale={locale} isFa={isFa} posts={posts} />
    </>
  );
}
