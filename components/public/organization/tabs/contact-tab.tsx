"use client";

import { useState } from "react";
import { MapPin, Clock, Mail, Phone, Navigation, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ContactTabProps {
  email: string;
  phone?: string | null;
  location?: string;
  googleMapsUrl?: string | null;
  officeHours?: any;
}

const DAY_LABELS: Record<string, string> = {
  monday: "Lunes",
  tuesday: "Martes",
  wednesday: "Miércoles",
  thursday: "Jueves",
  friday: "Viernes",
  saturday: "Sábado",
  sunday: "Domingo",
};

export default function ContactTab({ email, phone, location, googleMapsUrl, officeHours }: ContactTabProps) {
  const [nombre, setNombre] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const finalSubject = asunto 
      ? `${asunto} (vía Alia)` 
      : `Mensaje de ${nombre || "un usuario anónimo"} vía Alia`;
      
    const subject = encodeURIComponent(finalSubject);
    const body = encodeURIComponent(
      `Hola,\n\nMi nombre es ${nombre}.\n\n${mensaje}\n\n---\nEnviado a través del directorio de Alia.`
    );

    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self");
  };

  return (
    <div className="py-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-stretch">

        {/* Left Column: Form */}
        <Card className="rounded-3xl py-0 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border-border/50 h-full flex flex-col">
          <CardHeader className="px-8 md:px-10 pt-8 md:pt-10 pb-0">
            <CardTitle className="text-2xl font-bold font-headline text-foreground leading-tight">
              Envíanos un mensaje
            </CardTitle>
            <p className="text-muted-foreground font-medium text-sm mt-1">
              Al enviar, se abrirá tu correo con el mensaje listo para enviar.
            </p>
          </CardHeader>

          <CardContent className="px-8 md:px-10 pb-8 md:pb-10 pt-6 flex-1 flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">
                    NOMBRE
                  </Label>
                  <Input
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="bg-muted/50 border-transparent h-14 rounded-2xl px-5 focus-visible:ring-ds-primary shadow-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">
                    ASUNTO
                  </Label>
                  <Input
                    type="text"
                    placeholder="Ej. Voluntariado, Donativos..."
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                    required
                    className="bg-muted/50 border-transparent h-14 rounded-2xl px-5 focus-visible:ring-ds-primary shadow-none"
                  />
                </div>
              </div>

              <div className="space-y-2 flex-1 flex flex-col">
                <Label className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest ml-1">
                  MENSAJE
                </Label>
                <Textarea
                  placeholder="¿Cómo podemos ayudarte?"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                  className="bg-muted/50 border-transparent flex-1 resize-none rounded-2xl p-5 focus-visible:ring-ds-primary shadow-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-14 bg-[#1e4a23] hover:bg-[#153418] text-white rounded-2xl font-bold text-base shadow-md transition-all gap-2"
              >
                <Send className="size-4" />
                Enviar Mensaje
              </Button>
            </form>
          </CardContent>
        </Card>


        {/* Right Column: Info & Map */}
        <div className="space-y-6">

          {/* Map Card — clickable if googleMapsUrl is set */}
          {googleMapsUrl ? (
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block group/map">
              <MapCardInner location={location} />
            </a>
          ) : (
            <MapCardInner location={location} />
          )}

          {/* Office Hours & Contact Info Card */}
          <Card className="rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border-border/50 py-0">
            <CardContent className="px-8 py-8">
              {/* Office Hours */}
              <div className="flex items-center mb-6">
                <Clock className="size-5 text-[#b94a1d] dark:text-orange-400 mr-2.5 shrink-0" />
                <CardTitle className="font-bold text-foreground font-headline text-lg tracking-tight">
                  Horarios de Oficina
                </CardTitle>
              </div>
              <div className="space-y-3">
                {officeHours ? (
                  Object.entries(DAY_LABELS).map(([key, label]) => {
                    const dayData = officeHours[key];
                    return (
                      <div key={key} className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground font-medium">{label}</span>
                        {dayData ? (
                          <span className="font-bold text-foreground">{dayData.open} - {dayData.close}</span>
                        ) : (
                          <span className="font-bold text-muted-foreground opacity-60">Cerrado</span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground">Horarios no disponibles</p>
                )}
              </div>

              <Separator className="my-6 opacity-60" />

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mr-4 shrink-0">
                    <Mail className="size-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">EMAIL</p>
                    <p className="text-sm font-bold text-foreground truncate">{email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center mr-4 shrink-0">
                    <Phone className="size-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground mb-1">TELÉFONO</p>
                    <p className="text-sm font-bold text-foreground">{phone || "+52 55 1234 5678"}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}

// Extracted to avoid duplicating the map markup for clickable vs non-clickable variants
function MapCardInner({ location }: { location?: string }) {
  return (
    <Card className="rounded-3xl py-3 px-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border-border/50 transition-all duration-300 group-hover/map:shadow-[0_12px_40px_rgb(0,0,0,0.10)] dark:group-hover/map:shadow-[0_12px_40px_rgb(0,0,0,0.35)] group-hover/map:-translate-y-1">
      <div className="relative w-full h-55 bg-zinc-300 dark:bg-zinc-800 rounded-2xl overflow-hidden flex flex-col justify-end p-4">
        {/* Map Background Pattern (Simulated) */}
        <div className="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 2px, transparent 2px)', backgroundSize: '24px 24px' }} />
        <div className="absolute inset-0 opacity-10 dark:opacity-5 pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '60px 60px', backgroundPosition: '0 0, 30px 30px' }} />

        {/* Map Pin / Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-4">
          <div className="w-12 h-12 bg-[#1e4a23] rounded-full flex items-center justify-center border-4 border-white dark:border-zinc-900 shadow-xl relative z-10">
            <div className="w-2.5 h-2.5 bg-white rounded-full" />
          </div>
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-2 bg-black/40 blur-[2px] rounded-full" />
        </div>

        {/* Decorative secondary pins */}
        <div className="absolute top-[30%] right-[20%] w-6 h-6 bg-white/40 rounded-full flex items-center justify-center border-2 border-white/60">
          <MapPin className="size-3 text-white" />
        </div>
        <div className="absolute bottom-[40%] left-[20%] w-5 h-5 bg-white/40 rounded-full flex items-center justify-center border border-white/60">
          <MapPin className="size-2 text-white" />
        </div>

        {/* Location Pill */}
        <div className="relative bg-white dark:bg-zinc-900 rounded-xl py-3 px-4 flex items-center shadow-lg w-full z-20">
          <Navigation className="size-4 text-[#1e4a23] dark:text-ds-primary-fixed mr-3 shrink-0 fill-current" />
          <span className="text-sm font-bold text-zinc-900 dark:text-white truncate">
            {location || "Ciudad de México"}
          </span>
        </div>
      </div>
    </Card>
  );
}

