'use client'

import { motion } from 'framer-motion'
import { AlertTriangle, Search, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const stats = [
  {
    icon: Globe,
    number: '+40,000',
    label: 'ONGs registradas en México',
    note: 'Según el INEGI y CEMEFI',
  },
  {
    icon: Search,
    number: '~5%',
    label: 'Cuentan con plataforma digital actualizada',
    note: 'El resto permanece invisible en línea',
  },
  {
    icon: AlertTriangle,
    number: 'Millones',
    label: 'De personas con ganas de ayudar, sin saber cómo',
    note: 'La brecha entre voluntad e información',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' } as const,
  transition: { duration: 0.45, ease: 'easeOut' as const, delay },
})

export function ProblemSection() {
  return (
    <section className="w-full bg-surface border-y border-border/70 py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div {...fadeUp()} className="text-center mb-16 space-y-3">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-primary">
            El contexto
          </p>
          <h2 className="font-sans font-medium text-3xl sm:text-4xl lg:text-[44px] leading-[1.15] tracking-[-0.025em] text-foreground max-w-3xl mx-auto">
            El problema <span className="text-primary">que nos mueve</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-foreground-secondary max-w-2xl mx-auto leading-[1.6]">
            En México hay miles de causas increíbles. El problema es que la información está
            fragmentada, desactualizada o es completamente inaccesible.
          </p>
        </motion.div>

        {/* Two-column layout: stats left, narrative right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-start">
          {/* Left: Stat Cards */}
          <div className="space-y-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <motion.div key={stat.label} {...fadeUp(idx * 0.08)}>
                  <Card className="bg-background/50 dark:bg-background border border-border ring-0 rounded-[20px] py-0 hover:border-rock-blue transition-colors duration-200">
                    <CardContent className="p-6 flex items-start gap-5">
                      <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                        <p className="font-mono font-medium text-3xl sm:text-4xl tracking-[-0.02em] tabular-nums text-primary leading-none">
                          {stat.number}
                        </p>
                        <p className="font-sans text-foreground text-sm font-semibold leading-snug pt-1">
                          {stat.label}
                        </p>
                        <p className="font-mono text-foreground-muted text-xs">{stat.note}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Right: Narrative text */}
          <motion.div
            {...fadeUp(0.15)}
            className="space-y-6 font-sans text-base sm:text-lg text-foreground-secondary leading-[1.7] lg:pt-1"
          >
            <p>
              En un ecosistema saturado de información, encontrar iniciativas honestas y cercanas se
              ha vuelto una tarea compleja. Los proyectos locales con mayor impacto quedan{' '}
              <strong className="text-foreground font-semibold">invisibilizados</strong> por la
              falta de recursos digitales.
            </p>
            <p>
              Mientras tanto, las personas con ganas de sumar —voluntarias, donantes, aliados—
              simplemente no saben por dónde empezar. La información existe, pero está{' '}
              <strong className="text-foreground font-semibold">
                fragmentada, desactualizada o atrapada
              </strong>{' '}
              en PDFs, redes sociales sin actualizar y directorios de paga.
            </p>
            <p>
              Las plataformas existentes suelen ser comerciales o enfocadas solo en grandes
              estructuras.{' '}
              <strong className="text-foreground font-semibold">
                Hacía falta un puente humano, transparente y gratuito
              </strong>{' '}
              que pusiera en valor el trabajo de quienes transforman la realidad cada día, desde el
              territorio.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
