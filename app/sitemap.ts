import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { LOCALES } from "@/lib/i18n";
import { getAllPosts, getTagSummaries } from "@/lib/blog";
import { getAllGlossarySlugs } from "@/lib/glossary";
import { CATEGORY_IDS } from "@/lib/categories_and_authors";
import { AUTHOR_IDS } from "@/lib/categories_and_authors";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    const basePath = `/${locale}`;
    const otherLocale = locale === "fa" ? "en" : "fa";

    const pairLanguages = (path: string) => ({
      en: `/en${path}`,
      fa: `/fa${path}`,
      "x-default": `/fa${path}`,
    });

    // Core index pages per locale
    entries.push(
      {
        url: `${siteUrl}${basePath}`,
        changeFrequency: "weekly",
        priority: 1,
        alternates: { languages: pairLanguages("") },
      },
      {
        url: `${siteUrl}${basePath}/blog`,
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: { languages: pairLanguages("/blog") },
      },
      {
        url: `${siteUrl}${basePath}/tags`,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: { languages: pairLanguages("/tags") },
      },
      {
        url: `${siteUrl}${basePath}/categories`,
        changeFrequency: "weekly",
        priority: 0.7,
        alternates: { languages: pairLanguages("/categories") },
      },
      {
        url: `${siteUrl}${basePath}/authors`,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: pairLanguages("/authors") },
      },
      {
        url: `${siteUrl}${basePath}/glossary`,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: pairLanguages("/glossary") },
      },
      {
        url: `${siteUrl}${basePath}/support`,
        changeFrequency: "monthly",
        priority: 0.4,
        alternates: { languages: pairLanguages("/support") },
      },
      {
        url: `${siteUrl}${basePath}/changelog`,
        changeFrequency: "monthly",
        priority: 0.4,
        alternates: { languages: pairLanguages("/changelog") },
      },
    );

    // Author pages
    for (const authorId of AUTHOR_IDS) {
      entries.push({
        url: `${siteUrl}${basePath}/authors/${authorId}`,
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: { languages: pairLanguages(`/authors/${authorId}`) },
      });
    }

    // Category hint urls (categories index + each category via blog filter)
    for (const categoryId of CATEGORY_IDS) {
      entries.push({
        url: `${siteUrl}${basePath}/blog?category=${categoryId}`,
        changeFrequency: "weekly",
        priority: 0.5,
      });
    }

    const posts = getAllPosts(locale);
    const tags = getTagSummaries(locale);
    const glossarySlugs = getAllGlossarySlugs(locale);

    // Blog posts — use updatedAt if present; pair hreflang if counterpart slug exists in other locale
    const otherSlugs = new Set(getAllPosts(otherLocale).map((p) => p.slug));
    for (const post of posts) {
      const hasPair = otherSlugs.has(post.slug);
      entries.push({
        url: `${siteUrl}${post.url}`,
        lastModified: new Date(post.updatedAt ?? post.date),
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: hasPair
          ? {
              languages: {
                fa: `/fa/blog/${post.slug}`,
                en: `/en/blog/${post.slug}`,
                "x-default": `/fa/blog/${post.slug}`,
              },
            }
          : undefined,
      });
    }

    // Tag detail pages
    for (const tag of tags) {
      entries.push({
        url: `${siteUrl}${basePath}/tags/${tag.slug}`,
        changeFrequency: "weekly",
        priority: 0.6,
        alternates: { languages: pairLanguages(`/tags/${tag.slug}`) },
      });
    }

    // Glossary term pages
    for (const slug of glossarySlugs) {
      entries.push({
        url: `${siteUrl}${basePath}/glossary/${slug}`,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: { languages: pairLanguages(`/glossary/${slug}`) },
      });
    }
  }

  return entries;
}
