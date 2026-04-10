"use client"

import { useState, useTransition, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  Search,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Eye,
  ClipboardList,
  Loader2,
  ExternalLink,
  Clock,
  MapPin,
  Tag,
  FileText,
  Globe,
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { approveSuggestion, rejectSuggestion } from "@/server/actions"

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Suggestion = {
  id: string
  orgName: string
  category: string
  location: string
  description: string
  url: string
  status: "PENDING" | "APPROVED" | "REJECTED"
  adminNotes: string | null
  createdAt: string | Date
  reviewedAt: string | Date | null
}

type Props = {
  suggestions: Suggestion[]
  meta: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
}

// ---------------------------------------------------------------------------
// Status config
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<
  string,
  { label: string; dotColor: string; textColor: string }
> = {
  PENDING: {
    label: "Pendiente",
    dotColor: "bg-amber-500",
    textColor: "text-amber-700 dark:text-amber-400",
  },
  APPROVED: {
    label: "Aprobada",
    dotColor: "bg-emerald-500",
    textColor: "text-emerald-700 dark:text-emerald-400",
  },
  REJECTED: {
    label: "Rechazada",
    dotColor: "bg-red-500",
    textColor: "text-red-700 dark:text-red-400",
  },
}

// Category display name mapping based on what users submit
const CATEGORY_LABELS: Record<string, string> = {
  "medio-ambiente": "Medio Ambiente",
  "Medio Ambiente": "Medio Ambiente",
  salud: "Salud",
  Salud: "Salud",
  educacion: "Educación",
  "Educación": "Educación",
  animales: "Bienestar Animal",
  "Bienestar Animal": "Bienestar Animal",
  social: "Acción Social",
  "Acción Social": "Acción Social",
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatRelativeDate(dateInput: string | Date): string {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return "ahora mismo"
  if (diffMins < 60) return `hace ${diffMins} min`
  if (diffHours < 24) return `hace ${diffHours}h`
  if (diffDays < 7) return `hace ${diffDays}d`
  return date.toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: diffDays > 365 ? "numeric" : undefined,
  })
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function SuggestionsTable({ suggestions, meta }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [isFilteringStatus, startFilteringStatus] = useTransition()

  // Search debounce
  const [searchInput, setSearchInput] = useState(searchParams.get("q") ?? "")
  const [isDebouncing, setIsDebouncing] = useState(false)
  const initialMount = useRef(true)
  const isSearchLoading = isPending || isDebouncing

  // Detail dialog
  const [detailSuggestion, setDetailSuggestion] = useState<Suggestion | null>(null)
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null)
  const [adminNotes, setAdminNotes] = useState("")
  const [isActionPending, setIsActionPending] = useState(false)

  // ------ URL helpers ------

  function pushParams(params: Record<string, string | undefined>) {
    const sp = new URLSearchParams(searchParams.toString())
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        sp.set(key, value)
      } else {
        sp.delete(key)
      }
    })
    if (!("page" in params)) {
      sp.delete("page")
    }
    startTransition(() => {
      router.push(`?${sp.toString()}`)
    })
  }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    pushParams({ q: searchInput || undefined })
  }

  const currentStatus = searchParams.get("status") ?? "ALL"

  // ------ Action handlers ------

  function openDetail(suggestion: Suggestion) {
    setDetailSuggestion(suggestion)
    setActionType(null)
    setAdminNotes("")
  }

  function openAction(suggestion: Suggestion, type: "approve" | "reject") {
    setDetailSuggestion(suggestion)
    setActionType(type)
    setAdminNotes("")
  }

  async function handleAction() {
    if (!detailSuggestion || !actionType) return

    setIsActionPending(true)

    try {
      if (actionType === "approve") {
        await approveSuggestion(detailSuggestion.id, adminNotes || undefined)
      } else {
        await rejectSuggestion(detailSuggestion.id, adminNotes || undefined)
      }

      setDetailSuggestion(null)
      setActionType(null)
      setAdminNotes("")

      // Refresh page data
      startTransition(() => {
        router.refresh()
      })
    } catch (error) {
      console.error("Action failed:", error)
    } finally {
      setIsActionPending(false)
    }
  }

  // ------ Pagination ------

  const { page, totalPages, total, limit } = meta
  const start = (page - 1) * limit + 1
  const end = Math.min(page * limit, total)

  return (
    <>
      <section className="bg-card rounded-lg overflow-hidden border shadow-sm">
        {/* Header */}
        <div className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b bg-transparent">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-card-foreground">
              Sugerencias de Organizaciones
            </h2>
            <p className="text-sm text-muted-foreground">
              Revisa y gestiona las organizaciones sugeridas por la comunidad.
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
                if (value === "ALL") {
                  sp.delete("status")
                } else {
                  sp.set("status", value)
                }
                sp.delete("page")
                startFilteringStatus(() => {
                  router.push(`?${sp.toString()}`)
                })
              }}
            >
              <SelectTrigger className="w-40 bg-muted border-none text-sm">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">Todas</SelectItem>
                <SelectItem value="PENDING">Pendientes</SelectItem>
                <SelectItem value="APPROVED">Aprobadas</SelectItem>
                <SelectItem value="REJECTED">Rechazadas</SelectItem>
              </SelectContent>
            </Select>
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
                  Fecha
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
              {suggestions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="px-8 py-16 text-center text-muted-foreground"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <ClipboardList className="h-8 w-8 opacity-40" />
                      <p className="text-sm font-medium">
                        No se encontraron sugerencias
                      </p>
                      <p className="text-xs text-muted-foreground/70">
                        Las sugerencias enviadas por la comunidad aparecerán aquí.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                suggestions.map((suggestion) => {
                  const statusCfg = STATUS_CONFIG[suggestion.status] ?? STATUS_CONFIG.PENDING

                  return (
                    <TableRow key={suggestion.id} className="group">
                      {/* Org Name + URL */}
                      <TableCell className="px-8 py-5">
                        <div className="flex flex-col min-w-0">
                          <span className="font-bold text-sm text-foreground truncate">
                            {suggestion.orgName}
                          </span>
                          <a
                            href={suggestion.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground truncate hover:text-primary transition-colors inline-flex items-center gap-1"
                          >
                            {suggestion.url.replace(/^https?:\/\//, "").substring(0, 30)}
                            <ExternalLink className="h-3 w-3 shrink-0" />
                          </a>
                        </div>
                      </TableCell>

                      {/* Category */}
                      <TableCell className="px-8 py-5">
                        <span className="px-3 py-1 bg-muted text-foreground text-[11px] font-bold rounded-full uppercase tracking-tighter">
                          {CATEGORY_LABELS[suggestion.category] || suggestion.category}
                        </span>
                      </TableCell>

                      {/* Location */}
                      <TableCell className="px-8 py-5">
                        <span className="text-sm text-muted-foreground">
                          {suggestion.location}
                        </span>
                      </TableCell>

                      {/* Date */}
                      <TableCell className="px-8 py-5">
                        <span className="text-sm text-muted-foreground">
                          {formatRelativeDate(suggestion.createdAt)}
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`h-2 w-2 rounded-full ${statusCfg.dotColor}`}
                          />
                          <span
                            className={`text-sm font-medium ${statusCfg.textColor}`}
                          >
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
                            <DropdownMenuItem onClick={() => openDetail(suggestion)}>
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalles
                            </DropdownMenuItem>

                            {suggestion.status === "PENDING" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => openAction(suggestion, "approve")}
                                >
                                  <CheckCircle2 className="h-4 w-4 mr-2 text-emerald-600" />
                                  Aprobar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  className="text-red-600 focus:text-red-600"
                                  onClick={() => openAction(suggestion, "reject")}
                                >
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Rechazar
                                </DropdownMenuItem>
                              </>
                            )}
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
        {total > 0 && (
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
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => pushParams({ page: String(p) })}
                    className={`px-3 py-1 rounded border-none transition-colors text-xs ${p === page
                      ? "bg-muted text-foreground font-bold"
                      : "text-muted-foreground hover:bg-muted"
                      }`}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                disabled={page >= totalPages}
                onClick={() => pushParams({ page: String(page + 1) })}
                className="px-3 py-1 rounded border-none bg-muted text-muted-foreground hover:bg-muted/80 transition-colors text-xs disabled:cursor-not-allowed disabled:opacity-50"
              >
                &gt;
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Detail / Action Dialog */}
      <Dialog
        open={!!detailSuggestion}
        onOpenChange={(open) => {
          if (!open) {
            setDetailSuggestion(null)
            setActionType(null)
            setAdminNotes("")
          }
        }}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {actionType === "approve" && (
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              )}
              {actionType === "reject" && (
                <XCircle className="h-5 w-5 text-red-600" />
              )}
              {!actionType && (
                <FileText className="h-5 w-5 text-primary" />
              )}
              {actionType === "approve"
                ? "Aprobar Sugerencia"
                : actionType === "reject"
                  ? "Rechazar Sugerencia"
                  : "Detalle de Sugerencia"}
            </DialogTitle>
            <DialogDescription>
              {actionType === "approve"
                ? "Se creará una organización en borrador con estos datos."
                : actionType === "reject"
                  ? "Esta sugerencia será rechazada permanentemente."
                  : "Información completa de la sugerencia."}
            </DialogDescription>
          </DialogHeader>

          {detailSuggestion && (
            <div className="space-y-4 py-2">
              {/* Info cards */}
              <div className="bg-muted/50 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <ClipboardList className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Organización
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      {detailSuggestion.orgName}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-3">
                    <Tag className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Categoría
                      </p>
                      <p className="text-sm text-foreground">
                        {CATEGORY_LABELS[detailSuggestion.category] ||
                          detailSuggestion.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Ubicación
                      </p>
                      <p className="text-sm text-foreground">
                        {detailSuggestion.location}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Globe className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      URL
                    </p>
                    <a
                      href={detailSuggestion.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                    >
                      {detailSuggestion.url}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Fecha de envío
                    </p>
                    <p className="text-sm text-foreground">
                      {new Date(detailSuggestion.createdAt).toLocaleDateString("es-MX", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Descripción
                </p>
                <p className="text-sm text-foreground leading-relaxed bg-muted/30 rounded-lg p-3">
                  {detailSuggestion.description}
                </p>
              </div>

              {/* Status (if already reviewed) */}
              {detailSuggestion.status !== "PENDING" && (
                <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-muted/30">
                  <span
                    className={`h-2 w-2 rounded-full ${STATUS_CONFIG[detailSuggestion.status]?.dotColor}`}
                  />
                  <span
                    className={`text-sm font-medium ${STATUS_CONFIG[detailSuggestion.status]?.textColor}`}
                  >
                    {STATUS_CONFIG[detailSuggestion.status]?.label}
                  </span>
                  {detailSuggestion.adminNotes && (
                    <span className="text-xs text-muted-foreground ml-2">
                      — {detailSuggestion.adminNotes}
                    </span>
                  )}
                </div>
              )}

              {/* Admin notes input (for approve/reject) */}
              {actionType && detailSuggestion.status === "PENDING" && (
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Notas del admin (opcional)
                  </label>
                  <Textarea
                    placeholder={
                      actionType === "approve"
                        ? "Notas sobre la aprobación..."
                        : "Razón del rechazo..."
                    }
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            {!actionType && detailSuggestion?.status === "PENDING" && (
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setActionType("reject")}
                >
                  <XCircle className="h-4 w-4 mr-2 text-red-600" />
                  Rechazar
                </Button>
                <Button
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 "
                  onClick={() => setActionType("approve")}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Aprobar
                </Button>
              </div>
            )}

            {actionType && detailSuggestion?.status === "PENDING" && (
              <div className="flex gap-2 w-full">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setActionType(null)}
                  disabled={isActionPending}
                >
                  Cancelar
                </Button>
                <Button
                  className={`flex-1 ${actionType === "approve"
                    ? "bg-emerald-600 hover:bg-emerald-700 "
                    : "bg-red-600 hover:bg-red-700 "
                    }`}
                  onClick={handleAction}
                  disabled={isActionPending}
                >
                  {isActionPending ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : actionType === "approve" ? (
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                  ) : (
                    <XCircle className="h-4 w-4 mr-2" />
                  )}
                  {isActionPending
                    ? "Procesando..."
                    : actionType === "approve"
                      ? "Confirmar Aprobación"
                      : "Confirmar Rechazo"}
                </Button>
              </div>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
