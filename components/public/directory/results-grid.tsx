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
import { OrganizationCard } from './organization-card'
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
import type { ViewMode, ResultsGridProps } from '@/types'

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
    params.delete('page')
    const qs = params.toString()
    router.push(`/directory${qs ? `?${qs}` : ''}`, { scroll: false })
  }

  const hasResults = organizations.length > 0

  return (
    <section className="flex-1 min-w-0 space-y-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-border"
      >
        <div className="space-y-1">
          <h1 className="font-sans text-3xl sm:text-4xl font-light tracking-normal text-[#0C354C]">
            Directorio de{' '}
            <span className="font-serif italic font-normal text-[#16587B]">causas</span>
          </h1>
          <div className="flex items-center gap-2 text-sm text-[#0C354C]/75">
            <span className="font-mono font-medium tabular-nums text-[#16587B]">{total}</span>
            <span>{total === 1 ? 'organización encontrada' : 'organizaciones encontradas'}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Sort — only visible in list view */}
          {currentView === 'list' && (
            <div className="flex items-center gap-2 text-sm">
              <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#0C354C]/60">
                Ordenar:
              </span>
              <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger className="rounded-[4px] border border-[#DFD5C0] bg-[#FAF7F0] hover:border-[#84B3CE] px-3 h-9 text-sm font-medium text-[#0C354C] focus:ring-0">
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
          <div className="flex items-center bg-[#FAF7F0] border border-[#DFD5C0] rounded-[4px] p-1 gap-0.5">
            <button
              type="button"
              onClick={() => handleViewChange('list')}
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-colors duration-200 cursor-pointer',
                currentView === 'list'
                  ? 'bg-[#16587B] text-white'
                  : 'text-[#0C354C]/75 hover:text-[#16587B]'
              )}
            >
              <LayoutGrid className="size-3.5" strokeWidth={1.5} />
              <span>Lista</span>
            </button>
            <button
              type="button"
              onClick={() => handleViewChange('map')}
              className={cn(
                'flex items-center gap-1.5 px-3.5 py-1.5 rounded-[4px] text-xs font-medium transition-colors duration-200 cursor-pointer',
                currentView === 'map'
                  ? 'bg-[#16587B] text-white'
                  : 'text-[#0C354C]/75 hover:text-[#16587B]'
              )}
            >
              <MapPin className="size-3.5" strokeWidth={1.5} />
              <span>Mapa</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Content: List View or Map View */}
      <AnimatePresence mode="wait">
        {currentView === 'map' ? (
          <motion.div
            key="map-view"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <MapView total={total} mapPoints={mapPoints} />
          </motion.div>
        ) : hasResults ? (
          <motion.div
            key={`grid-${searchQuery}-${currentPage}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6"
          >
            {organizations.map((org, idx) => (
              <motion.div
                key={org.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
              >
                <OrganizationCard {...org} surface="on-merino" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col items-center justify-center py-24 text-center rounded-[20px] border border-border bg-surface px-6"
          >
            <div className="size-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
              <SearchX className="size-8" strokeWidth={1.5} />
            </div>
            <h2 className="font-sans text-2xl font-semibold text-foreground mb-2">
              Sin resultados
            </h2>
            <p className="font-sans text-sm text-foreground-secondary max-w-sm">
              {searchQuery
                ? `No encontramos organizaciones para "${searchQuery}". Intenta con otro término.`
                : 'No hay organizaciones disponibles con los filtros actuales.'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {currentView === 'list' && totalPages > 1 && (
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="pt-8"
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
