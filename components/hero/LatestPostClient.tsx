"use client";
import { motion, useReducedMotion } from "framer-motion";
import { BlogCard } from "@/components/blog-card";
import type { Locale } from "@/lib/i18n";

type PostSummary = {
  title: string;
  slug: string;
  description?: string;
  date?: string;
  // add any other serializable fields your BlogCard expects
};

export default function LatestPostsClient({
  posts,
  locale,
}: {
  posts: PostSummary[];
  locale: Locale;
}) {
  const prefersReduced = useReducedMotion();

  const container = {
    hidden: { opacity: 0, y: 4 },
    show: { opacity: 1, y: 0, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 260, damping: 26 } },
  };

  return (
    <motion.div
      initial={prefersReduced ? undefined : "hidden"}
      animate={prefersReduced ? undefined : "show"}
      variants={container}
      className="grid gap-4 md:grid-cols-2"
    >
      {posts.map((post) => (
        <motion.div
          key={post.slug}
          variants={item}
          whileHover={{ y: -4, boxShadow: "0 8px 20px rgba(0,0,0,0.06)" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* BlogCard should be serializable / client-safe */}
          <BlogCard post={post as any} locale={locale} />
        </motion.div>
      ))}
    </motion.div>
  );
}
