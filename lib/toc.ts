export type TocItem = {
  id: string;
  title: string;
  level: 2 | 3;
};

export function slugifyHeading(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()+=<>?,./:;"'{}|[\]\\]/g, "")
    .replace(/\s+/g, "-");
}

export function generateTocFromContent(content: string): TocItem[] {
  const lines = content.split("\n");
  const items: TocItem[] = [];

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const level = match[1].length as 2 | 3;
    if (level !== 2 && level !== 3) continue;

    const rawTitle = match[2].replace(/\s*\{#([^}]+)\}\s*$/, "");
    const idMatch = /\{#([^}]+)\}\s*$/.exec(match[2]);
    const id = idMatch ? idMatch[1] : slugifyHeading(rawTitle);

    items.push({
      id,
      title: rawTitle,
      level,
    });
  }

  return items;
}

