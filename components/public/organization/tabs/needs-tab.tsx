'use client'

import { Package, Users, Wallet, Apple, Wrench, HelpCircle } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

import type { NeedsTabProps } from '@/types'

const CATEGORY_MAP: Record<string, { label: string; icon: any }> = {
  material: { label: 'Donación Material', icon: Package },
  voluntariado: { label: 'Voluntariado', icon: Users },
  economica: { label: 'Apoyo Económico', icon: Wallet },
  alimentos: { label: 'Alimentos', icon: Apple },
  servicios: { label: 'Servicios Profesionales', icon: Wrench },
  otro: { label: 'Otro', icon: HelpCircle },
}

const URGENCY_MAP: Record<string, { label: string; bg: string; text: string; dot: string }> = {
  alta: {
    label: 'Urgencia Alta',
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-600 dark:text-red-400',
    dot: 'bg-red-600 dark:bg-red-400',
  },
  media: {
    label: 'Urgencia Media',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-600 dark:text-amber-400',
    dot: 'bg-amber-500 dark:bg-amber-400',
  },
  baja: {
    label: 'Urgencia Baja',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
  },
}

export function NeedsTab({ needs }: NeedsTabProps) {
  const activeNeeds = needs && Array.isArray(needs) ? needs.filter((n) => n.title) : []

  return (
    <div className="py-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-10">
        <h2 className="text-2xl font-bold font-headline text-foreground">Necesidades actuales</h2>
        <p className="text-muted-foreground mt-2 font-medium text-sm max-w-2xl">
          Descubre cómo puedes apoyar a esta organización donando materiales, tu tiempo o recursos
          económicos.
        </p>
      </div>

      {activeNeeds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeNeeds.map((need, idx) => {
            const cat = CATEGORY_MAP[need.category || 'otro'] || CATEGORY_MAP.otro
            const urgency = URGENCY_MAP[need.urgency || 'media'] || URGENCY_MAP.media
            const Icon = cat.icon

            return (
              <Card
                key={idx}
                className="rounded-2xl border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col group py-0 bg-background/50"
              >
                <CardContent className="p-6 flex-1 flex flex-col relative pt-8">
                  {/* Urgency Badge */}
                  <div className={`absolute top-0 inset-x-0 h-1.5 ${urgency.dot}`} />

                  <div className="flex justify-between items-start mb-4 gap-4">
                    <div className="flex items-center gap-2 text-primary-900 dark:text-primary-200 bg-primary/10 dark:bg-primary-200/10 px-2.5 py-1 rounded-lg shrink-0">
                      <Icon className="size-4" />
                      <span className="text-[11px] font-bold uppercase tracking-wider">
                        {cat.label}
                      </span>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full ${urgency.bg} ${urgency.text} shrink-0`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${urgency.dot}`} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">
                        {urgency.label}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">
                    {need.title}
                  </h3>

                  <p className="text-muted-foreground text-sm font-medium mb-5 line-clamp-4 flex-1 whitespace-pre-wrap">
                    {need.description}
                  </p>

                  {need.quantity && (
                    <div className="mt-auto pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                          Cantidad requerida
                        </p>
                        <p className="font-bold text-foreground bg-muted/60 px-3 py-1 rounded-full text-sm">
                          {need.quantity}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="py-20 text-center text-muted-foreground border border-dashed border-border/60 rounded-3xl bg-muted/20">
          <HelpCircle className="size-10 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-lg font-medium">Sin necesidades activas</p>
          <p className="text-sm mt-2 max-w-sm mx-auto">
            Por el momento esta organización no ha registrado necesidades específicas de donación.
          </p>
        </div>
      )}
    </div>
  )
}
