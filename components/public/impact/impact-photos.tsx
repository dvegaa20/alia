'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, Clock, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.45, ease: 'easeOut' as const, delay },
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
  const duplicatedPhotos = [...PHOTO_ITEMS, ...PHOTO_ITEMS]

  return (
    <section className="w-full py-20 lg:py-24 bg-background overflow-hidden relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <motion.div {...fadeUp()} className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary font-mono text-xs uppercase tracking-[0.04em] font-medium">
            <Sparkles className="size-3.5" strokeWidth={1.5} />
            <span>Comunidad en acción</span>
          </div>
          <h2 className="font-sans font-medium text-3xl sm:text-4xl lg:text-[42px] leading-[1.15] tracking-[-0.025em] text-foreground max-w-3xl mx-auto">
            El impacto que cobra <span className="text-primary">vida</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-foreground-secondary max-w-2xl mx-auto leading-[1.6]">
            Detrás de cada cifra hay personas, organizaciones y comunidades sumando voluntades todos
            los días en México.
          </p>
        </motion.div>
      </div>

      {/* Marquee Carousel Container */}
      <motion.div {...fadeUp(0.1)} className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 md:w-40 z-10 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 md:w-40 z-10 bg-gradient-to-l from-background via-background/80 to-transparent" />

        <div className="animate-marquee flex gap-5 py-2 cursor-grab active:cursor-grabbing hover:[animation-play-state:paused]">
          {duplicatedPhotos.map((photo, index) => (
            <div
              key={`${photo.src}-${index}`}
              className="group relative shrink-0 w-[290px] sm:w-[360px] md:w-[420px] aspect-[16/11] rounded-2xl overflow-hidden border border-border bg-surface transition-colors duration-200 hover:border-rock-blue"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 290px, (max-width: 1024px) 360px, 420px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/5" />

              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-black/50 backdrop-blur-md text-merino border-white/15 font-mono text-[10px] uppercase tracking-[0.04em] font-medium px-2.5 py-0.5 rounded-full">
                  {photo.tag}
                </Badge>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 flex flex-col gap-1 text-white">
                <h3 className="font-sans font-semibold text-lg leading-snug">{photo.title}</h3>
                <div className="flex items-center gap-1.5 text-xs text-merino/85 font-sans">
                  <MapPin className="size-3.5 text-rock-blue shrink-0" strokeWidth={1.5} />
                  <span>{photo.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Last updated footer */}
      {lastUpdated && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-10 flex justify-center">
          <div className="flex items-center justify-center gap-2 text-xs text-foreground-muted pt-4 border-t border-border w-full max-w-xl text-center">
            <Clock className="size-3.5 shrink-0 text-primary" strokeWidth={1.5} />
            <span className="font-mono">
              Última actualización de datos: {formatDate(lastUpdated)}
            </span>
          </div>
        </div>
      )}
    </section>
  )
}
