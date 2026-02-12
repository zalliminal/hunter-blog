import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { LOCALES } from "@/lib/i18n";
import { getAllPosts, getTagSummaries } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    const basePath = `/${locale}`;

    // Core pages per locale
    entries.push(
      {
        url: `${siteUrl}${basePath}`,
        changeFrequency: "weekly",
        priority: 1,
      },
      {
        url: `${siteUrl}${basePath}/blog`,
        changeFrequency: "weekly",
        priority: 0.9,
      },
      {
        url: `${siteUrl}${basePath}/tags`,
        changeFrequency: "weekly",
        priority: 0.7,
      },
    );

    const posts = getAllPosts(locale);
    const tags = getTagSummaries(locale);

    // Blog posts
    for (const post of posts) {
      entries.push({
        url: `${siteUrl}${post.url}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    // Tag detail pages
    for (const tag of tags) {
      entries.push({
        url: `${siteUrl}${basePath}/tags/${tag.slug}`,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  return entries;
}

