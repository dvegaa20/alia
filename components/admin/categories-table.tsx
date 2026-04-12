'use client'

import { useState, useTransition, useEffect } from 'react'
import {
  MoreVertical,
  Pencil,
  Trash2,
  Tags,
  Search,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { deleteAdminCategory } from '@/server/actions'
import { CategoryFormDialog } from './category-form-dialog'
import { AdminPagination } from './admin-pagination'
import type { CategoryWithCount, CategoriesTableProps as Props } from '@/types'

export function CategoriesTable({ categories }: Props) {
  const [isPending, startTransition] = useTransition()

  // Filter state
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState<'name' | 'count'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Pagination state
  const [page, setPage] = useState(1)
  const limit = 10

  // Reset page when search or sort changes
  useEffect(() => {
    setPage(1)
  }, [search, sortField, sortOrder])

  // Edit / Delete dialog states
  const [editCategory, setEditCategory] = useState<CategoryWithCount | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null)

  const filteredCategories = categories
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      let comparison = 0
      if (sortField === 'name') {
        comparison = a.name.localeCompare(b.name)
      } else if (sortField === 'count') {
        comparison = a._count.organizations - b._count.organizations
      }
      return sortOrder === 'asc' ? comparison : -comparison
    })

  // Pagination calculations
  const total = filteredCategories.length
  const totalPages = Math.ceil(total / limit)

  const paginatedCategories = filteredCategories.slice((page - 1) * limit, page * limit)

  async function handleDelete() {
    if (!deleteTarget) return
    startTransition(async () => {
      await deleteAdminCategory(deleteTarget.id)
      setDeleteTarget(null)
    })
  }

  return (
    <>
      <section className="bg-card rounded-lg overflow-hidden border shadow-sm">
        {/* Header */}
        <div className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b bg-transparent">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-card-foreground">Directorio de Categorías</h2>
            <p className="text-sm text-muted-foreground">
              Administra las áreas en las que operan las organizaciones.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                className="pl-10 pr-4 py-2 bg-muted border-none rounded-md text-sm w-full focus-visible:ring-1 focus-visible:ring-primary/50 focus-visible:ring-offset-0 transition-all"
                placeholder="Buscar por nombre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-1">
              <Select value={sortField} onValueChange={(v) => setSortField(v as 'name' | 'count')}>
                <SelectTrigger className="w-32 bg-muted border-none text-sm">
                  <SelectValue placeholder="Ordenar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nombre</SelectItem>
                  <SelectItem value="count">Organizaciones</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder((prev) => (prev === 'desc' ? 'asc' : 'desc'))}
                className="h-9 w-9 border-none bg-muted hover:bg-muted/80 shrink-0"
                title={sortOrder === 'desc' ? 'Orden Descendente' : 'Orden Ascendente'}
              >
                {sortOrder === 'desc' ? (
                  <ArrowDownNarrowWide className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ArrowUpNarrowWide className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            </div>

            <Button
              onClick={() => {
                setEditCategory(null)
                setIsEditDialogOpen(true)
              }}
            >
              Nueva Categoría
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="w-full text-left">
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="px-8 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Nombre
                </TableHead>
                <TableHead className="px-8 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Slug
                </TableHead>
                <TableHead className="px-8 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Descripción
                </TableHead>
                <TableHead className="px-8 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
                  Organizaciones
                </TableHead>
                <TableHead className="px-8 py-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider text-right">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="px-8 py-16 text-center text-muted-foreground">
                    <div className="flex flex-col items-center gap-2">
                      <Tags className="h-8 w-8 opacity-40" />
                      <p className="text-sm font-medium">No se encontraron categorías</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedCategories.map((cat) => (
                  <TableRow key={cat.id} className="group">
                    {/* Name */}
                    <TableCell className="px-8 py-5 font-bold text-sm text-foreground">
                      {cat.name}
                    </TableCell>

                    {/* Slug */}
                    <TableCell className="px-8 py-5">
                      <span className="px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        {cat.slug}
                      </span>
                    </TableCell>

                    {/* Description */}
                    <TableCell className="px-8 py-5">
                      <span className="text-sm text-muted-foreground line-clamp-1 max-w-sm">
                        {cat.description || '—'}
                      </span>
                    </TableCell>

                    {/* Count */}
                    <TableCell className="px-8 py-5 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        {cat._count.organizations}
                      </span>{' '}
                      asignadas
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
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditCategory(cat)
                              setIsEditDialogOpen(true)
                            }}
                          >
                            <Pencil className="h-4 w-4 mr-2" />
                            Editar
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            className="text-red-600 focus:text-red-600"
                            onClick={() => setDeleteTarget({ id: cat.id, name: cat.name })}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Eliminar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <AdminPagination meta={{ page, limit, total, totalPages }} onPageChange={setPage} />
      </section>

      {/* Forms and Dialogs */}
      <CategoryFormDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        initialData={
          editCategory
            ? {
                id: editCategory.id,
                name: editCategory.name,
                description: editCategory.description || undefined,
              }
            : null
        }
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar categoría?</AlertDialogTitle>
            <AlertDialogDescription>
              La categoría{' '}
              <span className="font-semibold text-foreground">{deleteTarget?.name}</span> será
              eliminada permanentemente. Las organizaciones asociadas perderán esta clasificación
              pero no serán borradas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              {isPending ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
