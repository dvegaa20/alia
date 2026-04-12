"use client";

import { useEffect, useState, useId, useMemo, useCallback } from "react";
import { Map, MapPopup, MapControls, useMap } from "@/components/ui/map";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeCheck, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import type { MapPoint, MapViewProps } from '@/types'
export type { MapPoint }

type SelectedOrg = MapPoint

// Convert MapPoints to GeoJSON FeatureCollection
function toGeoJSON(points: MapPoint[]): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: points.map((point) => ({
      type: "Feature" as const,
      properties: {
        slug: point.slug,
        name: point.name,
        category: point.category,
        location: point.location,
        logoImage: point.logoImage,
        verified: point.verified,
      },
      geometry: {
        type: "Point" as const,
        coordinates: point.coordinates,
      },
    })),
  };
}

function OrganizationsLayer({ mapPoints }: { mapPoints: MapPoint[] }) {
  const { map, isLoaded } = useMap();
  const id = useId();
  const sourceId = `orgs-source-${id}`;
  const layerId = `orgs-layer-${id}`;
  const [selectedOrg, setSelectedOrg] = useState<SelectedOrg | null>(null);

  const geojsonData = useMemo(() => toGeoJSON(mapPoints), [mapPoints]);

  // Auto-fit bounds when points change
  useEffect(() => {
    if (!map || !isLoaded || mapPoints.length === 0) return;

    if (mapPoints.length === 1) {
      map.flyTo({
        center: mapPoints[0].coordinates,
        zoom: 12,
        duration: 1000,
      });
      return;
    }

    // Calculate bounding box
    let minLng = Infinity,
      minLat = Infinity,
      maxLng = -Infinity,
      maxLat = -Infinity;

    for (const point of mapPoints) {
      const [lng, lat] = point.coordinates;
      if (lng < minLng) minLng = lng;
      if (lat < minLat) minLat = lat;
      if (lng > maxLng) maxLng = lng;
      if (lat > maxLat) maxLat = lat;
    }

    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      {
        padding: { top: 60, bottom: 60, left: 60, right: 60 },
        maxZoom: 14,
        duration: 1000,
      }
    );
  }, [map, isLoaded, mapPoints]);

  // Add GeoJSON source + circle layer
  useEffect(() => {
    if (!map || !isLoaded) return;

    map.addSource(sourceId, {
      type: "geojson",
      data: geojsonData,
    });

    map.addLayer({
      id: layerId,
      type: "circle",
      source: sourceId,
      paint: {
        "circle-radius": 8,
        "circle-color": "#16a34a", // Primary green — matches your design system
        "circle-stroke-width": 3,
        "circle-stroke-color": "#ffffff",
        "circle-opacity": 0.9,
      },
    });

    // Click handler
    const handleClick = (
      e: maplibregl.MapMouseEvent & {
        features?: maplibregl.MapGeoJSONFeature[];
      }
    ) => {
      if (!e.features?.length) return;

      const feature = e.features[0];
      const coords = (feature.geometry as GeoJSON.Point).coordinates as [
        number,
        number,
      ];

      setSelectedOrg({
        slug: feature.properties?.slug,
        name: feature.properties?.name,
        category: feature.properties?.category,
        location: feature.properties?.location,
        coordinates: coords,
        logoImage: feature.properties?.logoImage,
        verified: feature.properties?.verified === true || feature.properties?.verified === "true",
      });
    };

    const handleMouseEnter = () => {
      map.getCanvas().style.cursor = "pointer";
    };

    const handleMouseLeave = () => {
      map.getCanvas().style.cursor = "";
    };

    map.on("click", layerId, handleClick);
    map.on("mouseenter", layerId, handleMouseEnter);
    map.on("mouseleave", layerId, handleMouseLeave);

    return () => {
      map.off("click", layerId, handleClick);
      map.off("mouseenter", layerId, handleMouseEnter);
      map.off("mouseleave", layerId, handleMouseLeave);

      try {
        if (map.getLayer(layerId)) map.removeLayer(layerId);
        if (map.getSource(sourceId)) map.removeSource(sourceId);
      } catch {
        // ignore cleanup errors
      }
    };
  }, [map, isLoaded, sourceId, layerId, geojsonData]);

  const handleClosePopup = useCallback(() => setSelectedOrg(null), []);

  return (
    <>
      {selectedOrg && (
        <MapPopup
          longitude={selectedOrg.coordinates[0]}
          latitude={selectedOrg.coordinates[1]}
          onClose={handleClosePopup}
          closeOnClick={false}
          focusAfterOpen={false}
          offset={14}
          closeButton
          className="p-0 border-none bg-transparent shadow-none"
        >
          <Link
            href={`/directory/${selectedOrg.slug}`}
            className="block w-64 bg-popover rounded-xl border border-border/50 overflow-hidden shadow-lg transition-all hover:shadow-xl group"
          >
            {/* Header with logo + verified */}
            <div className="flex items-start gap-3 p-4 pb-3">
              <div className="w-10 h-10 bg-transparent rounded-lg border border-border/50 flex items-center justify-center p-1 shrink-0">
                <Image
                  src={selectedOrg.logoImage}
                  alt={selectedOrg.name}
                  width={32}
                  height={32}
                  className="object-contain rounded"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-foreground truncate font-headline leading-tight">
                    {selectedOrg.name}
                  </h4>
                  {selectedOrg.verified && (
                    <BadgeCheck className="size-3.5 text-primary dark:text-ds-primary-fixed shrink-0" />
                  )}
                </div>
                <Badge className="mt-1 bg-secondary text-secondary-foreground border-none px-2 py-0 rounded-full text-[10px] font-bold tracking-tight h-auto">
                  {selectedOrg.category}
                </Badge>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 pb-3 pt-2 border-t border-border/30 flex items-center justify-between">
              <div className="flex items-center text-muted-foreground text-[11px] font-medium">
                <MapPin className="size-3 mr-1 shrink-0" />
                <span className="truncate max-w-32">{selectedOrg.location}</span>
              </div>
              <span className="text-primary dark:text-ds-primary-fixed font-bold text-[10px] uppercase tracking-wider flex items-center group-hover:underline underline-offset-2">
                Ver perfil <ArrowRight className="size-2.5 ml-0.5" />
              </span>
            </div>
          </Link>
        </MapPopup>
      )}
    </>
  );
}

export function MapView({ total, mapPoints }: MapViewProps) {
  // Default center: Mexico
  const mexicoCenter: [number, number] = [-102.5528, 23.6345];

  return (
    <Card className="h-125 p-0 overflow-hidden w-full rounded-3xl border-border/30 shadow-none">
      <Map center={mexicoCenter} zoom={5}>
        <MapControls
          position="bottom-right"
          showZoom
          showCompass
          showLocate
          showFullscreen
        />
        {mapPoints.length > 0 && <OrganizationsLayer mapPoints={mapPoints} />}
      </Map>
    </Card>
  );
}
