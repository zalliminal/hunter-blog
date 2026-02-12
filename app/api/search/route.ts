import { NextResponse } from "next/server";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n";
import { searchPosts } from "@/lib/search";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawLocale = searchParams.get("locale") as Locale | null;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const q = searchParams.get("q") ?? "";

  const results = searchPosts(locale, q).slice(0, 8);

  return NextResponse.json({
    results: results.map((post) => ({
      slug: post.slug,
      date: post.date,
      title: post.title,
      description: post.description,
      tags: post.tags,
      url: post.url,
    })),
  });
}

