import { Skeleton } from '@/components/ui/skeleton'

export default function DirectoryLoading() {
  return (
    <div className="pt-8 pb-12 w-full max-w-360 mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-6 lg:gap-12">
      {/* Sidebar skeleton */}
      <aside className="hidden lg:block w-72 shrink-0 space-y-6">
        <Skeleton className="h-10 w-full rounded-lg" /> {/* Search */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-20" /> {/* "Categorías" label */}
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-full rounded-lg" />
          ))}
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-16" /> {/* "Estado" label */}
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </aside>

      {/* Results grid skeleton */}
      <div className="flex-1 min-w-0 w-full">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-5 w-32" /> {/* "X resultados" */}
          <Skeleton className="h-9 w-36 rounded-lg" /> {/* Sort dropdown */}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-border/50 overflow-hidden">
              <Skeleton className="h-40 w-full rounded-none" /> {/* Cover */}
              <div className="px-6 pb-4 pt-10 space-y-3">
                <Skeleton className="h-5 w-3/4" /> {/* Name */}
                <Skeleton className="h-4 w-full" /> {/* Description line 1 */}
                <Skeleton className="h-4 w-2/3" /> {/* Description line 2 */}
                <div className="flex items-center gap-2 pt-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-3 w-24" /> {/* Location */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
