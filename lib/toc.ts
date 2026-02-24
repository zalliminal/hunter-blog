export type TocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // remove non-word chars
    .replace(/[\s_-]+/g, "-") // replace spaces/underscores with dash
    .replace(/^-+|-+$/g, ""); // trim dashes from ends
}

export function generateTocFromContent(content: string): TocItem[] {
  const lines = content.split("\n");
  const toc: TocItem[] = [];

  for (const line of lines) {
    // Match ## Heading or ### Heading
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    
    if (match) {
      const level = match[1].length as 2 | 3;
      let title = match[2].trim();
      
      // Remove custom ID if present (e.g., ## Heading {#custom-id})
      const idMatch = title.match(/\{#([^}]+)\}$/);
      if (idMatch) {
        title = title.replace(/\{#([^}]+)\}$/, "").trim();
      }

      toc.push({
        id: idMatch ? idMatch[1] : slugify(title),
        title,
        level,
      });
    }
  }

  return toc;
}