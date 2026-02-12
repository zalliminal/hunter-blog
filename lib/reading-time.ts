// lib/reading-time.ts
/**
 * Estimates reading time from raw MDX/Markdown content.
 *
 * Strategy:
 *  1. Strip MDX/Markdown syntax so we only count prose words.
 *  2. Use locale-aware WPM: Persian/Arabic readers average ~130 wpm vs
 *     English ~200 wpm.
 *  3. Return whole minutes, minimum 1.
 */

const WPM: Record<string, number> = {
    fa: 130,  // Persian
    ar: 130,  // Arabic (if you ever add it)
    default: 200,
  };
  
  function stripMarkdown(content: string): string {
    return (
      content
        // Remove frontmatter (shouldn't be present after gray-matter, but just in case)
        .replace(/^---[\s\S]*?---/, "")
        // Remove fenced code blocks (content inside is not "read")
        .replace(/```[\s\S]*?```/g, "")
        // Remove inline code
        .replace(/`[^`]*`/g, "")
        // Remove HTML/JSX tags
        .replace(/<[^>]+>/g, "")
        // Remove images
        .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
        // Remove links but keep label text
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        // Remove headings hashes
        .replace(/^#{1,6}\s+/gm, "")
        // Remove blockquote markers
        .replace(/^>\s*/gm, "")
        // Remove horizontal rules
        .replace(/^[-*_]{3,}\s*$/gm, "")
        // Remove bold/italic markers
        .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, "$1")
        // Remove extra whitespace
        .replace(/\s+/g, " ")
        .trim()
    );
  }
  
  /**
   * Count words in cleaned text.
   * Works for both space-separated scripts (Latin, Persian) and CJK.
   */
  function countWords(text: string): number {
    if (!text) return 0;
    // Count CJK characters individually (each ~1 word for reading-time purposes)
    const cjkMatches = text.match(/[\u4e00-\u9fff\u3040-\u30ff]/g) ?? [];
    // Count remaining space-separated tokens
    const latinMatches = text
      .replace(/[\u4e00-\u9fff\u3040-\u30ff]/g, " ")
      .match(/\S+/g) ?? [];
    return cjkMatches.length + latinMatches.length;
  }
  
  /**
   * Returns estimated reading time in whole minutes (min 1).
   */
  export function estimateReadingTime(content: string, locale = "en"): number {
    const wpm = WPM[locale] ?? WPM.default;
    const cleaned = stripMarkdown(content);
    const words = countWords(cleaned);
    return Math.max(1, Math.round(words / wpm));
  }