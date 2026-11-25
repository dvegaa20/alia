'use client'

import React, { useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Button } from '@/components/ui/button'
import { SuggestOrgDialog } from '@/components/public/suggest/suggest-org-dialog'
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

export function Navbar({ hasLogoLight = false, hasLogoDark = false }: NavbarProps) {
  const [open, setOpen] = React.useState(false)
  const [suggestOpen, setSuggestOpen] = React.useState(false)
  const pathname = usePathname()
  const headerRef = useRef<HTMLElement>(null)
  const openRef = useRef(open)

  useEffect(() => {
    openRef.current = open
    if (open && headerRef.current) {
      gsap.to(headerRef.current, {
        yPercent: 0,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
    if (headerRef.current) {
      gsap.set(headerRef.current, { yPercent: 0 })
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

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        let isHidden = false
        let lastScrollY = window.scrollY

        ScrollTrigger.create({
          start: 0,
          end: 'max',
          onUpdate: (self) => {
            const currentY = self.scroll()
            if (openRef.current || currentY <= 120) {
              if (isHidden && headerRef.current) {
                isHidden = false
                gsap.to(headerRef.current, {
                  yPercent: 0,
                  duration: 0.35,
                  ease: 'power3.out',
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
                yPercent: -135,
                duration: 0.35,
                ease: 'power2.out',
                overwrite: 'auto',
              })
            } else if (delta < -6 && isHidden && headerRef.current) {
              isHidden = false
              gsap.to(headerRef.current, {
                yPercent: 0,
                duration: 0.35,
                ease: 'power3.out',
                overwrite: 'auto',
              })
            }
            lastScrollY = currentY
          },
        })
      })
    },
    { scope: headerRef }
  )

  return (
    <header
      ref={headerRef}
      className="fixed top-0 inset-x-0 z-50 w-full px-6 md:px-10 lg:px-14 pt-3.5 pointer-events-none will-change-transform"
    >
      <nav
        aria-label="Navegación principal"
        className="pointer-events-auto mx-auto max-w-[1440px] flex md:grid md:grid-cols-[1fr_auto_1fr] h-16 w-full items-center justify-between rounded-[4px] border border-[#DFD5C0] bg-[#FAF7F0]/95 backdrop-blur-md px-5 md:px-6 navbar-float"
      >
        {/* Columna 1: Logo */}
        <Link
          href="/"
          className="inline-flex items-center justify-self-start hover:opacity-80 transition-opacity shrink-0"
          aria-label="Alia — Inicio"
        >
          <AliaLogo variant="dark" hasLogoLight={hasLogoLight} hasLogoDark={hasLogoDark} />
        </Link>

        {/* Columna 2: Desktop Links centrados al viewport */}
        <div className="hidden md:flex items-center justify-self-center gap-8">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative py-1.5 font-sans text-[15px] font-medium tracking-[-0.015em] transition-colors duration-200 whitespace-nowrap',
                  isActive ? 'text-[#16587B]' : 'text-[#1B2D38] hover:text-[#16587B]'
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute bottom-0 left-0 h-[2px] w-full bg-[#16587B] transition-transform duration-200 origin-left',
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  )}
                />
              </Link>
            )
          })}
        </div>

        {/* Columna 3: Desktop CTA */}
        <div className="hidden md:flex items-center justify-self-end shrink-0">
          <Button
            type="button"
            onClick={() => setSuggestOpen(true)}
            className="rounded-[4px] bg-[#16587B] hover:bg-[#0C354C] text-white px-5 py-2.5 h-auto font-sans text-[15px] font-medium tracking-[-0.02em] border border-[#16587B] hover:border-[#0C354C] shadow-none transition-colors"
          >
            Sugerir ONG
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center md:hidden">
          <Button
            size="icon"
            variant="outline"
            onClick={() => setOpen(!open)}
            className="rounded-[4px] size-10 border-[#DFD5C0] bg-[#FAF7F0] text-[#0C354C] hover:bg-[#EAE1CD] shadow-none"
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
          <p className="font-mono text-xs uppercase tracking-[0.06em] text-[#0C354C]/60 mb-2">
            Navegación
          </p>
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
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#16587B]"
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
            className="w-full rounded-[4px] py-3.5 h-auto text-[16px] font-medium bg-[#16587B] hover:bg-[#0C354C] text-white border-none shadow-none"
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
        'bg-[#F5EEDD]/98 supports-[backdrop-filter]:bg-[#F5EEDD]/95 backdrop-blur-xl',
        'fixed top-[82px] right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden md:hidden transition-all duration-200 border-t border-[#DFD5C0]'
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
