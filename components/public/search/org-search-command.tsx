'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, BadgeCheck, Compass, Loader2, MapPin, Search, Sparkles } from 'lucide-react'
import { getSearchableOrgs, type SearchableOrg } from '@/server/actions'
import { trackSocialLead } from '@/lib/analytics'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { cn } from '@/lib/utils'

interface OrgSearchContextValue {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  openSearch: () => void
}

const OrgSearchContext = React.createContext<OrgSearchContextValue | null>(null)

export function useOrgSearch() {
  const ctx = React.useContext(OrgSearchContext)
  if (!ctx) {
    throw new Error('useOrgSearch must be used within an OrgSearchProvider')
  }
  return ctx
}

export function OrgSearchProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState('')
  const [orgs, setOrgs] = React.useState<SearchableOrg[]>([])
  const [hasLoaded, setHasLoaded] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const openSearch = React.useCallback(() => {
    setOpen(true)
  }, [])

  // Global ⌘K / Ctrl+K shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lazy-fetch published organizations the first time the palette opens
  React.useEffect(() => {
    if (!open || hasLoaded || isLoading) return

    let cancelled = false
    setIsLoading(true)

    getSearchableOrgs()
      .then((res) => {
        if (!cancelled && res.success && res.data) {
          setOrgs(res.data)
          setHasLoaded(true)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [open, hasLoaded, isLoading])

  // Clear query when closing
  React.useEffect(() => {
    if (!open) {
      setQuery('')
    }
  }, [open])

  const ongList = React.useMemo(
    () => orgs.filter((o) => o.causeType !== 'YOUTH_INITIATIVE'),
    [orgs]
  )
  const youthList = React.useMemo(
    () => orgs.filter((o) => o.causeType === 'YOUTH_INITIATIVE'),
    [orgs]
  )

  const handleSelectOrg = (org: SearchableOrg) => {
    trackSocialLead('view_profile', org.name)
    setOpen(false)
    router.push(`/directory/${org.slug}`)
  }

  const handleSearchDirectory = (searchTerm?: string) => {
    const trimmed = searchTerm?.trim()
    setOpen(false)
    if (trimmed) {
      router.push(`/directory?q=${encodeURIComponent(trimmed)}`)
    } else {
      router.push('/directory')
    }
  }

  const trimmedQuery = query.trim()

  return (
    <OrgSearchContext.Provider value={{ open, setOpen, openSearch }}>
      {children}

      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Buscar organizaciones"
        description="Encuentra organizaciones sociales verificadas e iniciativas jóvenes por nombre, causa o ciudad."
      >
        <Command shouldFilter={true} className="bg-surface">
          <CommandInput
            value={query}
            onValueChange={setQuery}
            placeholder="Buscar organización, causa o ciudad..."
          />

          <CommandList>
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 py-10 text-sm text-foreground-muted">
                <Loader2 className="size-4 animate-spin text-primary" strokeWidth={1.5} />
                <span>Cargando organizaciones...</span>
              </div>
            ) : (
              <>
                <CommandEmpty>
                  <div className="flex flex-col items-center gap-3 px-4">
                    <p>No encontramos organizaciones para &ldquo;{trimmedQuery}&rdquo;.</p>
                    {trimmedQuery && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleSearchDirectory(trimmedQuery)}
                        className="rounded-full border-primary/40 text-primary hover:bg-primary/5"
                      >
                        Buscar en el directorio
                        <ArrowRight className="size-3.5" strokeWidth={1.5} />
                      </Button>
                    )}
                  </div>
                </CommandEmpty>

                {ongList.length > 0 && (
                  <CommandGroup heading="Organizaciones">
                    {ongList.map((org) => (
                      <CommandItem
                        key={org.slug}
                        value={`${org.name} ${org.categories.join(' ')} ${org.location} ${org.shortDescription}`}
                        onSelect={() => handleSelectOrg(org)}
                        className="items-center py-2.5"
                      >
                        <div className="size-8 rounded-lg bg-primary/10 text-primary font-sans text-xs font-semibold flex items-center justify-center shrink-0">
                          {org.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-medium text-foreground truncate">{org.name}</span>
                            {org.verified && (
                              <BadgeCheck
                                className="size-3.5 text-verified-emerald shrink-0"
                                strokeWidth={1.75}
                                aria-label="Verificada"
                              />
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-foreground-muted mt-0.5">
                            {org.categories[0] && (
                              <span className=" text-[10px] uppercase tracking-[0.04em] text-primary shrink-0">
                                {org.categories[0]}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1 truncate">
                              <MapPin className="size-3 shrink-0" strokeWidth={1.5} />
                              <span className="truncate">{org.location}</span>
                            </span>
                          </div>
                        </div>
                        <ArrowRight
                          className="size-3.5 text-foreground-muted opacity-0 transition-opacity group-data-selected/command-item:opacity-100 shrink-0"
                          strokeWidth={1.5}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}

                {youthList.length > 0 && (
                  <>
                    {ongList.length > 0 && <CommandSeparator />}
                    <CommandGroup heading="Iniciativas Jóvenes">
                      {youthList.map((org) => (
                        <CommandItem
                          key={org.slug}
                          value={`${org.name} iniciativa joven ${org.categories.join(' ')} ${org.location} ${org.shortDescription}`}
                          onSelect={() => handleSelectOrg(org)}
                          className="items-center py-2.5"
                        >
                          <div className="size-8 rounded-lg bg-[#124866] text-[#84B3CE] flex items-center justify-center shrink-0">
                            <Sparkles className="size-3.5" strokeWidth={1.75} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-medium text-foreground truncate">
                                {org.name}
                              </span>
                              {org.verified && (
                                <BadgeCheck
                                  className="size-3.5 text-verified-emerald shrink-0"
                                  strokeWidth={1.75}
                                  aria-label="Verificada"
                                />
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-foreground-muted mt-0.5">
                              {org.categories[0] && (
                                <span className=" text-[10px] uppercase tracking-[0.04em] text-primary shrink-0">
                                  {org.categories[0]}
                                </span>
                              )}
                              <span className="inline-flex items-center gap-1 truncate">
                                <MapPin className="size-3 shrink-0" strokeWidth={1.5} />
                                <span className="truncate">{org.location}</span>
                              </span>
                            </div>
                          </div>
                          <ArrowRight
                            className="size-3.5 text-foreground-muted opacity-0 transition-opacity group-data-selected/command-item:opacity-100 shrink-0"
                            strokeWidth={1.5}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </>
                )}

                <CommandSeparator />
                <CommandGroup heading="Directorio">
                  {trimmedQuery && (
                    <CommandItem
                      value={`buscar en directorio ${trimmedQuery}`}
                      onSelect={() => handleSearchDirectory(trimmedQuery)}
                    >
                      <Search className="size-4 text-primary" strokeWidth={1.5} />
                      <span>
                        Filtrar directorio por{' '}
                        <strong className="font-medium text-foreground">
                          &ldquo;{trimmedQuery}&rdquo;
                        </strong>
                      </span>
                    </CommandItem>
                  )}
                  <CommandItem
                    value="ver todas las causas explorar directorio completo"
                    onSelect={() => handleSearchDirectory()}
                  >
                    <Compass className="size-4 text-primary" strokeWidth={1.5} />
                    <span>Explorar todo el directorio</span>
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </CommandDialog>
    </OrgSearchContext.Provider>
  )
}

interface OrgSearchTriggerProps {
  variant?: 'dark' | 'light'
  className?: string
  onBeforeOpen?: () => void
}

export function OrgSearchTrigger({
  variant = 'light',
  className,
  onBeforeOpen,
}: OrgSearchTriggerProps) {
  const { openSearch } = useOrgSearch()

  return (
    <Button
      type="button"
      size="icon"
      variant="outline"
      onClick={() => {
        onBeforeOpen?.()
        openSearch()
      }}
      aria-label="Buscar organizaciones"
      title="Buscar organizaciones (⌘K)"
      className={cn(
        'rounded-full size-8 shrink-0 shadow-none transition-colors duration-300',
        variant === 'dark'
          ? 'border-[#84B3CE]/45 bg-[#0C354C]/40 text-[#F5EEDD] hover:bg-[#84B3CE]/20 hover:text-white hover:border-[#84B3CE]'
          : 'border-[#DFD5C0] bg-[#FAF7F0] text-[#0C354C] hover:border-[#16587B] hover:text-[#16587B] hover:bg-[#16587B]/5',
        className
      )}
    >
      <Search className="size-3.5" strokeWidth={1.75} />
    </Button>
  )
}
