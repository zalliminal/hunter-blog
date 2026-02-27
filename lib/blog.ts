// lib/blog.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { cache } from "react";
import { unstable_cache } from "next/cache";
import type { Locale } from "./i18n";
import { estimateReadingTime } from "./reading-time";
import {
  type CategoryId,
  type AuthorId,
  CATEGORY_IDS,
  AUTHOR_IDS,
  getCategory,
  getAuthor,
} from "./categories_and_authors";
import { PINNED_SLUGS } from "./pinned-posts";

const CONTENT_DIR = path.join(process.cwd(), "content");

// ─────────────────────────────────────────────
// Constants / Enums
// ─────────────────────────────────────────────

export const POST_TYPES = [
  "article",
  "pillar",
  "tutorial",
  "writeup",
  "news",
] as const;
export type PostType = (typeof POST_TYPES)[number];

export const DIFFICULTY_LEVELS = [
  "beginner",
  "intermediate",
  "advanced",
] as const;
export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number];

export const SEVERITY_LEVELS = [
  "informational",
  "low",
  "medium",
  "high",
  "critical",
] as const;
export type SeverityLevel = (typeof SEVERITY_LEVELS)[number];

// ─────────────────────────────────────────────
// Schema
// ─────────────────────────────────────────────

const PostFrontmatterSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.string(),
  slug: z.string(),
  category: z.enum(CATEGORY_IDS),
  author: z.enum(AUTHOR_IDS),
  lang: z.string(),
  thumbnail: z.string().optional(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(true),
  readingTime: z.number().optional(),
  updatedAt: z.string().optional(),
  canonicalUrl: z.string().optional(),
  type: z.enum(POST_TYPES).default("article"),
  difficulty: z.enum(DIFFICULTY_LEVELS).optional(),
  severity: z.enum(SEVERITY_LEVELS).optional(),
  pillar: z.string().optional(),
  series: z.string().optional(),
  seriesPart: z.number().optional(),
  seriesTotal: z.number().optional(),
  prerequisites: z.array(z.string()).default([]),
  skills: z.array(z.string()).default([]),
  tools: z.array(z.string()).default([]),
  challengeSlug: z.string().optional(),
  ctfEvent: z.string().optional(),
  cves: z.array(z.string()).default([]),
  program: z.string().optional(),
  hasQuiz: z.boolean().optional(),
  hasLab: z.boolean().optional(),
  labMinutes: z.number().optional(),
});

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type PostFrontmatter = z.infer<typeof PostFrontmatterSchema>;

export type Post = PostFrontmatter & {
  locale: Locale;
  content: string;
  url: string;
  readingTime: number;
};

// ─────────────────────────────────────────────
// Internal helpers
// ─────────────────────────────────────────────

function getLocaleDir(locale: Locale): string {
  return path.join(CONTENT_DIR, locale, "blog");
}

// ─────────────────────────────────────────────
// Core read functions
// Wrapped with React cache() so multiple calls within the same
// server request (e.g. layout + page) only hit the filesystem once.
// ─────────────────────────────────────────────

export const getAllPostSlugs = cache(function getAllPostSlugs(
  locale: Locale,
): string[] {
  const dir = getLocaleDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
});

export const getPostBySlug = cache(function getPostBySlug(
  locale: Locale,
  slug: string,
): Post | null {
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
  const readingTime =
    frontmatter.readingTime ?? estimateReadingTime(content, locale);

  return {
    ...frontmatter,
    readingTime,
    locale,
    content,
    url: `/${locale}/blog/${frontmatter.slug}`,
  };
});

export const getAllPosts = cache(function getAllPosts(locale: Locale): Post[] {
  const slugs = getAllPostSlugs(locale);
  const posts = slugs
    .map((slug) => getPostBySlug(locale, slug))
    .filter((p): p is Post => !!p && p.published);

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
});

// ─────────────────────────────────────────────
// Pinned posts
// Returns exactly the two slugs you hardcoded in pinned-posts.ts,
// in that order. Falls back to latest posts if a slug isn't found.
// ─────────────────────────────────────────────

export const getPinnedPosts = cache(function getPinnedPosts(
  locale: Locale,
): Post[] {
  const slugs = PINNED_SLUGS[locale];
  const result: Post[] = [];

  for (const slug of slugs) {
    const post = getPostBySlug(locale, slug);
    if (post && post.published) {
      result.push(post);
    }
  }

  // If pinned slugs aren't found (e.g. draft), fall back to latest
  if (result.length === 0) {
    return getAllPosts(locale).slice(0, 2);
  }

  return result;
});

// ─────────────────────────────────────────────
// Filtering helpers
// ─────────────────────────────────────────────

export function getLatestPosts(locale: Locale, limit = 2): Post[] {
  return getAllPosts(locale).slice(0, limit);
}

export function getPostsByCategory(
  locale: Locale,
  categoryId: CategoryId,
): Post[] {
  return getAllPosts(locale).filter((post) => post.category === categoryId);
}

export function getPostsByAuthor(locale: Locale, authorId: AuthorId): Post[] {
  return getAllPosts(locale).filter((post) => post.author === authorId);
}

export function getLatestPostsByAuthor(
  locale: Locale,
  authorId: AuthorId,
  limit = 6,
): Post[] {
  return getPostsByAuthor(locale, authorId).slice(0, limit);
}

export function getPostsByTag(locale: Locale, tag: string): Post[] {
  return getAllPosts(locale).filter((post) =>
    post.tags.some((t) => slugifyTag(t) === slugifyTag(tag)),
  );
}

export function getPostsByType(locale: Locale, type: PostType): Post[] {
  return getAllPosts(locale).filter((post) => post.type === type);
}

export function getPostsByDifficulty(
  locale: Locale,
  difficulty: DifficultyLevel,
): Post[] {
  return getAllPosts(locale).filter((post) => post.difficulty === difficulty);
}

export function getPostsBySeries(locale: Locale, series: string): Post[] {
  return getAllPosts(locale)
    .filter((post) => post.series === series)
    .sort((a, b) => (a.seriesPart ?? 0) - (b.seriesPart ?? 0));
}

export function getPillarChildren(locale: Locale, pillarSlug: string): Post[] {
  return getAllPosts(locale)
    .filter((post) => post.pillar === pillarSlug)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getAllPillarPosts(locale: Locale): Post[] {
  return getPostsByType(locale, "pillar");
}

export function getPostsByTool(locale: Locale, tool: string): Post[] {
  return getAllPosts(locale).filter((post) =>
    post.tools.some((t) => t.toLowerCase() === tool.toLowerCase()),
  );
}

export function getPostsBySkill(locale: Locale, skill: string): Post[] {
  return getAllPosts(locale).filter((post) =>
    post.skills.some((s) => s.toLowerCase() === skill.toLowerCase()),
  );
}

export function getPostsByCve(locale: Locale, cve: string): Post[] {
  return getAllPosts(locale).filter((post) =>
    post.cves.some((c) => c.toUpperCase() === cve.toUpperCase()),
  );
}

export function getRelatedPosts(
  post: Post,
  locale: Locale,
  limit = 3,
): Post[] {
  const allPosts = getAllPosts(locale);
  const related = allPosts.filter((p) => {
    if (p.slug === post.slug || !p.published) return false;
    return p.tags.some((tag) => post.tags.includes(tag));
  });

  return related
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

// ─────────────────────────────────────────────
// Tags
// ─────────────────────────────────────────────

export function slugifyTag(tag: string | null | undefined): string {
  if (!tag) return "";
  return tag
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "");
}

export function getAllTags(locale: Locale): string[] {
  const posts = getAllPosts(locale);
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
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

// ─────────────────────────────────────────────
// Tools index
// ─────────────────────────────────────────────

export type ToolSummary = {
  slug: string;
  count: number;
};

export function getAllToolSummaries(locale: Locale): ToolSummary[] {
  const posts = getAllPosts(locale);
  const map = new Map<string, number>();

  for (const post of posts) {
    for (const tool of post.tools) {
      const key = tool.toLowerCase();
      map.set(key, (map.get(key) ?? 0) + 1);
    }
  }

  return Array.from(map.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count);
}

// ─────────────────────────────────────────────
// Skills index
// ─────────────────────────────────────────────

export type SkillSummary = {
  slug: string;
  count: number;
};

export function getAllSkillSummaries(locale: Locale): SkillSummary[] {
  const posts = getAllPosts(locale);
  const map = new Map<string, number>();

  for (const post of posts) {
    for (const skill of post.skills) {
      const key = skill.toLowerCase();
      map.set(key, (map.get(key) ?? 0) + 1);
    }
  }

  return Array.from(map.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count);
}

// ─────────────────────────────────────────────
// Series helpers
// ─────────────────────────────────────────────

export type SeriesSummary = {
  slug: string;
  parts: Post[];
  total: number;
  isComplete: boolean;
};

export function getSeriesBySlug(
  locale: Locale,
  seriesSlug: string,
): SeriesSummary | null {
  const parts = getPostsBySeries(locale, seriesSlug);
  if (parts.length === 0) return null;

  const total = parts[0].seriesTotal ?? parts.length;
  const isComplete = parts.length >= total;

  return { slug: seriesSlug, parts, total, isComplete };
}

export function getAllSeries(locale: Locale): SeriesSummary[] {
  const posts = getAllPosts(locale).filter((p) => p.series);
  const slugs = [...new Set(posts.map((p) => p.series as string))];
  return slugs
    .map((slug) => getSeriesBySlug(locale, slug))
    .filter((s): s is SeriesSummary => s !== null);
}

export function getSeriesNavigation(
  post: Post,
  locale: Locale,
): { prev: Post | null; next: Post | null } {
  if (!post.series) return { prev: null, next: null };

  const parts = getPostsBySeries(locale, post.series);
  const index = parts.findIndex((p) => p.slug === post.slug);

  return {
    prev: index > 0 ? parts[index - 1] : null,
    next: index < parts.length - 1 ? parts[index + 1] : null,
  };
}

// ─────────────────────────────────────────────
// Category & Author helpers
// ─────────────────────────────────────────────

export function getPostCategoryLabel(
  categoryId: CategoryId,
  locale: Locale,
): string {
  return getCategory(categoryId).label[locale];
}

export function getPostAuthor(authorId: AuthorId) {
  return getAuthor(authorId);
}

export function getPostAuthorName(authorId: AuthorId, locale: Locale): string {
  return getAuthor(authorId).name[locale];
}

export function getPostAuthorRole(authorId: AuthorId, locale: Locale): string {
  return getAuthor(authorId).role[locale];
}

// ─────────────────────────────────────────────
// Roadmap / Learning path helpers
// ─────────────────────────────────────────────

export function resolvePrerequisites(post: Post, locale: Locale): Post[] {
  if (post.prerequisites.length === 0) return [];
  const all = getAllPosts(locale);
  return post.prerequisites
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p): p is Post => p !== undefined);
}

export function getRoadmapPosts(
  locale: Locale,
  difficulty: DifficultyLevel,
  excludeSlugs: string[] = [],
): Post[] {
  return getPostsByDifficulty(locale, difficulty).filter(
    (p) => !excludeSlugs.includes(p.slug),
  );
}