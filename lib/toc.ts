export type TocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

// Exported so mdx-components.tsx can import it for heading IDs.
// Both this file and mdx-components use the same function —
// that's what keeps TOC anchor links and rendered heading IDs in sync.
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFFa-z0-9\s-]/gi, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateTocFromContent(content: string): TocItem[] {
  const lines = content.split("\n");
  const toc: TocItem[] = [];

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    let title = match[2].trim();

    const idMatch = title.match(/\{#([^}]+)\}$/);
    if (idMatch) {
      title = title.replace(/\{#([^}]+)\}$/, "").trim();
      toc.push({ id: idMatch[1], title, level });
    } else {
      toc.push({ id: slugify(title), title, level });
    }
  }

  return toc;
}