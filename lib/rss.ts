import { LOCALES, DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import { getAllPosts } from "@/lib/blog";
import { getSiteUrl } from "@/lib/site";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, String.fromCharCode(38) + "amp;")
    .replace(/</g, String.fromCharCode(38) + "lt;")
    .replace(/>/g, String.fromCharCode(38) + "gt;")
    .replace(/"/g, String.fromCharCode(38) + "quot;")
    .replace(/'/g, String.fromCharCode(38) + "apos;");
}

const BRAND: Record<Locale, string> = {
  fa: "کاولبز — یادداشت‌های تحقیقاتی امنیت",
  en: "KavLabs — security research notes",
};

const DESC: Record<Locale, string> = {
  fa: "تیم تحقیقاتی کاولبز. رایت‌آپ‌های واقعی و یادداشت‌های امنیتی به فارسی.",
  en: "KavLabs security research team. Real-world writeups and notes in English.",
};

/**
 * Build an RSS 2.0 feed.
 * @param scope "fa" | "en" | "all" — locale-filtered or combined feed.
 */
export function buildRssFeed(
  scope: Locale | "all",
  feedPath: string,
): string {
  const siteUrl = getSiteUrl();
  const feedUrl = `${siteUrl}${feedPath}`;

  let posts;
  if (scope === "all") {
    posts = LOCALES.flatMap((locale) => getAllPosts(locale));
  } else {
    posts = getAllPosts(scope).filter((p) => p.lang === scope);
  }

  posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const lastBuildDate =
    posts.length > 0 ? new Date(posts[0].date).toUTCString() : new Date().toUTCString();

  const channelLang = scope === "all" ? DEFAULT_LOCALE : scope;
  const channelTitle = scope === "all" ? "KavLabs — security research notes (fa + en)" : BRAND[scope];
  const channelDesc = scope === "all"
    ? "Bilingual security research feed — Persian and English writeups."
    : DESC[scope];

  const itemsXml = posts
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
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${pubDate}</pubDate>
      <language>${escapeXml(post.lang)}</language>
      ${categories}
    </item>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escapeXml(channelTitle)}</title>
    <link>${escapeXml(siteUrl)}</link>
    <description>${escapeXml(channelDesc)}</description>
    <language>${escapeXml(channelLang)}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
    <image>
      <url>${escapeXml(`${siteUrl}/og-default.png`)}</url>
      <title>${escapeXml(channelTitle)}</title>
      <link>${escapeXml(siteUrl)}</link>
    </image>${itemsXml}
  </channel>
</rss>`;
}

export function rssResponse(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate",
    },
  });
}
