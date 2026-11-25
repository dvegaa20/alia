'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Heart, ShieldCheck, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const pillars = [
  {
    Icon: ShieldCheck,
    title: 'Revisión Humana',
    description:
      'Cada proyecto es verificado personalmente por nuestro equipo. Construimos una red de confianza real, conociendo las historias detrás de cada causa antes de publicarla.',
  },
  {
    Icon: Heart,
    title: 'Siempre Gratuito',
    description:
      'Sin costos, sin anuncios y sin intermediarios. Queremos que el vínculo entre ciudadanos y organizaciones sea directo, genuino y sin barreras económicas.',
  },
  {
    Icon: Globe,
    title: 'Compromiso Social',
    description:
      'No buscamos beneficios económicos. Este es nuestro aporte al bienestar común, construido con voluntad, transparencia y la convicción de un México más solidario.',
  },
]

export function PillarsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-pillar-reveal]', {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#EAE1CD]/60 border-y border-[#DFD5C0] py-20 lg:py-28"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        {/* Header */}
        <div data-pillar-reveal className="text-center mb-14 space-y-3">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
            Principios
          </p>
          <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[52px] leading-[1.06] tracking-normal text-[#0C354C]">
            Nuestros{' '}
            <span className="font-serif italic font-normal text-[#16587B] text-[1.06em]">
              pilares
            </span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#0C354C]/80 max-w-xl mx-auto leading-[1.6]">
            Los valores de revisión humana y transparencia que guían cada decisión en Alia.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map(({ Icon, title, description }) => (
            <div key={title} data-pillar-reveal>
              <Card className="h-full bg-[#FAF7F0] border border-[#DFD5C0] ring-0 shadow-none rounded-[8px] hover:border-[#84B3CE] transition-colors duration-200 py-0">
                <CardContent className="p-8 flex flex-col items-start gap-5">
                  <div className="size-12 rounded-[4px] bg-[#16587B]/10 text-[#16587B] flex items-center justify-center">
                    <Icon className="size-5" strokeWidth={1.5} />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-sans font-medium text-xl text-[#0C354C]">{title}</h3>
                    <p className="font-sans text-[#0C354C]/75 text-sm leading-relaxed">
                      {description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
