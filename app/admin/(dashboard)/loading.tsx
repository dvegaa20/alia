import { Skeleton } from "@/components/ui/skeleton"

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-10">
      {/* Stats Grid Skeleton — matches grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border bg-card p-6 shadow-sm space-y-3">
            <Skeleton className="h-3 w-32" /> {/* Card title */}
            <Skeleton className="h-8 w-16" /> {/* Big number */}
          </div>
        ))}
      </section>

      {/* Table Skeleton */}
      <div className="space-y-4">
        {/* Search + filters bar */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 flex-1 max-w-sm rounded-lg" /> {/* Search input */}
          <Skeleton className="h-10 w-32 rounded-lg" /> {/* Status filter */}
        </div>
        {/* Table */}
        <div className="rounded-xl border">
          {/* Header */}
          <div className="flex items-center gap-4 px-4 py-3 border-b bg-muted/30">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-40 flex-1" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
          {/* Rows */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-4 py-4 border-b last:border-0">
              <Skeleton className="h-10 w-10 rounded-lg" /> {/* Logo */}
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-48" /> {/* Name */}
                <Skeleton className="h-3 w-32" /> {/* Slug */}
              </div>
              <Skeleton className="h-6 w-20 rounded-full" /> {/* Status badge */}
              <Skeleton className="h-4 w-16" /> {/* Category */}
              <Skeleton className="h-8 w-8 rounded-lg" /> {/* Actions */}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
