'use client'

import { motion } from 'framer-motion'
import { Eye, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function CtaSection() {
  return (
    <section className="px-4 sm:px-8 mb-20 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-400 mx-auto relative"
      >
        {/* Image Background Container */}
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden min-h-[400px] md:min-h-[480px]">
          {/* Placeholder image — replace with your real image */}
          <div className="absolute inset-0 bg-gradient-to-br from-base-300 via-base-200 to-base-100">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-3 opacity-40">
                <div className="size-14 rounded-full bg-base-400/30 mx-auto flex items-center justify-center">
                  <Eye className="size-6 text-base-500" />
                </div>
                <p className="text-base-500 text-sm font-medium tracking-wide uppercase">
                  Imagen del CTA
                </p>
                <p className="text-base-400 text-xs max-w-xs">
                  1600 × 480px recomendado
                </p>
              </div>
            </div>
          </div>

          {/* Subtle gradient overlay on the right for card readability */}
          <div className="absolute inset-0 bg-gradient-to-l from-base-950/20 via-transparent to-transparent" />

          {/* Floating Subscription Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="absolute bottom-6 right-6 sm:bottom-10 sm:right-10 w-[calc(100%-48px)] sm:w-[420px]"
          >
            <div className="bg-white rounded-2xl shadow-2xl p-7 space-y-5">
              {/* Badge */}
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 text-primary-800 text-xs font-bold tracking-widest uppercase">
                <span className="size-1.5 rounded-full bg-primary-500 animate-pulse" />
                Nuestra Comunidad
              </span>

              {/* Title */}
              <h3 className="text-2xl font-bold text-base-900 font-headline leading-snug">
                Recibe Historias que Hacen la Diferencia
              </h3>

              {/* Email Form */}
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex items-center gap-2 bg-base-50 rounded-full p-1.5 border border-base-200/80"
              >
                <div className="flex items-center gap-2 flex-1 pl-3">
                  <Mail className="size-4 text-base-400 shrink-0" />
                  <input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="text-sm bg-transparent border-none outline-none placeholder:text-base-400 text-base-800 w-full font-body"
                  />
                </div>
                <Button
                  type="submit"
                  className="rounded-full bg-primary-700 hover:bg-primary-800 text-white font-headline font-bold text-xs px-6 py-2.5 h-auto shrink-0 transition-all"
                >
                  Unirse
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
