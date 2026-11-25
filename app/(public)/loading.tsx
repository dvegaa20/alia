import { Skeleton } from '@/components/ui/skeleton'

export default function HomeLoading() {
  return (
    <>
      {/* Full-Width Hero Skeleton */}
      <div className="relative w-full min-h-[88vh] lg:min-h-[92vh] bg-[#0C354C] flex items-center justify-center px-6">
        <div className="max-w-4xl w-full mx-auto flex flex-col items-center space-y-6 pt-20">
          <Skeleton className="h-7 w-56 rounded-[4px] bg-[#124866]" />
          <Skeleton className="h-16 w-4/5 rounded-[4px] bg-[#124866]" />
          <Skeleton className="h-16 w-3/5 rounded-[4px] bg-[#124866]" />
          <Skeleton className="h-6 w-2/3 rounded-[4px] bg-[#124866]" />
          <div className="flex gap-4 pt-2">
            <Skeleton className="h-12 w-48 rounded-[4px] bg-[#124866]" />
            <Skeleton className="h-12 w-44 rounded-[4px] bg-[#124866]" />
          </div>
        </div>
      </div>

      {/* Category Section Skeleton */}
      <div className="bg-[#F5EEDD] border-b border-[#DFD5C0] py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
          <div className="flex flex-wrap gap-3 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-28 rounded-[4px] bg-[#EAE1CD]" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="space-y-3 rounded-[8px] border border-[#DFD5C0] p-4 bg-[#FAF7F0]"
              >
                <Skeleton className="h-40 w-full rounded-[4px] bg-[#EAE1CD]" />
                <Skeleton className="h-5 w-3/4 bg-[#EAE1CD]" />
                <Skeleton className="h-4 w-1/2 bg-[#EAE1CD]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
