import { Skeleton } from "@/components/ui/skeleton"

export default function CategoriesLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" /> {/* Title */}
        <Skeleton className="h-10 w-40 rounded-lg" /> {/* "Nueva categoría" button */}
      </div>
      <div className="rounded-xl border">
        <div className="flex items-center gap-4 px-4 py-3 border-b bg-muted/30">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-24 flex-1" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-4 border-b last:border-0">
            <Skeleton className="h-6 w-6 rounded-full" /> {/* Icon */}
            <div className="flex-1 space-y-1.5">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-64" />
            </div>
            <Skeleton className="h-6 w-12 rounded-full" /> {/* Count badge */}
            <Skeleton className="h-8 w-8 rounded-lg" /> {/* Actions */}
          </div>
        ))}
      </div>
    </div>
  )
}
