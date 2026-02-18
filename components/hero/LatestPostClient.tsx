"use client";
import { motion, useReducedMotion } from "framer-motion";
import { BlogCard } from "@/components/blog-card";
import { AnimatedCard } from "@/components/animated/AnimatedCard";
import type { Post } from "@/lib/blog";
import type { Locale } from "@/lib/i18n";

export default function LatestPostsClient({
  posts,
  locale,
}: {
  posts: Post[];
  locale: Locale;
}) {
  const prefersReduced = useReducedMotion();

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  return (
    <motion.div
      initial={prefersReduced ? undefined : "hidden"}
      animate={prefersReduced ? undefined : "show"}
      variants={container}
      className="grid gap-4 md:grid-cols-2"
    >
      {posts.map((post, i) => (
        // Fix #2: AnimatedCard only — no nested motion.div with whileHover
        <AnimatedCard key={post.slug} index={i}>
          <BlogCard post={post} locale={locale} priority={i === 0} />
        </AnimatedCard>
      ))}
    </motion.div>
  );
}