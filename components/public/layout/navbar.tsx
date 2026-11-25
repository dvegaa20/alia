'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { createPortal } from 'react-dom'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { SuggestOrgDialog } from '@/components/public/suggest/suggest-org-dialog'
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon'
import { AliaLogo } from './alia-logo'
import { cn } from '@/lib/utils'

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
  const [hoveredPath, setHoveredPath] = React.useState<string | null>(null)
  const pathname = usePathname()

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 pt-3 pb-2 pointer-events-none">
      <nav
        aria-label="Navegación principal"
        className="pointer-events-auto mx-auto max-w-6xl flex h-14 sm:h-15 w-full items-center justify-between rounded-full border border-border bg-white/90 dark:bg-dark-surface/90 backdrop-blur-md px-4 sm:px-6 navbar-float transition-all duration-200"
      >
        {/* Logo */}
        <Link
          href="/"
          className="inline-flex items-center hover:opacity-85 transition-opacity shrink-0"
          aria-label="Alia — Inicio"
        >
          <AliaLogo variant="auto" hasLogoLight={hasLogoLight} hasLogoDark={hasLogoDark} />
        </Link>

        {/* Desktop Links */}
        <div
          className="hidden items-center gap-7 md:flex"
          onMouseLeave={() => setHoveredPath(null)}
        >
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
            const isHovered = hoveredPath === link.href
            const showIndicator = isHovered || (!hoveredPath && isActive)

            return (
              <Link
                key={link.href}
                href={link.href}
                onMouseEnter={() => setHoveredPath(link.href)}
                className={cn(
                  'relative py-1.5 font-sans text-[14px] font-medium transition-colors duration-200',
                  isActive ? 'text-primary' : 'text-foreground-secondary hover:text-primary'
                )}
              >
                {link.label}
                {showIndicator && (
                  <motion.div
                    layoutId={`nav-indicator-${pathname}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-primary"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            )
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2.5 md:flex shrink-0">
          <ModeToggle />
          <Button
            type="button"
            onClick={() => setSuggestOpen(true)}
            className="rounded-full bg-primary hover:bg-primary-hover text-primary-foreground px-5 py-2.5 h-auto font-sans text-[14px] font-medium border-none"
          >
            Sugerir ONG
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <ModeToggle />
          <Button
            size="icon"
            variant="outline"
            onClick={() => setOpen(!open)}
            className="rounded-full size-9 border-border bg-surface text-foreground hover:bg-surface-subtle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Abrir menú"
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
          <p className="font-mono text-xs uppercase tracking-[0.04em] text-foreground-muted mb-2">
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
                  'relative inline-block w-fit py-1 font-sans text-2xl font-medium tracking-[-0.02em] transition-colors duration-200',
                  isActive ? 'text-primary' : 'text-foreground-secondary hover:text-primary'
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId={`mobile-nav-indicator-${pathname}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-0 left-0 w-full h-[2px] rounded-full bg-primary"
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="flex flex-col gap-4 pt-6 border-t border-border">
          <Button
            type="button"
            onClick={() => {
              setOpen(false)
              setSuggestOpen(true)
            }}
            className="w-full rounded-full py-3.5 h-auto text-[15px] font-medium bg-primary hover:bg-primary-hover text-primary-foreground border-none"
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
        'bg-background/98 supports-[backdrop-filter]:bg-background/95 backdrop-blur-xl',
        'fixed top-[74px] right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden md:hidden transition-all duration-200'
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
