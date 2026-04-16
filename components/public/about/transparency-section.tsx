'use client'

import { motion } from 'framer-motion'
import { MessageSquarePlus, SearchCheck, BadgeCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const steps = [
  {
    step: '01',
    icon: MessageSquarePlus,
    title: 'Recibimos la sugerencia',
    description:
      'Cualquier persona puede sugerirnos una ONG a través de nuestra plataforma. Recopilamos nombre, categoría, ubicación, una descripción breve y el enlace oficial.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    step: '02',
    icon: SearchCheck,
    title: 'Verificamos manualmente',
    description:
      'Nuestro equipo revisa cada sugerencia de manera personal: confirmamos actividad real, revisamos su presencia digital, y validamos que sea una organización legítima con impacto en la comunidad.',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    step: '03',
    icon: BadgeCheck,
    title: 'Publicamos con transparencia',
    description:
      'Solo las iniciativas que cumplen nuestros criterios de autenticidad y relevancia social son publicadas en el directorio. Sin pago, sin favoritismo — solo rigor y responsabilidad.',
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
]

export function TransparencySection() {
  return (
    <section className="px-4 sm:px-8 py-24 bg-muted/40 overflow-hidden">
      <div className="max-w-400 mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.52, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <p className="text-primary font-label text-xs uppercase tracking-widest font-bold mb-3">
            Rigor &amp; Responsabilidad
          </p>
          <h2 className="font-headline font-bold text-4xl md:text-5xl text-foreground leading-tight max-w-3xl mx-auto">
            Cómo verificamos{' '}
            <span className="text-primary italic">cada iniciativa</span>
          </h2>
          <p className="mt-5 font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Cada organización pasa por un proceso de revisión humana antes de ser
            parte de nuestro directorio. La confianza que depositan los usuarios
            en Alia depende de este proceso.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[3.5rem] left-[calc(33.33%+1.5rem)] right-[calc(33.33%+1.5rem)] h-px border-t-2 border-dashed border-border/60 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, ease: 'easeOut', delay: idx * 0.14 }}
                className="relative z-10"
              >
                <Card className="h-full bg-card border border-border/50 ring-0 shadow-sm hover:shadow-md transition-shadow duration-300 py-0">
                  <CardContent className="p-8 flex flex-col items-start gap-5">

                    {/* Step number + icon */}
                    <div className="flex items-center gap-4 w-full">
                      <div className={`${step.bg} rounded-xl p-3.5 shrink-0`}>
                        <Icon className={`size-5 ${step.color}`} />
                      </div>
                      <span className="font-headline font-bold text-4xl text-border/60 leading-none select-none">
                        {step.step}
                      </span>
                    </div>

                    {/* Text */}
                    <div>
                      <h3 className="font-headline font-bold text-xl text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="font-body text-muted-foreground text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center font-label text-xs text-muted-foreground/70 mt-10 italic"
        >
          Este proceso es gratuito tanto para quien sugiere como para la organización.
          Nuestro único criterio es el impacto social real.
        </motion.p>
      </div>
    </section>
  )
}
