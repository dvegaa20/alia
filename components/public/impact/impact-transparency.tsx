'use client'

import { motion } from 'framer-motion'
import { Fingerprint, RefreshCw, ShieldCheck, Handshake, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
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
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    Icon: RefreshCw,
    title: 'Actualización periódica',
    description:
      'Consultamos y actualizamos la información constantemente para ofrecer una visión clara y honesta del alcance del proyecto en tiempo real.',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    Icon: ShieldCheck,
    title: 'Datos verificables',
    description:
      'Mostramos la actividad real sin ajustes ni estimaciones, excluyendo visitas técnicas para mantener la integridad de la información ciudadana.',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
  {
    Icon: Handshake,
    title: 'Vínculos genuinos',
    description:
      'Cada "vínculo" representa un paso hacia la colaboración: descubrir una iniciativa, visitar su labor o compartir su impacto con otros.',
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
  },
]


interface ImpactTransparencyProps {
  lastUpdated: string
}

export function ImpactTransparency({ lastUpdated }: ImpactTransparencyProps) {
  return (
    <section className="px-4 sm:px-8 py-24 bg-background overflow-hidden">
      <div className="max-w-400 mx-auto">

        {/* ── Section header (About-page pattern) ── */}
        <motion.div {...fadeUp()} className="text-center mb-16">
          <p className="text-primary font-label text-xs uppercase tracking-widest font-bold mb-3">
            Rigor &amp; Responsabilidad
          </p>
          <h2 className="font-headline font-bold text-4xl md:text-5xl text-foreground leading-tight max-w-3xl mx-auto mb-4">
            Compromiso con la{' '}
            <span className="text-primary italic">transparencia</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Creemos que la confianza se construye con datos verificables. Aquí
            explicamos de dónde vienen los números y cómo los obtenemos.
          </p>
          <div className="mt-5 w-16 h-1 bg-primary/30 rounded-full mx-auto" />
        </motion.div>

        {/* ── Transparency Cards (light, transparent feel) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
          {items.map(({ Icon, title, description, iconColor, iconBg }, i) => (
            <motion.div key={title} {...fadeUp(i * 0.1)}>
              <Card className="h-full bg-card/40 backdrop-blur-sm border border-border/40 ring-0 shadow-sm hover:shadow-[0_12px_32px_rgba(26,28,28,0.06)] transition-all duration-400 py-0 group">
                <CardContent className="p-8 flex flex-col items-start gap-5">

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300`}
                  >
                    <Icon className={`size-5 ${iconColor}`} strokeWidth={1.75} />
                  </div>

                  {/* Text */}
                  <div className="space-y-2">
                    <h3 className="font-headline font-bold text-xl text-foreground">
                      {title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ── Last updated footer ── */}
        <motion.div
          {...fadeUp(0.4)}
          className="flex items-center justify-center gap-2 text-xs text-muted-foreground border-t border-border/40 pt-6"
        >
          <Clock className="size-3.5 shrink-0" />
          <span className="font-label">
            Última actualización de datos: {formatDate(lastUpdated)}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
