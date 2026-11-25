'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BadgeCheck, MapPin, ArrowRight } from 'lucide-react'
import { Map, MapMarker, MarkerContent, MapPopup, MapControls, useMap } from '@/components/ui/map'
import { Badge } from '@/components/ui/badge'
import type { MapPoint, MapViewProps } from '@/types'

export type { MapPoint }

function MapBoundsController({ mapPoints }: { mapPoints: MapPoint[] }) {
  const { map, isLoaded } = useMap()

  useEffect(() => {
    if (!map) return
    map.resize()
  }, [map])

  useEffect(() => {
    if (!map || !isLoaded || mapPoints.length === 0) return

    if (mapPoints.length === 1) {
      map.flyTo({
        center: mapPoints[0].coordinates,
        zoom: 12,
        duration: 900,
      })
      return
    }

    let minLng = Infinity,
      minLat = Infinity,
      maxLng = -Infinity,
      maxLat = -Infinity

    for (const point of mapPoints) {
      const [lng, lat] = point.coordinates
      if (lng < minLng) minLng = lng
      if (lat < minLat) minLat = lat
      if (lng > maxLng) maxLng = lng
      if (lat > maxLat) maxLat = lat
    }

    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding: { top: 60, bottom: 60, left: 60, right: 60 },
        maxZoom: 14,
        duration: 900,
      }
    )
  }, [map, isLoaded, mapPoints])

  return null
}

export function MapView({ mapPoints }: MapViewProps) {
  const mexicoCenter: [number, number] = [-102.5528, 23.6345]
  const [selectedOrg, setSelectedOrg] = useState<MapPoint | null>(null)

  const handleClosePopup = useCallback(() => setSelectedOrg(null), [])

  return (
    <div className="relative h-[540px] w-full overflow-hidden rounded-2xl border border-[#DFD5C0] bg-[#FAF7F0]">
      <Map center={mexicoCenter} zoom={5} className="h-full w-full">
        <MapControls position="bottom-right" showZoom showCompass showLocate showFullscreen />
        <MapBoundsController mapPoints={mapPoints} />

        {mapPoints.map((point) => (
          <MapMarker
            key={point.slug}
            longitude={point.coordinates[0]}
            latitude={point.coordinates[1]}
            onClick={(e) => {
              e.stopPropagation()
              setSelectedOrg(point)
            }}
          >
            <MarkerContent>
              <button
                type="button"
                aria-label={`Ver ${point.name}`}
                className="size-8 rounded-full bg-[#16587B] text-white border-2 border-[#FAF7F0] flex items-center justify-center transition-transform duration-200 hover:scale-110 cursor-pointer"
              >
                <MapPin className="size-4" strokeWidth={1.75} />
              </button>
            </MarkerContent>
          </MapMarker>
        ))}

        {selectedOrg && (
          <MapPopup
            longitude={selectedOrg.coordinates[0]}
            latitude={selectedOrg.coordinates[1]}
            onClose={handleClosePopup}
            closeOnClick={false}
            focusAfterOpen={false}
            offset={16}
            closeButton
            className="p-0 border-none bg-transparent shadow-none"
          >
            <Link
              href={`/directory/${selectedOrg.slug}`}
              className="block w-68 bg-surface rounded-[20px] border border-border overflow-hidden transition-colors hover:border-rock-blue group"
            >
              <div className="flex items-start gap-3 p-4 pb-3">
                <div className="size-10 rounded-xl border border-border bg-background flex items-center justify-center p-1 shrink-0 overflow-hidden">
                  {selectedOrg.logoImage ? (
                    <Image
                      src={selectedOrg.logoImage}
                      alt={selectedOrg.name}
                      width={32}
                      height={32}
                      className="object-contain rounded-lg size-full"
                    />
                  ) : (
                    <span className="font-sans font-semibold text-xs text-primary">
                      {selectedOrg.name.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-sans font-semibold text-sm text-foreground truncate leading-tight">
                      {selectedOrg.name}
                    </h4>
                    {selectedOrg.verified && (
                      <BadgeCheck
                        className="size-3.5 text-verified-emerald shrink-0"
                        strokeWidth={1.75}
                      />
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {selectedOrg.categories.slice(0, 2).map((cat) => (
                      <Badge
                        key={cat}
                        className="bg-background text-foreground-muted border border-border px-2 py-0 rounded-full font-mono text-[9px] font-medium uppercase tracking-[0.04em] h-auto"
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-4 pb-3 pt-2.5 border-t border-border flex items-center justify-between gap-2">
                <div className="flex items-center text-foreground-muted text-[11px] min-w-0">
                  <MapPin className="size-3 mr-1 shrink-0 text-primary" strokeWidth={1.5} />
                  <span className="truncate">{selectedOrg.location}</span>
                </div>
                <span className="text-primary font-medium text-xs inline-flex items-center gap-0.5 shrink-0 group-hover:underline underline-offset-2">
                  Ver perfil
                  <ArrowRight className="size-3" strokeWidth={1.5} />
                </span>
              </div>
            </Link>
          </MapPopup>
        )}
      </Map>

      {mapPoints.length === 0 && (
        <div className="pointer-events-none absolute top-4 left-4 z-10 rounded-full border border-border bg-surface/95 backdrop-blur-md px-4 py-1.5 font-mono text-xs text-foreground-muted">
          Sin ubicaciones georreferenciadas para este filtro.
        </div>
      )}
    </div>
  )
}
