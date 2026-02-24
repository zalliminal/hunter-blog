// lib/blog.ts
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
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

const CONTENT_DIR = path.join(process.cwd(), "content");

// ─────────────────────────────────────────────
// Constants / Enums
// ─────────────────────────────────────────────

/**
 * Post type controls layout and behavior.
 *
 * - article   : Standard blog post (default)
 * - pillar    : Long-form hub that groups related articles/tutorials
 * - tutorial  : Step-by-step, hands-on walkthrough
 * - writeup   : CTF or bug bounty write-up
 * - news      : Short-form security news or advisory
 */
export const POST_TYPES = [
  "article",
  "pillar",
  "tutorial",
  "writeup",
  "news",
] as const;
export type PostType = (typeof POST_TYPES)[number];

/**
 * Difficulty level — used for roadmap, filtering, and UI badges.
 */
export const DIFFICULTY_LEVELS = [
  "beginner",
  "intermediate",
  "advanced",
] as const;
export type DifficultyLevel = (typeof DIFFICULTY_LEVELS)[number];

/**
 * Severity rating for vulnerability-related posts.
 * Follows standard triage conventions used in bug bounty.
 */
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
  // ── Core (required) ───────────────────────────────────────────────────────
  title: z.string(),
  description: z.string(),
  date: z.string(),
  slug: z.string(),
  category: z.enum(CATEGORY_IDS),
  author: z.enum(AUTHOR_IDS),
  lang: z.string(),

  // ── Core (optional) ───────────────────────────────────────────────────────
  thumbnail: z.string().optional(),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(true),

  /** Manual override — if omitted, reading time is computed from content */
  readingTime: z.number().optional(),

  /** Last time the post content was reviewed or updated */
  updatedAt: z.string().optional(),

  /** Canonical URL — use when cross-posting to Medium, DEV, etc. */
  canonicalUrl: z.string().optional(),

  // ── Content classification ────────────────────────────────────────────────

  /** Controls layout and semantic meaning of the post */
  type: z.enum(POST_TYPES).default("article"),

  /**
   * Difficulty level for the reader.
   * Drives roadmap ordering, UI badges, and future filtering.
   */
  difficulty: z.enum(DIFFICULTY_LEVELS).optional(),

  /**
   * Severity of the vulnerability discussed.
   * Only relevant for writeups and vulnerability articles.
   */
  severity: z.enum(SEVERITY_LEVELS).optional(),

  // ── Series / Pillar ───────────────────────────────────────────────────────

  /**
   * Slug of the pillar post this article belongs to.
   * Pillar posts auto-collect all posts referencing their slug.
   * Example: "xss-complete-guide"
   */
  pillar: z.string().optional(),

  /**
   * Series identifier — groups sequential posts into a named course.
   * Example: "web-hacking-101"
   */
  series: z.string().optional(),

  /** Position within the series — 1-indexed */
  seriesPart: z.number().optional(),

  /** Total number of parts in the series (can be updated as you write) */
  seriesTotal: z.number().optional(),

  // ── Learning graph ────────────────────────────────────────────────────────

  /**
   * Slugs of posts the reader should understand before this one.
   * Powers the "Prerequisites" UI block and roadmap edges.
   */
  prerequisites: z.array(z.string()).default([]),

  /**
   * Skills the reader will gain after reading this post.
   * Used on roadmap and learning-path pages.
   * Example: ["xss", "burp-suite", "dom-manipulation"]
   */
  skills: z.array(z.string()).default([]),

  /**
   * Tools used or demonstrated in this post.
   * Powers the /tools index page.
   * Example: ["burp-suite", "sqlmap", "nmap"]
   */
  tools: z.array(z.string()).default([]),

  // ── CTF / Bug Bounty metadata ─────────────────────────────────────────────

  /** Slug of the associated challenge on /challenges — for writeup posts */
  challengeSlug: z.string().optional(),

  /**
   * CTF event name — for writeup posts.
   * Example: "PicoCTF 2024", "HTB Cyber Apocalypse 2024"
   */
  ctfEvent: z.string().optional(),

  /**
   * CVE identifier(s) discussed in this post.
   * Example: ["CVE-2024-1234", "CVE-2024-5678"]
   */
  cves: z.array(z.string()).default([]),

  /**
   * Target program or platform for bug bounty writeups.
   * Example: "HackerOne - Shopify"
   */
  program: z.string().optional(),

  // ── Future: engagement / gamification ────────────────────────────────────
  // These fields are parsed now so frontmatter is forward-compatible.
  // UI will be built when the platform layer is ready.

  /** Whether this post has an associated quiz */
  hasQuiz: z.boolean().optional(),

  /** Whether this post has hands-on lab steps */
  hasLab: z.boolean().optional(),

  /** Estimated time to complete the lab in minutes */
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
  /** Always present after parsing — computed from content if not in frontmatter */
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
// ─────────────────────────────────────────────

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

/**
 * Get all posts that belong to a pillar post.
 * A post belongs to a pillar when its `pillar` field matches the pillar's slug.
 */
export function getPillarChildren(locale: Locale, pillarSlug: string): Post[] {
  return getAllPosts(locale)
    .filter((post) => post.pillar === pillarSlug)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

/**
 * Get all pillar posts.
 */
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

/**
 * Collect all tools mentioned across posts with their usage count.
 * Powers the /tools index page.
 */
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

/**
 * Collect all skills across posts with their coverage count.
 * Powers the roadmap and learning-path pages.
 */
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

/**
 * Get full series metadata including all ordered parts.
 */
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

/**
 * Get all distinct series with their parts.
 */
export function getAllSeries(locale: Locale): SeriesSummary[] {
  const posts = getAllPosts(locale).filter((p) => p.series);
  const slugs = [...new Set(posts.map((p) => p.series as string))];
  return slugs
    .map((slug) => getSeriesBySlug(locale, slug))
    .filter((s): s is SeriesSummary => s !== null);
}

/**
 * Get prev/next navigation within a series.
 */
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

/**
 * Resolve prerequisite slugs to full Post objects.
 * Slugs that don't match any published post are silently dropped.
 */
export function resolvePrerequisites(post: Post, locale: Locale): Post[] {
  if (post.prerequisites.length === 0) return [];
  const all = getAllPosts(locale);
  return post.prerequisites
    .map((slug) => all.find((p) => p.slug === slug))
    .filter((p): p is Post => p !== undefined);
}

/**
 * Get posts recommended for a given difficulty level,
 * ordered by date and excluding the provided slugs.
 */
export function getRoadmapPosts(
  locale: Locale,
  difficulty: DifficultyLevel,
  excludeSlugs: string[] = [],
): Post[] {
  return getPostsByDifficulty(locale, difficulty).filter(
    (p) => !excludeSlugs.includes(p.slug),
  );
}