import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Mail, Phone, Globe, Share2, Heart } from "lucide-react";

interface ContactSidebarProps {
  location?: string;
  email: string;
  phone?: string | null;
  website?: string | null;
}

export function ContactSidebar({
  location,
  email,
  phone,
  website,
}: ContactSidebarProps) {
  return (
    <aside className="sticky top-32 space-y-6">
      {/* Contact Info Card */}
      <div className="bg-background rounded-xl p-8 editorial-shadow space-y-8 border-t-4 border-ds-primary">
        <div className="space-y-6">
          <h3 className="text-xl font-bold font-headline text-foreground">
            Información de contacto
          </h3>

          <div className="space-y-4">
            {/* Location */}
            {location && (
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-ds-surface-container flex items-center justify-center text-ds-primary group-hover:bg-ds-primary group-hover:text-ds-on-primary transition-colors">
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
              <div className="w-10 h-10 rounded-full bg-ds-surface-container flex items-center justify-center text-ds-primary group-hover:bg-ds-primary group-hover:text-ds-on-primary transition-colors">
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
                <div className="w-10 h-10 rounded-full bg-ds-surface-container flex items-center justify-center text-ds-primary group-hover:bg-ds-primary group-hover:text-ds-on-primary transition-colors">
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
        <div className="pt-4 border-t border-border/20 space-y-6">
          {website && (
            <Button
              asChild
              className="w-full py-4 h-auto bg-linear-to-r from-ds-primary to-ds-primary-container text-ds-on-primary font-bold rounded-xl shadow-lg shadow-ds-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
            >
              <a href={website} target="_blank" rel="noopener noreferrer">
                Ir al sitio web
              </a>
            </Button>
          )}

          <div className="flex items-center justify-center gap-6">
            <button className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-ds-secondary transition-colors cursor-pointer">
              <Globe className="size-6" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-ds-secondary transition-colors cursor-pointer">
              <Share2 className="size-6" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-ds-secondary transition-colors cursor-pointer">
              <Heart className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Impact Stats Snippet */}
      <div className="bg-ds-secondary-fixed rounded-xl p-6 space-y-4">
        <p className="text-ds-on-primary-fixed-variant font-bold text-sm tracking-tight uppercase">
          Impacto Reciente
        </p>
        <div className="flex justify-between items-end">
          <span className="text-4xl font-extrabold text-ds-on-primary-fixed-variant font-headline">
            1.2k+
          </span>
          <span className="text-sm font-medium text-ds-on-primary-fixed-variant/70 mb-1">
            Personas impactadas
          </span>
        </div>
        <Progress
          value={85}
          className="h-1.5 bg-ds-on-primary-fixed-variant/10 *:data-[slot=progress-indicator]:bg-ds-secondary"
        />
      </div>
    </aside>
  );
}
