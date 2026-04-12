'use client'

import { useState, useTransition, useEffect, useRef, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  Search,
  MoreVertical,
  Pencil,
  Star,
  StarOff,
  Eye,
  CheckCircle2,
  EyeOff,
  Trash2,
  Building2,
  Loader2,
  ArrowDownNarrowWide,
  ArrowUpNarrowWide,
} from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  toggleOrgStatus,
  toggleOrgFeatured,
  deleteOrganization,
  getOrganizationById,
  upsertOrganization,
} from '@/server/actions'
import type { OrganizationStatus } from '@/prisma/generated/enums'
import { OrganizationSheet } from './organization-sheet'
import { AdminPagination } from './admin-pagination'
import type {
  OrgWithAllRelations,
  OrgWithRelations,
  OrganizationsTableProps as Props,
} from '@/types'

import { ORG_STATUS_CONFIG } from '@/lib/constants'

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function OrganizationsTable({ organizations, meta, categories }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [isFilteringStatus, startFilteringStatus] = useTransition()

  // Local state for search input (debounced push to URL)
  const [searchInput, setSearchInput] = useState(searchParams.get('q') ?? '')
  const [isDebouncing, setIsDebouncing] = useState(false)
  const initialMount = useRef(true)

  const isSearchLoading = isPending || isDebouncing

  // Alert dialog for soft-delete confirmation
  const [deleteTarget, setDeleteTarget] = useState<{
    id: string
    name: string
  } | null>(null)

  // Sheet state
  const [sheetOpen, setSheetOpen] = useState(false)
  const [isLoadingOrg, setIsLoadingOrg] = useState(false)
  const [editingOrg, setEditingOrg] = useState<OrgWithAllRelations | null>(null)

  useEffect(() => {
    if (searchParams.get('action') === 'new-org') {
      setEditingOrg(null)
      setIsLoadingOrg(false)
      setSheetOpen(true)
      const sp = new URLSearchParams(searchParams.toString())
      sp.delete('action')
      router.replace(`?${sp.toString()}`, { scroll: false })
    }
  }, [searchParams, router])

  async function handleEditClick(id: string) {
    // Open sheet immediately — show skeleton while data loads
    setEditingOrg(null)
    setIsLoadingOrg(true)
    setSheetOpen(true)

    const result = await getOrganizationById(id)
    if (result.success && result.data) {
      setEditingOrg(result.data)
    }
    setIsLoadingOrg(false)
  }

  // ------ URL helpers ------
  const pushParams = useCallback(
    (params: Record<string, string | undefined>) => {
      const sp = new URLSearchParams(searchParams.toString())
      Object.entries(params).forEach(([key, value]) => {
        if (value) {
          sp.set(key, value)
        } else {
          sp.delete(key)
        }
      })
      // Always reset to page 1 when filters change (except when changing page itself)
      if (!('page' in params)) {
        sp.delete('page')
      }
      startTransition(() => {
        router.push(`?${sp.toString()}`)
      })
    },
    [router, searchParams]
  )

  // Debounced search
  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false
      return
    }

    setIsDebouncing(true)
    const handler = setTimeout(() => {
      pushParams({ q: searchInput || undefined })
      setIsDebouncing(false)
    }, 400)

    return () => clearTimeout(handler)
  }, [searchInput, pushParams])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    pushParams({ q: searchInput || undefined })
  }

  const currentStatus = searchParams.get('status') ?? 'ALL'
  const currentSort = searchParams.get('sort') ?? 'createdAt'
  const currentOrder = (searchParams.get('order') as 'asc' | 'desc') ?? 'desc'

  function toggleOrder() {
    const sp = new URLSearchParams(searchParams.toString())
    sp.set('order', currentOrder === 'desc' ? 'asc' : 'desc')
    sp.delete('page')
    startFilteringStatus(() => {
      router.push(`?${sp.toString()}`)
    })
  }

  // ------ Server action wrappers ------

  async function handleToggleFeatured(id: string) {
    startTransition(async () => {
      await toggleOrgFeatured(id)
    })
  }

  async function handleChangeStatus(id: string, status: OrganizationStatus) {
    startTransition(async () => {
      await toggleOrgStatus(id, status)
    })
  }

  async function handleDelete() {
    if (!deleteTarget) return
    startTransition(async () => {
      await deleteOrganization(deleteTarget.id)
      setDeleteTarget(null)
    })
  }

  // Using shared AdminPagination component

  return (
    <>
      <section className="bg-card rounded-lg overflow-hidden border shadow-sm">
        {/* Header */}
        <div className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b bg-transparent">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-card-foreground">Gestión de Organizaciones</h2>
            <p className="text-sm text-muted-foreground">
              Visualiza y administra el directorio de ONGs.
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Search */}
            <form onSubmit={handleSearch} className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                className="pl-10 pr-10 py-2 bg-muted border-none rounded-md text-sm w-full focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:ring-offset-0 transition-all"
                placeholder="Buscar por nombre..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              {isSearchLoading && (
                <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 animate-spin" />
              )}
            </form>

            {/* Status Filter */}
            <Select
              value={currentStatus}
              onValueChange={(value) => {
                const sp = new URLSearchParams(searchParams.toString())
                if (value === 'ALL') {
                  sp.delete('status')
                } else {
                  sp.set('status', value)
                }
                sp.delete('page')
                startFilteringStatus(() => {
                  router.push(`?${sp.toString()}`)
                })
              }}
            >
              <SelectTrigger className="w-40 bg-muted border-none text-sm">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todos</SelectItem>
                <SelectItem value="PUBLISHED">Publicadas</SelectItem>
                <SelectItem value="DRAFT">Borradores / Ocultas</SelectItem>
                <SelectItem value="ARCHIVED">Archivadas</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Filter */}
            <div className="flex items-center gap-1">
              <Select
                value={currentSort}
                onValueChange={(value) => {
                  const sp = new URLSearchParams(searchParams.toString())
                  sp.set('sort', value)
                  sp.delete('page')
                  startFilteringStatus(() => {
                    router.push(`?${sp.toString()}`)
                  })
                }}
              >
                <SelectTrigger className="w-32 bg-muted border-none text-sm">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="createdAt">Registro</SelectItem>
                  <SelectItem value="name">Nombre</SelectItem>
                  <SelectItem value="featured">Destacados</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={toggleOrder}
                className="h-9 w-9 border-none bg-muted hover:bg-muted/80 shrink-0"
                title={currentOrder === 'desc' ? 'Orden Descendente' : 'Orden Ascendente'}
              >
                {currentOrder === 'desc' ? (
                  <ArrowDownNarrowWide className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ArrowUpNarrowWide className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="relative overflow-x-auto">
          {isFilteringStatus && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-[1px]">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
          )}
          <Table className="w-full text-left">
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="px-8 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Organización
                </TableHead>
                <TableHead className="px-8 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Categoría
                </TableHead>
                <TableHead className="px-8 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Ubicación
                </TableHead>
                <TableHead className="px-8 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Estado
                </TableHead>
                <TableHead className="px-8 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider text-right">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {organizations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="px-8 py-16 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Building2 className="h-8 w-8 opacity-40" />
                      <p className="text-sm font-medium">No se encontraron organizaciones</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                organizations.map((org) => {
                  const statusCfg = ORG_STATUS_CONFIG[org.status] ?? ORG_STATUS_CONFIG.DRAFT
                  const isPublished = org.status === 'PUBLISHED'

                  return (
                    <TableRow key={org.id} className="group">
                      {/* Org info */}
                      <TableCell className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden shrink-0">
                            {org.logoUrl ? (
                              <Image
                                src={org.logoUrl}
                                alt={`${org.name} Logo`}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Building2 className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-sm text-foreground truncate">
                                {org.name}
                              </span>
                              {org.featured && (
                                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500 shrink-0" />
                              )}
                            </div>
                            <span className="text-xs text-muted-foreground truncate">
                              {org.website || org.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Category */}
                      <TableCell className="px-8 py-5">
                        {org.categories.length > 0 ? (
                          <span className="px-3 py-1 bg-muted text-foreground text-[11px] font-bold rounded-full uppercase tracking-tighter">
                            {org.categories[0].name}
                          </span>
                        ) : (
                          <span className="text-xs text-muted-foreground italic">
                            Sin categoría
                          </span>
                        )}
                      </TableCell>

                      {/* Location */}
                      <TableCell className="px-8 py-5">
                        <span className="text-sm text-muted-foreground">
                          {org.location ? `${org.location.city}, ${org.location.state}` : '—'}
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${statusCfg.dotColor}`} />
                          <span className={`text-sm font-medium ${statusCfg.textColor}`}>
                            {statusCfg.label}
                          </span>
                        </div>
                      </TableCell>

                      {/* Actions */}
                      <TableCell className="px-8 py-5 text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-52">
                            {/* Edit */}
                            <DropdownMenuItem onClick={() => handleEditClick(org.id)}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Editar Perfil
                            </DropdownMenuItem>

                            {/* Toggle Featured */}
                            <DropdownMenuItem onClick={() => handleToggleFeatured(org.id)}>
                              {org.featured ? (
                                <>
                                  <StarOff className="h-4 w-4 mr-2" />
                                  Quitar Destacado
                                </>
                              ) : (
                                <>
                                  <Star className="h-4 w-4 mr-2" />
                                  Destacar
                                </>
                              )}
                            </DropdownMenuItem>

                            {/* View public profile */}
                            <DropdownMenuItem asChild>
                              <Link
                                href={`/directory/${org.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Ver perfil público
                              </Link>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            {/* Publish / Hide / Reject */}
                            {!isPublished && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleChangeStatus(org.id, 'PUBLISHED' as OrganizationStatus)
                                }
                              >
                                <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-600" />
                                Publicar
                              </DropdownMenuItem>
                            )}

                            {isPublished && (
                              <DropdownMenuItem
                                onClick={() =>
                                  handleChangeStatus(org.id, 'DRAFT' as OrganizationStatus)
                                }
                              >
                                <EyeOff className="h-4 w-4 mr-2" />
                                Ocultar
                              </DropdownMenuItem>
                            )}

                            <DropdownMenuSeparator />

                            {/* Soft Delete */}
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600"
                              onClick={() => setDeleteTarget({ id: org.id, name: org.name })}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  )
                })
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <AdminPagination meta={meta} />
      </section>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar organización?</AlertDialogTitle>
            <AlertDialogDescription>
              La organización{' '}
              <span className="font-semibold text-foreground">{deleteTarget?.name}</span> será
              archivada y eliminada de las tablas principales. No aparecerá en el directorio público
              pero se conservará en la base de datos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700 ">
              {isPending ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Organization Sheet */}
      <OrganizationSheet
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open)
          if (!open) {
            setEditingOrg(null)
            setIsLoadingOrg(false)
          }
        }}
        organization={editingOrg}
        isLoading={isLoadingOrg}
        categories={categories || []}
        onSave={upsertOrganization}
      />
    </>
  )
}
