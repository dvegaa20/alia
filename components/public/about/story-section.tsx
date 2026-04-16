'use client'

import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'

export function StorySection() {
  return (
    <section className="px-4 sm:px-8 py-24 bg-background overflow-hidden">
      <div className="max-w-400 mx-auto">

        {/* Layout: text left, image right */}
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

          {/* ── Text Column ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="flex-1 space-y-7"
          >
            <div>
              <p className="text-primary font-label text-xs uppercase tracking-widest font-bold mb-3">
                Nuestra historia
              </p>
              <h2 className="font-headline font-bold text-4xl md:text-5xl text-foreground leading-tight">
                La historia{' '}
                <span className="text-primary italic">detrás de Alia</span>
              </h2>
            </div>

            <div className="space-y-5 font-body text-lg text-muted-foreground leading-loose">
              <p>
                Todo comenzó con una pregunta simple: <em className="text-foreground">"¿Dónde puedo ayudar hoy?"</em>
                {' '}La respuesta no debería ser difícil de encontrar, pero lo era. Horas de búsqueda,
                sitios desactualizados y directorios detrás de suscripciones.
              </p>
              <p>
                Alia nació de esa frustración y de algo más profundo: la certeza de que en México
                hay una enorme <strong className="text-foreground font-semibold">voluntad de ayudar</strong> que
                nunca llega a su destino por falta de un puente claro, gratuito y confiable.
              </p>
              <p>
                Como iniciativa familiar, construida con tiempo, dedicación y sin financiamiento externo,
                entendemos que <strong className="text-foreground font-semibold">el compromiso social no requiere
                grandes recursos, sino una visión clara y la determinación de ejecutarla</strong>.
                Cada organización verificada, cada conexión facilitada, es nuestra razón de seguir.
              </p>
            </div>

            {/* Founder signature accent */}
            <div className="pt-2 flex items-center gap-4">
              <div className="w-12 h-0.5 bg-primary/40 rounded-full" />
              <p className="font-label text-sm text-muted-foreground italic">
                Fundadora &amp; Directora de Alia
              </p>
            </div>
          </motion.div>

          {/* ── Image Column ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: 'easeOut', delay: 0.15 }}
            className="flex-1 relative w-full max-w-md lg:max-w-none"
          >
            {/* Decorative blur orb */}
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/*
             * ─────────────────────────────────────────────────────────────────
             * PLACEHOLDER: Foto real de la fundadora trabajando
             *
             * ⚠️  IMPORTANTE: NO usar fotos genéricas de stock corporativo.
             *     Esta imagen es la cara humana del proyecto para el pitch de beca.
             *
             * Instrucciones para reemplazar:
             * 1. Añadir la foto a /public/images/ (ej. founder-working.jpg)
             * 2. Reemplazar este <div> con:
             *    <Image
             *      src="/images/founder-working.jpg"
             *      alt="[Nombre de la fundadora] trabajando en Alia"
             *      fill
             *      className="object-cover"
             *    />
             *
             * Especificaciones recomendadas:
             * - Tamaño: 800 × 1000 px mínimo
             * - Aspecto: 4:5 (portrait)
             * - Contexto: momento de trabajo real — laptop, notas, reunión
             *   con organización, trabajo en campo, etc.
             * - Iluminación: cálida y natural (no estudio)
             * ─────────────────────────────────────────────────────────────────
             */}
            <div
              className="relative aspect-4/5 w-full rounded-2xl overflow-hidden bg-muted rotate-2 hover:rotate-0 transition-transform duration-500 shadow-2xl"
            >
              {/* Placeholder visual */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center">
                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Camera className="size-6 text-primary/50" />
                </div>
                <div className="space-y-1.5">
                  <p className="font-label text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    📸 Foto de la fundadora
                  </p>
                  <p className="font-body text-[11px] text-muted-foreground/70 max-w-[200px] leading-relaxed">
                    Reemplazar con imagen real.<br />
                    <strong>No usar stock corporativo.</strong>
                  </p>
                  <p className="font-label text-[10px] text-muted-foreground/50 mt-1">
                    800 × 1000 px · Aspecto 4:5
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
