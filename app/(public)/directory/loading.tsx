import { Skeleton } from '@/components/ui/skeleton'

export default function DirectoryLoading() {
  return (
    <div className="pt-28 pb-20 w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 flex flex-col lg:flex-row gap-6 lg:gap-10">
      {/* Sidebar skeleton */}
      <aside className="hidden lg:block w-72 shrink-0 space-y-6 rounded-2xl border border-[#DFD5C0] bg-[#FAF7F0] p-5 h-fit">
        <Skeleton className="h-10 w-full rounded-xl" />
        <div className="space-y-3">
          <Skeleton className="h-4 w-20" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-xl" />
          ))}
        </div>
        <div className="space-y-3">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-10 w-full rounded-xl" />
        </div>
      </aside>

      {/* Results grid skeleton */}
      <div className="flex-1 min-w-0 w-full space-y-6">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-9 w-36 rounded-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-[20px] border border-border bg-surface overflow-hidden">
              <Skeleton className="h-40 w-full rounded-none" />
              <div className="px-6 pb-5 pt-9 space-y-3">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex items-center gap-2 pt-2">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
