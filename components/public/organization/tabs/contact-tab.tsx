'use client'

import { useState } from 'react'
import { MapPin, Clock, Mail, Phone, Navigation, Send, User, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MapControls,
  MapRoute,
} from '@/components/ui/map'

import type { ContactTabProps } from '@/types'

const DAY_LABELS: Record<string, string> = {
  monday: 'Lunes',
  tuesday: 'Martes',
  wednesday: 'Miércoles',
  thursday: 'Jueves',
  friday: 'Viernes',
  saturday: 'Sábado',
  sunday: 'Domingo',
}

export function ContactTab({
  email,
  phone,
  whatsapp,
  address,
  location,
  googleMapsUrl,
  coordinates,
  officeHours,
}: ContactTabProps) {
  const [nombre, setNombre] = useState('')
  const [asunto, setAsunto] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const finalSubject = asunto
      ? `${asunto} (vía Alia)`
      : `Mensaje de ${nombre || 'un ciudadano'} vía Alia`

    const subject = encodeURIComponent(finalSubject)
    const body = encodeURIComponent(
      `Hola,\n\nMi nombre es ${nombre}.\n\n${mensaje}\n\n---\nEnviado a través del directorio de Alia.`
    )

    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_self')
  }

  return (
    <div className="py-2 animate-in fade-in slide-in-from-bottom-4 duration-400">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 items-stretch">
        {/* Left Column: Form */}
        <Card className="rounded-[20px] py-0 overflow-hidden border border-border bg-surface h-full flex flex-col">
          <CardHeader className="px-6 sm:px-8 pt-8 pb-0">
            <CardTitle className="font-sans text-2xl font-semibold text-foreground leading-tight">
              Envíanos un mensaje
            </CardTitle>
            <p className="font-sans text-foreground-secondary text-sm mt-1">
              Al enviar, se abrirá tu aplicación de correo con el mensaje listo.
            </p>
          </CardHeader>

          <CardContent className="px-6 sm:px-8 pb-8 pt-6 flex-1 flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="font-mono text-[11px] font-medium text-foreground-muted uppercase tracking-[0.04em]">
                    Nombre
                  </Label>
                  <Input
                    placeholder="Tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                    className="h-12 rounded-[4px] border border-[#DFD5C0] bg-[#F5EEDD]/60 px-4 focus-visible:border-[#16587B] focus-visible:ring-[#16587B]/30 shadow-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="font-mono text-[11px] font-medium text-foreground-muted uppercase tracking-[0.04em]">
                    Asunto
                  </Label>
                  <Input
                    type="text"
                    placeholder="Ej. Voluntariado, Donativos..."
                    value={asunto}
                    onChange={(e) => setAsunto(e.target.value)}
                    required
                    className="h-12 rounded-[4px] border border-[#DFD5C0] bg-[#F5EEDD]/60 px-4 focus-visible:border-[#16587B] focus-visible:ring-[#16587B]/30 shadow-none"
                  />
                </div>
              </div>

              <div className="space-y-2 flex-1 flex flex-col">
                <Label className="font-mono text-[11px] font-medium text-foreground-muted uppercase tracking-[0.04em]">
                  Mensaje
                </Label>
                <Textarea
                  placeholder="¿Cómo podemos ayudarte?"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  required
                  className="min-h-[150px] flex-1 resize-none rounded-[4px] border border-[#DFD5C0] bg-[#F5EEDD]/60 p-4 focus-visible:border-[#16587B] focus-visible:ring-[#16587B]/30 shadow-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary-hover text-primary-foreground rounded-full font-sans font-medium text-[15px] transition-colors gap-2"
              >
                <Send className="size-4" strokeWidth={1.5} />
                Enviar mensaje
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right Column: Map & Info */}
        <div className="space-y-6">
          {coordinates?.lat && coordinates?.lng ? (
            <InteractiveMapCard
              location={location || undefined}
              coordinates={{ lat: coordinates.lat, lng: coordinates.lng }}
              googleMapsUrl={googleMapsUrl}
            />
          ) : googleMapsUrl ? (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block group/map"
            >
              <MapCardInner location={location || undefined} />
            </a>
          ) : (
            <MapCardInner location={location || undefined} />
          )}

          {/* Office Hours & Contact Info Card */}
          <Card className="rounded-[20px] border border-border bg-surface py-0">
            <CardContent className="px-6 sm:px-8 py-7">
              <div className="flex items-center mb-5 gap-2.5">
                <Clock className="size-4 text-primary shrink-0" strokeWidth={1.5} />
                <CardTitle className="font-sans font-semibold text-foreground text-lg">
                  Horarios de oficina
                </CardTitle>
              </div>
              <div className="space-y-2.5">
                {officeHours ? (
                  Object.entries(DAY_LABELS).map(([key, label]) => {
                    const dayData = officeHours[key]
                    return (
                      <div key={key} className="flex justify-between items-center text-sm">
                        <span className="text-foreground-secondary font-sans">{label}</span>
                        {dayData ? (
                          <span className="font-mono text-xs font-medium tabular-nums text-foreground">
                            {dayData.open} - {dayData.close}
                          </span>
                        ) : (
                          <span className="font-mono text-xs text-foreground-muted">Cerrado</span>
                        )}
                      </div>
                    )
                  })
                ) : (
                  <p className="text-sm text-foreground-muted">Horarios no disponibles</p>
                )}
              </div>

              <Separator className="my-6 bg-border" />

              {/* Contact Info */}
              <div className="space-y-5">
                {address && (
                  <div className="flex items-start gap-3.5">
                    <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="size-4" strokeWidth={1.5} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-mono text-[10px] uppercase tracking-[0.04em] font-medium text-foreground-muted mb-1">
                        Dirección física
                      </p>
                      <p className="font-sans text-sm font-medium text-foreground leading-snug">
                        {address}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3.5">
                  <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Mail className="size-4" strokeWidth={1.5} />
                  </div>
                  <div className="overflow-hidden">
                    <p className="font-mono text-[10px] uppercase tracking-[0.04em] font-medium text-foreground-muted mb-1">
                      Correo electrónico
                    </p>
                    <p className="font-sans text-sm font-medium text-foreground truncate">
                      {email}
                    </p>
                  </div>
                </div>

                {phone && (
                  <div className="flex items-center gap-3.5">
                    <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <Phone className="size-4" strokeWidth={1.5} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-mono text-[10px] uppercase tracking-[0.04em] font-medium text-foreground-muted mb-1">
                        Teléfono
                      </p>
                      <p className="font-mono text-sm font-medium tabular-nums text-foreground">
                        {phone}
                      </p>
                    </div>
                  </div>
                )}

                {whatsapp && (
                  <a
                    href={`https://wa.me/${whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3.5 group/wa p-3 -mx-3 rounded-2xl hover:bg-verified-emerald/10 transition-colors"
                  >
                    <div className="size-10 rounded-full bg-verified-emerald/12 text-verified-emerald flex items-center justify-center shrink-0">
                      <MessageCircle className="size-4" strokeWidth={1.5} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="font-mono text-[10px] uppercase tracking-[0.04em] font-medium text-verified-emerald mb-1">
                        WhatsApp directo
                      </p>
                      <p className="font-mono text-sm font-medium tabular-nums text-foreground group-hover/wa:underline">
                        {whatsapp}
                      </p>
                    </div>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

function MapCardInner({ location }: { location?: string }) {
  return (
    <Card className="rounded-2xl p-2 border border-border bg-surface transition-colors duration-200 group-hover/map:border-rock-blue">
      <div className="relative w-full h-56 bg-surface-subtle rounded-xl overflow-hidden border border-border flex flex-col justify-end p-4">
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, var(--primary) 1.5px, transparent 1.5px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Map Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -mt-4">
          <div className="size-7 bg-[#16587B] rounded-full flex items-center justify-center border-[3px] border-[#FAF7F0] relative z-10">
            <div className="size-2 bg-[#FAF7F0] rounded-full" />
          </div>
        </div>

        {/* Location Pill */}
        <div className="relative bg-surface rounded-full border border-border py-2.5 px-4 flex items-center w-full z-20">
          <Navigation className="size-4 text-primary mr-2.5 shrink-0" strokeWidth={1.5} />
          <span className="text-sm font-medium text-foreground truncate">
            {location || 'México'}
          </span>
        </div>
      </div>
    </Card>
  )
}

function InteractiveMapCard({
  location,
  coordinates,
  googleMapsUrl,
}: {
  location?: string
  coordinates: { lat: number; lng: number }
  googleMapsUrl?: string | null
}) {
  const [userLocation, setUserLocation] = useState<{ longitude: number; latitude: number } | null>(
    null
  )
  const [routeCoords, setRouteCoords] = useState<[number, number][] | null>(null)

  const fetchRoute = async (userLon: number, userLat: number) => {
    try {
      const res = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${userLon},${userLat};${coordinates.lng},${coordinates.lat}?geometries=geojson`
      )
      const data = await res.json()
      if (data.routes && data.routes[0]) {
        setRouteCoords(data.routes[0].geometry.coordinates)
      }
    } catch (error) {
      console.error('Failed to fetch route', error)
    }
  }

  const handleLocate = (coords: { longitude: number; latitude: number }) => {
    setUserLocation(coords)
    fetchRoute(coords.longitude, coords.latitude)
  }

  return (
    <Card className="rounded-2xl p-2 border border-border bg-surface">
      <div className="relative w-full h-[280px] rounded-xl overflow-hidden border border-border bg-surface-subtle group">
        <Map
          viewport={{
            center: [coordinates.lng, coordinates.lat],
            zoom: 14,
          }}
          className="h-full w-full"
        >
          {/* Org Marker */}
          <MapMarker longitude={coordinates.lng} latitude={coordinates.lat} offset={[0, -12]}>
            <MarkerContent>
              <div className="size-7 bg-[#16587B] rounded-full flex items-center justify-center border-[3px] border-[#FAF7F0] relative z-10 transition-transform group-hover:scale-110 cursor-pointer">
                <div className="size-2 bg-[#FAF7F0] rounded-full" />
              </div>
            </MarkerContent>
            <MarkerPopup className="text-sm font-medium w-48 text-center p-3 rounded-2xl border border-border bg-surface text-foreground">
              <p className="font-sans font-medium">{location || 'Organización'}</p>
              {googleMapsUrl && (
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary mt-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.04em] hover:underline"
                >
                  Ver indicaciones →
                </a>
              )}
            </MarkerPopup>
          </MapMarker>

          {/* User Marker */}
          {userLocation && (
            <MapMarker
              longitude={userLocation.longitude}
              latitude={userLocation.latitude}
              offset={[0, -12]}
            >
              <MarkerContent>
                <div className="size-6 bg-deep-harbor rounded-full flex items-center justify-center border-2 border-white text-white relative z-10 cursor-pointer">
                  <User className="size-3.5" strokeWidth={1.5} />
                </div>
              </MarkerContent>
              <MarkerPopup className="text-xs p-2 text-foreground font-medium whitespace-nowrap text-center border border-border bg-surface rounded-xl">
                Tu ubicación
              </MarkerPopup>
            </MapMarker>
          )}

          {/* Route */}
          {routeCoords && (
            <MapRoute
              coordinates={routeCoords}
              color="#16587B"
              width={4}
              opacity={0.8}
              dashArray={[2, 2]}
            />
          )}

          <MapControls position="bottom-right" showZoom showLocate onLocate={handleLocate} />
        </Map>

        <div className="absolute top-3 left-3 z-20 pointer-events-none">
          <div className="bg-surface/95 backdrop-blur-md border border-border rounded-full py-1.5 px-3 flex items-center">
            <Navigation className="size-3 text-primary mr-1.5 shrink-0" strokeWidth={1.5} />
            <span className="text-xs font-medium text-foreground truncate select-none">
              {location || 'México'}
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
