import { buildRssFeed, rssResponse } from "@/lib/rss";

export const revalidate = 600;

export async function GET() {
  const xml = buildRssFeed("en", "/en/rss.xml");
  return rssResponse(xml);
}
