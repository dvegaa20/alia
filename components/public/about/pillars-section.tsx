'use client'

import { motion } from 'framer-motion'
import { Heart, ShieldCheck, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const pillars = [
  {
    Icon: ShieldCheck,
    title: 'Revisión Humana',
    description:
      'Cada proyecto es verificado personalmente por nuestro equipo. Construimos una red de confianza real, conociendo las historias detrás de cada causa antes de publicarla.',
  },
  {
    Icon: Heart,
    title: 'Siempre Gratuito',
    description:
      'Sin costos, sin anuncios y sin intermediarios. Queremos que el vínculo entre ciudadanos y organizaciones sea directo, genuino y sin barreras económicas.',
  },
  {
    Icon: Globe,
    title: 'Compromiso Social',
    description:
      'No buscamos beneficios económicos. Este es nuestro aporte al bienestar común, construido con voluntad, transparencia y la convicción de un México más solidario.',
  },
]

export function PillarsSection() {
  return (
    <section className="w-full bg-surface border-y border-border/70 py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45 }}
          className="text-center mb-14 space-y-3"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-primary">
            Principios
          </p>
          <h2 className="font-sans font-medium text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] tracking-[-0.025em] text-foreground">
            Nuestros Pilares
          </h2>
          <p className="font-sans text-base sm:text-lg text-foreground-secondary max-w-xl mx-auto leading-[1.6]">
            Los valores de revisión humana y transparencia que guían cada decisión en Alia.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {pillars.map(({ Icon, title, description }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
            >
              <Card className="h-full bg-background/50 dark:bg-background border border-border ring-0 rounded-[20px] hover:border-rock-blue transition-colors duration-200 py-0">
                <CardContent className="p-8 flex flex-col items-start gap-5">
                  <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-sans font-semibold text-xl text-foreground">{title}</h3>
                    <p className="font-sans text-foreground-secondary text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
