'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Combobox as ComboboxPrimitive } from '@base-ui/react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import {
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
} from '@/components/ui/combobox'
import { cn } from '@/lib/utils'
import Image from 'next/image'

import type { OrganizationOption } from '@/types'

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
            org.category.toLowerCase().includes(inputValue.toLowerCase())
        )

  const isOpen = inputValue.length > 0

  return (
    <section className="relative px-8 pt-20 pb-16 overflow-hidden bg-background">
      <div className="max-w-360 mx-auto relative z-10">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="font-headline font-bold text-5xl md:text-7xl text-foreground tracking-tight leading-[1.1] mb-8"
          >
            Encuentra y apoya causas que{' '}
            <span className="text-primary dark:text-ds-primary-fixed italic">importan</span>.
          </motion.h1>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="relative max-w-2xl"
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
                    'h-16 border-none! ring-0! outline-none! transition-all duration-300',
                    isOpen
                      ? 'rounded-t-xl rounded-b-none bg-muted shadow-none relative has-[[data-slot=input-group-control]:focus-visible]:ring-0! has-[[data-slot=input-group-control]:focus-visible]:border-none!'
                      : 'rounded-xl bg-muted editorial-shadow has-[[data-slot=input-group-control]:focus-visible]:ring-0! has-[[data-slot=input-group-control]:focus-visible]:border-none!'
                  )}
                >
                  <InputGroupAddon align="inline-start" className="pl-6">
                    <Search className="size-5 text-muted-foreground" />
                  </InputGroupAddon>
                  <ComboboxPrimitive.Input
                    render={<InputGroupInput />}
                    placeholder="Buscar por causa, ONG o ciudad..."
                    className="text-lg h-16 placeholder:text-muted-foreground grow bg-transparent border-none! ring-0! outline-none! shadow-none"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </InputGroup>
              </div>

              {isOpen && (
                <ComboboxContent
                  anchor={anchorRef}
                  align="start"
                  sideOffset={0}
                  className="w-(--anchor-width) mt-0 rounded-t-none rounded-b-xl bg-muted shadow-xl z-40 border-none ring-0!"
                >
                  <ComboboxList className="p-2 pt-0">
                    {filteredOrgs.length > 0 ? (
                      filteredOrgs.map((org) => (
                        <ComboboxItem
                          key={org.slug}
                          value={org.slug}
                          className="rounded-lg data-highlighted:bg-black/5 dark:data-highlighted:bg-white/5 cursor-pointer"
                        >
                          <span className="text-xl mr-2">{org.logo}</span>
                          <div className="flex flex-col">
                            <span className="font-medium text-foreground">{org.name}</span>
                            <span className="text-xs text-muted-foreground">{org.category}</span>
                          </div>
                        </ComboboxItem>
                      ))
                    ) : (
                      <ComboboxEmpty className="py-6 text-center text-muted-foreground">
                        No se encontraron resultados para "{inputValue}".
                      </ComboboxEmpty>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              )}
            </ComboboxPrimitive.Root>
          </motion.div>
        </div>
      </div>

      {/* Background Decorative Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute right-0 top-0 w-1/2 h-full hidden lg:block"
      >
        <div className="w-full h-full bg-linear-to-l from-transparent via-background to-background absolute inset-0 z-0" />
        <Image
          alt="Comunidad trabajando en un huerto"
          className="w-full h-full object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3sLIFr3POSlhNULvxil1ByEPfFf6V-HU4AJo5Ae46wRatSi8jv6JsqYCj_hHstXL3th29sKhjIrYsSiKcEB1fOdVjbbU0Q7p2yb54_JRrRJb5PFeKVW9lcGQLnJMRSuOLiB2XBStcEHsw_OULANswyWXPkPXdnEkzZkqPY8dFsDJXVOIBn1tX_KUW7ZYj14Yd6w5R7VnwwGooxrwlVQ4dfEeodyFUN2b5GSg-pny4V4qEPCfRN8ROzwTZV-IQ9kJOb-CZ01ge2W8"
          width={1200}
          height={800}
        />
      </motion.div>
    </section>
  )
}
