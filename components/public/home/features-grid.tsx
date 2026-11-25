'use client'

import { motion } from 'framer-motion'
import { Users, HeartHandshake, Globe } from 'lucide-react'
import type { ImpactMetrics } from '@/server/actions/analytics'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 10_000) return `${(n / 1_000).toFixed(0)}k`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  if (n === 0) return '—'
  return n.toLocaleString('es-MX')
}

interface FeaturesSectionGridProps {
  metrics: ImpactMetrics
}

export function FeaturesSectionGrid({ metrics }: FeaturesSectionGridProps) {
  const { communityReach, realConnections, pageViews } = metrics

  const stats = [
    {
      eyebrow: 'Alcance comunitario',
      value: formatNumber(communityReach),
      title: 'Usuarios únicos',
      description: 'Personas reales que exploraron organizaciones sociales en nuestra plataforma.',
      Icon: Users,
    },
    {
      eyebrow: 'Vínculos reales',
      value: formatNumber(realConnections),
      title: 'Conexiones directas',
      description: 'Interacciones ciudadanas hacia perfiles, sitios web o canales de contacto.',
      Icon: HeartHandshake,
    },
    {
      eyebrow: 'Historias descubiertas',
      value: formatNumber(pageViews),
      title: 'Páginas vistas',
      description: 'Consultas registradas a proyectos sociales verificados en todo México.',
      Icon: Globe,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
      {stats.map(({ eyebrow, value, title, description, Icon }, idx) => (
        <motion.div
          key={title}
          {...fadeUp}
          transition={{ duration: 0.45, delay: idx * 0.08 }}
          className="rounded-[20px] border border-white/15 dark:border-border bg-white/[0.06] dark:bg-dark-surface p-6 lg:p-8 flex flex-col justify-between gap-6"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-rock-blue">
              {eyebrow}
            </span>
            <Icon className="size-5 text-rock-blue shrink-0" strokeWidth={1.5} />
          </div>

          <div className="space-y-2">
            <p className="font-mono font-medium text-4xl sm:text-5xl leading-none tracking-[-0.02em] tabular-nums text-white dark:text-merino">
              {value}
            </p>
            <h3 className="font-sans text-lg font-semibold text-white dark:text-merino pt-1">
              {title}
            </h3>
            <p className="font-sans text-sm text-merino/80 leading-relaxed">{description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
