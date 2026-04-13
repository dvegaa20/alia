'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/ui/mode-toggle'
import { SuggestOrgDialog } from '@/components/public/suggest/suggest-org-dialog'

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/directory', label: 'Todas las causas' },
  { href: '/about', label: 'Sobre el proyecto' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="grid grid-cols-2 md:grid-cols-3 items-center w-full px-8 py-6 max-w-[1600px] mx-auto">
        <div className="flex justify-start">
          <Link
            href="/"
            className="text-2xl font-bold text-primary-900 dark:text-primary-200 font-headline tracking-tight"
          >
            Alia
          </Link>
        </div>

        <div className="hidden md:flex justify-center items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href

            return (
              <Link
                key={link.label}
                href={link.href}
                className={
                  isActive
                    ? 'text-primary-900 dark:text-primary-200 font-bold border-b-2 border-primary-900 dark:border-primary-200 pb-1 font-headline text-base transition-all duration-300'
                    : 'text-muted-foreground font-medium font-headline text-base hover:text-primary-900 dark:hover:text-primary-200 transition-all duration-300'
                }
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        <div className="flex justify-end items-center space-x-4">
          <SuggestOrgDialog>
            <Button
              className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group px-6 bg-linear-to-r from-primary to-primary-300 hover:from-primary/90 hover:to-primary-300/90 text-primary-foreground"
              asChild
            >
              <span className="relative z-10 flex items-center gap-2">Sugerir ONG</span>
            </Button>
          </SuggestOrgDialog>
          <ModeToggle />
        </div>
      </div>
    </nav>
  )
}
