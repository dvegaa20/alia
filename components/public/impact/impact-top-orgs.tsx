'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { TrendingUp, ArrowRight, Trophy } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { TopOrg } from '@/server/actions/analytics'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.45, ease: 'easeOut' as const, delay },
})

interface ImpactTopOrgsProps {
  topOrgs: TopOrg[]
}

const podiumOrder = [1, 0, 2]

const podiumConfig = [
  { rank: 2, platformH: 'h-[84px]' },
  { rank: 1, platformH: 'h-[120px]' },
  { rank: 3, platformH: 'h-[60px]' },
]

export function ImpactTopOrgs({ topOrgs }: ImpactTopOrgsProps) {
  if (topOrgs.length === 0) {
    return (
      <section className="w-full bg-surface border-y border-border/70 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <Card className="bg-background/50 dark:bg-background border border-border rounded-[20px] py-0">
            <CardContent className="p-12 text-center space-y-3">
              <TrendingUp className="size-8 text-primary mx-auto" strokeWidth={1.5} />
              <p className="font-sans text-foreground-secondary">
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
    <section className="w-full bg-surface border-y border-border/70 py-20 lg:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div {...fadeUp()} className="text-center mb-14 space-y-3">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-primary">
            Ranking de impacto
          </p>
          <h2 className="font-sans font-medium text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] tracking-[-0.025em] text-foreground">
            Organizaciones <span className="text-primary">más visitadas</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-foreground-secondary max-w-xl mx-auto leading-[1.6]">
            Las causas que más interés han generado en los últimos 30 días.
          </p>
        </motion.div>

        {/* Two-column layout: podium + list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* LEFT: Visual Podium */}
          <motion.div {...fadeUp(0.1)} className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-8">
              <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Trophy className="size-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-xl text-foreground">Podio</h3>
                <p className="font-mono text-xs text-foreground-muted">Las 3 con más alcance</p>
              </div>
            </div>

            {top3.length >= 1 && (
              <div className="flex items-end justify-center gap-3">
                {podiumOrder.map((orgIdx, colIdx) => {
                  const org = top3[orgIdx]
                  if (!org) return null
                  const { rank, platformH } = podiumConfig[colIdx]

                  return (
                    <motion.div
                      key={`podium-${org.path}`}
                      {...fadeUp(0.15 + colIdx * 0.06)}
                      className="flex flex-col items-center flex-1 min-w-0"
                    >
                      <Link href={`/directory/${org.slug}`} className="block w-full group mb-2">
                        <Card
                          className={cn(
                            'bg-background/50 dark:bg-background border rounded-[20px] transition-all duration-200 hover:border-rock-blue hover:-translate-y-0.5 py-0',
                            rank === 1 ? 'border-primary/50' : 'border-border'
                          )}
                        >
                          <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                            <div className="size-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                              <span className="font-sans font-semibold text-base leading-none">
                                {org.title.charAt(0).toUpperCase()}
                              </span>
                            </div>

                            <p className="font-sans text-xs font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug w-full">
                              {org.title}
                            </p>

                            <p className="font-mono text-[11px] tabular-nums text-foreground-muted">
                              {org.views.toLocaleString('es-MX')} visitas
                            </p>
                          </CardContent>
                        </Card>
                      </Link>

                      <div
                        className={cn(
                          'w-full rounded-t-2xl flex flex-col items-center justify-start pt-3 gap-1 border border-b-0',
                          platformH,
                          rank === 1
                            ? 'bg-primary text-primary-foreground border-primary'
                            : rank === 2
                              ? 'bg-primary/15 text-primary border-primary/25'
                              : 'bg-surface-subtle text-foreground-secondary border-border'
                        )}
                      >
                        <span className="font-mono font-medium text-2xl tabular-nums leading-none">
                          {rank}
                        </span>
                        <span
                          className={cn(
                            'font-mono text-[10px] uppercase tracking-[0.04em]',
                            rank === 1 ? 'text-primary-foreground/80' : 'text-foreground-muted'
                          )}
                        >
                          {rank === 1 ? '1.er lugar' : rank === 2 ? '2.do lugar' : '3.er lugar'}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}

            <p className="font-mono text-xs text-foreground-muted mt-6 text-center">
              Ranking actualizado automáticamente con datos reales.
            </p>
          </motion.div>

          {/* RIGHT: Full Ranking List */}
          <motion.div {...fadeUp(0.08)}>
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Trophy className="size-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-sans font-semibold text-xl text-foreground">
                  Posiciones 4 - 10
                </h3>
                <p className="font-mono text-xs text-foreground-muted">Últimos 30 días</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {rest.map((org, idx) => {
                const i = idx + 3
                const barWidth = Math.max(4, Math.round((org.views / maxViews) * 100))

                return (
                  <motion.div key={org.path} {...fadeUp(idx * 0.03)} className="group">
                    <Link href={`/directory/${org.slug}`}>
                      <Card className="bg-background/50 dark:bg-background border border-border ring-0 rounded-[20px] hover:border-rock-blue transition-colors duration-200 py-0">
                        <CardContent className="px-5 py-3.5 flex items-center gap-4">
                          <span className="font-mono text-sm font-medium tabular-nums w-7 text-center shrink-0 text-foreground-muted">
                            {String(i + 1).padStart(2, '0')}
                          </span>

                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                              {org.title}
                            </p>
                            <div className="mt-1.5 h-1.5 bg-surface-subtle rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full transition-all duration-500"
                                style={{ width: `${barWidth}%` }}
                              />
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-mono text-sm font-medium tabular-nums text-foreground">
                              {org.views.toLocaleString('es-MX')}
                            </span>
                            <p className="font-mono text-[10px] uppercase text-foreground-muted">
                              visitas
                            </p>
                          </div>

                          <ArrowRight
                            className="size-4 text-foreground-muted shrink-0 group-hover:text-primary transition-colors"
                            strokeWidth={1.5}
                          />
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
