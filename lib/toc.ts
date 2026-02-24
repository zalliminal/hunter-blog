export type TocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-z0-9\s-]/gi, "")
    .replace(/[\s_]+/g, "-") // replace spaces/underscores with dash
    .replace(/-+/g, "-") // replace multiple dashes with single dash
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

      const id = idMatch ? idMatch[1] : slugify(title);
      
      toc.push({
        id,
        title,
        level,
      });
    }
  }

  return toc;
}