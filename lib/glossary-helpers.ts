// lib/glossary-helpers.ts
// Client-safe helper functions (no Node.js APIs)

export type GlossaryDifficulty = "beginner" | "intermediate" | "advanced";

export type GlossaryFrontmatter = {
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
  difficulty?: GlossaryDifficulty;
  lastUpdated?: string;
  sources: string[];
};

export type GlossaryTerm = GlossaryFrontmatter & {
  locale: "en" | "fa";
  content: string;
  url: string;
};

// Get difficulty badge colors (client-safe)
export function getDifficultyColor(difficulty?: string) {
  switch (difficulty) {
    case "beginner":
      return {
        bg: "bg-primary/10",
        text: "text-primary",
        border: "border-primary/20",
      };
    case "intermediate":
      return {
        bg: "bg-chart-3/10",
        text: "text-chart-3",
        border: "border-chart-3/20",
      };
    case "advanced":
      return {
        bg: "bg-destructive/10",
        text: "text-destructive",
        border: "border-destructive/20",
      };
    default:
      return {
        bg: "bg-muted",
        text: "text-muted-foreground",
        border: "border-border",
      };
  }
}