import { Skeleton } from '@/components/ui/skeleton'

export default function OrgProfileLoading() {
  return (
    <div className="pt-4 pb-20 max-w-[1600px] mx-auto px-6 lg:px-8">
      {/* Hero Cover Skeleton */}
      <Skeleton className="h-75 md:h-112.5 w-full rounded-xl" />

      {/* Logo placeholder */}
      <div className="relative -mt-16 ml-6 md:ml-12 mb-8">
        <Skeleton className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-background" />
      </div>

      {/* Org Header Skeleton */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-64" /> {/* Name */}
          <Skeleton className="h-5 w-5 rounded-full" /> {/* Verified badge */}
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24 rounded-full" /> {/* Category badge 1 */}
          <Skeleton className="h-6 w-20 rounded-full" /> {/* Category badge 2 */}
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="space-y-6">
        <div className="flex gap-4 border-b border-border pb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-24 rounded-lg" />
          ))}
        </div>
        {/* Tab content placeholder */}
        <div className="space-y-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-4/6" />
          <Skeleton className="h-40 w-full rounded-xl mt-4" />
        </div>
      </div>
    </div>
  )
}
