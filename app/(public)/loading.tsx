import { Skeleton } from '@/components/ui/skeleton'

export default function HomeLoading() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <div className="relative w-full">
        <Skeleton className="w-full h-[500px] md:h-[600px] rounded-none" />
      </div>

      {/* Category Section Skeleton */}
      <div className="py-20 px-8 max-w-400 mx-auto">
        {/* Category pills */}
        <div className="flex gap-3 mb-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-28 rounded-full" />
          ))}
        </div>
        {/* Carousel cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
