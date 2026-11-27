'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { MessageSquarePlus, SearchCheck, BadgeCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

gsap.registerPlugin(ScrollTrigger, useGSAP)

const steps = [
  {
    step: '01',
    icon: MessageSquarePlus,
    title: 'Recibimos la sugerencia',
    description:
      'Cualquier persona puede sugerirnos una ONG o iniciativa joven desde la plataforma. Recopilamos nombre, categoría, ubicación, descripción breve y enlace oficial.',
  },
  {
    step: '02',
    icon: SearchCheck,
    title: 'Verificamos manualmente',
    description:
      'Nuestro equipo revisa cada sugerencia de manera personal: confirmamos actividad real, validamos su presencia digital y comprobamos su labor en la comunidad.',
  },
  {
    step: '03',
    icon: BadgeCheck,
    title: 'Publicamos con transparencia',
    description:
      'Solo las iniciativas que cumplen nuestros criterios de autenticidad y relevancia social son publicadas en el directorio. Sin pago y sin favoritismos.',
  },
]

export function TransparencySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-verify-reveal]', {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
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
      id="verificacion"
      data-nav-theme="light"
      className="w-full bg-[#F5EEDD] py-20 lg:py-28 scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        {/* Header */}
        <div data-verify-reveal className="text-center mb-14 space-y-3">
          <p className=" text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
            Rigor &amp; Responsabilidad
          </p>
          <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[52px] leading-[1.06] tracking-normal text-[#0C354C] max-w-3xl mx-auto">
            Cómo verificamos{' '}
            <span className="font-serif italic font-normal text-[#16587B] text-[1.06em]">
              cada iniciativa
            </span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#0C354C]/80 max-w-2xl mx-auto leading-[1.6]">
            Cada organización pasa por un proceso de revisión humana antes de formar parte del
            directorio. La confianza ciudadana en Alia depende de este rigor.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div key={step.step} data-verify-reveal>
                <Card className="h-full bg-[#FAF7F0] border border-[#DFD5C0] ring-0 shadow-none rounded-2xl hover:border-[#84B3CE] transition-colors duration-200 py-0">
                  <CardContent className="p-8 flex flex-col items-start gap-5">
                    <div className="flex items-center justify-between w-full">
                      <div className="size-11 rounded-xl bg-[#16587B]/10 text-[#16587B] flex items-center justify-center shrink-0">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </div>
                      <span className=" font-medium text-3xl tabular-nums text-[#16587B]/40 leading-none select-none">
                        {step.step}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-sans font-medium text-xl text-[#0C354C]">{step.title}</h3>
                      <p className="font-sans text-[#0C354C]/75 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>

        {/* Bottom note */}
        <p
          data-verify-reveal
          className="text-center  text-xs text-[#0C354C]/60 mt-10 max-w-2xl mx-auto"
        >
          Este proceso es gratuito tanto para quien sugiere como para la organización. Nuestro único
          criterio es el impacto social real.
        </p>
      </div>
    </section>
  )
}
