// Fix #9: loading.tsx for slug page — shown while compileMDX runs server-side.
// This is especially important because MDX compilation is not instant.
export default function BlogPostLoading() {
  return (
    <article className="relative animate-pulse">
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="min-w-0 flex-1">

          {/* Header skeleton */}
          <header className="mb-6 space-y-3">
            {/* Meta line */}
            <div className="flex items-center gap-3">
              <div className="h-3 w-20 rounded bg-muted" />
              <div className="h-1 w-1 rounded-full bg-muted" />
              <div className="h-3 w-24 rounded bg-muted" />
              <div className="h-1 w-1 rounded-full bg-muted" />
              <div className="h-3 w-16 rounded bg-muted" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <div className="h-8 w-full rounded-lg bg-muted" />
              <div className="h-8 w-3/4 rounded-lg bg-muted" />
            </div>

            {/* Badges */}
            <div className="flex gap-2 pt-1">
              <div className="h-7 w-24 rounded-md bg-muted" />
              <div className="h-7 w-20 rounded-md bg-muted" />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <div className="h-4 w-full rounded bg-muted" />
              <div className="h-4 w-2/3 rounded bg-muted" />
            </div>

            {/* Thumbnail */}
            <div className="mt-4 aspect-video w-full rounded-2xl bg-muted" />

            {/* Tags */}
            <div className="flex gap-2 mt-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-5 w-16 rounded-md bg-muted" />
              ))}
            </div>
          </header>

          {/* Article body skeleton */}
          <div className="space-y-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                {i % 3 === 0 && (
                  <div className="h-6 w-1/3 rounded bg-muted mt-6" />
                )}
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-4/5 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>

        {/* TOC skeleton */}
        <aside className="hidden lg:block w-56 shrink-0">
          <div className="sticky top-24 space-y-3">
            <div className="h-4 w-24 rounded bg-muted" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-3 rounded bg-muted"
                style={{ width: `${60 + (i % 3) * 15}%` }}
              />
            ))}
          </div>
        </aside>
      </div>
    </article>
  );
}