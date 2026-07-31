import { buildRssFeed, rssResponse } from "@/lib/rss";

export const revalidate = 600;

export async function GET() {
  const xml = buildRssFeed("fa", "/fa/rss.xml");
  return rssResponse(xml);
}
