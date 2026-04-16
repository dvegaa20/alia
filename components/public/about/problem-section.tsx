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
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  {
    icon: Search,
    number: '~5%',
    label: 'cuentan con plataforma digital actualizada',
    note: 'El resto permanece invisible en línea',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    icon: AlertTriangle,
    number: 'Millones',
    label: 'de personas con ganas de ayudar, sin saber cómo',
    note: 'La brecha entre voluntad e información',
    color: 'text-primary-600 dark:text-primary-300',
    bg: 'bg-primary/10',
  },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' } as const,
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
})

export function ProblemSection() {
  return (
    <section className="px-4 sm:px-8 py-24 bg-muted/40">
      <div className="max-w-400 mx-auto">

        {/* Header */}
        <motion.div {...fadeUp()} className="text-center mb-16">
          <p className="text-primary font-label text-xs uppercase tracking-widest font-bold mb-3">
            El contexto
          </p>
          <h2 className="font-headline font-bold text-4xl md:text-5xl text-foreground leading-tight max-w-3xl mx-auto">
            El problema{' '}
            <span className="text-primary italic">que nos mueve</span>
          </h2>
          <p className="mt-5 font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            En México hay miles de causas increíbles. El problema es que la información
            está fragmentada, desactualizada o es completamente inaccesible.
          </p>
        </motion.div>

        {/* Two-column layout: stats left, narrative right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">

          {/* Left: Stat Cards */}
          <div className="space-y-4">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <motion.div key={stat.label} {...fadeUp(idx * 0.12)}>
                  <Card className="bg-card border border-border/50 ring-0 shadow-sm hover:shadow-md transition-shadow duration-300 py-0">
                    <CardContent className="p-6 flex items-start gap-5">
                      <div className={`${stat.bg} rounded-xl p-3 shrink-0 mt-0.5`}>
                        <Icon className={`size-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className={`font-headline font-bold text-3xl ${stat.color} leading-none mb-1`}>
                          {stat.number}
                        </p>
                        <p className="font-body text-foreground text-sm font-semibold leading-snug mb-1">
                          {stat.label}
                        </p>
                        <p className="font-label text-muted-foreground text-xs italic">
                          {stat.note}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {/* Right: Narrative text */}
          <motion.div {...fadeUp(0.18)} className="space-y-6 font-body text-lg text-muted-foreground leading-loose lg:pt-1">
            <p>
              En un ecosistema saturado de información, encontrar iniciativas honestas
              y cercanas se ha vuelto una tarea compleja. Los proyectos locales con mayor
              impacto quedan <strong className="text-foreground font-semibold">invisibilizados</strong> por
              la falta de recursos digitales.
            </p>
            <p>
              Mientras tanto, las personas con ganas de sumar — voluntarias, donantes,
              aliados — simplemente no saben por dónde empezar. La información existe,
              pero está <strong className="text-foreground font-semibold">fragmentada, desactualizada o atrapada</strong> en
              PDFs, redes sociales sin actualizar y directorios de paga.
            </p>
            <p>
              Las plataformas existentes suelen ser comerciales o enfocadas solo en
              grandes estructuras. <strong className="text-foreground font-semibold">Hacía falta un puente humano,
              transparente y gratuito</strong> que pusiera en valor el trabajo de quienes
              transforman la realidad cada día, desde el territorio.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
