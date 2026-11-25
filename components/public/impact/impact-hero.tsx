'use client'

import { motion } from 'framer-motion'
import { HeartHandshake, Users, Globe2, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { ImpactMetrics } from '@/server/actions/analytics'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.45, ease: 'easeOut' as const, delay },
})

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 10_000) return `${(n / 1_000).toFixed(0)}k`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  if (n === 0) return '—'
  return n.toLocaleString('es-MX')
}

function timeAgo(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime()
  const mins = Math.floor(diffMs / 60_000)
  if (mins < 1) return 'hace un momento'
  if (mins < 60) return `hace ${mins} min`
  const hrs = Math.floor(mins / 60)
  return `hace ${hrs}h`
}

const metricsCards = [
  {
    key: 'reach',
    Icon: Users,
    sublabel: 'Voluntad compartida',
    label: 'Personas que han explorado iniciativas locales',
    field: 'communityReach' as const,
  },
  {
    key: 'connections',
    Icon: HeartHandshake,
    sublabel: 'Vínculos directos',
    label: 'Personas conectando con causas sociales',
    field: 'realConnections' as const,
  },
  {
    key: 'views',
    Icon: Globe2,
    sublabel: 'Historias descubiertas',
    label: 'Consultas a organizaciones en el directorio',
    field: 'pageViews' as const,
  },
]

interface ImpactHeroProps {
  metrics: ImpactMetrics
}

export function ImpactHero({ metrics }: ImpactHeroProps) {
  const { lastUpdated } = metrics

  return (
    <section className="w-full bg-background pt-12 pb-16 lg:pt-20 lg:pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div {...fadeUp()} className="text-center mb-10 space-y-4">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-primary">
            Transparencia activa
          </p>
          <h1 className="font-sans font-medium text-[38px] sm:text-[52px] lg:text-[60px] leading-[1.06] tracking-[-0.03em] text-foreground">
            Nuestro <span className="text-primary">alcance</span> social
          </h1>
          <p className="font-sans text-base sm:text-lg text-foreground-secondary max-w-2xl mx-auto leading-[1.6]">
            Datos de impacto sobre nuestro alcance en México, actualizados constantemente para
            garantizar total transparencia en nuestra labor comunitaria.
          </p>
        </motion.div>

        {/* Timestamp pill */}
        <motion.div {...fadeUp(0.08)} className="flex justify-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-xs text-foreground-muted">
            <Clock className="size-3.5 text-primary" strokeWidth={1.5} />
            Datos de los últimos 30 días · Actualizado {timeAgo(lastUpdated)}
          </span>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {metricsCards.map(({ key, Icon, sublabel, label, field }, idx) => (
            <motion.div key={key} {...fadeUp(idx * 0.08)}>
              <Card className="h-full bg-surface border border-border ring-0 rounded-[20px] hover:border-rock-blue transition-colors duration-200 py-0">
                <CardContent className="p-6 lg:p-8 flex flex-col justify-between min-h-[220px] gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-primary">
                        {sublabel}
                      </span>
                      <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </div>
                    </div>
                    <p className="font-sans text-sm text-foreground-secondary leading-relaxed">
                      {label}
                    </p>
                  </div>

                  <p className="font-mono font-medium text-4xl sm:text-5xl leading-none tracking-[-0.02em] tabular-nums text-foreground">
                    {formatNumber(metrics[field])}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
