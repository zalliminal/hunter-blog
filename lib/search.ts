import Fuse from "fuse.js";
import type { Locale } from "./i18n";
import { getAllPosts, type Post } from "./blog";

const fuseOptions: Fuse.IFuseOptions<Post> = {
  keys: ["title", "description", "tags", "content"],
  includeScore: true,
  threshold: 0.4,
};

export function searchPosts(locale: Locale, query: string): Post[] {
  const q = query.trim();
  if (q.length < 2) return [];

  const posts = getAllPosts(locale);
  const fuse = new Fuse(posts, fuseOptions);
  const matches = fuse.search(q);

  return matches.slice(0, 20).map((m) => m.item);
}

