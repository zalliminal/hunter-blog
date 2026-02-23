import { GlossaryTerm as GlossaryTermSheet } from "@/components/glossary/glossary-term-sheet";
import { getGlossaryTermBySlug, getRelatedGlossaryTerms } from "@/lib/glossary";

import type { Locale } from "@/lib/i18n";

/**
 * Component for use in MDX blog posts to reference glossary terms
 * Usage: <GlossaryTerm slug="xss">XSS</GlossaryTerm>
 */
export async function GlossaryTermMDX({
  slug,
  locale,
  children,
}: {
  slug: string;
  locale: Locale;
  children: React.ReactNode;
}) {
  const term = getGlossaryTermBySlug(locale, slug);
  
  if (!term) {
    // Fallback to regular text if term not found
    return <span className="text-muted-foreground">{children}</span>;
  }
  
  const relatedTerms = getRelatedGlossaryTerms(term, locale);
  
  return (
    <GlossaryTermSheet
      term={term}
      locale={locale}
      relatedTerms={relatedTerms}
    >
      {children}
    </GlossaryTermSheet>
  );
}