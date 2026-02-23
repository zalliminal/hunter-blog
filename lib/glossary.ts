// lib/glossary.ts
// SERVER-ONLY - Uses Node.js fs APIs
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { Locale } from "./i18n";
import type { GlossaryTerm } from "./glossary-helpers";

const CONTENT_DIR = path.join(process.cwd(), "content");

const GlossaryFrontmatterSchema = z.object({
  slug: z.string(),
  term: z.string(),
  abbreviation: z.string().optional(),
  shortDefinition: z.string(),
  category: z.string(),
  tags: z.array(z.string()).default([]),
  relatedTerms: z.array(z.string()).default([]),
  language: z.string(),
  hasTranslation: z.boolean().default(false),
  translationSlug: z.string().optional(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  lastUpdated: z.string().optional(),
  sources: z.array(z.string()).default([]),
});

// Re-export types from helpers for convenience
export type { GlossaryTerm, GlossaryFrontmatter, GlossaryDifficulty } from "./glossary-helpers";

function getLocaleDir(locale: Locale): string {
  return path.join(CONTENT_DIR, "glossary", locale);
}

export function getAllGlossarySlugs(locale: Locale): string[] {
  const dir = getLocaleDir(locale);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getGlossaryTermBySlug(
  locale: Locale,
  slug: string
): GlossaryTerm | null {
  const dir = getLocaleDir(locale);
  const fullPath = path.join(dir, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const source = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(source);

  const parsed = GlossaryFrontmatterSchema.safeParse(data);
  if (!parsed.success) {
    console.error("Invalid frontmatter in", fullPath, parsed.error);
    return null;
  }

  const frontmatter = parsed.data;

  return {
    ...frontmatter,
    locale,
    content,
    url: `/${locale}/glossary/${frontmatter.slug}`,
  };
}

export function getAllGlossaryTerms(locale: Locale): GlossaryTerm[] {
  const slugs = getAllGlossarySlugs(locale);
  const terms = slugs
    .map((slug) => getGlossaryTermBySlug(locale, slug))
    .filter((t): t is GlossaryTerm => !!t);
  
  // Sort alphabetically by term name
  return terms.sort((a, b) => a.term.localeCompare(b.term, locale));
}

export function getGlossaryTermsByCategory(
  locale: Locale,
  category: string
): GlossaryTerm[] {
  const terms = getAllGlossaryTerms(locale);
  return terms.filter((term) => term.category === category);
}

export function getAllGlossaryCategories(locale: Locale): string[] {
  const terms = getAllGlossaryTerms(locale);
  const categories = new Set<string>();
  terms.forEach((term) => {
    if (term.category) categories.add(term.category);
  });
  return Array.from(categories).sort((a, b) => a.localeCompare(b, locale));
}

export function getRelatedGlossaryTerms(
  term: GlossaryTerm,
  locale: Locale
): GlossaryTerm[] {
  if (!term.relatedTerms || term.relatedTerms.length === 0) return [];
  
  return term.relatedTerms
    .map((slug) => getGlossaryTermBySlug(locale, slug))
    .filter((t): t is GlossaryTerm => !!t);
}

export function searchGlossaryTerms(
  locale: Locale,
  query: string
): GlossaryTerm[] {
  const terms = getAllGlossaryTerms(locale);
  const lowerQuery = query.toLowerCase().trim();
  
  if (!lowerQuery) return terms;
  
  return terms.filter((term) => {
    const searchableText = [
      term.term,
      term.abbreviation,
      term.shortDefinition,
      term.category,
      ...term.tags,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    
    return searchableText.includes(lowerQuery);
  });
}