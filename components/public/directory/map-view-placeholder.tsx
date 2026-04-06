"use client";

import { MapPin, Compass } from "lucide-react";

interface MapViewPlaceholderProps {
  total: number;
}

export function MapViewPlaceholder({ total }: MapViewPlaceholderProps) {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[500px] rounded-2xl border border-dashed border-border/70 bg-muted/20 overflow-hidden">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="map-grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
        </svg>
      </div>

      {/* Decorative floating pins */}
      <div className="absolute top-12 left-16 text-primary/20 dark:text-ds-primary-fixed/20 animate-pulse">
        <MapPin className="size-6" />
      </div>
      <div className="absolute top-24 right-24 text-primary/15 dark:text-ds-primary-fixed/15 animate-pulse delay-300">
        <MapPin className="size-5" />
      </div>
      <div className="absolute bottom-20 left-1/4 text-primary/10 dark:text-ds-primary-fixed/10 animate-pulse delay-700">
        <MapPin className="size-4" />
      </div>
      <div className="absolute bottom-32 right-1/3 text-primary/20 dark:text-ds-primary-fixed/20 animate-pulse delay-500">
        <MapPin className="size-5" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 dark:bg-ds-primary-fixed/10 flex items-center justify-center mb-6">
          <Compass className="size-10 text-primary dark:text-ds-primary-fixed" />
        </div>
        <h3 className="text-2xl font-bold text-foreground font-headline mb-2">
          Vista de mapa
        </h3>
        <p className="text-muted-foreground font-medium max-w-md mb-4">
          Próximamente podrás explorar las{" "}
          <span className="text-primary dark:text-ds-primary-fixed font-bold">
            {total}
          </span>{" "}
          organizaciones en un mapa interactivo.
        </p>
        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground/70 bg-muted/50 px-4 py-2 rounded-full">
          <div className="size-2 rounded-full bg-amber-400 animate-pulse" />
          En desarrollo
        </div>
      </div>
    </div>
  );
}
