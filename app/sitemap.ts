import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { LOCALES } from "@/lib/i18n";
import { getAllPosts } from "@/lib/blog";
import { AUTHOR_IDS } from "@/lib/categories_and_authors";

/**
 * Whitelist sitemap — only pages meant to rank in Google:
 *   - Homepage /{locale}
 *   - Blog posts /{locale}/blog/{slug}
 *   - Author profiles /{locale}/authors/{id}
 *
 * Tag pages, glossary, categories, support, changelog, blog index are all
 * `robots.noindex` by design — omitted from sitemap on purpose.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const entries: MetadataRoute.Sitemap = [];
  const now = new Date();

  for (const locale of LOCALES) {
    const basePath = `/${locale}`;
    const otherLocale = locale === "fa" ? "en" : "fa";

    const pairLanguages = (path: string) => ({
      en: `/en${path}`,
      fa: `/fa${path}`,
      "x-default": `/fa${path}`,
    });

    // Homepage (indexable)
    entries.push({
      url: `${siteUrl}${basePath}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: pairLanguages("") },
    });

    // Author profiles (indexable)
    for (const authorId of AUTHOR_IDS) {
      entries.push({
        url: `${siteUrl}${basePath}/authors/${authorId}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.5,
        alternates: { languages: pairLanguages(`/authors/${authorId}`) },
      });
    }

    // Blog posts (indexable) — pair hreflang when sibling slug exists in other locale
    const posts = getAllPosts(locale);
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
  }

  return entries;
}
