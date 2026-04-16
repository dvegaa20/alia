'use client'

import { motion } from 'framer-motion'
import { Heart, ShieldCheck, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const pillars = [
  {
    Icon: Heart,
    title: 'Siempre Gratuito',
    description:
      'Sin costos, sin anuncios y sin rastreadores. Queremos que el vínculo entre las personas sea directo, genuino y sin barreras económicas de ningún tipo.',
    iconColor: 'text-rose-500 dark:text-rose-400',
    iconBg: 'bg-rose-500/10',
  },
  {
    Icon: ShieldCheck,
    title: 'Revisión Humana',
    description:
      'Cada proyecto es verificado personalmente por nuestro equipo. Construimos una red de confianza real, conociendo las historias detrás de cada causa antes de publicarla.',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    Icon: Globe,
    title: 'Compromiso Social',
    description:
      'No buscamos beneficios económicos. Este es nuestro aporte al bienestar común, construido con voluntad, tiempo y convicción de que un México más solidario es posible.',
    iconColor: 'text-amber-600 dark:text-amber-400',
    iconBg: 'bg-amber-500/10',
  },
]

export function PillarsSection() {
  return (
    <section className="px-4 sm:px-8 py-24 bg-background overflow-hidden">
      <div className="max-w-400 mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.52 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-label text-xs uppercase tracking-widest font-bold mb-3">
            Principios
          </p>
          <h2 className="font-headline font-bold text-4xl md:text-5xl text-foreground leading-tight mb-4">
            Nuestros Pilares
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Los valores que guían cada decisión que tomamos en Alia.
          </p>
          <div className="mt-5 w-16 h-1 bg-primary/30 rounded-full mx-auto" />
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map(({ Icon, title, description, iconColor, iconBg }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.48, delay: idx * 0.12 }}
            >
              <Card className="h-full bg-card border border-border/50 ring-0 shadow-sm hover:shadow-[0_12px_32px_rgba(26,28,28,0.08)] transition-all duration-400 py-0 group">
                <CardContent className="p-8 flex flex-col items-center text-center gap-5">

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className={`size-6 ${iconColor}`} strokeWidth={1.75} />
                  </div>

                  {/* Text */}
                  <div className="space-y-2">
                    <h3 className="font-headline font-bold text-xl text-foreground">
                      {title}
                    </h3>
                    <p className="font-body text-muted-foreground text-sm leading-relaxed">
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
