'use client'

import { motion } from 'framer-motion'
import { Fingerprint, RefreshCw, ShieldCheck, Handshake, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.45, ease: 'easeOut' as const, delay },
})

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleString('es-MX', {
    dateStyle: 'long',
    timeStyle: 'short',
  })
}

const items = [
  {
    Icon: Fingerprint,
    title: 'Origen de los datos',
    description:
      'Nuestros registros se basan en la interacción genuina de las personas con la plataforma, garantizando que cada número represente un interés real.',
  },
  {
    Icon: RefreshCw,
    title: 'Actualización periódica',
    description:
      'Consultamos y actualizamos la información constantemente para ofrecer una visión clara y honesta del alcance del proyecto en tiempo real.',
  },
  {
    Icon: ShieldCheck,
    title: 'Datos verificables',
    description:
      'Mostramos la actividad real sin ajustes ni estimaciones, excluyendo visitas técnicas para mantener la integridad de la información ciudadana.',
  },
  {
    Icon: Handshake,
    title: 'Vínculos genuinos',
    description:
      'Cada vínculo representa un paso hacia la colaboración: descubrir una iniciativa, visitar su labor o compartir su impacto con otros.',
  },
]

interface ImpactTransparencyProps {
  lastUpdated: string
}

export function ImpactTransparency({ lastUpdated }: ImpactTransparencyProps) {
  return (
    <section className="w-full px-4 sm:px-6 py-20 bg-background overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div {...fadeUp()} className="text-center mb-14 space-y-3">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-primary">
            Rigor &amp; Responsabilidad
          </p>
          <h2 className="font-sans font-medium text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] tracking-[-0.025em] text-foreground max-w-3xl mx-auto">
            Compromiso con la <span className="text-primary">transparencia</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-foreground-secondary max-w-2xl mx-auto leading-[1.6]">
            Creemos que la confianza se construye con datos verificables. Aquí explicamos de dónde
            vienen los números y cómo los obtenemos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6 mb-12">
          {items.map(({ Icon, title, description }, i) => (
            <motion.div key={title} {...fadeUp(i * 0.08)}>
              <Card className="h-full bg-surface border border-border ring-0 rounded-[20px] hover:border-rock-blue transition-colors duration-200 py-0">
                <CardContent className="p-8 flex flex-col items-start gap-5">
                  <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-sans font-semibold text-xl text-foreground">{title}</h3>
                    <p className="font-sans text-sm text-foreground-secondary leading-relaxed">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...fadeUp(0.2)}
          className="flex items-center justify-center gap-2 text-xs text-foreground-muted border-t border-border pt-6"
        >
          <Clock className="size-3.5 shrink-0 text-primary" strokeWidth={1.5} />
          <span className="font-mono">
            Última actualización de datos: {formatDate(lastUpdated)}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
