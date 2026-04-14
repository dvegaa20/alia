import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { MapPin, Mail, Phone, Share2 } from 'lucide-react'

interface ContactSidebarProps {
  location?: string | null
  email: string
  phone?: string | null
  website?: string | null
  impactCurrent?: number | null
  impactGoal?: number | null
  impactType?: string | null
}

export function ContactSidebar({
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
    return n.toLocaleString()
  }
  return (
    <aside className="sticky top-32 space-y-6">
      {/* Contact Info Card */}
      <div className="bg-slate-50/40 dark:bg-zinc-900/20 rounded-xl p-8 editorial-shadow space-y-8 border-t-4 border-primary">
        <div className="space-y-6">
          <h3 className="text-xl font-bold font-headline text-foreground">
            Información de contacto
          </h3>

          <div className="space-y-4">
            {/* Location */}
            {location && (
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-bold font-label text-muted-foreground uppercase tracking-widest">
                    Ubicación
                  </p>
                  <p className="text-foreground font-medium">{location}</p>
                </div>
              </div>
            )}

            {/* Email */}
            <div className="flex items-center gap-4 group">
              <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Mail className="size-5" />
              </div>
              <div>
                <p className="text-xs font-bold font-label text-muted-foreground uppercase tracking-widest">
                  Correo
                </p>
                <p className="text-foreground font-medium">{email}</p>
              </div>
            </div>

            {/* Phone */}
            {phone && (
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Phone className="size-5" />
                </div>
                <div>
                  <p className="text-xs font-bold font-label text-muted-foreground uppercase tracking-widest">
                    Teléfono
                  </p>
                  <p className="text-foreground font-medium">{phone}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA + Social */}
        <div className="pt-4 border-t border-border/20 flex gap-4">
          {website && (
            <Button
              asChild
              className="flex-1 py-4 h-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <a href={website} target="_blank" rel="noopener noreferrer">
                Ir al sitio web
              </a>
            </Button>
          )}
          <Button
            variant="ghost"
            className="w-12 h-auto shrink-0 flex items-center justify-center text-muted-foreground"
          >
            <Share2 className="size-5" />
          </Button>
        </div>
      </div>

      {/* Impact Stats Snippet */}
      {impactCurrent != null && impactGoal != null && (
        <div className="bg-muted rounded-xl p-6 space-y-4">
          <p className="text-primary-800 dark:text-primary-200 font-bold text-sm tracking-tight uppercase">
            Impacto Reciente
          </p>
          <div className="flex justify-between items-end">
            <span className="text-4xl font-extrabold text-primary-800 dark:text-primary-200 font-headline">
              {formatNumber(impactCurrent)}+
            </span>
            <span className="text-sm font-medium text-primary-800/70 dark:text-primary-200/70 mb-1">
              {impactType || 'Personas impactadas'}
            </span>
          </div>
          <Progress
            value={progressValue}
            className="h-1.5 bg-primary/20 *:data-[slot=progress-indicator]:bg-primary-800 dark:*:data-[slot=progress-indicator]:bg-primary-200"
          />
        </div>
      )}
    </aside>
  )
}
