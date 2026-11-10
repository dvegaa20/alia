'use client'

import Image from 'next/image'
import {
  Package,
  Users,
  Wallet,
  Apple,
  Wrench,
  HelpCircle,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  BadgeCheck,
  UserCheck,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Prose } from '@/components/ui/prose'

import type { NeedsTabProps, NeedItem } from '@/types'

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
    label: 'Permanente',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-600 dark:text-emerald-400',
    dot: 'bg-emerald-500 dark:bg-emerald-400',
  },
}

function NeedCard({ need }: { need: NeedItem }) {
  const cat = CATEGORY_MAP[need.category || 'otro'] || CATEGORY_MAP.otro
  const urgency = URGENCY_MAP[need.urgency || 'media'] || URGENCY_MAP.media
  const Icon = cat.icon

  return (
    <Card className="rounded-2xl border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1 overflow-hidden h-full flex flex-col group py-0">
      <CardContent className="p-6 flex-1 flex flex-col relative pt-8">
        {/* Urgency Top Bar */}
        <div className={`absolute top-0 inset-x-0 h-1.5 ${urgency.dot}`} />

        <div className="flex justify-between items-start mb-4 gap-4">
          <div className="flex items-center gap-2 text-primary-900 dark:text-primary-200 bg-primary/10 dark:bg-primary-200/10 px-2.5 py-1 rounded-lg shrink-0">
            <Icon className="size-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">{cat.label}</span>
          </div>

          <div
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${urgency.bg} ${urgency.text} shrink-0`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${urgency.dot}`} />
            <span className="text-[10px] font-bold uppercase tracking-widest">{urgency.label}</span>
          </div>
        </div>

        <h4 className="text-xl font-bold text-foreground mb-2 leading-tight">{need.title}</h4>

        <Prose
          content={need.description}
          size="sm"
          className="line-clamp-4 flex-1 mb-5 text-sm"
        />

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
}

export function NeedsTab({
  needs,
  howToDonate,
  isDonatariaAutorizada,
  volunteering,
  events,
}: NeedsTabProps) {
  const activeNeeds = needs && Array.isArray(needs) ? needs.filter((n) => n.title) : []
  const urgentNeeds = activeNeeds.filter(
    (n) => n.urgency === 'alta' || n.urgency === 'media' || !n.urgency
  )
  const permanentNeeds = activeNeeds.filter((n) => n.urgency === 'baja')

  const cleanActivities = volunteering?.activities?.filter(Boolean) || []
  const hasVolunteering =
    Boolean(volunteering?.description?.trim()) ||
    Boolean(volunteering?.ageRequirement?.trim()) ||
    cleanActivities.length > 0

  const activeEvents = events && Array.isArray(events) ? events.filter((e) => e.title) : []
  const upcomingEvents = activeEvents.filter((e) => !e.isPast)
  const pastEvents = activeEvents.filter((e) => e.isPast)

  return (
    <div className="py-2 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header + Cómo Donar Box */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold font-headline text-foreground">
            Necesidades y Formas de Apoyar
          </h2>
          <p className="text-muted-foreground mt-2 font-medium text-sm max-w-2xl">
            Descubre cómo puedes apoyar a esta causa donando insumos urgentes, donaciones
            permanentes, tu tiempo como voluntario o participando en sus próximos eventos.
          </p>
        </div>

        {(howToDonate || isDonatariaAutorizada) && (
          <Card className="rounded-3xl border-primary/25 bg-primary/5 dark:bg-primary/10 shadow-none py-0 overflow-hidden">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <HeartHandshake className="size-5" />
                  </div>
                  <h3 className="text-xl font-bold font-headline text-foreground">
                    ¿Cómo donar? (Instrucciones de entrega o cuenta)
                  </h3>
                  {isDonatariaAutorizada && (
                    <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 rounded-full px-3 py-1 text-xs font-bold gap-1.5">
                      <BadgeCheck className="size-3.5" />
                      Donataria Autorizada (Deducible de ISR)
                    </Badge>
                  )}
                </div>
                {howToDonate ? (
                  <div className="pt-1 pl-0 md:pl-13">
                    <Prose content={howToDonate} size="sm" className="text-foreground/90" />
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground pl-0 md:pl-13">
                    Esta organización es Donataria Autorizada y puede emitir recibos deducibles de
                    impuestos (ISR). Contáctalos directamente para solicitar tus datos de donación.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Needs Blocks: Urgent vs Permanent */}
      {activeNeeds.length > 0 ? (
        <div className="space-y-12">
          {/* Bloque 1: 🔴 Donaciones con Urgencia */}
          <section className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-border/50 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xl" aria-hidden="true">
                  🔴
                </span>
                <div>
                  <h3 className="text-xl font-bold font-headline text-foreground">
                    Donaciones con Urgencia
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium">
                    Insumos y apoyos prioritarios que la organización necesita cubrir lo antes
                    posible.
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="rounded-full border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 font-bold"
              >
                {urgentNeeds.length} {urgentNeeds.length === 1 ? 'necesidad' : 'necesidades'}
              </Badge>
            </div>

            {urgentNeeds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {urgentNeeds.map((need, idx) => (
                  <NeedCard key={`urgent-${idx}`} need={need} />
                ))}
              </div>
            ) : (
              <div className="py-10 px-6 text-center text-muted-foreground border border-dashed border-border/60 rounded-2xl bg-muted/15 text-sm">
                No hay donaciones urgentes registradas en este momento.
              </div>
            )}
          </section>

          {/* Bloque 2: 🟢 Donaciones sin Urgencia (Permanentes) */}
          <section className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-border/50 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-xl" aria-hidden="true">
                  🟢
                </span>
                <div>
                  <h3 className="text-xl font-bold font-headline text-foreground">
                    Donaciones sin Urgencia (Permanentes)
                  </h3>
                  <p className="text-xs text-muted-foreground font-medium">
                    Apoyos recurrentes y permanentes que la organización recibe durante todo el año.
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="rounded-full border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
              >
                {permanentNeeds.length}{' '}
                {permanentNeeds.length === 1 ? 'necesidad' : 'necesidades'}
              </Badge>
            </div>

            {permanentNeeds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {permanentNeeds.map((need, idx) => (
                  <NeedCard key={`perm-${idx}`} need={need} />
                ))}
              </div>
            ) : (
              <div className="py-10 px-6 text-center text-muted-foreground border border-dashed border-border/60 rounded-2xl bg-muted/15 text-sm">
                No hay donaciones permanentes registradas en este momento.
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="py-16 text-center text-muted-foreground border border-dashed border-border/60 rounded-3xl bg-muted/20">
          <HelpCircle className="size-10 mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-lg font-medium">Sin necesidades materiales registradas</p>
          <p className="text-sm mt-2 max-w-sm mx-auto">
            Por el momento esta organización no ha registrado necesidades específicas de donación.
          </p>
        </div>
      )}

      {/* Sección de Voluntariado */}
      {hasVolunteering && (
        <section className="space-y-6 pt-4 border-t border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <Users className="size-5" />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-headline text-foreground">Voluntariado</h3>
              <p className="text-sm text-muted-foreground font-medium">
                Conoce cómo puedes involucrarte directamente y donar tu tiempo.
              </p>
            </div>
          </div>

          <Card className="rounded-3xl border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] py-0 overflow-hidden">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                {volunteering?.description && (
                  <div className="space-y-2 flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      ¿De qué trata?
                    </p>
                    <Prose content={volunteering.description} size="sm" />
                  </div>
                )}

                {volunteering?.ageRequirement && (
                  <div className="bg-muted/50 border border-border/60 rounded-2xl p-4 md:w-72 shrink-0 flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <UserCheck className="size-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        ¿Quién puede ayudar? / Edades
                      </p>
                      <p className="text-sm font-bold text-foreground mt-1">
                        {volunteering.ageRequirement}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {cleanActivities.length > 0 && (
                <div className="pt-4 border-t border-border/50 space-y-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Actividades en las que puedes apoyar
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cleanActivities.map((activity, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 bg-muted/30 rounded-xl p-3 border border-border/40"
                      >
                        <CheckCircle2 className="size-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-foreground">{activity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      )}

      {/* Línea de tiempo de Eventos Pasados y Próximos Eventos */}
      {activeEvents.length > 0 && (
        <section className="space-y-8 pt-4 border-t border-border/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/15 text-primary flex items-center justify-center shrink-0">
              <Calendar className="size-5" />
            </div>
            <div>
              <h3 className="text-2xl font-bold font-headline text-foreground">
                Eventos y Campañas
              </h3>
              <p className="text-sm text-muted-foreground font-medium">
                Línea de tiempo con las próximas actividades y reseñas de eventos realizados.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Próximos Eventos */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <h4 className="text-lg font-bold font-headline text-foreground">
                  Próximos Eventos ({upcomingEvents.length})
                </h4>
              </div>

              {upcomingEvents.length > 0 ? (
                <div className="relative pl-6 border-l-2 border-primary/30 space-y-6">
                  {upcomingEvents.map((ev, idx) => (
                    <div key={ev.id || idx} className="relative group">
                      <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-background" />
                      <Card className="rounded-2xl border-border/50 shadow-sm py-0 overflow-hidden">
                        {ev.imageUrl && (
                          <div className="relative h-40 w-full overflow-hidden">
                            <Image
                              src={ev.imageUrl}
                              alt={ev.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <CardContent className="p-5 space-y-2.5">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <Badge className="bg-primary/15 text-primary border-none text-[11px] font-bold">
                              Próximo Evento
                            </Badge>
                            <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                              <Clock className="size-3.5" />
                              {ev.date}
                            </span>
                          </div>
                          <h5 className="text-lg font-bold text-foreground">{ev.title}</h5>
                          {ev.description && (
                            <Prose content={ev.description} size="sm" className="text-sm" />
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl border border-dashed border-border/60 bg-muted/15 text-sm text-muted-foreground">
                  No hay próximos eventos programados por ahora.
                </div>
              )}
            </div>

            {/* Eventos Pasados con Reseña */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-muted-foreground" />
                <h4 className="text-lg font-bold font-headline text-foreground">
                  Eventos Pasados y Reseñas ({pastEvents.length})
                </h4>
              </div>

              {pastEvents.length > 0 ? (
                <div className="relative pl-6 border-l-2 border-border space-y-6">
                  {pastEvents.map((ev, idx) => (
                    <div key={ev.id || idx} className="relative group">
                      <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-muted-foreground/50 ring-4 ring-background" />
                      <Card className="rounded-2xl border-border/50 bg-muted/20 shadow-none py-0 overflow-hidden">
                        {ev.imageUrl && (
                          <div className="relative h-40 w-full overflow-hidden">
                            <Image
                              src={ev.imageUrl}
                              alt={ev.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <CardContent className="p-5 space-y-2.5">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className="text-[11px] font-bold text-muted-foreground"
                            >
                              Evento Realizado · Reseña
                            </Badge>
                            <span className="text-xs font-bold text-muted-foreground flex items-center gap-1">
                              <Calendar className="size-3.5" />
                              {ev.date}
                            </span>
                          </div>
                          <h5 className="text-lg font-bold text-foreground">{ev.title}</h5>
                          {ev.description && (
                            <Prose content={ev.description} size="sm" className="text-sm" />
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl border border-dashed border-border/60 bg-muted/15 text-sm text-muted-foreground">
                  Aún no hay reseñas de eventos pasados registradas.
                </div>
              )}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
