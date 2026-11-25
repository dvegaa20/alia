'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export function AboutHeroSection() {
  return (
    <section className="w-full bg-background pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        <motion.div {...fadeUp} transition={{ duration: 0.45, ease: 'easeOut' }} className="mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.04em] text-primary">
            <Sparkles className="size-3.5" strokeWidth={1.5} />
            Sobre el proyecto
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.08 }}
          className="font-sans font-medium text-[38px] sm:text-[52px] lg:text-[62px] leading-[1.06] tracking-[-0.03em] text-foreground mb-6"
        >
          Nuestra misión: <span className="text-primary">conectar personas</span> con causas reales.
        </motion.h1>

        <motion.p
          {...fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.16 }}
          className="font-sans text-lg sm:text-xl text-foreground-secondary leading-[1.6] max-w-2xl"
        >
          Una iniciativa familiar, sin fines de lucro, nacida del deseo de hacer el bien accesible
          para todos en México.
        </motion.p>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.24 }}
          className="mt-10 flex items-center gap-3"
        >
          <div className="w-8 h-px bg-border" />
          <span className="font-mono text-xs uppercase tracking-[0.04em] text-foreground-muted">
            Alia · Directorio Social · México
          </span>
          <div className="w-8 h-px bg-border" />
        </motion.div>
      </div>
    </section>
  )
}
