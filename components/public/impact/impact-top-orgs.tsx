'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { TrendingUp, ArrowRight, Trophy } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { TopOrg } from '@/server/actions/analytics'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
})

interface ImpactTopOrgsProps {
  topOrgs: TopOrg[]
}

/* ── Podium config: visual order is [2nd, 1st, 3rd] ── */
const podiumOrder = [1, 0, 2] // indices into top3 array

const podiumConfig = [
  { rank: 2, rankColor: 'text-base-400', platformH: 'h-[80px]', cardScale: '' },
  { rank: 1, rankColor: 'text-amber-500', platformH: 'h-[120px]', cardScale: 'ring-2 ring-primary/20' },
  { rank: 3, rankColor: 'text-amber-700 dark:text-amber-600', platformH: 'h-[56px]', cardScale: '' },
]

export function ImpactTopOrgs({ topOrgs }: ImpactTopOrgsProps) {
  if (topOrgs.length === 0) {
    return (
      <section className="px-4 sm:px-8 py-20 bg-muted/40">
        <div className="max-w-400 mx-auto">
          <Card className="bg-card border border-border/50 py-0">
            <CardContent className="p-12 text-center">
              <TrendingUp className="size-8 text-muted-foreground mx-auto mb-4" />
              <p className="font-body text-muted-foreground">
                Los datos de organizaciones más visitadas estarán disponibles pronto.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  const top3 = topOrgs.slice(0, 3)
  const rest = topOrgs.slice(3)
  const maxViews = topOrgs[0]?.views ?? 1

  return (
    <section className="px-4 sm:px-8 py-20 bg-muted/40 overflow-hidden">
      <div className="max-w-400 mx-auto">

        {/* ── Section Header ── */}
        <motion.div {...fadeUp()} className="text-center mb-16">
          <p className="text-primary font-label text-xs uppercase tracking-widest font-bold mb-3">
            Ranking de impacto
          </p>
          <h2 className="font-headline font-bold text-4xl md:text-5xl text-foreground leading-tight mb-4">
            Organizaciones{' '}
            <span className="text-primary italic">más visitadas</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Las causas que más interés han generado en los últimos 30 días.
          </p>
          <div className="mt-5 w-16 h-1 bg-primary/30 rounded-full mx-auto" />
        </motion.div>

        {/* ── Two-column layout: list + podium ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-start">

          {/* ── LEFT: Visual Podium ── */}
          <motion.div {...fadeUp(0.16)} className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-8">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Trophy className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-xl text-foreground">Podio</h3>
                <p className="font-label text-xs text-muted-foreground">Las 3 con más alcance</p>
              </div>
            </div>

            {/* ── Podium: cards on platforms, order 2–1–3 ── */}
            {top3.length >= 1 && (
              <div className="flex items-end justify-center gap-3">
                {podiumOrder.map((orgIdx, colIdx) => {
                  const org = top3[orgIdx]
                  if (!org) return null
                  const { rank, rankColor, platformH, cardScale } = podiumConfig[colIdx]

                  return (
                    <motion.div
                      key={`podium-${org.path}`}
                      {...fadeUp(0.24 + colIdx * 0.08)}
                      className="flex flex-col items-center flex-1 min-w-0"
                    >
                      {/* Org card sitting on the platform */}
                      <Link href={`/directory/${org.slug}`} className="block w-full group mb-2">
                        <Card className={`bg-card border border-border/50 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 py-0 ${cardScale}`}>
                          <CardContent className="p-4 flex flex-col items-center text-center gap-2">

                            {/* Org initial avatar */}
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                              <span className="font-headline font-bold text-lg text-primary leading-none">
                                {org.title.charAt(0).toUpperCase()}
                              </span>
                            </div>

                            {/* Name */}
                            <p className="font-headline text-xs font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug w-full">
                              {org.title}
                            </p>

                            {/* Views */}
                            <p className="font-label text-[10px] text-muted-foreground">
                              {org.views.toLocaleString('es-MX')} visitas
                            </p>
                          </CardContent>
                        </Card>
                      </Link>

                      {/* Platform step */}
                      <div
                        className={`w-full ${platformH} rounded-t-xl flex flex-col items-center justify-start pt-3 gap-1 ${rank === 1
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-primary/15 text-primary'
                          }`}
                      >
                        <span className={`font-headline font-bold text-2xl leading-none ${rankColor}`}>
                          {rank}
                        </span>
                        <span className={`font-label text-[9px] uppercase tracking-widest ${rank === 1 ? 'text-primary-foreground/70' : 'text-primary/60'}`}>
                          {rank === 1 ? '1.er lugar' : rank === 2 ? '2.do lugar' : '3.er lugar'}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}

            {/* Bottom note */}
            <motion.p
              {...fadeUp(0.5)}
              className="font-label text-xs text-muted-foreground/70 mt-6 text-center italic"
            >
              Ranking actualizado automáticamente con datos reales.
            </motion.p>
          </motion.div>

          {/* ── RIGHT: Full Ranking List ── */}
          <motion.div {...fadeUp(0.08)}>
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Trophy className="size-5 text-primary" />
              </div>
              <div>
                <h3 className="font-headline font-bold text-xl text-foreground">Posiciones 4 - 10</h3>
                <p className="font-label text-xs text-muted-foreground">Últimos 30 días</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {rest.map((org, idx) => {
                const i = idx + 3
                const barWidth = Math.max(4, Math.round((org.views / maxViews) * 100))

                return (
                  <motion.div key={org.path} {...fadeUp(idx * 0.04)} className="group">
                    <Link href={`/directory/${org.slug}`}>
                      <Card className="bg-card border border-border/50 ring-0 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 py-0">
                        <CardContent className="px-5 py-3.5 flex items-center gap-4">

                          {/* Rank */}
                          <span
                            className="font-headline text-sm font-bold w-7 text-center shrink-0 text-muted-foreground"
                          >
                            {i + 1}
                          </span>

                          {/* Name + bar */}
                          <div className="flex-1 min-w-0">
                            <p className="font-headline text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                              {org.title}
                            </p>
                            <div className="mt-1.5 h-1 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary/50 rounded-full transition-all duration-500"
                                style={{ width: `${barWidth}%` }}
                              />
                            </div>
                          </div>

                          {/* Views */}
                          <div className="text-right shrink-0">
                            <span className="font-headline text-sm font-bold text-foreground">
                              {org.views.toLocaleString('es-MX')}
                            </span>
                            <p className="font-label text-[10px] text-muted-foreground">visitas</p>
                          </div>

                          <ArrowRight className="size-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
