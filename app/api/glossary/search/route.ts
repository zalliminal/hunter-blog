// app/api/glossary/search/route.ts
import { NextResponse } from "next/server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n";
import { getAllGlossaryTerms, getAllGlossaryCategories } from "@/lib/glossary";
import type { GlossaryTerm } from "@/lib/glossary-helpers";

type CachedTerms = {
  terms: Array<{
    slug: string;
    term: string;
    abbreviation?: string;
    shortDefinition: string;
    category: string;
    tags: string[];
    relatedTerms: string[];
    language: string;
    hasTranslation: boolean;
    translationSlug?: string;
    difficulty?: string;
    lastUpdated?: string;
    sources: string[];
    locale: "en" | "fa";
    url: string;
  }>;
  categories: string[];
  timestamp: number;
};

// Cache all glossary terms by locale to avoid repeated fs reads
const termCache = new Map<Locale, CachedTerms>();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // Parse locale
  const rawLocale = searchParams.get("locale") as Locale | null;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  
  // Check cache
  const cached = termCache.get(locale);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return NextResponse.json({
      terms: cached.terms,
      categories: cached.categories,
      total: cached.terms.length,
    });
  }
  
  // Load all terms (no server-side filtering - let client use Fuse.js)
  const allTerms = getAllGlossaryTerms(locale);
  const categories = getAllGlossaryCategories(locale);
  
  const serialized = allTerms.map((term: GlossaryTerm) => ({
    slug: term.slug,
    term: term.term,
    abbreviation: term.abbreviation,
    shortDefinition: term.shortDefinition,
    category: term.category,
    tags: term.tags,
    relatedTerms: term.relatedTerms,
    language: term.language,
    hasTranslation: term.hasTranslation,
    translationSlug: term.translationSlug,
    difficulty: term.difficulty,
    lastUpdated: term.lastUpdated,
    sources: term.sources,
    locale: term.locale,
    url: term.url,
  }));
  
  // Cache the results
  termCache.set(locale, {
    terms: serialized,
    categories,
    timestamp: Date.now(),
  });
  
  return NextResponse.json({
    terms: serialized,
    categories,
    total: serialized.length,
  });
}