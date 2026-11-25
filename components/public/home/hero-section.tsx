'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Combobox as ComboboxPrimitive } from '@base-ui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, ArrowRight } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import {
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from '@/components/ui/combobox'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useCarouselCycle } from '@/hooks/use-carousel-cycle'
import { cn } from '@/lib/utils'
import type { OrganizationOption } from '@/types'

const HERO_IMAGES = [
  '/images/landscape1.jpg',
  '/images/landscape2.jpg',
  '/images/landscape3.jpg',
  '/images/landscape4.jpg',
  '/images/landscape5.jpg',
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
  const { currentIndex: imageIndex } = useCarouselCycle(HERO_IMAGES, 12000)

  const handleSearchSubmit = () => {
    const q = inputValue.trim()
    if (q) {
      router.push(`/directory?q=${encodeURIComponent(q)}`)
    } else {
      router.push('/directory')
    }
  }

  return (
    <section className="w-full bg-background pt-8 pb-16 lg:pt-14 lg:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline, Copy, Search & Pill CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.04em] text-primary">
                <span className="size-1.5 rounded-full bg-verified-emerald" aria-hidden="true" />
                Directorio Social Verificado · México
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
              className="font-sans font-medium text-[38px] sm:text-[52px] lg:text-[62px] leading-[1.05] tracking-[-0.03em] text-foreground"
            >
              Encuentra y apoya <span className="text-primary">causas reales</span> en México.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.12 }}
              className="font-sans text-base sm:text-lg lg:text-[19px] leading-[1.55] tracking-[-0.01em] text-foreground-secondary max-w-xl"
            >
              Cada conexión fortalece una comunidad. Descubre organizaciones verificadas, donatarias
              autorizadas e iniciativas jóvenes para apoyar sin intermediarios.
            </motion.p>

            {/* Search Combobox */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.18 }}
              className="relative w-full max-w-xl pt-1"
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
                <div ref={anchorRef} className="relative w-full z-40">
                  <InputGroup
                    className={cn(
                      'h-13 sm:h-14 border border-border bg-surface transition-colors duration-200 focus-within:border-primary',
                      isOpen
                        ? 'rounded-t-xl rounded-b-none border-b-0'
                        : 'rounded-xl hover:border-rock-blue'
                    )}
                  >
                    <InputGroupAddon align="inline-start" className="pl-4">
                      <Search className="size-4 text-foreground-muted" strokeWidth={1.5} />
                    </InputGroupAddon>
                    <ComboboxPrimitive.Input
                      render={<InputGroupInput />}
                      placeholder="Buscar por organización o causa..."
                      className="text-sm sm:text-base h-full font-sans text-foreground placeholder:text-foreground-muted grow bg-transparent border-none! ring-0! outline-none! shadow-none"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && filteredOrgs.length === 0) {
                          e.preventDefault()
                          handleSearchSubmit()
                        }
                      }}
                    />
                    <InputGroupAddon align="inline-end" className="pr-2">
                      <Button
                        type="button"
                        onClick={handleSearchSubmit}
                        size="sm"
                        className="rounded-full bg-primary hover:bg-primary-hover text-primary-foreground font-sans text-xs font-medium h-9 px-4"
                      >
                        Buscar
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>

                {isOpen && (
                  <ComboboxContent
                    anchor={anchorRef}
                    align="start"
                    sideOffset={0}
                    className="w-(--anchor-width) mt-0 rounded-t-none rounded-b-xl bg-surface border border-border border-t-0 shadow-none z-50"
                  >
                    <ComboboxList className="p-2 pt-1">
                      {filteredOrgs.length > 0 ? (
                        filteredOrgs.slice(0, 6).map((org) => (
                          <ComboboxItem
                            key={org.slug}
                            value={org.slug}
                            className="rounded-xl data-highlighted:bg-surface-subtle cursor-pointer"
                          >
                            <Avatar className="size-9 mr-3 border border-border">
                              {org.logo ? (
                                <AvatarImage
                                  src={org.logo}
                                  alt={org.name}
                                  className="object-cover"
                                />
                              ) : null}
                              <AvatarFallback className="bg-primary/10 text-primary font-sans text-xs font-semibold">
                                {org.name.slice(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-medium text-sm text-foreground">
                                {org.name}
                              </span>
                              <span className="font-mono text-[11px] uppercase text-foreground-muted">
                                {org.categories[0]}
                              </span>
                            </div>
                          </ComboboxItem>
                        ))
                      ) : (
                        <ComboboxEmpty className="py-5 text-center text-sm text-foreground-muted">
                          No se encontraron resultados para &quot;{inputValue}&quot;.
                        </ComboboxEmpty>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                )}
              </ComboboxPrimitive.Root>
            </motion.div>

            {/* Pill CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.24 }}
              className="flex flex-wrap items-center gap-3 pt-1"
            >
              <Button
                asChild
                className="rounded-full bg-primary hover:bg-primary-hover text-primary-foreground px-6 py-3 h-auto text-[15px] font-medium border-none"
              >
                <Link href="/directory">
                  Explorar directorio
                  <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full bg-surface border-primary text-primary hover:bg-primary/5 px-6 py-3 h-auto text-[15px] font-medium"
              >
                <Link href="/about">Sobre el proyecto</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Real Field Photography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative aspect-[4/3] lg:aspect-[5/6] w-full rounded-2xl overflow-hidden border border-border bg-surface">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={imageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className="absolute inset-0"
                >
                  <Image
                    src={HERO_IMAGES[imageIndex]}
                    alt="Trabajo comunitario y voluntariado en México"
                    fill
                    priority={imageIndex === 0}
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/95 backdrop-blur-md px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-foreground">
                  <span
                    className="size-2 rounded-full bg-verified-emerald shrink-0"
                    aria-hidden="true"
                  />
                  100% gratuito · Sin intermediarios
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
