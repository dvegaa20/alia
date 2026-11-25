'use client'

import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { MapPin, Mail, Phone, Share2, ExternalLink } from 'lucide-react'
import { trackSocialLead } from '@/lib/analytics'

interface ContactSidebarProps {
  orgName: string
  location?: string | null
  email: string
  phone?: string | null
  website?: string | null
  impactCurrent?: number | null
  impactGoal?: number | null
  impactType?: string | null
}

export function ContactSidebar({
  orgName,
  location,
  email,
  phone,
  website,
  impactCurrent,
  impactGoal,
  impactType,
}: ContactSidebarProps) {
  const progressValue =
    impactCurrent && impactGoal ? Math.min(Math.round((impactCurrent / impactGoal) * 100), 100) : 0

  function formatNumber(n: number): string {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
    if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}k`
    return n.toLocaleString('es-MX')
  }

  return (
    <aside className="sticky top-28 space-y-6">
      {/* Contact Info Card */}
      <div className="bg-surface rounded-[20px] p-6 lg:p-8 border border-border space-y-6">
        <div className="space-y-5">
          <div className="space-y-1">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-primary">
              Contacto directo
            </p>
            <h3 className="font-sans text-xl font-semibold text-foreground">
              Información de contacto
            </h3>
          </div>

          <div className="space-y-4">
            {location && (
              <div className="flex items-center gap-3.5">
                <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <MapPin className="size-4" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] font-medium text-foreground-muted uppercase tracking-[0.04em]">
                    Ubicación
                  </p>
                  <p className="text-sm font-medium text-foreground truncate">{location}</p>
                </div>
              </div>
            )}

            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3.5 group"
              onClick={() => trackSocialLead('send_message', orgName)}
            >
              <div className="size-10 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground flex items-center justify-center shrink-0 transition-colors">
                <Mail className="size-4" strokeWidth={1.5} />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-[11px] font-medium text-foreground-muted uppercase tracking-[0.04em]">
                  Correo
                </p>
                <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                  {email}
                </p>
              </div>
            </a>

            {phone && (
              <div className="flex items-center gap-3.5">
                <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Phone className="size-4" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] font-medium text-foreground-muted uppercase tracking-[0.04em]">
                    Teléfono
                  </p>
                  <p className="font-mono text-sm font-medium text-foreground tabular-nums">
                    {phone}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA + Share */}
        <div className="pt-4 border-t border-border flex items-center gap-3">
          {website && (
            <Button
              asChild
              className="flex-1 py-3 h-auto bg-primary hover:bg-primary-hover text-primary-foreground font-sans font-medium text-sm rounded-full transition-colors"
            >
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackSocialLead('click_website', orgName)}
              >
                <span>Ir al sitio web</span>
                <ExternalLink className="ml-1.5 size-3.5" strokeWidth={1.5} />
              </a>
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label="Compartir organización"
            className="size-11 shrink-0 rounded-full border-border bg-surface text-foreground-secondary hover:border-rock-blue hover:text-primary"
            onClick={() => {
              trackSocialLead('share_org', orgName)
              if (typeof navigator !== 'undefined' && navigator.share) {
                navigator.share({ title: orgName, url: window.location.href }).catch(() => {})
              }
            }}
          >
            <Share2 className="size-4" strokeWidth={1.5} />
          </Button>
        </div>
      </div>

      {/* Impact Stats Snippet */}
      {impactCurrent != null && impactGoal != null && (
        <div className="bg-surface rounded-[20px] border border-border p-6 space-y-4">
          <p className="font-mono text-xs font-medium tracking-[0.04em] uppercase text-primary">
            Impacto reciente
          </p>
          <div className="flex justify-between items-end gap-3">
            <span className="font-mono text-4xl font-medium tabular-nums text-foreground leading-none">
              {formatNumber(impactCurrent)}+
            </span>
            <span className="text-xs font-medium text-foreground-muted text-right">
              {impactType || 'Personas impactadas'}
            </span>
          </div>
          <Progress
            value={progressValue}
            className="h-1.5 bg-surface-subtle *:data-[slot=progress-indicator]:bg-primary"
          />
        </div>
      )}
    </aside>
  )
}
