// lib/blog.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { Locale } from "./i18n";
import { estimateReadingTime } from "./reading-time";
import { type CategoryId, type AuthorId, CATEGORY_IDS, AUTHOR_IDS, getCategory, getAuthor } from "./categories_and_authors";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Dynamically create enums from categories_and_authors.ts
const PostFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  slug: z.string(),
  category: z.enum(CATEGORY_IDS),
  author: z.enum(AUTHOR_IDS),
  thumbnail: z.string().optional(),
  tags: z.array(z.string()).default([]),
  lang: z.string(),
  published: z.boolean().default(true),
  // Optional manual override — if omitted, we compute it from content
  readingTime: z.number().optional(),
});

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;
export type Post = PostFrontmatter & {
  locale: Locale;
  content: string;
  url: string;
  // readingTime is always present after getPostBySlug (computed if not in frontmatter)
  readingTime: number;
};

function getLocaleDir(locale: Locale): string {
  return path.join(CONTENT_DIR, locale, "blog");
}

export function getAllPostSlugs(locale: Locale): string[] {
  const dir = getLocaleDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPostBySlug(locale: Locale, slug: string): Post | null {
  const dir = getLocaleDir(locale);
  const fullPath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);

  const parsed = PostFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Invalid frontmatter in", fullPath, parsed.error);
    return null;
  }

  const frontmatter = parsed.data;

  // Auto-compute reading time when not manually set in frontmatter
  const readingTime =
    frontmatter.readingTime ?? estimateReadingTime(content, locale);

  return {
    ...frontmatter,
    readingTime,
    locale,
    content,
    url: `/${locale}/blog/${frontmatter.slug}`,
  };
}

export function getAllPosts(locale: Locale): Post[] {
  const slugs = getAllPostSlugs(locale);
  const posts = slugs
    .map((slug) => getPostBySlug(locale, slug))
    .filter((p): p is Post => !!p && p.published);
  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getLatestPosts(locale: Locale, limit = 2): Post[] {
  return getAllPosts(locale).slice(0, limit);
}

export function getAllTags(locale: Locale): string[] {
  const posts = getAllPosts(locale);
  const tags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export function getPostsByTag(locale: Locale, tag: string): Post[] {
  const posts = getAllPosts(locale);
  return posts.filter((post) =>
    post.tags.some((t) => slugifyTag(t) === slugifyTag(tag)),
  );
}

export function slugifyTag(tag: string | null | undefined): string {
  if (!tag) return "";
  return tag
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
}

export type TagSummary = {
  slug: string;
  label: string;
  count: number;
};

export function getTagSummaries(locale: Locale): TagSummary[] {
  const posts = getAllPosts(locale);
  const map = new Map<string, TagSummary>();
  for (const post of posts) {
    for (const rawTag of post.tags) {
      const slug = slugifyTag(rawTag);
      const existing = map.get(slug);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(slug, { slug, label: rawTag, count: 1 });
      }
    }
  }
  return Array.from(map.values()).sort((a, b) =>
    a.label.localeCompare(b.label),
  );
}

export function getTagLabelBySlug(
  locale: Locale,
  slug: string,
): string | null {
  const tags = getTagSummaries(locale);
  const found = tags.find((t) => t.slug === slug);
  return found ? found.label : null;
}

export function getRelatedPosts(post: Post, locale: Locale, limit = 3): Post[] {
  const allPosts = getAllPosts(locale);
  // Filter: published, not current, at least one common tag
  const related = allPosts.filter((p) => {
    if (p.slug === post.slug || !p.published) return false;
    return p.tags.some((tag) => post.tags.includes(tag));
  });
  // Sort by date (newest first) and limit
  return related
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getPostsByCategory(locale: Locale, categoryId: CategoryId): Post[] {
  const posts = getAllPosts(locale);
  return posts.filter((post) => post.category === categoryId);
}

/**
 * Get localized category label/info for a post
 * @example getCategoryLabel(post.category, 'fa') // "تکنیک‌های حمله"
 */
export function getPostCategoryLabel(categoryId: CategoryId, locale: Locale): string {
  return getCategory(categoryId).label[locale];
}

/**
 * Get author info for a post
 * @example const author = getPostAuthor(post.author); author.name["en"] // "Zal"
 */
export function getPostAuthor(authorId: AuthorId) {
  return getAuthor(authorId);
}

/**
 * Get localized author name
 * @example getPostAuthorName(post.author, 'fa') // "زال"
 */
export function getPostAuthorName(authorId: AuthorId, locale: Locale): string {
  return getAuthor(authorId).name[locale];
}

/**
 * Get localized author role
 * @example getPostAuthorRole(post.author, 'fa') // "محقق امنیت بلاکچین · باگ باونتی هانتر"
 */
export function getPostAuthorRole(authorId: AuthorId, locale: Locale): string {
  return getAuthor(authorId).role[locale];
}