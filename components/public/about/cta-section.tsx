'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function CtaSection() {
  return (
    <section className="px-8 mb-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-7xl mx-auto bg-primary rounded-xl overflow-hidden relative"
      >
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/80 rounded-full opacity-20 -mr-20 -mt-20 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent rounded-full opacity-10 -ml-20 -mb-20 blur-3xl" />

        {/* Content */}
        <div className="relative px-8 py-20 md:py-24 text-center max-w-4xl mx-auto space-y-10">
          <h2 className="font-headline font-bold text-4xl md:text-5xl text-primary-foreground">
            Ayúdanos a crecer
          </h2>
          <p className="font-body text-xl text-primary-foreground/80 leading-relaxed">
            ¿Conoces una organización que debería estar aquí? Ayúdanos a mapear el impacto social y
            hacer este directorio cada vez más grande.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-linear-to-r from-white to-primary-50 dark:from-primary-900 dark:to-primary-800 text-primary-900 dark:text-primary-50 px-10 py-5 h-auto rounded-lg font-bold text-lg hover:opacity-90 transition-all active:scale-95 shadow-xl border-none"
            >
              <Link href="/sugerir">Sumar proyecto</Link>
            </Button>

            <Link
              href="#"
              className="text-primary-foreground font-bold hover:underline underline-offset-8 decoration-2 px-8 py-5"
            >
              Contactar al equipo
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
