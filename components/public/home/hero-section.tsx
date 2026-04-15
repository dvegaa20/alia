'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Combobox as ComboboxPrimitive } from '@base-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight, ImageIcon } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import {
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from '@/components/ui/combobox'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { useCarouselCycle } from '@/hooks/use-carousel-cycle'

import type { OrganizationOption } from '@/types'

const HERO_IMAGES = [
  'bg-gradient-to-br from-base-300 via-base-200 to-base-100',
  'bg-gradient-to-tr from-primary-800 via-primary-500 to-base-300',
  'bg-gradient-to-tl from-base-400 via-base-300 to-base-100',
]

const HERO_TITLES = [
  { main: 'Encuentra y apoya', accent: 'importan' },
  { main: 'Conecta con causas que', accent: 'transforman' },
  { main: 'Descubre organizaciones que', accent: 'inspiran' },
]

const HERO_BADGES = [
  'Organizaciones verificadas',
  'Directorio transparente',
  'Impacto medible',
  'Comunidad activa',
  'Donaciones seguras',
  'Reportes de impacto',
]

export function HeroSection({ organizations }: { organizations: OrganizationOption[] }) {
  const router = useRouter()
  const [inputValue, setInputValue] = useState('')
  const anchorRef = useRef<HTMLDivElement>(null)

  const filteredOrgs =
    inputValue === ''
      ? []
      : organizations.filter(
        (org) =>
          org.name.toLowerCase().includes(inputValue.toLowerCase()) ||
          org.categories.some((c) => c.toLowerCase().includes(inputValue.toLowerCase()))
      )

  const isOpen = inputValue.length > 0

  // 1. Image Fade Carousel (15s)
  const { currentIndex: imageIndex } = useCarouselCycle(HERO_IMAGES, 15000)

  // 2. Title Slide Carousel (7s)
  const { current: title, currentIndex: titleIndex } = useCarouselCycle(HERO_TITLES, 7000)

  // 3. Badges Stack Carousel (5s)
  const { currentIndex: badgeIndex } = useCarouselCycle(HERO_BADGES, 5000)

  // Calulate the 2 visible badges. Wrap around if at the end of the array.
  const visibleBadges = [
    HERO_BADGES[badgeIndex],
    HERO_BADGES[(badgeIndex + 1) % HERO_BADGES.length],
  ]

  return (
    <section className="relative px-4 sm:px-8 pt-6 pb-10 bg-background">
      <div className="max-w-400 mx-auto relative z-10">
        {/* Hero Image Container */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[520px] md:min-h-[600px] lg:min-h-[680px]">
          {/* Image Crossfade Background */}
          <AnimatePresence mode="popLayout">
            <motion.div
              key={imageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className={cn('absolute inset-0', HERO_IMAGES[imageIndex])}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-3 opacity-40 mix-blend-overlay">
                  <div className="size-16 rounded-full bg-white/20 mx-auto flex items-center justify-center">
                    <ImageIcon className="size-7 text-white" />
                  </div>
                  <p className="text-white text-sm font-bold tracking-widest uppercase shadow-sm">
                    Imagen del Hero {imageIndex + 1}
                  </p>
                  <p className="text-white text-xs max-w-xs font-medium">
                    1600 × 680px recomendado
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 via-transparent to-transparent z-10 pointer-events-none" />

          {/* Content Overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:pl-14 lg:pr-8 lg:pb-10 xl:pr-10 z-20">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12 w-full">
              {/* Left Side: Title & Subtitle */}
              <div className="max-w-3xl lg:max-w-2xl xl:max-w-3xl">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="mb-5"
                >
                  <Badge
                    className="bg-primary/60 text-primary-foreground border border-primary/30 backdrop-blur-md px-3 py-1 h-auto rounded-full text-xs font-bold uppercase tracking-wider"
                  >
                    <span className="size-1.5 rounded-full bg-primary-foreground animate-pulse" />
                    Directorio Social
                  </Badge>
                </motion.div>

                {/* Title Carousel */}
                <div className="h-[120px] sm:h-[150px] md:h-[180px] lg:h-[220px] overflow-hidden leading-tight mb-5 -ml-1 pl-1">
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={titleIndex}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 40 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground tracking-tight leading-[1.08] lg:leading-[1.08]"
                    >
                      {title.main}{' '}
                      <br className="hidden sm:block" />
                      causas que{' '}
                      <span className="text-primary italic">{title.accent}</span>.
                    </motion.h1>
                  </AnimatePresence>
                </div>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.25 }}
                  className="font-body text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl"
                >
                  Cada conexión fortalece una comunidad. Juntos construimos un futuro lleno de
                  posibilidades para México.
                </motion.p>
              </div>

              {/* Right Side: Badges, Floating Card & Search Bar */}
              <div className="flex flex-col gap-5 w-full lg:max-w-[340px] xl:max-w-[400px] shrink-0">
                {/* Stacked Floating Badges Carousel (desktop only) */}
                <div className="hidden lg:flex flex-col gap-3 items-end w-full z-20">
                  <AnimatePresence mode="popLayout">
                    {visibleBadges.map((badgeText) => (
                      <motion.div
                        key={badgeText}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      >
                        <Badge
                          variant="outline"
                          className="bg-primary/15 text-primary border border-primary/20 px-3 py-1 h-auto rounded-full text-xs tracking-wider"
                        >
                          <span className="size-2 rounded-full bg-primary/80 shadow-[0_0_8px_rgba(var(--color-primary-500),0.5)]" />
                          {badgeText}
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
                {/* Floating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut', delay: 0.5 }}
                  className="hidden lg:block w-full"
                >
                  <Card className="bg-background border-none ring-0 shadow-2xl rounded-2xl overflow-hidden p-0 group">
                    <CardContent className="p-6 pt-4 space-y-4">
                      {/* Card Content Text */}
                      <div>
                        <h3 className="text-lg font-bold text-foreground font-headline leading-snug">
                          Haz un Impacto
                          <br />
                          Inmediato
                        </h3>
                        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                          Conecta directamente con organizaciones que transforman comunidades.
                        </p>
                      </div>
                    </CardContent>

                    <CardFooter className="p-6 pt-0">
                      <Button
                        asChild
                        className="w-full rounded-full bg-primary hover:bg-primary/90 focus-visible:ring-primary text-primary-foreground font-headline font-bold text-sm py-5 h-auto transition-all duration-500 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.02] active:scale-95"
                      >
                        <Link href="/directory">Explorar Directorio</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>

                {/* Search Bar */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
                  className="relative w-full"
                >
                  <ComboboxPrimitive.Root
                    open={isOpen}
                    onOpenChange={(open) => {
                      if (!open) setInputValue('')
                    }}
                    onValueChange={(val) => {
                      if (val) {
                        router.push(`/directory/${val}`)
                      }
                    }}
                  >
                    <div
                      ref={anchorRef}
                      className={cn(
                        'relative w-full z-50',
                        isOpen ? 'editorial-shadow-sm rounded-t-xl' : ''
                      )}
                    >
                      <InputGroup
                        className={cn(
                          'h-14 sm:h-16 border-none! ring-0! outline-none! transition-all duration-300',
                          isOpen
                            ? 'rounded-t-xl rounded-b-none bg-background! shadow-none relative has-[[data-slot=input-group-control]:focus-visible]:ring-0! has-[[data-slot=input-group-control]:focus-visible]:border-none!'
                            : 'rounded-xl bg-background! editorial-shadow has-[[data-slot=input-group-control]:focus-visible]:ring-0! has-[[data-slot=input-group-control]:focus-visible]:border-none!'
                        )}
                      >
                        <InputGroupAddon align="inline-start" className="pl-4 sm:pl-6">
                          <Search className="size-5 text-muted-foreground" />
                        </InputGroupAddon>
                        <ComboboxPrimitive.Input
                          render={<InputGroupInput />}
                          placeholder="Buscar por causa o ciudad..."
                          className="text-base sm:text-lg h-full placeholder:text-muted-foreground grow bg-transparent border-none! ring-0! outline-none! shadow-none"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                        <InputGroupAddon align="inline-end" className="pr-2 sm:pr-3">
                          <Button
                            asChild
                            size="sm"
                            className="rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-headline text-xs h-9 sm:h-10 px-4 sm:px-5"
                          >
                            <Link href="/directory">
                              <ArrowRight className="size-4" />
                            </Link>
                          </Button>
                        </InputGroupAddon>
                      </InputGroup>
                    </div>

                    {isOpen && (
                      <ComboboxContent
                        anchor={anchorRef}
                        align="start"
                        sideOffset={0}
                        className="w-(--anchor-width) mt-0 rounded-t-none rounded-b-xl bg-background! shadow-xl z-50 border-none ring-0!"
                      >
                        <ComboboxList className="p-2 pt-0">
                          {filteredOrgs.length > 0 ? (
                            filteredOrgs.map((org) => (
                              <ComboboxItem
                                key={org.slug}
                                value={org.slug}
                                className="rounded-lg data-highlighted:bg-black/5 dark:data-highlighted:bg-white/5 cursor-pointer"
                              >
                                <Avatar className="size-10 mr-3">
                                  {org.logo ? <AvatarImage src={org.logo} alt={org.name} className="object-cover" /> : null}
                                  <AvatarFallback>{org.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                  <span className="font-medium text-foreground">{org.name}</span>
                                  <span className="text-xs text-muted-foreground">{org.categories[0]}</span>
                                </div>
                              </ComboboxItem>
                            ))
                          ) : (
                            <ComboboxEmpty className="py-6 text-center text-muted-foreground">
                              No se encontraron resultados para &quot;{inputValue}&quot;.
                            </ComboboxEmpty>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    )}
                  </ComboboxPrimitive.Root>
                </motion.div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
