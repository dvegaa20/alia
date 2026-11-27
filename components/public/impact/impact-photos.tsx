'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Clock, Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const PHOTO_ITEMS = [
  {
    src: '/images/landscape1.jpg',
    alt: 'Voluntarios recolectando plásticos y residuos en la orilla de un lago',
    tag: 'Medio Ambiente',
    title: 'Limpieza de cuerpos de agua',
  },
  {
    src: '/images/landscape2.jpg',
    alt: 'Voluntarios entregando agua y víveres en jornada comunitaria',
    tag: 'Asistencia Social',
    title: 'Entrega directa de ayuda',
  },
  {
    src: '/images/landscape3.jpg',
    alt: 'Voluntarios entregando despensas a familias',
    tag: 'Alimentación',
    title: 'Despensas que llegan a tiempo',
  },
  {
    src: '/images/landscape4.jpg',
    alt: 'Voluntarios limpiando un área verde',
    tag: 'Medio Ambiente',
    title: 'Jornadas de limpieza comunitaria',
  },
  {
    src: '/images/landscape5.jpg',
    alt: 'Voluntarios clasificando ropa y alimentos donados en centro de acopio',
    tag: 'Acopio y Ropa',
    title: 'Clasificación de donativos',
  },
  {
    src: '/images/vertical1.jpg',
    alt: 'Manos comunitarias plantando un árbol',
    tag: 'Reforestación',
    title: 'Sembrando futuro juntos',
  },
  {
    src: '/images/vertical2.jpg',
    alt: 'Cajas de ayuda humanitaria con alimentos y medicinas',
    tag: 'Salud y Víveres',
    title: 'Insumos médicos y alimento',
  },
  {
    src: '/images/vertical3.jpg',
    alt: 'Voluntarios limpiando calles y parques de la comunidad',
    tag: 'Brigadas Locales',
    title: 'Recuperando espacios públicos',
  },
]

interface ImpactPhotosProps {
  lastUpdatedLabel?: string
}

export function ImpactPhotos({ lastUpdatedLabel }: ImpactPhotosProps) {
  const duplicatedPhotos = [...PHOTO_ITEMS, ...PHOTO_ITEMS]
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-photos-reveal]', {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          force3D: true,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
            fastScrollEnd: true,
          },
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      data-nav-theme="light"
      className="w-full py-20 lg:py-24 bg-[#F5EEDD] overflow-hidden relative"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 mb-12">
        <div data-photos-reveal className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-[#16587B]/25 bg-[#16587B]/10 text-[#16587B] text-xs uppercase tracking-[0.06em] font-medium">
            <Sparkles className="size-3.5" strokeWidth={1.5} />
            <span>Comunidad en acción</span>
          </div>
          <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[52px] leading-[1.06] tracking-normal text-[#0C354C] max-w-3xl mx-auto">
            El impacto que cobra{' '}
            <span className="font-serif italic font-normal text-[#16587B] text-[1.06em]">vida</span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#0C354C]/80 max-w-2xl mx-auto leading-[1.6]">
            Detrás de cada cifra hay personas, organizaciones y comunidades sumando voluntades todos
            los días en México.
          </p>
        </div>
      </div>

      {/* Marquee Carousel Container */}
      <div data-photos-reveal className="relative w-full overflow-hidden">
        <div className="animate-marquee flex gap-5 py-2 cursor-grab active:cursor-grabbing hover:[animation-play-state:paused]">
          {duplicatedPhotos.map((photo, index) => (
            <div
              key={`${photo.src}-${index}`}
              className="group relative shrink-0 w-[290px] sm:w-[360px] md:w-[420px] aspect-[16/11] rounded-2xl overflow-hidden border border-[#DFD5C0] bg-[#FAF7F0] transition-colors duration-200 hover:border-[#84B3CE]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 290px, (max-width: 1024px) 360px, 420px"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0C354C]/85 via-[#0C354C]/30 to-transparent" />

              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-[#0C354C]/85 text-[#F5EEDD] border border-[#84B3CE]/30 text-[10px] uppercase tracking-[0.06em] font-medium px-3 py-0.5 rounded-full">
                  {photo.tag}
                </Badge>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 z-10 flex flex-col gap-1 text-white">
                <h3 className="font-sans font-light text-xl leading-snug line-clamp-2">
                  {photo.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Last updated footer */}
      {lastUpdatedLabel && (
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 mt-10 flex justify-center">
          <div className="flex items-center justify-center gap-2 text-xs text-[#0C354C]/65 pt-4 border-t border-[#DFD5C0] w-full max-w-xl text-center">
            <Clock className="size-3.5 shrink-0 text-[#16587B]" strokeWidth={1.5} />
            <span>Última actualización de datos: {lastUpdatedLabel}</span>
          </div>
        </div>
      )}
    </section>
  )
}
