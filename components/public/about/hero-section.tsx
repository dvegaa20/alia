'use client'

import { motion } from 'framer-motion'

export function AboutHeroSection() {
  return (
    <section className="px-8 py-20 md:py-32 max-w-5xl mx-auto text-center overflow-hidden">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="font-headline font-bold text-5xl md:text-7xl text-foreground tracking-tight leading-[1.1] mb-8"
      >
        Nuestra misión: Conectar personas con causas reales.
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="font-body text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
      >
        Una iniciativa familiar, sin fines de lucro, nacida del deseo de hacer el bien accesible a
        todos.
      </motion.p>
    </section>
  )
}
