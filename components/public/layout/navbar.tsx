'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { SuggestOrgDialog } from '@/components/public/suggest/suggest-org-dialog'
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon'
import { useScroll } from '@/components/ui/use-scroll'
import { cn } from '@/lib/utils'
import { createPortal } from 'react-dom'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/directory', label: 'Todas las causas' },
  { href: '/about', label: 'Sobre el proyecto' },
  { href: '/impact', label: 'Impacto' },
]

export function Navbar() {
  const [open, setOpen] = React.useState(false)
  const [hoveredPath, setHoveredPath] = React.useState<string | null>(null)
  const scrolled = useScroll(10)
  const pathname = usePathname()

  // Prevent body scroll when mobile menu is open
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
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent',
        {
          'bg-background/80 supports-[backdrop-filter]:bg-background/40 border-border/50 backdrop-blur-xl py-2 shadow-sm':
            scrolled,
          'py-4': !scrolled,
        }
      )}
    >
      <nav className="max-w-400 mx-auto flex h-14 w-full items-center justify-between px-6 sm:px-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-2xl font-bold text-primary dark:text-primary-200 font-headline tracking-tight hover:opacity-80 transition-opacity"
          >
            Alia
          </Link>
        </div>

        {/* Desktop Navigation & Actions */}
        <div className="hidden items-center gap-6 md:flex">
          <div className="flex items-center gap-8 mr-4" onMouseLeave={() => setHoveredPath(null)}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              const isHovered = hoveredPath === link.href

              // Resolve which link should show the indicator
              // Priority: Hovered link > Active link (if none is hovered)
              const showIndicator = isHovered || (!hoveredPath && isActive)

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  className={cn(
                    'text-sm font-medium font-headline transition-colors duration-200 relative group py-1',
                    isActive ? 'text-primary dark:text-primary-200' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                  {showIndicator && (
                    <motion.div
                      layoutId={`nav-indicator-${pathname}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary dark:bg-primary-200 z-10"
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

          <div className="flex items-center gap-3">
            <SuggestOrgDialog>
              <Button
                className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-headline text-xs h-9 border-none"
                asChild
              >
                <span>Sugerir ONG</span>
              </Button>
            </SuggestOrgDialog>
            <ModeToggle />
          </div>
        </div>

        {/* Mobile menu and button (always on right) */}
        <div className="flex items-center md:hidden">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setOpen(!open)}
            className="text-muted-foreground hover:text-foreground"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle menu"
          >
            <MenuToggleIcon open={open} className="size-6" duration={300} />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Portal */}
      <MobileMenu open={open} className="flex flex-col justify-between p-6 gap-6">
        <div className="grid gap-y-4">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold mb-2">
            Navegación
          </p>
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'text-2xl font-bold font-headline transition-all duration-200 relative group inline-block w-fit py-1',
                  isActive ? 'text-primary dark:text-primary-200' : 'text-muted-foreground'
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId={`mobile-nav-indicator-${pathname}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-0 left-0 w-full h-[3px] bg-primary dark:bg-primary-200"
                  />
                )}
              </Link>
            )
          })}
        </div>

        <div className="flex flex-col gap-4 pt-6 border-t border-border/40">
          <SuggestOrgDialog>
            <Button
              className="w-full rounded-2xl py-6 text-base shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground font-headline border-none"
              onClick={() => setOpen(false)}
            >
              Sugerir una ONG
            </Button>
          </SuggestOrgDialog>
          <div className="flex items-center justify-between px-2 pt-2">
            <span className="text-sm font-medium text-muted-foreground font-headline">
              Apariencia
            </span>
            <ModeToggle />
          </div>
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
        'bg-background/98 supports-[backdrop-filter]:bg-background/80 backdrop-blur-2xl',
        'fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden md:hidden transition-all duration-300'
      )}
    >
      <div
        data-slot={open ? 'open' : 'closed'}
        className={cn(
          'data-[slot=open]:animate-in data-[slot=open]:slide-in-from-top-4 data-[slot=open]:fade-in ease-out duration-300',
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
