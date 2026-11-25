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
      'Cualquier persona puede sugerirnos una ONG o iniciativa joven desde la plataforma. Recopilamos nombre, categoría, ubicación, descripción breve y enlace oficial.',
  },
  {
    step: '02',
    icon: SearchCheck,
    title: 'Verificamos manualmente',
    description:
      'Nuestro equipo revisa cada sugerencia de manera personal: confirmamos actividad real, validamos su presencia digital y comprobamos su labor en la comunidad.',
  },
  {
    step: '03',
    icon: BadgeCheck,
    title: 'Publicamos con transparencia',
    description:
      'Solo las iniciativas que cumplen nuestros criterios de autenticidad y relevancia social son publicadas en el directorio. Sin pago y sin favoritismos.',
  },
]

export function TransparencySection() {
  return (
    <section id="verificacion" className="w-full bg-background py-20 lg:py-28 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="text-center mb-14 space-y-3"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-primary">
            Rigor &amp; Responsabilidad
          </p>
          <h2 className="font-sans font-medium text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] tracking-[-0.025em] text-foreground max-w-3xl mx-auto">
            Cómo verificamos <span className="text-primary">cada iniciativa</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-foreground-secondary max-w-2xl mx-auto leading-[1.6]">
            Cada organización pasa por un proceso de revisión humana antes de formar parte del
            directorio. La confianza ciudadana en Alia depende de este rigor.
          </p>
        </motion.div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.08 }}
              >
                <Card className="h-full bg-surface border border-border ring-0 rounded-[20px] hover:border-rock-blue transition-colors duration-200 py-0">
                  <CardContent className="p-8 flex flex-col items-start gap-5">
                    <div className="flex items-center justify-between w-full">
                      <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </div>
                      <span className="font-mono font-medium text-3xl tabular-nums text-primary/45 leading-none select-none">
                        {step.step}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-sans font-semibold text-xl text-foreground">
                        {step.title}
                      </h3>
                      <p className="font-sans text-foreground-secondary text-sm leading-relaxed">
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
          transition={{ duration: 0.45, delay: 0.25 }}
          className="text-center font-mono text-xs text-foreground-muted mt-10"
        >
          Este proceso es gratuito tanto para quien sugiere como para la organización. Nuestro único
          criterio es el impacto social real.
        </motion.p>
      </div>
    </section>
  )
}
