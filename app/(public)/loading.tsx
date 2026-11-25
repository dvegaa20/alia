import { Skeleton } from '@/components/ui/skeleton'

export default function HomeLoading() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <Skeleton className="h-7 w-56 rounded-full" />
            <Skeleton className="h-16 w-full rounded-xl" />
            <Skeleton className="h-16 w-4/5 rounded-xl" />
            <Skeleton className="h-14 w-full max-w-xl rounded-xl" />
            <div className="flex gap-3 pt-2">
              <Skeleton className="h-11 w-44 rounded-full" />
              <Skeleton className="h-11 w-40 rounded-full" />
            </div>
          </div>
          <div className="lg:col-span-5">
            <Skeleton className="aspect-[5/6] w-full rounded-2xl" />
          </div>
        </div>
      </div>

      {/* Category Section Skeleton */}
      <div className="bg-surface border-y border-border/70 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex gap-3 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-28 rounded-full" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="space-y-3 rounded-[20px] border border-border p-4 bg-background/40"
              >
                <Skeleton className="h-40 w-full rounded-xl" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
