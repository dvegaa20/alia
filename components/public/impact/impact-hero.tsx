'use client'

import { motion } from 'framer-motion'
import { HeartHandshake, Users, Globe2, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { ImpactMetrics } from '@/server/actions/analytics'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.55, ease: 'easeOut' as const, delay },
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

const metrics_cards = [
  {
    key: 'reach',
    Icon: Users,
    sublabel: 'Voluntad compartida',
    label: 'Personas que han explorado iniciativas locales',
    field: 'communityReach' as const,
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
    glowColor: 'var(--color-primary-400)',
  },
  {
    key: 'connections',
    Icon: HeartHandshake,
    sublabel: 'Vínculos directos',
    label: 'Personas conectando con causas sociales',
    field: 'realConnections' as const,
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
    glowColor: 'var(--color-primary-400)',
  },
  {
    key: 'views',
    Icon: Globe2,
    sublabel: 'Historias descubiertas',
    label: 'Iniciativas que han dado a conocer su labor',
    field: 'pageViews' as const,
    iconColor: 'text-primary',
    iconBg: 'bg-primary/10',
    glowColor: 'var(--color-primary-400)',
  },
]

interface ImpactHeroProps {
  metrics: ImpactMetrics
}

export function ImpactHero({ metrics }: ImpactHeroProps) {
  const { lastUpdated } = metrics

  return (
    <section className="px-4 sm:px-8 pt-20 pb-16 bg-background overflow-hidden">
      <div className="max-w-400 mx-auto">

        {/* ── Section Header (About-page pattern) ── */}
        <motion.div {...fadeUp()} className="text-center mb-16">
          <p className="text-primary font-label text-xs uppercase tracking-widest font-bold mb-3">
            Transparencia Activa
          </p>
          <h1 className="font-headline font-bold text-4xl sm:text-5xl md:text-6xl text-foreground leading-tight mb-5">
            Nuestro{' '}
            <span className="text-primary italic">Alcance</span>{' '}
            Social
          </h1>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Datos de impacto sobre nuestro alcance en México, actualizados
            constantemente para garantizar total transparencia en nuestra labor
            comunitaria.
          </p>
          <div className="mt-5 w-16 h-1 bg-primary/30 rounded-full mx-auto" />
        </motion.div>

        {/* Timestamp pill */}
        <motion.div
          {...fadeUp(0.1)}
          className="flex items-center justify-center gap-2 text-xs text-muted-foreground mb-10"
        >
          <Clock className="size-3.5" />
          <span>Datos de los últimos 30 días · Actualizado {timeAgo(lastUpdated)}</span>
        </motion.div>

        {/* ── Metric Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics_cards.map(({ key, Icon, sublabel, label, field, iconColor, iconBg, glowColor }, idx) => (
            <motion.div key={key} {...fadeUp(idx * 0.12)}>
              <Card className="relative h-full bg-card/50 backdrop-blur-sm border border-border/50 ring-0 shadow-sm hover:shadow-[0_12px_32px_rgba(26,28,28,0.08)] transition-all duration-400 py-0 group overflow-hidden">

                {/* ── Warm glow behind the number ── */}
                <div
                  className="pointer-events-none absolute bottom-4 right-4 w-32 h-32 rounded-full opacity-[0.08] blur-3xl group-hover:opacity-[0.14] transition-opacity duration-700"
                  style={{
                    background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
                  }}
                />

                <CardContent className="relative p-8 flex flex-col justify-between min-h-[220px]">
                  {/* Top: icon + labels */}
                  <div>
                    <div
                      className={`w-12 h-12 ${iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300`}
                    >
                      <Icon className={`size-5 ${iconColor}`} strokeWidth={1.75} />
                    </div>
                    <p className="font-label text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
                      {sublabel}
                    </p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {label}
                    </p>
                  </div>

                  {/* Bottom: number */}
                  <span className="font-headline text-5xl font-bold text-foreground leading-none mt-6">
                    {formatNumber(metrics[field])}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
