// app/[locale]/authors/parhamf/page.tsx
import type { Metadata } from "next";
import { isLocale, DEFAULT_LOCALE } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";
import ParhamPageClient from "@/components/authors/ParhamPageClient";
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
  const author = AUTHORS.parhamf;
  return {
    title: `${author.name[locale]} — ${author.role[locale]}`,
    description: author.bio[locale],
    alternates: {
      canonical: `/${locale}/authors/parhamf`,
      languages: {
        fa: "/fa/authors/parhamf",
        en: "/en/authors/parhamf",
        "x-default": "/fa/authors/parhamf",
      },
    },
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
  const posts = getLatestPostsByAuthor(locale, "parhamf", 6);
  const siteUrl = getSiteUrl();
  const author = AUTHORS.parhamf;

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
    url: `${siteUrl}/${locale}/authors/parhamf`,
    jobTitle: author.role[locale],
    description: author.bio[locale],
    inLanguage: locale === "fa" ? "fa-IR" : "en-US",
    sameAs,
  };

  return (
    <>
      <StructuredData data={personJsonLd} />
      <ParhamPageClient locale={locale} isFa={isFa} posts={posts} />
    </>
  );
}
