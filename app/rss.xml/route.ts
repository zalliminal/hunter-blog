import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n";
import { getAllPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const siteUrl = getSiteUrl();

  // Collect all posts across all locales
  const allPosts = LOCALES.flatMap((locale) => getAllPosts(locale));

  // Sort newest first
  allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const lastBuildDate =
    allPosts.length > 0
      ? new Date(allPosts[0].date).toUTCString()
      : new Date().toUTCString();

  const itemsXml = allPosts
    .map((post) => {
      const url = `${siteUrl}${post.url}`;
      const pubDate = new Date(post.date).toUTCString();

      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag)}</category>`)
        .join("");

      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${pubDate}</pubDate>
      ${categories}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(
      "Hunter Notes — bug bounty & security writeups",
    )}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(
      "Minimal, bilingual blog for a bug bounty hunter and security researcher. Real-world writeups, notes and ideas in English and Farsi.",
    )}</description>
    <language>${escapeXml(DEFAULT_LOCALE)}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>${itemsXml}
  </channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      // Cache at the edge / CDN for 10 minutes, allow stale while revalidating
      "Cache-Control": "s-maxage=600, stale-while-revalidate",
    },
  });
}

