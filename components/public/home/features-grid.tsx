'use client'

import { motion } from 'framer-motion'
import { HeartHandshake, ShieldCheck, Eye, Users, TrendingUp, Globe } from 'lucide-react'
import type { ImpactMetrics } from '@/server/actions/analytics'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Card 1 — Brand + Platform Visual (tall) */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5 }}
        className="relative bg-card rounded-2xl overflow-hidden min-h-[280px] md:row-span-2 group"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-base-200 via-base-100 to-base-50">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-2 opacity-40">
              <div className="size-12 rounded-full bg-base-300/50 mx-auto flex items-center justify-center">
                <Eye className="size-5 text-base-400" />
              </div>
              <p className="text-base-400 text-xs font-medium uppercase tracking-wider">Imagen</p>
            </div>
          </div>
        </div>

        {/* Live badge overlay */}
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1.5 bg-primary/10 border border-primary/20 rounded-full px-3 py-1">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Live</span>
          </div>
        </div>

        {/* Floating brand badge */}
        <div className="absolute bottom-6 left-6 z-10">
          <div className="bg-card rounded-full px-4 py-2 shadow-lg flex items-center gap-2 border border-border/40">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="size-4 text-primary" />
            </div>
            <span className="text-sm font-bold text-foreground font-headline">Alia</span>
          </div>
        </div>
      </motion.div>

      {/* Card 2 — Compassion-Driven Support */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card rounded-2xl p-8 flex flex-col justify-between min-h-[240px] border border-border/60 shadow-sm"
      >
        <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
          <HeartHandshake className="size-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground font-headline leading-snug mb-3">
            Apoyo Basado en
            <br />
            Compasión
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Conectamos personas con organizaciones que brindan ayuda esencial a familias con cuidado,
            respeto y dignidad.
          </p>
        </div>
      </motion.div>

      {/* Card 3 — Transparent & Trusted */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-card rounded-2xl p-8 flex flex-col justify-between min-h-[240px] border border-border/60 shadow-sm"
      >
        <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
          <ShieldCheck className="size-5 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground font-headline leading-snug mb-3">
            Transparente y Confiable
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cada organización es verificada y curada. Con reportes claros y actualizaciones reales de
            impacto.
          </p>
        </div>
      </motion.div>

      {/* Card 4 — Stat: Community Reach (real GA4 data) */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="bg-card rounded-2xl p-8 flex flex-col justify-between min-h-[240px] border border-border/60 shadow-sm"
      >
        <div className="flex items-start justify-between">
          <div>
            <span className="text-4xl font-bold text-foreground font-headline">
              {formatNumber(communityReach)}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <TrendingUp className="size-3 text-primary" />
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider">
                últimos 30 días
              </span>
            </div>
          </div>
          <span className="text-sm text-muted-foreground font-medium text-right leading-snug max-w-[80px]">
            Alcance
            <br />
            Comunitario
          </span>
        </div>

        <div className="mt-auto pt-6">
          <h3 className="text-lg font-bold text-foreground font-headline leading-snug mb-2">
            Usuarios Únicos
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Personas reales que exploraron organizaciones sociales en nuestra plataforma.
          </p>
        </div>
      </motion.div>

      {/* Card 5 — Stat: Page Views (real GA4 data) */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="bg-card rounded-2xl p-8 flex flex-col justify-center min-h-[180px] border border-border/60 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-2">
          <Globe className="size-4 text-primary/70" />
          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
            Páginas vistas
          </span>
        </div>
        <span className="text-4xl font-bold text-foreground font-headline mb-1">
          {formatNumber(pageViews)}
        </span>
        <span className="text-sm text-muted-foreground font-medium">
          {realConnections > 0
            ? `${formatNumber(realConnections)} conexiones directas`
            : 'Conexiones en crecimiento'}
        </span>
      </motion.div>
    </div>
  )
}
