// lib/glossary-search.ts
import Fuse from "fuse.js";
import type { Locale } from "./i18n";
import { getAllGlossaryTerms, type GlossaryTerm } from "./glossary";

const fuseOptions: Fuse.IFuseOptions<GlossaryTerm> = {
  keys: [
    { name: "term", weight: 2 },
    { name: "abbreviation", weight: 1.5 },
    { name: "shortDefinition", weight: 1.2 },
    { name: "category", weight: 1 },
    { name: "tags", weight: 0.8 },
    { name: "content", weight: 0.5 },
  ],
  includeScore: true,
  threshold: 0.4,
};

export type GlossarySearchFilters = {
  query?: string;
  category?: string;
  difficulty?: string;
};

export function searchGlossaryTerms(
  locale: Locale,
  filters: GlossarySearchFilters = {}
): GlossaryTerm[] {
  let terms = getAllGlossaryTerms(locale);

  // Filter by category
  if (filters.category) {
    terms = terms.filter((term) => term.category === filters.category);
  }

  // Filter by difficulty
  if (filters.difficulty) {
    terms = terms.filter((term) => term.difficulty === filters.difficulty);
  }

  // Search by query using Fuse.js
  if (filters.query && filters.query.trim().length >= 2) {
    const fuse = new Fuse(terms, fuseOptions);
    const matches = fuse.search(filters.query.trim());
    return matches.map((m) => m.item);
  }

  return terms;
}