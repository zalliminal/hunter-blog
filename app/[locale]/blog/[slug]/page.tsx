import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/lib/i18n";
import {
  getPostBySlug,
  getAllPosts,
  getAllPostSlugs,
  getRelatedPosts,
  getPostAuthor,
} from "@/lib/blog";
import { generateTocFromContent } from "@/lib/toc";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { PostToc } from "@/components/post-toc";
import { PostShare } from "@/components/post-share";
import { PostNav } from "@/components/post-nav";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { PostFrontmatter } from "@/lib/blog";
import { EnhancedBlogCard } from "@/components/index-page-blog-card";
import { getSiteUrl } from "@/lib/site";
import { getCategory, getAuthorSignatureColors } from "@/lib/categories_and_authors";

type PageParams = {
  locale: Locale;
  slug: string;
};
export const dynamicParams = false;
// This turns every post page from SSR → SSG, making clicks feel instant.
export function generateStaticParams(): PageParams[] {
  return LOCALES.flatMap((locale) =>
    getAllPostSlugs(locale).map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const post = getPostBySlug(locale, slug);

  if (!post) return {};

  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${post.url}`;
  const imageUrl = post.thumbnail ? `${siteUrl}${post.thumbnail}` : undefined;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      siteName: "Hunter Notes",
      publishedTime: post.date,
      tags: post.tags,
      images: imageUrl ? [{ url: imageUrl, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const post = getPostBySlug(locale, slug);

  if (!post) notFound();

  const toc = generateTocFromContent(post.content);

  const { content } = await compileMDX<PostFrontmatter>({
  source: post.content,
  options: {
    parseFrontmatter: false,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [],
    },
  },
  components: mdxComponents,
});

  // After — getAllPosts is cache()-wrapped, one read, everything derived
const allPosts = getAllPosts(locale);
const index = allPosts.findIndex((p) => p.slug === post.slug);
const previous = index > 0 ? allPosts[index - 1] : null;
const next = index < allPosts.length - 1 ? allPosts[index + 1] : null;

// Pass allPosts directly so getRelatedPosts doesn't re-fetch
const relatedPosts = allPosts
  .filter((p) => p.slug !== post.slug && p.published && p.tags.some((t) => post.tags.includes(t)))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

  const category = post.category ? getCategory(post.category) : null;
  const author = post.author ? getPostAuthor(post.author) : null;
  const colors = getAuthorSignatureColors(author?.id);
  const primaryColor = colors.primary.oklch || colors.primary.hex;
  return (
    <article className="relative">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="min-w-0 flex-1">
          <header className="mb-6 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>
                {new Date(post.date).toLocaleDateString(
                  locale === "fa" ? "fa-IR" : "en-US",
                  { year: "numeric", month: "short", day: "2-digit" }
                )}
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
              <span>{post.tags.slice(0, 2).join(" · ")}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
              <span>{locale === "fa" ? "زبان: فارسی" : "Language: English"}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50 opacity-0 sm:opacity-100" />
              <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <span>
                  {locale === "fa"
                    ? `${post.readingTime} دقیقه مطالعه`
                    : `${post.readingTime} min read`}
                </span>

                {post.updatedAt && post.updatedAt !== post.date && (
                  <>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                    <span>
                      {locale === "fa"
                        ? "آخرین بروزرسانی: "
                        : "Updated on "}
                      {new Date(post.updatedAt).toLocaleDateString(
                        locale === "fa" ? "fa-IR" : "en-US",
                        { year: "numeric", month: "long", day: "2-digit" }
                      )}
                    </span>
                  </>
                )}
              </div>
            </div>

            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {category && (
                <Link
                  href={`/${locale}/blog?category=${post.category}`}
                  className={`inline-flex rounded-md px-3 py-1.5 text-xs font-semibold transition-opacity hover:opacity-80 ${category.color.bg} ${category.color.text}`}
                >
                  {category.label[locale]}
                </Link>
              )}
              {author && (
                <span style={{ color: primaryColor }} className="inline-flex rounded-md border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                  {author.name[locale]}
                </span>
              )}
            </div>

            {post.description && (
              <p className="max-w-2xl text-sm text-muted-foreground">
                {post.description}
              </p>
            )}

            {post.thumbnail && (
              <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl border border-border relative">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 720px"
                />
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="space-y-6">
            <div className="prose max-w-none">{content}</div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <PostShare title={post.title} locale={locale} />
            </div>

            <PostNav
              locale={locale}
              previous={previous ?? undefined}
              next={next ?? undefined}
            />

            {relatedPosts.length > 0 && (
              <section className="mt-12 border-t border-border pt-8">
                <h2 className="mb-4 text-lg font-semibold">
                  {locale === "fa" ? "مطالب مرتبط" : "Related posts"}
                </h2>
                <div className="grid gap-3 sm:gap-4">
                  {relatedPosts.map((related, idx) => (
                    <EnhancedBlogCard
                      key={related.slug}
                      post={related}
                      locale={locale}
                      index={idx}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        <PostToc items={toc} locale={locale} />
      </div>
    </article>
  );
}