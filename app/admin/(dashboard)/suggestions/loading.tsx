import { Skeleton } from "@/components/ui/skeleton"

export default function SuggestionsLoading() {
  return (
    <div className="space-y-4">
      {/* Search + filters bar */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 flex-1 max-w-sm rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>
      {/* Table */}
      <div className="rounded-xl border">
        <div className="flex items-center gap-4 px-4 py-3 border-b bg-muted/30">
          <Skeleton className="h-4 w-48 flex-1" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-4 border-b last:border-0">
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-3 w-40" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  )
}
