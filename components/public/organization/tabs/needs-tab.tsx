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
  MessageCircle,
  AlertCircle,
  Repeat,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Prose } from '@/components/ui/prose'
import { trackSocialLead } from '@/lib/analytics'
import { cn } from '@/lib/utils'

import type { NeedsTabProps, NeedItem } from '@/types'

const CATEGORY_MAP: Record<string, { label: string; icon: React.ElementType }> = {
  material: { label: 'Donación Material', icon: Package },
  voluntariado: { label: 'Voluntariado', icon: Users },
  economica: { label: 'Apoyo Económico', icon: Wallet },
  alimentos: { label: 'Alimentos', icon: Apple },
  servicios: { label: 'Servicios Profesionales', icon: Wrench },
  otro: { label: 'Otro', icon: HelpCircle },
}

const URGENCY_MAP: Record<
  string,
  { label: string; badgeClass: string; borderClass: string; dotClass: string }
> = {
  alta: {
    label: 'Con urgencia',
    badgeClass: 'bg-urgency-coral/10 text-urgency-coral border-urgency-coral/25',
    borderClass: 'border-l-4 border-l-urgency-coral',
    dotClass: 'bg-urgency-coral',
  },
  media: {
    label: 'Prioritaria',
    badgeClass: 'bg-urgency-coral/10 text-urgency-coral border-urgency-coral/25',
    borderClass: 'border-l-4 border-l-urgency-coral',
    dotClass: 'bg-urgency-coral',
  },
  baja: {
    label: 'Permanente',
    badgeClass: 'bg-primary/10 text-primary border-primary/20',
    borderClass: 'border-l-4 border-l-primary',
    dotClass: 'bg-primary',
  },
}

function NeedCard({ need }: { need: NeedItem }) {
  const cat = CATEGORY_MAP[need.category || 'otro'] || CATEGORY_MAP.otro
  const urgency = URGENCY_MAP[need.urgency || 'media'] || URGENCY_MAP.media
  const Icon = cat.icon

  return (
    <Card
      className={cn(
        'rounded-[20px] border border-border bg-surface transition-colors duration-200 hover:border-rock-blue overflow-hidden h-full flex flex-col py-0',
        urgency.borderClass
      )}
    >
      <CardContent className="p-6 flex-1 flex flex-col gap-4">
        <div className="flex justify-between items-start gap-3">
          <div className="inline-flex items-center gap-1.5 text-primary bg-primary/10 px-2.5 py-1 rounded-full shrink-0">
            <Icon className="size-3.5" strokeWidth={1.5} />
            <span className=" text-[10px] font-medium uppercase tracking-[0.04em]">
              {cat.label}
            </span>
          </div>

          <span
            className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border shrink-0  text-[10px] font-medium uppercase tracking-[0.04em]',
              urgency.badgeClass
            )}
          >
            <span className={cn('size-1.5 rounded-full', urgency.dotClass)} aria-hidden="true" />
            {urgency.label}
          </span>
        </div>

        <h4 className="font-sans text-lg font-semibold text-foreground leading-snug">
          {need.title}
        </h4>

        <Prose content={need.description} size="sm" className="line-clamp-4 flex-1 text-sm" />

        {need.quantity && (
          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between gap-2">
            <p className=" text-[11px] font-medium text-foreground-muted uppercase tracking-[0.04em]">
              Cantidad requerida
            </p>
            <p className=" text-xs font-medium tabular-nums text-foreground bg-background border border-border px-3 py-1 rounded-full">
              {need.quantity}
            </p>
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
  whatsapp,
  orgName,
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

  const cleanWhatsapp = whatsapp?.replace(/\D/g, '')

  return (
    <div className="py-2 space-y-14 animate-in fade-in slide-in-from-bottom-4 duration-400">
      {/* Header + "¿Cómo donar?" Box */}
      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="font-sans text-2xl font-semibold text-foreground">
            Necesidades y formas de apoyar
          </h2>
          <p className="font-sans text-sm text-foreground-secondary max-w-2xl leading-relaxed">
            Descubre cómo puedes apoyar a esta causa donando insumos prioritarios, apoyos
            permanentes, tu tiempo como voluntario o participando en sus próximos eventos.
          </p>
        </div>

        {(howToDonate || isDonatariaAutorizada || cleanWhatsapp) && (
          <Card className="rounded-[20px] border border-border bg-surface py-0 overflow-hidden">
            <CardContent className="p-6 md:p-8 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="size-10 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                    <HeartHandshake className="size-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className=" text-[11px] font-medium uppercase tracking-[0.04em] text-primary">
                      Canal directo
                    </p>
                    <h3 className="font-sans text-xl font-semibold text-foreground">
                      ¿Cómo donar?
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {isDonatariaAutorizada && (
                    <Badge className="bg-[#1E8E68]/12 text-[#1E8E68] border border-[#1E8E68]/25 rounded-full px-3 py-1 h-auto  text-[11px] font-medium uppercase tracking-[0.05em] gap-1.5">
                      <BadgeCheck className="size-3.5" strokeWidth={1.5} />
                      Donataria Autorizada (ISR)
                    </Badge>
                  )}

                  {cleanWhatsapp && (
                    <Button
                      asChild
                      className="rounded-full bg-primary hover:bg-primary-hover text-primary-foreground px-5 py-2.5 h-auto text-sm font-medium gap-2"
                    >
                      <a
                        href={`https://wa.me/${cleanWhatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => trackSocialLead('click_whatsapp', orgName || '')}
                      >
                        <MessageCircle className="size-4" strokeWidth={1.5} />
                        Contactar por WhatsApp
                      </a>
                    </Button>
                  )}
                </div>
              </div>

              <div className="rounded-2xl border border-[#DFD5C0] bg-[#F5EEDD] p-5">
                {howToDonate ? (
                  <Prose content={howToDonate} size="sm" className="text-foreground-secondary" />
                ) : (
                  <p className="font-sans text-sm text-foreground-secondary leading-relaxed">
                    Esta organización es Donataria Autorizada y puede emitir recibos deducibles de
                    impuestos (ISR). Contáctalos directamente para recibir los datos de entrega o
                    transferencia.
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
          {/* Bloque 1: Donaciones con Urgencia */}
          <section className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3 border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-urgency-coral/10 text-urgency-coral border border-urgency-coral/25 flex items-center justify-center shrink-0">
                  <AlertCircle className="size-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-sans text-xl font-semibold text-foreground">
                    Donaciones con urgencia
                  </h3>
                  <p className="font-sans text-xs text-foreground-secondary">
                    Insumos y apoyos prioritarios que la organización necesita cubrir lo antes
                    posible.
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="rounded-full border-urgency-coral/25 bg-urgency-coral/10 text-urgency-coral  text-xs font-medium tabular-nums px-3 py-1 h-auto"
              >
                {urgentNeeds.length} {urgentNeeds.length === 1 ? 'necesidad' : 'necesidades'}
              </Badge>
            </div>

            {urgentNeeds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {urgentNeeds.map((need, idx) => (
                  <NeedCard key={`urgent-${idx}`} need={need} />
                ))}
              </div>
            ) : (
              <div className="py-10 px-6 text-center text-foreground-muted border border-dashed border-border rounded-2xl bg-surface text-sm">
                No hay donaciones urgentes registradas en este momento.
              </div>
            )}
          </section>

          {/* Bloque 2: Donaciones sin Urgencia (Permanentes) */}
          <section className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-3 border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0">
                  <Repeat className="size-5" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-sans text-xl font-semibold text-foreground">
                    Donaciones sin urgencia (permanentes)
                  </h3>
                  <p className="font-sans text-xs text-foreground-secondary">
                    Apoyos recurrentes que la organización recibe durante todo el año.
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className="rounded-full border-primary/20 bg-primary/10 text-primary  text-xs font-medium tabular-nums px-3 py-1 h-auto"
              >
                {permanentNeeds.length} {permanentNeeds.length === 1 ? 'necesidad' : 'necesidades'}
              </Badge>
            </div>

            {permanentNeeds.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {permanentNeeds.map((need, idx) => (
                  <NeedCard key={`perm-${idx}`} need={need} />
                ))}
              </div>
            ) : (
              <div className="py-10 px-6 text-center text-foreground-muted border border-dashed border-border rounded-2xl bg-surface text-sm">
                No hay donaciones permanentes registradas en este momento.
              </div>
            )}
          </section>
        </div>
      ) : (
        <div className="py-14 px-6 text-center text-foreground-muted border border-dashed border-border rounded-[20px] bg-surface">
          <HelpCircle className="size-9 mx-auto text-foreground-muted/60 mb-3" strokeWidth={1.5} />
          <p className="font-sans text-base font-medium text-foreground">
            Sin necesidades materiales registradas
          </p>
          <p className="font-sans text-sm mt-1.5 max-w-sm mx-auto text-foreground-secondary">
            Por el momento esta organización no ha registrado necesidades específicas de donación.
          </p>
        </div>
      )}

      {/* Voluntariado */}
      {hasVolunteering && (
        <section className="space-y-6 pt-6 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Users className="size-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-sans text-2xl font-semibold text-foreground">Voluntariado</h3>
              <p className="font-sans text-sm text-foreground-secondary">
                Conoce cómo puedes involucrarte directamente y donar tu tiempo.
              </p>
            </div>
          </div>

          <Card className="rounded-[20px] border border-border bg-surface py-0 overflow-hidden">
            <CardContent className="p-6 md:p-8 space-y-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                {volunteering?.description && (
                  <div className="space-y-2 flex-1">
                    <p className=" text-[11px] font-medium uppercase tracking-[0.04em] text-foreground-muted">
                      ¿De qué trata?
                    </p>
                    <Prose content={volunteering.description} size="sm" />
                  </div>
                )}

                {volunteering?.ageRequirement && (
                  <div className="bg-background border border-border rounded-2xl p-4 md:w-72 shrink-0 flex items-start gap-3">
                    <div className="size-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <UserCheck className="size-4" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className=" text-[11px] font-medium uppercase tracking-[0.04em] text-foreground-muted">
                        ¿Quién puede ayudar?
                      </p>
                      <p className="font-sans text-sm font-semibold text-foreground mt-1">
                        {volunteering.ageRequirement}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {cleanActivities.length > 0 && (
                <div className="pt-5 border-t border-border space-y-3">
                  <p className=" text-[11px] font-medium uppercase tracking-[0.04em] text-foreground-muted">
                    Actividades en las que puedes apoyar
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {cleanActivities.map((activity, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 bg-[#F5EEDD]/80 rounded-xl p-3 border border-[#DFD5C0]"
                      >
                        <CheckCircle2
                          className="size-4 text-primary shrink-0 mt-0.5"
                          strokeWidth={1.5}
                        />
                        <span className="font-sans text-sm font-medium text-foreground">
                          {activity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </section>
      )}

      {/* Eventos y Campañas */}
      {activeEvents.length > 0 && (
        <section className="space-y-8 pt-6 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <Calendar className="size-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-sans text-2xl font-semibold text-foreground">
                Eventos y campañas
              </h3>
              <p className="font-sans text-sm text-foreground-secondary">
                Línea de tiempo con las próximas actividades y reseñas de eventos realizados.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Próximos Eventos */}
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" strokeWidth={1.5} />
                <h4 className="font-sans text-lg font-semibold text-foreground">
                  Próximos eventos ({upcomingEvents.length})
                </h4>
              </div>

              {upcomingEvents.length > 0 ? (
                <div className="relative pl-6 border-l-2 border-primary/30 space-y-5">
                  {upcomingEvents.map((ev, idx) => (
                    <div key={ev.id || idx} className="relative">
                      <div className="absolute -left-[31px] top-1.5 size-3.5 rounded-full bg-primary ring-4 ring-background" />
                      <Card className="rounded-[20px] border border-border bg-surface py-0 overflow-hidden">
                        {ev.imageUrl && (
                          <div className="relative h-40 w-full overflow-hidden">
                            <Image src={ev.imageUrl} alt={ev.title} fill className="object-cover" />
                          </div>
                        )}
                        <CardContent className="p-5 space-y-2.5">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <Badge className="bg-primary/10 text-primary border border-primary/20 rounded-full  text-[10px] font-medium uppercase tracking-[0.04em]">
                              Próximo evento
                            </Badge>
                            <span className=" text-xs font-medium tabular-nums text-foreground-muted flex items-center gap-1">
                              <Clock className="size-3.5" strokeWidth={1.5} />
                              {ev.date}
                            </span>
                          </div>
                          <h5 className="font-sans text-lg font-semibold text-foreground">
                            {ev.title}
                          </h5>
                          {ev.description && (
                            <Prose content={ev.description} size="sm" className="text-sm" />
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl border border-dashed border-border bg-surface text-sm text-foreground-muted">
                  No hay próximos eventos programados por ahora.
                </div>
              )}
            </div>

            {/* Eventos Pasados con Reseña */}
            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-foreground-muted" strokeWidth={1.5} />
                <h4 className="font-sans text-lg font-semibold text-foreground">
                  Eventos pasados y reseñas ({pastEvents.length})
                </h4>
              </div>

              {pastEvents.length > 0 ? (
                <div className="relative pl-6 border-l-2 border-border space-y-5">
                  {pastEvents.map((ev, idx) => (
                    <div key={ev.id || idx} className="relative">
                      <div className="absolute -left-[31px] top-1.5 size-3.5 rounded-full bg-foreground-muted/50 ring-4 ring-background" />
                      <Card className="rounded-[20px] border border-border bg-surface py-0 overflow-hidden">
                        {ev.imageUrl && (
                          <div className="relative h-40 w-full overflow-hidden">
                            <Image src={ev.imageUrl} alt={ev.title} fill className="object-cover" />
                          </div>
                        )}
                        <CardContent className="p-5 space-y-2.5">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <Badge
                              variant="outline"
                              className="rounded-full  text-[10px] font-medium uppercase tracking-[0.04em] text-foreground-muted border-border"
                            >
                              Evento realizado
                            </Badge>
                            <span className=" text-xs font-medium tabular-nums text-foreground-muted flex items-center gap-1">
                              <Calendar className="size-3.5" strokeWidth={1.5} />
                              {ev.date}
                            </span>
                          </div>
                          <h5 className="font-sans text-lg font-semibold text-foreground">
                            {ev.title}
                          </h5>
                          {ev.description && (
                            <Prose content={ev.description} size="sm" className="text-sm" />
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl border border-dashed border-border bg-surface text-sm text-foreground-muted">
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
