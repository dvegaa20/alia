'use client'

import React, { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/button'
import { SuggestOrgDialog } from '@/components/public/suggest/suggest-org-dialog'
import { OrgSearchTrigger } from '@/components/public/search/org-search-command'
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon'
import { AliaLogo } from './alia-logo'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/directory', label: 'Todas las causas' },
  { href: '/about', label: 'Sobre el proyecto' },
  { href: '/impact', label: 'Impacto' },
]

interface NavbarProps {
  hasLogoLight?: boolean
  hasLogoDark?: boolean
}

type NavTheme = 'dark' | 'light'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [suggestOpen, setSuggestOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [themeState, setThemeState] = useState<{ pathname: string; theme: NavTheme } | null>(null)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const openRef = useRef(open)

  const defaultTheme: NavTheme = pathname === '/' ? 'dark' : 'light'
  const navTheme: NavTheme =
    themeState && themeState.pathname === pathname ? themeState.theme : defaultTheme
  const isDarkSurface = navTheme === 'dark'

  useEffect(() => {
    openRef.current = open
    if (open && headerRef.current) {
      gsap.to(headerRef.current, {
        yPercent: 0,
        duration: 0.25,
        ease: 'power2.out',
        force3D: true,
        overwrite: 'auto',
      })
    }
  }, [open])

  useEffect(() => {
    if (headerRef.current) {
      gsap.set(headerRef.current, { yPercent: 0, force3D: true })
    }
  }, [pathname])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Detect active section behind fixed navbar using IntersectionObserver (off-main-thread, zero reflow lag)
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-theme]'))
    if (sections.length === 0) return

    const visibleMap = new Map<HTMLElement, boolean>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibleMap.set(entry.target as HTMLElement, entry.isIntersecting)
        }

        // Pick the topmost intersecting section behind the navbar strip
        const active = sections.find((el) => visibleMap.get(el))
        if (active) {
          const nextTheme = (active.dataset.navTheme as NavTheme) || defaultTheme
          setThemeState((prev) =>
            prev?.pathname === pathname && prev.theme === nextTheme
              ? prev
              : { pathname, theme: nextTheme }
          )
        }
      },
      {
        // Observe the narrow horizontal band at the top where the navbar sits (~24px–56px)
        rootMargin: '-24px 0px -88% 0px',
        threshold: 0,
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [pathname, defaultTheme])

  // Lightweight GSAP hide/show on scroll (GPU-only yPercent + scrolled gradient flag)
  useGSAP(
    () => {
      let scrolledFlag = window.scrollY > 36
      let isHidden = false
      let lastScrollY = window.scrollY

      const mm = gsap.matchMedia()
      let allowMotion = true
      mm.add('(prefers-reduced-motion: reduce)', () => {
        allowMotion = false
      })

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const currentY = self.scroll()
          const nextScrolled = currentY > 36
          if (nextScrolled !== scrolledFlag) {
            scrolledFlag = nextScrolled
            setIsScrolled(nextScrolled)
          }

          if (!allowMotion) return

          if (openRef.current || currentY <= 120) {
            if (isHidden && headerRef.current) {
              isHidden = false
              gsap.to(headerRef.current, {
                yPercent: 0,
                duration: 0.35,
                ease: 'power3.out',
                force3D: true,
                overwrite: 'auto',
              })
            }
            lastScrollY = currentY
            return
          }

          const delta = currentY - lastScrollY
          if (delta > 6 && !isHidden && headerRef.current) {
            isHidden = true
            gsap.to(headerRef.current, {
              yPercent: -115,
              duration: 0.35,
              ease: 'power2.out',
              force3D: true,
              overwrite: 'auto',
            })
          } else if (delta < -6 && isHidden && headerRef.current) {
            isHidden = false
            gsap.to(headerRef.current, {
              yPercent: 0,
              duration: 0.35,
              ease: 'power3.out',
              force3D: true,
              overwrite: 'auto',
            })
          }
          lastScrollY = currentY
        },
      })
    },
    { scope: headerRef }
  )

  return (
    <header
      ref={headerRef}
      className="fixed top-0 inset-x-0 z-50 w-full bg-transparent border-none shadow-none pointer-events-none will-change-transform"
    >
      {/* Subtle top readability gradient only when scrolled — zero solid card, zero backdrop-blur */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute inset-x-0 top-0 h-24 transition-opacity duration-300',
          isScrolled ? 'opacity-100' : 'opacity-0',
          isDarkSurface
            ? 'bg-gradient-to-b from-[#0C354C]/65 via-[#0C354C]/25 to-transparent'
            : 'bg-gradient-to-b from-[#F5EEDD]/95 via-[#F5EEDD]/70 to-transparent'
        )}
      />

      <nav
        aria-label="Navegación principal"
        className="relative pointer-events-auto mx-auto max-w-[1440px] px-6 md:px-10 lg:px-14 flex md:grid md:grid-cols-[1fr_auto_1fr] h-20 w-full items-center justify-between"
      >
        {/* Columna 1: Logo */}
        <Link
          href="/"
          className="inline-flex items-center justify-self-start hover:opacity-80 transition-opacity shrink-0"
          aria-label="Alia — Inicio"
        >
          <AliaLogo className="h-12 origin-left scale-150 md:scale-[1.65]" />
        </Link>

        {/* Columna 2: Desktop Links perfectamente centrados al viewport */}
        <div className="hidden md:flex items-center justify-self-center gap-8">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative py-1.5 font-sans text-[15px] font-medium tracking-[-0.015em] transition-colors duration-300 whitespace-nowrap',
                  isDarkSurface
                    ? isActive
                      ? 'text-white'
                      : 'text-[#F5EEDD]/85 hover:text-white'
                    : isActive
                      ? 'text-[#0C354C]'
                      : 'text-[#0C354C]/75 hover:text-[#0C354C]'
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute bottom-0 left-0 h-[2px] w-full rounded-full transition-all duration-300 origin-left',
                    isDarkSurface ? 'bg-[#84B3CE]' : 'bg-[#16587B]',
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  )}
                />
              </Link>
            )
          })}
        </div>

        {/* Columna 3: Desktop CTA + Search */}
        <div className="hidden md:flex items-center justify-self-end gap-2 shrink-0">
          <OrgSearchTrigger variant={isDarkSurface ? 'dark' : 'light'} />
          <Button
            type="button"
            onClick={() => setSuggestOpen(true)}
            className={cn(
              'rounded-full px-4 py-1 h-auto font-sans text-[14px] leading-snug font-medium tracking-[-0.015em] border shadow-none transition-colors duration-300',
              isDarkSurface
                ? 'bg-[#84B3CE] hover:bg-[#9AC3DA] text-[#0C354C] border-[#84B3CE]'
                : 'bg-[#16587B] hover:bg-[#0C354C] text-white border-[#16587B] hover:border-[#0C354C]'
            )}
          >
            Sugerir ONG
          </Button>
        </div>

        {/* Mobile Search + Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <OrgSearchTrigger
            variant={isDarkSurface && !open ? 'dark' : 'light'}
            onBeforeOpen={() => setOpen(false)}
            className="size-10"
          />
          <Button
            size="icon"
            variant="outline"
            onClick={() => setOpen(!open)}
            className={cn(
              'rounded-full size-10 shadow-none transition-colors duration-300',
              isDarkSurface && !open
                ? 'border-white/30 bg-[#0C354C]/35 text-white hover:bg-[#0C354C]/55 hover:text-white'
                : 'border-[#DFD5C0] bg-[#FAF7F0] text-[#0C354C] hover:bg-[#EAE1CD]'
            )}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          >
            <MenuToggleIcon open={open} className="size-5" duration={250} />
          </Button>
        </div>
      </nav>

      {/* Controlled SuggestOrgDialog mounted outside MobileMenu so closing the menu never unmounts the dialog */}
      <SuggestOrgDialog open={suggestOpen} onOpenChange={setSuggestOpen} />

      {/* Mobile Menu Portal */}
      <MobileMenu open={open} className="flex flex-col justify-between p-6 gap-6">
        <div className="grid gap-y-4">
          <p className=" text-xs uppercase tracking-[0.06em] text-[#0C354C]/60 mb-2">Navegación</p>
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'relative inline-block w-fit py-1 font-sans text-2xl font-light tracking-[-0.01em] transition-colors duration-200',
                  isActive ? 'text-[#16587B] font-medium' : 'text-[#0C354C] hover:text-[#16587B]'
                )}
              >
                {link.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-[#16587B]"
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="flex flex-col gap-4 pt-6 border-t border-[#DFD5C0]">
          <Button
            type="button"
            onClick={() => {
              setOpen(false)
              setSuggestOpen(true)
            }}
            className="w-full rounded-full py-3.5 h-auto text-[16px] font-medium bg-[#16587B] hover:bg-[#0C354C] text-white border-none shadow-none"
          >
            Sugerir ONG
          </Button>
        </div>
      </MobileMenu>
    </header>
  )
}

type MobileMenuProps = React.ComponentProps<'div'> & {
  open: boolean
}

function MobileMenu({ open, children, className, ...props }: MobileMenuProps) {
  if (!open || typeof window === 'undefined') return null

  return createPortal(
    <div
      id="mobile-menu"
      className={cn(
        'bg-[#F5EEDD]',
        'fixed top-20 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden md:hidden transition-all duration-200 border-t border-[#DFD5C0]'
      )}
    >
      <div
        data-slot={open ? 'open' : 'closed'}
        className={cn(
          'data-[slot=open]:animate-in data-[slot=open]:slide-in-from-top-4 data-[slot=open]:fade-in ease-out duration-200',
          'size-full flex flex-col',
          className
        )}
        {...props}
      >
        {children}
      </div>
    </div>,
    document.body
  )
}
