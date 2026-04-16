'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SuggestOrgDialog } from '@/components/public/suggest/suggest-org-dialog'
import Link from 'next/link'

export function CtaSection() {
  return (
    <section className="px-4 sm:px-8 py-12 mb-16">
      <div className="max-w-400 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.58, ease: 'easeOut' }}
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border/60 bg-card shadow-xl"
        >
          {/* Decorative gradient blob (background) */}
          <div
            className="pointer-events-none absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-20 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, var(--color-primary-500) 0%, transparent 70%)',
            }}
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 w-56 h-56 rounded-full opacity-10 blur-3xl"
            style={{
              background:
                'radial-gradient(circle, var(--color-primary-700) 0%, transparent 70%)',
            }}
          />

          {/* Content */}
          <div className="relative z-10 px-8 py-14 sm:px-14 sm:py-16 flex flex-col items-center text-center gap-7">

            {/* Icon accent */}
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Lightbulb className="size-6 text-primary" strokeWidth={1.75} />
            </div>

            {/* Headline */}
            <div className="space-y-3 max-w-2xl">
              <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-foreground leading-tight">
                Ayúdanos a crecer{' '}
                <span className="text-primary italic">el directorio</span>
              </h2>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                ¿Conoces una iniciativa que deba estar aquí? Juntos podemos hacer
                que esta red llegue a quienes más lo necesitan.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
              <Button
                asChild
                className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-headline font-bold px-8 py-3 h-auto text-sm shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-[1.03] active:scale-95 transition-all duration-300"
              >
                <Link href="/directory">
                  Explorar Directorio
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </Button>

              <SuggestOrgDialog>
                <Button
                  variant="outline"
                  className="rounded-full border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:text-primary font-headline font-bold px-8 py-3 h-auto text-sm transition-all duration-300"
                >
                  <Lightbulb className="mr-2 size-4" />
                  Sugerir una ONG
                </Button>
              </SuggestOrgDialog>
            </div>

            {/* Reassurance note */}
            <p className="font-label text-xs text-muted-foreground/60 italic -mt-2">
              Todas las sugerencias se revisan manualmente. Sin costo, sin intermediarios.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
