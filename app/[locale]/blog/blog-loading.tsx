// Fix #9: loading.tsx — shown instantly by React Suspense while the page
// fetches its data. Appears before any JS runs, purely CSS.
export default function BlogIndexLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">

        {/* Header skeleton */}
        <div className="space-y-8">
          <div className="flex items-start gap-4">
            <div className="mt-1 h-12 w-12 rounded-xl bg-muted" />
            <div className="space-y-2 flex-1">
              <div className="h-8 w-48 rounded-lg bg-muted" />
              <div className="h-4 w-80 rounded bg-muted" />
            </div>
          </div>

          {/* Category filter skeleton */}
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 w-24 rounded-full bg-muted" />
            ))}
          </div>

          {/* Stats skeleton */}
          <div className="grid grid-cols-3 gap-px rounded-xl overflow-hidden border border-border bg-border">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-card px-4 py-4 flex flex-col items-center gap-2">
                <div className="h-4 w-4 rounded bg-muted" />
                <div className="h-7 w-12 rounded bg-muted" />
                <div className="h-3 w-16 rounded bg-muted" />
              </div>
            ))}
          </div>

          <div className="border-t border-border" />
        </div>

        {/* Cards skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row h-32 rounded-2xl border border-border bg-card/60 overflow-hidden"
            >
              <div className="w-full sm:w-44 md:w-52 flex-shrink-0 bg-muted" />
              <div className="flex-1 p-4 sm:p-5 space-y-3">
                <div className="flex gap-3">
                  <div className="h-3 w-24 rounded bg-muted" />
                  <div className="h-3 w-16 rounded bg-muted" />
                  <div className="h-3 w-20 rounded-full bg-muted" />
                </div>
                <div className="h-5 w-3/4 rounded bg-muted" />
                <div className="h-4 w-full rounded bg-muted" />
                <div className="h-4 w-2/3 rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}