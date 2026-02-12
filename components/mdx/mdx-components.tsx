import type { MDXComponents } from "mdx/types";
import { CodeBlock } from "./code-block";
import { slugifyHeading } from "@/lib/toc";
import { Link } from "lucide-react"; // optional, for heading anchor icon

// --- Helper: extract line highlights from metastring ---
function extractHighlightLines(meta?: string): number[] {
  if (!meta) return [];
  const match = /{([\d,\- ]+)}/.exec(meta);
  if (!match) return [];
  const raw = match[1];
  const parts = raw.split(",").map((p) => p.trim());
  const lines = new Set<number>();

  for (const part of parts) {
    if (!part) continue;
    if (part.includes("-")) {
      const [startStr, endStr] = part.split("-");
      const start = Number(startStr);
      const end = Number(endStr);
      if (!Number.isNaN(start) && !Number.isNaN(end)) {
        for (let i = start; i <= end; i++) lines.add(i);
      }
    } else {
      const n = Number(part);
      if (!Number.isNaN(n)) lines.add(n);
    }
  }
  return Array.from(lines).sort((a, b) => a - b);
}

// --- Helper: flatten React children to plain text ---
function flattenText(children: React.ReactNode): string {
  if (typeof children === "string" || typeof children === "number")
    return String(children);
  if (Array.isArray(children)) return children.map(flattenText).join("");
  if (typeof children === "object" && children && "props" in children)
    // @ts-expect-error loose
    return flattenText(children.props.children);
  return "";
}

// --- Headings with automatic anchor links ---
const Heading =
  (Tag: "h2" | "h3") =>
  ({ children }: { children: React.ReactNode }) => {
    const text = flattenText(children);
    const id = slugifyHeading(text);

    return (
      <Tag
        id={id}
        className={`group scroll-mt-24 font-semibold tracking-tight ${
          Tag === "h2"
            ? "mt-10 text-lg"
            : "mt-6 text-[15px] text-muted-foreground"
        }`}
      >
        <a href={`#${id}`} className="no-underline hover:underline">
          {children}
        </a>
        <a
          href={`#${id}`}
          className="ml-2 inline-flex opacity-0 transition-opacity group-hover:opacity-100"
          aria-label="Link to section"
        >
          <Link className="h-4 w-4" />
        </a>
      </Tag>
    );
  };

// --- MDX Components ---
export const mdxComponents: MDXComponents = {
  // Typography
  h2: Heading("h2"),
  h3: Heading("h3"),

  p: (props) => (
    <p
      {...props}
      className="text-sm leading-relaxed text-muted-foreground [&:not(:first-child)]:mt-4"
    />
  ),

  // Lists
  ul: (props) => (
    <ul
      {...props}
      className="mt-4 list-disc space-y-1.5 ps-6 text-sm text-muted-foreground"
    />
  ),
  ol: (props) => (
    <ol
      {...props}
      className="mt-4 list-decimal space-y-1.5 ps-6 text-sm text-muted-foreground"
    />
  ),
  li: (props) => <li {...props} className="leading-relaxed" />,

  // Links
  a: (props) => (
    <a
      {...props}
      className="font-medium underline decoration-dotted underline-offset-4 transition hover:text-primary"
    />
  ),

  // Inline code
  code: (props) => (
    <code
      {...props}
      className="rounded-md bg-muted px-1.5 py-0.5 text-[12px] font-mono text-foreground"
      dir="ltr"
    />
  ),

  // Blockquotes
  blockquote: (props) => (
    <blockquote
      {...props}
      className="mt-4 border-l-4 border-primary/30 bg-muted/30 pl-4 pr-2 py-2 text-sm italic text-muted-foreground"
    />
  ),

  // Horizontal rule
  hr: () => (
    <hr className="my-8 border-t border-border/50" />
  ),

  // Images
  img: (props) => (
    <img
      {...props}
      className="my-6 rounded-xl border border-border object-cover"
      alt={props.alt || "Blog post image"}
      loading="lazy"
    />
  ),

  // Tables
  table: (props) => (
    <div className="my-6 w-full overflow-x-auto rounded-lg border border-border">
      <table {...props} className="w-full text-sm" />
    </div>
  ),
  thead: (props) => <thead {...props} className="bg-muted/50 border-b border-border" />,
  tbody: (props) => <tbody {...props} />,
  tr: (props) => <tr {...props} className="border-b border-border last:border-0" />,
  th: (props) => (
    <th
      {...props}
      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"
    />
  ),
  td: (props) => (
    <td {...props} className="px-4 py-3 text-sm text-muted-foreground" />
  ),

  // Keyboard input
  kbd: (props) => (
    <kbd
      {...props}
      className="inline-flex min-w-[1.5rem] items-center justify-center rounded-md border border-border bg-muted px-1.5 py-0.5 text-[11px] font-mono text-foreground shadow-sm"
    />
  ),

  // Code blocks (custom component)
  pre: ({ children, ...rest }) => {
    const child = Array.isArray(children) ? children[0] : children;
    if (
      child &&
      typeof child === "object" &&
      "props" in child &&
      child.props &&
      typeof child.props.children === "string"
    ) {
      // @ts-expect-error – MDX internal structure
      const raw = child.props.children;
      // @ts-expect-error
      const langClass = child.props.className || "";
      const language = langClass.replace("language-", "") || "bash";
      const highlightedLines = extractHighlightLines(
        // @ts-expect-error
        child.props.metastring
      );

      return (
        <CodeBlock
          code={raw}
          language={language}
          highlightedLines={highlightedLines}
          showLineNumbers={true}
        />
      );
    }

    // Fallback for plain <pre>
    return (
      <pre
        {...rest}
        className="mt-4 overflow-x-auto rounded-2xl border border-border bg-muted p-4 text-xs"
        dir="ltr"
      >
        {children}
      </pre>
    );
  },
};