import { Skeleton } from '@/components/ui/skeleton'

export function CategoryCarouselSkeleton() {
  return (
    <div className="rounded-2xl border border-[#DFD5C0] bg-[#FAF7F0] p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-5 space-y-4">
        <Skeleton className="h-6 w-28 rounded-full bg-[#EAE1CD]" />
        <Skeleton className="h-9 w-4/5 bg-[#EAE1CD]" />
        <Skeleton className="h-4 w-full bg-[#EAE1CD]" />
        <Skeleton className="h-4 w-3/4 bg-[#EAE1CD]" />
      </div>
      <div className="lg:col-span-7">
        <Skeleton className="aspect-[16/10] w-full rounded-xl bg-[#EAE1CD]" />
      </div>
    </div>
  )
}

export function CategorySectionSkeleton() {
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-28 rounded-full bg-[#EAE1CD]" />
        ))}
      </div>
      <div className="mt-8">
        <CategoryCarouselSkeleton />
      </div>
    </div>
  )
}

export function NewAdditionsSkeleton() {
  return (
    <div className="mt-20 pt-16 border-t border-[#DFD5C0] space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2.5">
          <Skeleton className="h-4 w-28 bg-[#EAE1CD]" />
          <Skeleton className="h-9 w-72 bg-[#EAE1CD]" />
          <Skeleton className="h-4 w-96 max-w-full bg-[#EAE1CD]" />
        </div>
        <Skeleton className="h-10 w-48 rounded-full bg-[#EAE1CD]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="rounded-[20px] border border-[#DFD5C0] bg-[#FAF7F0] overflow-hidden"
          >
            <Skeleton className="h-40 w-full rounded-none bg-[#EAE1CD]" />
            <div className="px-6 pb-5 pt-9 space-y-3">
              <Skeleton className="h-5 w-3/4 bg-[#EAE1CD]" />
              <Skeleton className="h-4 w-full bg-[#EAE1CD]" />
              <Skeleton className="h-4 w-2/3 bg-[#EAE1CD]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FeaturesSectionSkeleton() {
  return (
    <section
      data-nav-theme="dark"
      className="min-h-[100dvh] w-full flex flex-col justify-center bg-[#0C354C] py-20 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-14 space-y-12">
        <div className="space-y-3">
          <Skeleton className="h-4 w-56 bg-[#124866]" />
          <Skeleton className="h-12 w-72 bg-[#124866]" />
          <Skeleton className="h-5 w-96 max-w-full bg-[#124866]" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-[#84B3CE]/20 bg-[#124866]/50 p-6 space-y-4"
            >
              <Skeleton className="h-10 w-10 rounded-xl bg-[#124866]" />
              <Skeleton className="h-10 w-28 bg-[#124866]" />
              <Skeleton className="h-4 w-3/4 bg-[#124866]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function TrustSectionSkeleton() {
  return (
    <section
      data-nav-theme="light"
      className="min-h-[100dvh] w-full flex flex-col justify-center bg-[#F5EEDD] py-20 lg:py-24"
    >
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-10 lg:px-14 space-y-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-5">
            <Skeleton className="h-4 w-36 bg-[#EAE1CD]" />
            <Skeleton className="h-12 w-4/5 bg-[#EAE1CD]" />
            <Skeleton className="h-5 w-full bg-[#EAE1CD]" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <Skeleton className="h-40 w-full rounded-2xl bg-[#EAE1CD]" />
              <Skeleton className="h-40 w-full rounded-2xl bg-[#EAE1CD]" />
            </div>
          </div>
          <div className="lg:col-span-6">
            <Skeleton className="aspect-[4/3] w-full rounded-2xl bg-[#EAE1CD]" />
          </div>
        </div>
      </div>
    </section>
  )
}
