'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SuggestOrgDialog } from '@/components/public/suggest/suggest-org-dialog'

export function CtaSection() {
  return (
    <section className="w-full bg-background pb-20 lg:pb-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="rounded-[20px] bg-band-dark text-band-dark-foreground border border-white/10 px-6 py-12 sm:px-14 sm:py-16 flex flex-col items-center text-center gap-6"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-rock-blue">
            Suma una causa
          </span>

          <div className="space-y-3 max-w-2xl">
            <h2 className="font-sans font-medium text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] tracking-[-0.025em] text-white dark:text-merino">
              Ayúdanos a crecer el directorio
            </h2>
            <p className="font-sans text-base sm:text-lg text-merino/85 leading-[1.6]">
              ¿Conoces una iniciativa que deba estar aquí? Juntos podemos hacer que esta red llegue
              a quienes más lo necesitan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
            <Button
              asChild
              className="rounded-full bg-merino text-deep-harbor hover:bg-white px-6 py-3 h-auto text-[15px] font-medium border-none"
            >
              <Link href="/directory">
                Explorar directorio
                <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
              </Link>
            </Button>

            <SuggestOrgDialog>
              <Button
                type="button"
                variant="outline"
                className="rounded-full border-merino/50 bg-transparent text-merino hover:bg-white/10 hover:text-white hover:border-merino px-6 py-3 h-auto text-[15px] font-medium"
              >
                <Lightbulb className="mr-2 size-4" strokeWidth={1.5} />
                Sugerir una ONG
              </Button>
            </SuggestOrgDialog>
          </div>

          <p className="font-mono text-xs text-merino/70">
            Todas las sugerencias se revisan manualmente. Sin costo, sin intermediarios.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
