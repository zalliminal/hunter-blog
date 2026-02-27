// lib/pinned-posts.ts
// Hardcoded pinned post slugs — edit these to change what shows on the homepage.
// These are the slugs from your MDX frontmatter, per locale.

export const PINNED_SLUGS: Record<"en" | "fa", [string, string]> = {
  en: ["kavlabs-complete-guide", "what-is-ssrf"],
  fa: ["kavlabs-complete-guide", "what-is-ssrf"],
};