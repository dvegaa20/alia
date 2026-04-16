'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export function AboutHeroSection() {
  return (
    <section className="relative px-4 sm:px-8 pt-6 pb-10">
      <div className="max-w-400 mx-auto">
        {/* Full-bleed banner container */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[70vh] md:min-h-[80vh] flex items-center justify-center">

          {/* ── Background placeholder ── */}
          {/*
           * PLACEHOLDER: Reemplazar este div con una imagen <Image /> real.
           * Concepto visual: foto "Golden Hour" de la fundadora o del equipo
           * en un contexto cálido y humano (ej. reunión comunitaria, trabajo
           * en campo, momento de inicio del proyecto).
           * Tamaño recomendado: 1600 × 900px mínimo, landscape.
           */}
          <div className="absolute inset-0 bg-gradient-to-br from-base-800 via-base-900 to-base-950">
            {/* Sutil textura visual mientras llega la foto */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 30% 40%, var(--color-primary-600) 0%, transparent 50%),
                                  radial-gradient(circle at 75% 70%, var(--color-primary-800) 0%, transparent 45%)`,
              }}
            />
          </div>

          {/* ── Dark overlay for text legibility ── */}
          <div className="absolute inset-0 bg-black/60 z-10" />

          {/* ── Bottom gradient fade ── */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/40 to-transparent z-10" />

          {/* ── Content: centered vertically & horizontally ── */}
          <div className="relative z-20 flex flex-col items-center text-center px-6 sm:px-12 lg:px-24 py-20 max-w-4xl mx-auto">

            {/* Badge */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="mb-6"
            >
              <Badge className="bg-white/10 text-white/90 border border-white/20 backdrop-blur-md px-4 py-1.5 h-auto rounded-full text-xs font-bold uppercase tracking-widest gap-2">
                <Sparkles className="size-3" />
                Sobre el Proyecto
              </Badge>
            </motion.div>

            {/* Main headline */}
            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
              className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1] mb-6"
            >
              Nuestra misión:{' '}
              <span className="text-primary-300 italic">
                Conectar personas
              </span>{' '}
              con causas reales.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.22 }}
              className="font-body text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl"
            >
              Una iniciativa familiar, sin fines de lucro, nacida del deseo
              de hacer el bien accesible para todos en México.
            </motion.p>

            {/* Decorative divider */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.34 }}
              className="mt-10 flex items-center gap-3"
            >
              <div className="w-8 h-px bg-white/30" />
              <span className="text-white/40 text-xs uppercase tracking-widest font-label">
                Alia · Directorio Social · México
              </span>
              <div className="w-8 h-px bg-white/30" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
