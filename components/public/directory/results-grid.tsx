'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { SearchX, LayoutGrid, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { OrganizationCard, type OrganizationCardProps } from './organization-card'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { MapView } from './map-view'
import type { ViewMode, ResultsGridProps, MapPoint } from '@/types'

function buildPageHref(page: number, searchQuery?: string, sort?: string) {
  const params = new URLSearchParams()
  if (searchQuery) params.set('q', searchQuery)
  if (sort) params.set('sort', sort)
  if (page > 1) params.set('page', String(page))
  const qs = params.toString()
  return `/directory${qs ? `?${qs}` : ''}`
}

export function ResultsGrid({
  organizations,
  mapPoints,
  total,
  currentPage,
  totalPages,
  searchQuery,
  sort = 'relevance',
}: ResultsGridProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentView: ViewMode = (searchParams.get('view') as ViewMode) || 'list'

  const handleViewChange = (view: ViewMode) => {
    const params = new URLSearchParams(searchParams.toString())
    if (view === 'list') {
      params.delete('view')
    } else {
      params.set('view', view)
    }
    const qs = params.toString()
    router.push(`/directory${qs ? `?${qs}` : ''}`, { scroll: false })
  }

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    // Reset to page 1 on sort to prevent empty pages
    params.delete('page')
    const qs = params.toString()
    router.push(`/directory${qs ? `?${qs}` : ''}`, { scroll: false })
  }
  const hasResults = organizations.length > 0

  return (
    <section className="flex-1 min-w-0 bg-slate-50/40 dark:bg-zinc-900/20 p-6 md:p-8 rounded-3xl border border-border/30">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <h1 className="text-4xl font-extrabold text-foreground tracking-tight font-headline mb-2">
            Resultados
          </h1>
          <div className="flex items-center space-x-2 text-muted-foreground font-medium">
            <span className="text-primary-900 dark:text-primary-200 font-bold">{total}</span>
            <span>{total === 1 ? 'organización encontrada' : 'organizaciones encontradas'}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort — only visible in list view */}
          {currentView === 'list' && (
            <div className="flex items-center space-x-4 text-sm font-medium">
              <span className="text-muted-foreground">Ordenar por:</span>
              <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger className="border-none shadow-none bg-transparent hover:text-primary-900 dark:hover:text-primary-200 p-0 px-2 h-auto font-medium space-x-1 focus:ring-0">
                  <SelectValue placeholder="Relevancia" />
                </SelectTrigger>
                <SelectContent position="popper" align="end" className="w-45">
                  <SelectItem value="relevance">Relevancia</SelectItem>
                  <SelectItem value="oldest">Antiguas primero</SelectItem>
                  <SelectItem value="name-asc">Nombre (A - Z)</SelectItem>
                  <SelectItem value="name-desc">Nombre (Z - A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* View Toggle */}
          <div className="flex items-center bg-muted rounded-xl p-1 gap-0.5">
            <button
              onClick={() => handleViewChange('list')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                currentView === 'list'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <LayoutGrid className="size-4" />
              <span className="hidden sm:inline">Lista</span>
            </button>
            <button
              onClick={() => handleViewChange('map')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                currentView === 'map'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <MapPin className="size-4" />
              <span className="hidden sm:inline">Mapa</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Content: List View or Map View */}
      <AnimatePresence mode="wait">
        {currentView === 'map' ? (
          <motion.div
            key="map-view"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <MapView total={total} mapPoints={mapPoints} />
          </motion.div>
        ) : hasResults ? (
          <motion.div
            key={`grid-${searchQuery}-${currentPage}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
          >
            {organizations.map((org, idx) => (
              <motion.div
                key={org.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
              >
                <OrganizationCard {...org} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mb-6">
              <SearchX className="size-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground font-headline mb-2">
              Sin resultados
            </h2>
            <p className="text-muted-foreground font-medium max-w-sm">
              {searchQuery
                ? `No encontramos organizaciones para "${searchQuery}". Intenta con otro término.`
                : 'No hay organizaciones disponibles en este momento.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination — only in list view */}
      {currentView === 'list' && totalPages > 1 && (
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href={buildPageHref(currentPage - 1, searchQuery, sort)}
                    text="Anterior"
                  />
                </PaginationItem>
              )}

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((page) => {
                  // Show first, last, current, and neighbors
                  if (page === 1 || page === totalPages) return true
                  if (Math.abs(page - currentPage) <= 1) return true
                  return false
                })
                .reduce<(number | 'ellipsis')[]>((acc, page, idx, arr) => {
                  if (idx > 0 && page - (arr[idx - 1] as number) > 1) {
                    acc.push('ellipsis')
                  }
                  acc.push(page)
                  return acc
                }, [])
                .map((item, idx) =>
                  item === 'ellipsis' ? (
                    <PaginationItem key={`ellipsis-${idx}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={item}>
                      <PaginationLink
                        href={buildPageHref(item, searchQuery, sort)}
                        isActive={item === currentPage}
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}

              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href={buildPageHref(currentPage + 1, searchQuery, sort)}
                    text="Siguiente"
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </motion.footer>
      )}
    </section>
  )
}
