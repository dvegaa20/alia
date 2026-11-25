import { Skeleton } from '@/components/ui/skeleton'

export default function OrgProfileLoading() {
  return (
    <div className="pt-28 pb-20 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
      {/* Hero Cover Skeleton */}
      <Skeleton className="h-64 sm:h-80 md:h-[400px] w-full rounded-2xl" />

      {/* Logo placeholder */}
      <div className="relative -mt-14 ml-6 md:ml-10 mb-8">
        <Skeleton className="size-24 md:size-28 rounded-2xl border-4 border-background" />
      </div>

      {/* Org Header Skeleton */}
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="space-y-6">
        <div className="flex gap-6 border-b border-border pb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-24 rounded-full" />
          ))}
        </div>
        <div className="space-y-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-4/6" />
          <Skeleton className="h-44 w-full rounded-[20px] mt-4" />
        </div>
      </div>
    </div>
  )
}
