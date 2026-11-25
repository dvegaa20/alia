'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { AlertTriangle, Search, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const stats = [
  {
    icon: Globe,
    number: '+40,000',
    label: 'ONGs registradas en México',
    note: 'Según el INEGI y CEMEFI',
  },
  {
    icon: Search,
    number: '~5%',
    label: 'Cuentan con plataforma digital actualizada',
    note: 'El resto permanece invisible en línea',
  },
  {
    icon: AlertTriangle,
    number: 'Millones',
    label: 'De personas con ganas de ayudar, sin saber cómo',
    note: 'La brecha entre voluntad e información',
  },
]

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-problem-reveal]', {
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
        <div data-problem-reveal className="text-center mb-16 space-y-3">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
            El contexto
          </p>
          <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[52px] leading-[1.06] tracking-normal text-[#0C354C] max-w-3xl mx-auto">
            El problema{' '}
            <span className="font-serif italic font-normal text-[#16587B] text-[1.06em]">
              que nos mueve
            </span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#0C354C]/80 max-w-2xl mx-auto leading-[1.6]">
            En México hay miles de causas increíbles. El problema es que la información está
            fragmentada, desactualizada o es completamente inaccesible.
          </p>
        </div>

        {/* Two-column layout: stats left, narrative right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-start">
          {/* Left: Stat Cards */}
          <div className="space-y-4">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} data-problem-reveal>
                  <Card className="bg-[#FAF7F0] border border-[#DFD5C0] ring-0 shadow-none rounded-[8px] py-0 hover:border-[#84B3CE] transition-colors duration-200">
                    <CardContent className="p-6 flex items-start gap-5">
                      <div className="size-11 rounded-[4px] bg-[#16587B]/10 text-[#16587B] flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                        <p className="font-mono font-medium text-3xl sm:text-4xl tracking-[-0.02em] tabular-nums text-[#16587B] leading-none">
                          {stat.number}
                        </p>
                        <p className="font-sans text-[#0C354C] text-sm font-medium leading-snug pt-1">
                          {stat.label}
                        </p>
                        <p className="font-mono text-[#0C354C]/60 text-xs">{stat.note}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )
            })}
          </div>

          {/* Right: Narrative text (reading width max-w-3xl) */}
          <div
            data-problem-reveal
            className="max-w-3xl space-y-6 font-sans text-base sm:text-lg text-[#0C354C]/80 leading-[1.7] lg:pt-1"
          >
            <p>
              En un ecosistema saturado de información, encontrar iniciativas honestas y cercanas se
              ha vuelto una tarea compleja. Los proyectos locales con mayor impacto quedan{' '}
              <strong className="text-[#0C354C] font-medium">invisibilizados</strong> por la falta
              de recursos digitales.
            </p>
            <p>
              Mientras tanto, las personas con ganas de sumar —voluntarias, donantes, aliados—
              simplemente no saben por dónde empezar. La información existe, pero está{' '}
              <strong className="text-[#0C354C] font-medium">
                fragmentada, desactualizada o atrapada
              </strong>{' '}
              en PDFs, redes sociales sin actualizar y directorios de paga.
            </p>
            <p>
              Las plataformas existentes suelen ser comerciales o enfocadas solo en grandes
              estructuras.{' '}
              <strong className="text-[#0C354C] font-medium">
                Hacía falta un puente humano, transparente y gratuito
              </strong>{' '}
              que pusiera en valor el trabajo de quienes transforman la realidad cada día, desde el
              territorio.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
