import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n";
import { getPostBySlug, getAllPosts, getRelatedPosts, getPostAuthor } from "@/lib/blog";
import { generateTocFromContent } from "@/lib/toc";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { PostToc } from "@/components/post-toc";
import { PostShare } from "@/components/post-share";
import { PostNav } from "@/components/post-nav";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { PostFrontmatter } from "@/lib/blog";
import { EnhancedBlogCard } from "@/components/index-page-blog-card";
import { getSiteUrl } from "@/lib/site";
import { getCategory } from "@/lib/categories_and_authors";
import Link from "next/link";

type PageParams = {
  locale: Locale;
  slug: string;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : DEFAULT_LOCALE;
  const post = getPostBySlug(locale, slug);

  if (!post) {
    return {};
  }

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
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: post.title,
            },
          ]
        : undefined,
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

  if (!post) {
    notFound();
  }

  const toc = generateTocFromContent(post.content);

  const { content } = await compileMDX<PostFrontmatter>({
    source: post.content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }]],
      },
    },
    components: mdxComponents,
  });

  const allPosts = getAllPosts(locale);
  const relatedPosts = getRelatedPosts(post, locale, 3);
  const index = allPosts.findIndex((p) => p.slug === post.slug);
  const previous = index > 0 ? allPosts[index - 1] : null;
  const next = index < allPosts.length - 1 ? allPosts[index + 1] : null;

  return (
    <article className="relative">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="min-w-0 flex-1">
          <header className="mb-6 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <span>
                {new Date(post.date).toLocaleDateString(locale, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
              <span>{post.tags.slice(0, 2).join(" · ")}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
              <span>{locale === "fa" ? "زبان: فارسی" : "Language: English"}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground/50" />
              <span>
                {locale === "fa"
                  ? `${post.readingTime} دقیقه مطالعه`
                  : `${post.readingTime} min read`}
              </span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {post.title}
            </h1>
            {/* Category & Author Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {post.category && (() => {
                const category = getCategory(post.category);
                return (
                  <span
                    className={`inline-flex rounded-sm px-3 py-1.5 text-xs font-semibold ${category.color.bg} ${category.color.text}`}
                  >
                    <Link href={`/${locale}/blog?category=${category.label[locale]}`}>{category.label[locale]}</Link>
                  </span>
                );
              })()}
              {post.author && (() => {
                const author = getPostAuthor(post.author);
                return (
                  <span className="inline-flex rounded-sm border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                    {author.name[locale]}
                  </span>
                );
              })()}
            </div>
            {post.description ? (
              <p className="max-w-2xl text-sm text-muted-foreground">
                {post.description}
              </p>
            ) : null}
            {post.thumbnail ? (
  <div className="mt-4 aspect-video w-full overflow-hidden rounded-2xl border border-border">
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={post.thumbnail}
      alt=""
      className="h-full w-full object-cover object-center"
    />
  </div>
) : null}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-border bg-muted/60 px-2 py-0.5 text-[11px] text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div className="space-y-6">
            <div className="prose max-w-none">
              {content}
            </div>
            <div className="mt-6 flex items-center justify-between gap-3">
              <PostShare title={post.title} locale={locale} />
            </div>
            <PostNav locale={locale} previous={previous ?? undefined} next={next ?? undefined} />
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

        <PostToc items={toc} />
      </div>
    </article>
  );
}

