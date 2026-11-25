'use client'

import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'

export function StorySection() {
  return (
    <section className="w-full bg-background py-20 lg:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="space-y-3">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-primary">
                Nuestra historia
              </p>
              <h2 className="font-sans font-medium text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] tracking-[-0.025em] text-foreground">
                La historia <span className="text-primary">detrás de Alia</span>
              </h2>
            </div>

            <div className="space-y-5 font-sans text-base sm:text-lg text-foreground-secondary leading-[1.7]">
              <p>
                Todo comenzó con una pregunta simple:{' '}
                <em className="text-foreground not-italic font-medium">
                  &ldquo;¿Dónde puedo ayudar hoy?&rdquo;
                </em>{' '}
                La respuesta no debería ser difícil de encontrar, pero lo era. Horas de búsqueda,
                sitios desactualizados y directorios detrás de suscripciones.
              </p>
              <p>
                Alia nació de esa frustración y de algo más profundo: la certeza de que en México
                hay una enorme{' '}
                <strong className="text-foreground font-semibold">voluntad de ayudar</strong> que
                nunca llega a su destino por falta de un puente claro, gratuito y confiable.
              </p>
              <p>
                Como iniciativa familiar, construida con tiempo, dedicación y sin financiamiento
                externo, entendemos que{' '}
                <strong className="text-foreground font-semibold">
                  el compromiso social no requiere grandes recursos, sino una visión clara y la
                  determinación de ejecutarla
                </strong>
                . Cada organización verificada, cada conexión facilitada, es nuestra razón de
                seguir.
              </p>
            </div>

            {/* Founder signature */}
            <div className="pt-3 flex items-center gap-4">
              <div className="w-10 h-0.5 bg-primary rounded-full shrink-0" />
              <div>
                <p className="font-sans font-semibold text-base text-foreground">Sofía Vega</p>
                <p className="font-mono text-xs uppercase tracking-[0.04em] text-foreground-muted">
                  Fundadora &amp; Directora de Alia
                </p>
              </div>
            </div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none"
          >
            {/*
             * PLACEHOLDER: Foto real de Sofía Vega trabajando en Alia
             * Reemplazar con <Image src="/images/founder-working.jpg" alt="Sofía Vega, Fundadora y Directora de Alia" fill className="object-cover" />
             * Especificaciones: 800 x 1000 px mínimo, aspecto 4:5, iluminación cálida y natural.
             */}
            <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden border border-border bg-surface flex flex-col items-center justify-center p-8 text-center">
              <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Camera className="size-6" strokeWidth={1.5} />
              </div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-primary mb-2">
                Foto de la fundadora
              </p>
              <p className="font-sans text-sm text-foreground-secondary max-w-[240px] leading-relaxed">
                Sofía Vega en campo con iniciativas sociales de México.
              </p>
              <p className="font-mono text-[11px] text-foreground-muted mt-3">
                800 × 1000 px · Aspecto 4:5
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
