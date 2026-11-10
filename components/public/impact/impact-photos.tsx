'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Clock, Pause, Play, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.5, ease: 'easeOut' as const, delay },
})

function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleString('es-MX', {
    dateStyle: 'long',
    timeStyle: 'short',
  })
}

const PHOTO_ITEMS = [
  {
    src: '/images/landscape1.jpg',
    alt: 'Educación y aprendizaje comunitario',
    tag: 'Educación',
    title: 'Aulas abiertas para todos',
    location: 'Oaxaca, México',
  },
  {
    src: '/images/landscape2.jpg',
    alt: 'Colaboración y trabajo comunitario',
    tag: 'Comunidad',
    title: 'Trabajo colectivo en acción',
    location: 'Chiapas, México',
  },
  {
    src: '/images/landscape3.jpg',
    alt: 'Cuidado del medio ambiente y reforestación',
    tag: 'Medio Ambiente',
    title: 'Conservación y reforestación',
    location: 'Michoacán, México',
  },
  {
    src: '/images/landscape4.jpg',
    alt: 'Alimentación y bienestar para familias',
    tag: 'Nutrición',
    title: 'Alimentación y esperanza',
    location: 'Puebla, México',
  },
  {
    src: '/images/landscape5.jpg',
    alt: 'Jóvenes en voluntariado social',
    tag: 'Voluntariado',
    title: 'Jóvenes transformando su entorno',
    location: 'Ciudad de México',
  },
  {
    src: '/images/vertical1.jpg',
    alt: 'Inclusión social y oportunidades',
    tag: 'Inclusión',
    title: 'Oportunidades que cambian vidas',
    location: 'Jalisco, México',
  },
  {
    src: '/images/vertical2.jpg',
    alt: 'Desarrollo cultural y raíces',
    tag: 'Cultura y Raíces',
    title: 'Preservando nuestras tradiciones',
    location: 'Yucatán, México',
  },
  {
    src: '/images/vertical3.jpg',
    alt: 'Solidaridad en el territorio',
    tag: 'Acción Social',
    title: 'Solidaridad sin fronteras',
    location: 'Veracruz, México',
  },
]

interface ImpactPhotosProps {
  lastUpdated?: string
}

export function ImpactPhotos({ lastUpdated }: ImpactPhotosProps) {
  // Duplicate items to create a seamless infinite loop
  const duplicatedPhotos = [...PHOTO_ITEMS, ...PHOTO_ITEMS]

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="max-w-400 mx-auto px-4 sm:px-8 mb-12">
        {/* Section Header */}
        <motion.div {...fadeUp()} className="text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-label uppercase tracking-widest font-bold mb-3">
            <Sparkles className="size-3.5" />
            <span>Comunidad en Acción</span>
          </div>
          <h2 className="font-headline font-bold text-4xl md:text-5xl text-foreground leading-tight max-w-3xl mx-auto mb-4">
            El impacto que cobra <span className="text-primary italic">vida</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Detrás de cada cifra hay personas, organizaciones y comunidades sumando voluntades todos
            los días en cada rincón de México.
          </p>
          <div className="mt-5 w-16 h-1 bg-primary/30 rounded-full mx-auto" />
        </motion.div>
      </div>

      {/* Marquee Carousel Container */}
      <motion.div {...fadeUp(0.15)} className="relative w-full overflow-hidden">
        {/* Gradient fades on left and right edges */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 md:w-44 z-10 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 md:w-44 z-10 bg-gradient-to-l from-background via-background/80 to-transparent" />

        {/* Scrolling track */}
        <div className="animate-marquee flex gap-5 py-3 cursor-grab active:cursor-grabbing hover:[animation-play-state:paused]">
          {duplicatedPhotos.map((photo, index) => (
            <div
              key={`${photo.src}-${index}`}
              className="group relative shrink-0 w-[290px] sm:w-[360px] md:w-[420px] aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden border border-border/50 bg-card shadow-sm hover:shadow-xl transition-all duration-500"
            >
              {/* Photo */}
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 290px, (max-width: 1024px) 360px, 420px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5 group-hover:from-black/85 transition-colors duration-300" />

              {/* Top Tag Badge */}
              <div className="absolute top-4 left-4 z-10">
                <Badge
                  variant="secondary"
                  className="bg-black/40 backdrop-blur-md text-white border-white/15 text-[11px] font-label font-medium px-2.5 py-0.5 rounded-full shadow-xs"
                >
                  {photo.tag}
                </Badge>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 flex flex-col gap-1.5 text-white">
                <h3 className="font-headline font-bold text-lg sm:text-xl leading-snug drop-shadow-xs">
                  {photo.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-white/80 font-body">
                  <MapPin className="size-3.5 text-primary-300 shrink-0" />
                  <span>{photo.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Controls & Footer Info */}
      <div className="max-w-400 mx-auto px-4 sm:px-8 mt-8 flex flex-col items-center gap-6">
        {/* Optional Last updated footer */}
        {lastUpdated && (
          <motion.div
            {...fadeUp(0.2)}
            className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-4 border-t border-border/40 w-full max-w-xl text-center"
          >
            <Clock className="size-3.5 shrink-0" />
            <span className="font-label">
              Última actualización de datos: {formatDate(lastUpdated)}
            </span>
          </motion.div>
        )}
      </div>
    </section>
  )
}
