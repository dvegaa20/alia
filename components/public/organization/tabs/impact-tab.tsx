'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Prose } from '@/components/ui/prose'
import { Calendar, Award, Quote, TrendingUp } from 'lucide-react'

import type { ImpactTabProps } from '@/types'

export function ImpactTab({
  impactHighlights,
  impactTestimony,
  foundedYear,
  verified,
}: ImpactTabProps) {
  const highlights = Array.isArray(impactHighlights) ? impactHighlights : []
  const hasContent = highlights.length > 0 || impactTestimony || foundedYear

  if (!hasContent) {
    return (
      <div className="py-2 animate-in fade-in slide-in-from-bottom-4 duration-400">
        <div className="mb-8">
          <h2 className="font-sans text-2xl font-semibold text-foreground">Impacto</h2>
          <p className="font-sans text-foreground-secondary mt-1.5 text-sm max-w-2xl">
            Métricas y logros de nuestro trabajo a lo largo del tiempo.
          </p>
        </div>
        <div className="py-16 px-6 text-center text-foreground-muted border border-dashed border-border rounded-[20px] bg-surface">
          <p className="font-sans text-base font-medium text-foreground">Próximamente</p>
          <p className="font-sans text-sm mt-1.5 max-w-sm mx-auto text-foreground-secondary">
            Estamos trabajando para mostrarte métricas de impacto detalladas en esta sección.
          </p>
        </div>
      </div>
    )
  }

  const [heroHighlight, ...gridHighlights] = highlights

  return (
    <div className="py-2 animate-in fade-in slide-in-from-bottom-4 duration-400">
      <div className="mb-8">
        <h2 className="font-sans text-2xl font-semibold text-foreground">Impacto</h2>
        <p className="font-sans text-foreground-secondary mt-1.5 text-sm max-w-2xl">
          Métricas y logros de nuestro trabajo a lo largo del tiempo.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. HERO HIGHLIGHT */}
        {heroHighlight && (
          <Card className="rounded-[20px] border border-border bg-surface overflow-hidden py-0">
            <CardContent className="p-8 md:p-10 flex flex-col gap-4">
              <span className="inline-flex items-center gap-1.5 self-start bg-primary/10 text-primary border border-primary/20 font-mono text-[11px] font-medium uppercase tracking-[0.04em] px-3 py-1 rounded-full">
                <TrendingUp className="size-3.5" strokeWidth={1.5} />
                Logro principal
              </span>

              <div className="flex items-baseline gap-3 flex-wrap mt-2">
                <span className="font-mono text-5xl md:text-6xl font-medium tabular-nums text-foreground tracking-[-0.02em] leading-none">
                  {heroHighlight.value}
                </span>
                <span className="font-sans text-xl md:text-2xl font-semibold text-foreground leading-tight">
                  {heroHighlight.label}
                </span>
              </div>

              {heroHighlight.description && (
                <Prose content={heroHighlight.description} size="base" className="max-w-2xl mt-2" />
              )}
            </CardContent>
          </Card>
        )}

        {/* 2. GRID HIGHLIGHTS */}
        {gridHighlights.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {gridHighlights.map((highlight, idx) => (
              <Card
                key={idx}
                className="rounded-[20px] border border-border bg-surface py-0 h-full"
              >
                <CardContent className="p-6 flex flex-col gap-4 h-full">
                  <span className="font-mono text-xs font-medium uppercase tracking-[0.04em] text-primary">
                    {String(idx + 1).padStart(2, '0')} · Indicador
                  </span>
                  <div className="mt-auto pt-2 space-y-1.5">
                    <span className="font-mono text-3xl sm:text-4xl font-medium tabular-nums text-foreground block">
                      {highlight.value}
                    </span>
                    <p className="font-sans text-sm font-medium text-foreground-secondary leading-snug">
                      {highlight.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 3. TESTIMONY AND MILESTONE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {foundedYear && (
            <Card className="rounded-[20px] border border-border bg-surface overflow-hidden py-0 min-h-[260px]">
              <CardContent className="p-8 h-full flex flex-col justify-center gap-6">
                <div className="flex items-end gap-4">
                  <div className="flex flex-col items-start gap-1 text-foreground-muted">
                    <Calendar className="size-5 text-primary mb-1" strokeWidth={1.5} />
                    <span className="font-mono text-xs font-medium uppercase tracking-[0.04em]">
                      Fundada en
                    </span>
                  </div>
                  <span className="font-mono text-5xl sm:text-6xl font-medium tabular-nums text-foreground leading-none">
                    {foundedYear}
                  </span>
                </div>

                {verified && (
                  <div className="inline-flex items-center gap-2 self-start bg-verified-emerald/12 text-verified-emerald dark:bg-verified-emerald/20 dark:text-emerald-300 border border-verified-emerald/25 px-4 py-2 rounded-full">
                    <Award className="size-4" strokeWidth={1.5} />
                    <span className="font-mono text-xs font-medium uppercase tracking-[0.04em]">
                      Organización verificada
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {impactTestimony && (
            <Card className="rounded-[20px] border border-border bg-surface overflow-hidden py-0 min-h-[260px]">
              <CardContent className="p-8 h-full flex flex-col justify-between gap-6 relative">
                <Quote
                  className="absolute top-6 right-8 size-16 text-primary/10"
                  strokeWidth={1.25}
                />

                <div className="relative z-10 space-y-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.04em] font-medium text-primary">
                    Testimonio
                  </p>
                  <p className="font-sans text-lg font-medium text-foreground leading-relaxed">
                    &ldquo;{impactTestimony.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3.5 z-10 mt-auto pt-4 border-t border-border">
                  <div className="size-11 rounded-full border border-border bg-primary/10 text-primary flex items-center justify-center shrink-0 font-sans font-semibold text-sm">
                    {impactTestimony.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-sm text-foreground">
                      {impactTestimony.author}
                    </p>
                    <p className="font-mono text-xs text-foreground-muted mt-0.5">
                      {impactTestimony.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
