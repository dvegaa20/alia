'use client'

import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { usePathname } from 'next/navigation'
import { FooterCTA } from './footer-cta'

/* ── Social icon SVGs (inline for zero-dependency) ── */
function IconInstagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}

/* ── Link column data ── */
const defaultFooterColumns = [
  {
    title: 'Participar',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Guías para donantes', href: '/resources/donors' },
      { label: 'Guías para voluntarios', href: '/resources/volunteers' },
      { label: 'Recursos para ONGs', href: '/resources/nonprofits' },
    ],
  },
  {
    title: 'Conoce Alia',
    links: [
      { label: 'Nuestra Misión', href: '/about' },
      { label: 'Cómo verificamos', href: '/criteria' },
      { label: 'Impacto y Métricas', href: '/impact' },
    ],
  },
  {
    title: 'Contacto',
    links: [
      { label: 'Preguntas Frecuentes', href: '/faq' },
      { label: 'Prensa y Medios', href: '/press' },
      { label: 'Contacto directo', href: '/contact' },
    ],
  },
]

const socialLinks = [
  { icon: IconInstagram, href: '#', label: 'Instagram' },
  { icon: IconFacebook, href: '#', label: 'Facebook' },
  { icon: IconLinkedIn, href: '#', label: 'LinkedIn' },
]

interface FooterProps {
  topCategories?: { name: string; slug: string }[]
}

/* ── Footer Component ── */
export function Footer({ topCategories = [] }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const exploreLinks = [
    { label: 'Directorio', href: '/directory' },
    ...topCategories.map((cat) => ({
      label: cat.name,
      href: `/directory?category=${cat.slug}`,
    })),
  ]

  const footerColumns = [
    {
      title: 'Explorar Causas',
      links: exploreLinks,
    },
    ...defaultFooterColumns,
  ]

  return (
    <footer className="relative w-full">
      {isHomePage && <FooterCTA />}

      {/* ─── Main Footer Card ─── */}
      <div className={`relative px-4 pb-4 sm:px-8 sm:pb-8 ${isHomePage ? '-mt-36' : 'pt-8'}`}>
        <div className="bg-card max-w-400 mx-auto border border-border/60 rounded-[28px] sm:rounded-[32px] shadow-xl overflow-hidden">
          <div className="p-8 sm:p-10 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_2fr] gap-12 lg:gap-16">
              {/* Left: Brand */}
              <div className="space-y-5">
                <Link
                  href="/"
                  className="text-2xl font-bold text-primary-900 dark:text-primary-200 font-headline tracking-tight inline-block"
                >
                  Alia
                </Link>

                <p className="text-muted-foreground text-sm leading-relaxed font-body max-w-xs">
                  Alia es un directorio social transparente y accesible que funciona como un puente
                  confiable entre ciudadanos y organizaciones verídicas en México.
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-3 pt-1">
                  {socialLinks.map((social) => (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary-900 dark:hover:bg-primary/20 dark:hover:text-primary-200 text-muted-foreground transition-all duration-200"
                    >
                      <social.icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right: Link Columns */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-6">
                {footerColumns.map((column) => (
                  <div key={column.title} className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground font-headline tracking-wide">
                      {column.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {column.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            className="text-[13px] text-muted-foreground hover:text-primary-900 dark:hover:text-primary-200 transition-colors duration-200 font-body"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legal row */}
          <div className="px-8 sm:px-10 lg:px-14">
            <Separator className="bg-border/60" />
          </div>
          <div className="px-8 sm:px-10 lg:px-14 py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground font-label">
              © {currentYear} Alia. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
