"use client";

import { useMemo } from "react";
import Fuse from "fuse.js";
import type { Post } from "@/lib/blog";
import type { SearchFilters } from "./useSearchState";

const fuseOptions: Fuse.IFuseOptions<Post> = {
  keys: [
    { name: "title", weight: 0.45 },
    { name: "description", weight: 0.30 },
    { name: "tags", weight: 0.15 },
    { name: "content", weight: 0.10 },
  ],
  includeScore: true,
  threshold: 0.4,
  ignoreLocation: true,
  minMatchCharLength: 2,
};

export type SearchResult = {
  post: Post;
  score: number;
};

export function useFilteredPosts(
  posts: Post[],
  filters: SearchFilters,
): SearchResult[] {
  const fuse = useMemo(() => new Fuse(posts, fuseOptions), [posts]);

  return useMemo(() => {
    // Step 1: fuzzy search or full list
    let results: SearchResult[];
    if (filters.query.length >= 2) {
      results = fuse
        .search(filters.query)
        .slice(0, 40)
        .map((r) => ({ post: r.item, score: r.score ?? 1 }));
    } else {
      results = posts.map((post) => ({ post, score: 0 }));
    }

    // Step 2: category filter
    if (filters.categories.length > 0) {
      results = results.filter((r) =>
        filters.categories.includes(r.post.category as any),
      );
    }

    // Step 3: author filter
    if (filters.authors.length > 0) {
      results = results.filter((r) =>
        filters.authors.includes(r.post.author as any),
      );
    }

    // Step 4: tag filter (AND — post must have ALL selected tags)
    if (filters.tags.length > 0) {
      results = results.filter((r) =>
        filters.tags.every((tag) =>
          r.post.tags.some(
            (t) => t.toLowerCase() === tag.toLowerCase(),
          ),
        ),
      );
    }

    // Step 5: sort
    if (filters.sort === "date") {
      results.sort(
        (a, b) =>
          new Date(b.post.date).getTime() - new Date(a.post.date).getTime(),
      );
    }
    // "relevance" keeps fuse score order (already sorted by score)

    return results;
  }, [fuse, posts, filters]);
}