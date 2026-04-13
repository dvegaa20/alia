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
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'

import type { CategoryData, SidebarFiltersProps } from '@/types'

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

  // Fetch available cities when state changes
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

  // Sync input when URL changes externally (e.g. browser back/forward)
  useEffect(() => {
    setInputValue(searchQuery)
  }, [searchQuery])

  // Debounced URL update
  const updateSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams(searchParams.toString())

      if (value.trim()) {
        params.set('q', value.trim())
      } else {
        params.delete('q')
      }

      // Reset to page 1 on new search
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
      // Only push if value actually changed from current URL
      if (inputValue !== searchQuery) {
        updateSearch(inputValue)
      }
    }, 200)

    return () => clearTimeout(timer)
  }, [inputValue, searchQuery, updateSearch])

  return (
    <motion.aside
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="hidden lg:block w-64 h-[calc(100vh-8rem)] sticky top-28"
    >
      <Sidebar
        collapsible={isMobile ? 'offcanvas' : 'none'}
        className="w-full h-full bg-transparent border-none"
      >
        <SidebarHeader className="px-0 pt-0 pb-4">
          <div>
            <h2 className="text-lg font-bold text-foreground font-headline">Filtros</h2>
            <p className="text-muted-foreground text-sm font-medium">Explorar por categoría</p>
          </div>

          <div className="relative mt-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
            <Input
              className="pl-10 pr-4 py-3 h-auto bg-muted/50 border-none rounded-lg focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-background text-sm font-medium placeholder:text-muted-foreground"
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
                {/* Default Action: All Categories */}
                <SidebarMenuItem>
                  <SidebarMenuButton
                    asChild
                    isActive={!activeCategorySlug}
                    className="rounded-xl px-4 py-5 flex items-center space-x-3 transition-all duration-200 active:translate-x-1"
                  >
                    <a href="#" onClick={(e) => handleCategoryClick(e, null)}>
                      <Grid2x2
                        className="size-5"
                        {...(!activeCategorySlug ? { fill: 'currentColor', strokeWidth: 0 } : {})}
                      />
                      <span className="font-headline text-sm font-medium">Todas las causas</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {/* Dynamic Categories */}
                {categories.slice(0, 4).map((category) => {
                  const Icon = iconMap[category.slug] || Hash
                  const isActive = activeCategorySlug === category.slug

                  return (
                    <SidebarMenuItem key={category.id}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className="rounded-xl px-4 py-5 flex items-center space-x-3 transition-all duration-200 active:translate-x-1"
                      >
                        <a href="#" onClick={(e) => handleCategoryClick(e, category.slug)}>
                          <Icon
                            className="size-5"
                            {...(isActive ? { fill: 'currentColor', strokeWidth: 0 } : {})}
                          />
                          <span className="font-headline text-sm font-medium flex-1">
                            {category.name}
                          </span>
                          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            {category._count.organizations}
                          </span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                })}

                {/* Show More Button */}
                {categories.length > 4 && (
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <SidebarMenuItem>
                      <DialogTrigger asChild>
                        <SidebarMenuButton className="rounded-xl px-4 py-5 flex items-center space-x-3 transition-all duration-200 hover:bg-muted/50 text-muted-foreground hover:text-foreground">
                          <Grid2x2 className="size-5 opacity-70" />
                          <span className="font-headline text-sm font-medium">
                            Ver todas las causas
                          </span>
                        </SidebarMenuButton>
                      </DialogTrigger>
                    </SidebarMenuItem>

                    <DialogContent
                      className="sm:max-w-[700px] gap-6 px-8 py-10 rounded-3xl max-h-[90vh] overflow-y-auto"
                      data-lenis-prevent
                    >
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-headline font-bold text-center mb-4">
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
                              onClick={(e) => handleCategoryClick(e, category.slug)}
                              className={cn(
                                'flex flex-col items-center justify-center p-6 rounded-2xl border text-center transition-all duration-200 hover:shadow-md hover:-translate-y-1',
                                isActive
                                  ? 'bg-primary/10 border-primary-900 text-primary-900 dark:bg-primary-200/20 dark:text-primary-200 dark:border-primary-200'
                                  : 'border-transparent text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                              )}
                            >
                              <Icon className="size-8 mb-3 opacity-80" />
                              <span className="font-headline font-bold mb-1 leading-tight">
                                {category.name}
                              </span>
                              <span className="text-xs text-muted-foreground font-medium">
                                {category._count.organizations} ONG
                                {category._count.organizations !== 1 && 's'} activas
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

          <SidebarGroup className="px-0 mt-4 border-t border-border pt-4">
            <SidebarGroupContent className="space-y-6">
              {/* Estado */}
              <div className="space-y-2">
                <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-4">
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
                  <SelectTrigger className="w-full bg-muted/30 border-none rounded-lg text-sm font-medium">
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

              {/* Municipio (only shows when a state is selected) */}
              {activeState && (
                <div className="space-y-2">
                  <Label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-4">
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
                    <SelectTrigger className="w-full bg-muted/30 border-none rounded-lg text-sm font-medium">
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
              <div className="px-4 flex items-center justify-between">
                <Label
                  htmlFor="verified-toggle"
                  className="text-sm font-medium text-muted-foreground cursor-pointer"
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
