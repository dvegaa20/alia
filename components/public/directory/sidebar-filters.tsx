'use client'

import { useState, useEffect, useCallback, useTransition } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'
import { Search, Grid2x2, GraduationCap, TreePine, Stethoscope, Hash } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MEXICO_STATES } from '@/lib/mexico-states'
import { getAvailableCities } from '@/server/actions'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
} from '@/components/ui/select'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

import type { SidebarFiltersProps } from '@/types'

const iconMap: Record<string, React.ElementType> = {
  educacion: GraduationCap,
  'medio-ambiente': TreePine,
  salud: Stethoscope,
}

export function SidebarFilters({
  searchQuery = '',
  categories = [],
  activeCategorySlug = '',
  activeState,
  activeCity,
  activeVerified,
}: SidebarFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [inputValue, setInputValue] = useState(searchQuery)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [availableCities, setAvailableCities] = useState<string[]>([])
  const [isCitiesLoading, startCitiesTransition] = useTransition()
  const isMobile = useIsMobile()

  useEffect(() => {
    if (activeState) {
      startCitiesTransition(async () => {
        const result = await getAvailableCities(activeState)
        setAvailableCities(result.data || [])
      })
    } else {
      setAvailableCities([])
    }
  }, [activeState])

  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  const updateSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value.trim()) {
        params.set('q', value.trim())
      } else {
        params.delete('q')
      }
      params.delete('page')
      const qs = params.toString()
      router.push(`/directory${qs ? `?${qs}` : ''}`, { scroll: false })
    },
    [router, searchParams]
  )

  const handleCategoryClick = (e: React.MouseEvent, slug: string | null) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (slug) {
      params.set('category', slug)
    } else {
      params.delete('category')
    }
    params.delete('page')
    const qs = params.toString()
    router.push(`/directory${qs ? `?${qs}` : ''}`, { scroll: false })
    setIsDialogOpen(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== searchQuery) {
        updateSearch(inputValue)
      }
    }, 200)
    return () => clearTimeout(timer)
  }, [inputValue, searchQuery, updateSearch])

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="hidden lg:block w-72 shrink-0 h-fit max-h-[calc(100vh-8rem)] sticky top-24 rounded-2xl border border-[#DFD5C0] bg-[#FAF7F0] p-5 overflow-y-auto scrollbar-none"
    >
      <Sidebar
        collapsible={isMobile ? 'offcanvas' : 'none'}
        className="w-full h-full bg-transparent border-none"
      >
        <SidebarHeader className="px-0 pt-0 pb-4">
          <div className="space-y-1">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-primary">
              Filtros
            </p>
            <h2 className="font-sans text-lg font-semibold text-foreground">Explorar por causa</h2>
          </div>

          <div className="relative mt-4">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-foreground-muted size-4"
              strokeWidth={1.5}
            />
            <Input
              className="pl-10 pr-4 py-2.5 h-10 bg-[#F5EEDD]/70 border border-[#DFD5C0] hover:border-[#84B3CE] rounded-xl focus-visible:ring-2 focus-visible:ring-[#16587B]/30 focus-visible:border-[#16587B] text-sm font-sans placeholder:text-[#0C354C]/55"
              placeholder="Buscar ONG..."
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
        </SidebarHeader>

        <SidebarContent className="px-0 scrollbar-none">
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={!activeCategorySlug}
                    className={cn(
                      'rounded-xl px-3.5 py-5 flex items-center gap-3 transition-colors duration-200',
                      !activeCategorySlug
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-foreground-secondary hover:bg-background/70 hover:text-primary'
                    )}
                  >
                    <a href="#" onClick={(e) => handleCategoryClick(e, null)}>
                      <Grid2x2 className="size-4 shrink-0" strokeWidth={1.5} />
                      <span className="font-sans text-sm flex-1">Todas las causas</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {categories.slice(0, 4).map((category) => {
                  const Icon = iconMap[category.slug] || Hash
                  const isActive = activeCategorySlug === category.slug

                  return (
                    <SidebarMenuItem key={category.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={cn(
                          'rounded-xl px-3.5 py-5 flex items-center gap-3 transition-colors duration-200',
                          isActive
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'text-foreground-secondary hover:bg-background/70 hover:text-primary'
                        )}
                      >
                        <a href="#" onClick={(e) => handleCategoryClick(e, category.slug)}>
                          <Icon className="size-4 shrink-0" strokeWidth={1.5} />
                          <span className="font-sans text-sm flex-1 truncate">{category.name}</span>
                          <span className="font-mono text-[11px] font-medium tabular-nums text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            {category._count.organizations}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}

                {categories.length > 4 && (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <SidebarMenuItem>
                      <DialogTrigger asChild>
                        <SidebarMenuButton className="rounded-xl px-3.5 py-5 flex items-center gap-3 transition-colors duration-200 text-foreground-muted hover:bg-background/70 hover:text-primary">
                          <Grid2x2 className="size-4 shrink-0" strokeWidth={1.5} />
                          <span className="font-sans text-sm font-medium">
                            Ver todas las causas
                          </span>
                        </SidebarMenuButton>
                      </DialogTrigger>
                    </SidebarMenuItem>

                    <DialogContent
                      className="sm:max-w-[700px] gap-6 px-6 sm:px-8 py-8 rounded-[20px] border border-border bg-surface shadow-none ring-0 max-h-[90vh] overflow-y-auto"
                      data-lenis-prevent
                    >
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-sans font-semibold text-center mb-2 text-foreground">
                          Todas las causas
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {categories.map((category) => {
                          const Icon = iconMap[category.slug] || Hash
                          const isActive = activeCategorySlug === category.slug

                          return (
                            <button
                              key={`dialog-${category.id}`}
                              type="button"
                              onClick={(e) => handleCategoryClick(e, category.slug)}
                              className={cn(
                                'flex flex-col items-center justify-center p-5 rounded-[20px] border text-center transition-all duration-200 cursor-pointer',
                                isActive
                                  ? 'bg-primary/10 border-primary text-primary'
                                  : 'border-border bg-background/40 text-foreground-secondary hover:border-rock-blue hover:text-primary'
                              )}
                            >
                              <Icon className="size-7 mb-2.5" strokeWidth={1.5} />
                              <span className="font-sans font-semibold text-sm mb-1 leading-tight">
                                {category.name}
                              </span>
                              <span className="font-mono text-[11px] tabular-nums text-foreground-muted">
                                {category._count.organizations} ONG
                                {category._count.organizations !== 1 && 's'}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className="px-0 mt-4 border-t border-border pt-5">
            <SidebarGroupContent className="space-y-5">
              {/* Estado */}
              <div className="space-y-2">
                <Label className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-foreground-muted">
                  Estado
                </Label>
                <Select
                  value={activeState || 'all'}
                  onValueChange={(value) => {
                    const params = new URLSearchParams(searchParams.toString())
                    if (value && value !== 'all') {
                      params.set('state', value)
                    } else {
                      params.delete('state')
                    }
                    params.delete('city')
                    params.delete('page')
                    const qs = params.toString()
                    router.push(`/directory${qs ? `?${qs}` : ''}`, { scroll: false })
                  }}
                >
                  <SelectTrigger className="w-full h-10 bg-[#F5EEDD]/70 border border-[#DFD5C0] hover:border-[#84B3CE] rounded-xl text-sm font-sans text-[#0C354C]">
                    <SelectValue placeholder="Todo México" />
                  </SelectTrigger>
                  <SelectContent position="popper" className="max-h-64" data-lenis-prevent>
                    <SelectGroup>
                      <SelectItem value="all">Todo México</SelectItem>
                      {MEXICO_STATES.map((state) => (
                        <SelectItem key={state.slug} value={state.name}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Municipio */}
              {activeState && (
                <div className="space-y-2">
                  <Label className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-foreground-muted">
                    Municipio
                  </Label>
                  <Select
                    value={activeCity || 'all'}
                    onValueChange={(value) => {
                      const params = new URLSearchParams(searchParams.toString())
                      if (value && value !== 'all') {
                        params.set('city', value)
                      } else {
                        params.delete('city')
                      }
                      params.delete('page')
                      const qs = params.toString()
                      router.push(`/directory${qs ? `?${qs}` : ''}`, { scroll: false })
                    }}
                  >
                    <SelectTrigger className="w-full h-10 bg-[#F5EEDD]/70 border border-[#DFD5C0] hover:border-[#84B3CE] rounded-xl text-sm font-sans text-[#0C354C]">
                      <SelectValue
                        placeholder={isCitiesLoading ? 'Cargando...' : 'Todos los municipios'}
                      />
                    </SelectTrigger>
                    <SelectContent position="popper" className="max-h-72" data-lenis-prevent>
                      <SelectGroup>
                        <SelectItem value="all">Todos los municipios</SelectItem>
                        {availableCities.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Verified Toggle */}
              <div className="flex items-center justify-between pt-1">
                <Label
                  htmlFor="verified-toggle"
                  className="font-sans text-sm font-medium text-foreground-secondary cursor-pointer"
                >
                  Solo verificadas
                </Label>
                <Switch
                  id="verified-toggle"
                  checked={activeVerified === true}
                  onCheckedChange={(checked) => {
                    const params = new URLSearchParams(searchParams.toString())
                    if (checked) {
                      params.set('verified', 'true')
                    } else {
                      params.delete('verified')
                    }
                    params.delete('page')
                    const qs = params.toString()
                    router.push(`/directory${qs ? `?${qs}` : ''}`, { scroll: false })
                  }}
                />
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </motion.aside>
  )
}
