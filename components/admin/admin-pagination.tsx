'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import type { PaginationMeta } from '@/types'

interface AdminPaginationProps {
  meta: PaginationMeta
  onPageChange?: (page: number) => void
}

export function AdminPagination({ meta, onPageChange }: AdminPaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { page, totalPages, total, limit } = meta

  if (total <= 0) return null

  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)

  function pushParams(updates: Record<string, string>) {
    // If it's a client-side only table, use the callback instead of URL routing
    if (onPageChange && updates.page) {
      onPageChange(Number(updates.page))
      return
    }

    const sp = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      sp.set(key, value)
    })
    router.push(`${pathname}?${sp.toString()}`, { scroll: false })
  }

  return (
    <div className="px-8 py-4 flex items-center justify-between border-t border-border">
      <span className="text-xs text-muted-foreground">
        Mostrando {start} a {end} de {total} resultados
      </span>
      <div className="flex items-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() => pushParams({ page: String(page - 1) })}
          className="px-3 py-1 rounded border-none bg-muted text-muted-foreground hover:bg-muted/80 transition-colors text-xs disabled:cursor-not-allowed disabled:opacity-50"
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => pushParams({ page: String(p) })}
            className={`px-3 py-1 rounded border-none transition-colors text-xs ${
              p === page
                ? 'bg-muted text-foreground font-bold'
                : 'text-muted-foreground hover:bg-muted'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          disabled={page >= totalPages}
          onClick={() => pushParams({ page: String(page + 1) })}
          className="px-3 py-1 rounded border-none bg-muted text-muted-foreground hover:bg-muted/80 transition-colors text-xs disabled:cursor-not-allowed disabled:opacity-50"
        >
          &gt;
        </button>
      </div>
    </div>
  )
}
