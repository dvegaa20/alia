'use client'

import { motion } from 'framer-motion'
import { Users, Zap, Globe, Clock } from 'lucide-react'
import type { ImpactMetrics } from '@/server/actions/analytics'

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
}

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

interface MetricCardProps {
  icon: React.ReactNode
  label: string
  sublabel: string
  value: string
  delay?: number
}

function MetricCard({ icon, label, sublabel, value, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ duration: 0.6, delay }}
      className="relative bg-card border border-border/60 rounded-2xl p-8 flex flex-col justify-between min-h-[220px] shadow-sm overflow-hidden group hover:border-primary/30 hover:shadow-md transition-all duration-300"
    >
      {/* Subtle gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative">
        <div className="size-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
          {icon}
        </div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-1">
          {sublabel}
        </p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </div>

      <span className="relative text-5xl font-bold text-foreground font-headline leading-none mt-6">
        {value}
      </span>
    </motion.div>
  )
}

interface ImpactHeroProps {
  metrics: ImpactMetrics
}

export function ImpactHero({ metrics }: ImpactHeroProps) {
  const { communityReach, realConnections, pageViews, lastUpdated } = metrics

  return (
    <section className="px-4 sm:px-8 pt-20 pb-16 bg-background">
      <div className="max-w-400 mx-auto">

        {/* Header */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-6">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            Transparencia Activa
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-foreground mb-4 leading-tight">
            Nuestro <span className="text-primary">Alcance</span>
            <br />
            Social
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Datos de impacto sobre nuestro alcance en México, actualizados constantemente para
            garantizar total transparencia en nuestra labor comunitaria.
          </p>
        </motion.div>

        {/* Timestamp */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-2 text-xs text-muted-foreground mb-12"
        >
          <Clock className="size-3.5" />
          <span>Datos de los últimos 30 días · Actualizado {timeAgo(lastUpdated)}</span>
        </motion.div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard
            icon={<Users className="size-5 text-primary" />}
            sublabel="Voluntad compartida"
            label="Personas que han explorado iniciativas locales"
            value={formatNumber(communityReach)}
            delay={0.1}
          />
          <MetricCard
            icon={<Zap className="size-5 text-primary" />}
            sublabel="Vínculos directos"
            label="Personas conectando con causas sociales"
            value={formatNumber(realConnections)}
            delay={0.2}
          />
          <MetricCard
            icon={<Globe className="size-5 text-primary" />}
            sublabel="Historias descubiertas"
            label="Iniciativas que han dado a conocer su labor"
            value={formatNumber(pageViews)}
            delay={0.3}
          />
        </div>
      </div>
    </section>
  )
}
