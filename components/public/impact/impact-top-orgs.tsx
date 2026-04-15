'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { TrendingUp, ArrowRight, Trophy } from 'lucide-react'
import type { TopOrg } from '@/server/actions/analytics'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
}

interface ImpactTopOrgsProps {
  topOrgs: TopOrg[]
}

export function ImpactTopOrgs({ topOrgs }: ImpactTopOrgsProps) {
  if (topOrgs.length === 0) {
    return (
      <section className="px-4 sm:px-8 py-16 bg-background">
        <div className="max-w-400 mx-auto">
          <div className="bg-card border border-border/60 rounded-2xl p-12 text-center">
            <TrendingUp className="size-8 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Los datos de organizaciones más visitadas estarán disponibles pronto.
            </p>
          </div>
        </div>
      </section>
    )
  }

  const maxViews = topOrgs[0]?.views ?? 1

  return (
    <section className="px-4 sm:px-8 py-16 bg-background">
      <div className="max-w-400 mx-auto">

        {/* Section header */}
        <motion.div {...fadeUp} transition={{ duration: 0.5 }} className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Trophy className="size-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-headline text-foreground">
                Organizaciones más visitadas
              </h2>
              <p className="text-sm text-muted-foreground mt-0.5">
                Top 10 en los últimos 30 días
              </p>
            </div>
          </div>
        </motion.div>

        {/* Org list */}
        <div className="space-y-3">
          {topOrgs.map((org, i) => {
            const barWidth = Math.max(4, Math.round((org.views / maxViews) * 100))

            return (
              <motion.div
                key={org.path}
                {...fadeUp}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group"
              >
                <Link href={`/directory/${org.slug}`}>
                  <div className="flex items-center gap-4 bg-card border border-border/50 rounded-xl px-6 py-4 hover:border-primary/30 hover:shadow-sm transition-all duration-300">

                    {/* Rank */}
                    <span
                      className={`text-sm font-bold w-7 text-center shrink-0 ${
                        i === 0
                          ? 'text-amber-500'
                          : i === 1
                          ? 'text-base-400'
                          : i === 2
                          ? 'text-amber-700'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {i + 1}
                    </span>

                    {/* Name + bar */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate font-headline group-hover:text-primary transition-colors">
                        {org.title}
                      </p>
                      <div className="mt-1.5 h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary/60 rounded-full transition-all duration-500"
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </div>

                    {/* Views */}
                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-foreground font-headline">
                        {org.views.toLocaleString('es-MX')}
                      </span>
                      <p className="text-[10px] text-muted-foreground">visitas</p>
                    </div>

                    <ArrowRight className="size-4 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
