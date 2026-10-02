'use client'

import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'
import { Prose } from '@/components/ui/prose'
import { Calendar, Award, Quote, TrendingUp } from 'lucide-react'

import type { ImpactTabProps } from '@/types'

// Dynamic colors for the grid items to give some variety without manual config
const ROTATING_COLORS = [
  'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
  'bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400',
  'bg-violet-50 text-violet-600 dark:bg-violet-950/40 dark:text-violet-400',
  'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400',
  'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400',
]

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
      <div className="py-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-10">
          <h2 className="text-2xl font-bold font-headline text-foreground">Impacto</h2>
          <p className="text-muted-foreground mt-2 font-medium text-sm max-w-2xl">
            Métricas y logros de nuestro trabajo a lo largo del tiempo.
          </p>
        </div>
        <div className="py-20 text-center text-muted-foreground border border-dashed border-border/60 rounded-3xl bg-muted/20">
          <p className="text-lg font-medium">Próximamente</p>
          <p className="text-sm mt-2 max-w-sm mx-auto">
            Estamos trabajando para mostrarte métricas de impacto detalladas en esta sección.
          </p>
        </div>
      </div>
    )
  }

  const [heroHighlight, ...gridHighlights] = highlights

  return (
    <div className="py-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h2 className="text-2xl font-bold font-headline text-foreground">Impacto</h2>
        <p className="text-muted-foreground mt-2 font-medium text-sm max-w-2xl">
          Métricas y logros de nuestro trabajo a lo largo del tiempo.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. HERO HIGHLIGHT */}
        {heroHighlight && (
          <Card className="rounded-3xl border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden py-0">
            <CardContent className="p-8 md:p-10 flex flex-col gap-4">
              <span className="inline-flex items-center gap-1.5 self-start bg-primary/10 text-primary-700 dark:text-primary-400 text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                <TrendingUp className="size-3" />
                Logro principal
              </span>

              <div className="flex items-baseline gap-3 flex-wrap mt-2">
                <span className="text-6xl md:text-7xl font-black text-foreground tracking-tight leading-none font-headline">
                  {heroHighlight.value}
                </span>
                <span className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {gridHighlights.map((highlight, idx) => {
              const colorClass = ROTATING_COLORS[idx % ROTATING_COLORS.length]
              return (
                <Card
                  key={idx}
                  className="rounded-3xl border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] py-0 h-full"
                >
                  <CardContent className="p-7 flex flex-col gap-5 h-full">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg ${colorClass}`}
                    >
                      {idx + 1}
                    </div>
                    <div className="mt-auto pt-2">
                      <span className="text-4xl font-black text-foreground font-headline block">
                        {highlight.value}
                      </span>
                      <p className="text-sm font-bold text-muted-foreground mt-1.5 leading-snug">
                        {highlight.label}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}

        {/* 3. TESTIMONY AND MILESTONE */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {foundedYear && (
            <Card className="rounded-3xl border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden py-0 min-h-[280px]">
              <CardContent className="p-8 h-full flex flex-col justify-center gap-6 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-primary/5 pointer-events-none" />
                <div className="absolute -bottom-16 -left-12 w-72 h-72 rounded-full bg-primary/5 pointer-events-none" />

                <div className="flex items-end gap-4 z-10 mx-auto lg:mx-0">
                  <div className="flex flex-col items-center lg:items-start gap-1 text-muted-foreground">
                    <Calendar className="size-6 mb-2" />
                    <span className="text-xs font-bold uppercase tracking-wider">Fundada en</span>
                  </div>
                  <span className="text-7xl min:text-6xl font-black text-foreground leading-none font-headline">
                    {foundedYear}
                  </span>
                </div>

                {verified && (
                  <div className="relative flex items-center gap-2 self-center lg:self-start bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 px-5 py-3 rounded-2xl z-10 border border-amber-100 dark:border-amber-900/50">
                    <Award className="size-5" />
                    <span className="text-sm font-bold">Organización verificada</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {impactTestimony && (
            <Card className="rounded-3xl border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] bg-slate-50 dark:bg-zinc-900 overflow-hidden py-0 min-h-[280px]">
              <CardContent className="p-8 md:p-10 h-full flex flex-col justify-between gap-8 relative">
                <Quote
                  className="absolute top-6 right-8 size-24 text-foreground/5 dark:text-foreground/5"
                  strokeWidth={1}
                />

                <div className="relative z-10">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-primary mb-6">
                    Testimonio
                  </p>
                  <p className="text-lg md:text-xl font-medium text-foreground leading-relaxed italic">
                    &quot;{impactTestimony.quote}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-4 z-10 mt-auto pt-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-background shadow-md shrink-0 bg-muted">
                    <Image
                      src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${encodeURIComponent(impactTestimony.author)}&backgroundColor=b6e3f4`}
                      alt={impactTestimony.author}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{impactTestimony.author}</p>
                    <p className="text-xs text-muted-foreground font-semibold mt-0.5">
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
