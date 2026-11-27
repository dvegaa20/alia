'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Building2, Check, Sparkles, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GsapReveal } from '@/components/public/motion/gsap-reveal'
import { SectionTransition } from '@/components/public/motion/section-transition'
import { cn } from '@/lib/utils'

interface AudiencePathsSectionProps {
  verifiedCount: number
  youthCount: number
  donatariaCount: number
}

export function AudiencePathsSection({
  verifiedCount,
  youthCount,
  donatariaCount,
}: AudiencePathsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const paths = [
    {
      key: 'citizens',
      Icon: Users,
      eyebrow: 'Dona tiempo o recursos',
      title: 'Ciudadanos y Voluntarios',
      description:
        'Encuentra organizaciones verificadas cerca de ti, revisa lo que necesitan y contáctalas sin intermediarios.',
      bullets: [
        'Voluntariados y necesidades en especie',
        'Contacto directo por WhatsApp o correo',
        'Filtra por estado, ciudad y causa',
      ],
      count: verifiedCount,
      statLabel: `${verifiedCount.toLocaleString('es-MX')} organizaciones verificadas`,
      ctaLabel: 'Encontrar dónde ayudar',
      href: '/directory',
    },
    {
      key: 'youth',
      Icon: Sparkles,
      eyebrow: 'Impulsa a la próxima generación',
      title: 'Iniciativas Jóvenes',
      description:
        'Proyectos liderados por jóvenes y comunidades escolares que necesitan apoyo para hacerse realidad.',
      bullets: [
        'Mentoría, materiales y difusión',
        'Proyectos escolares y universitarios',
        '¿Lideras una? Súmala al directorio',
      ],
      count: youthCount,
      statLabel: `${youthCount.toLocaleString('es-MX')} iniciativas activas`,
      ctaLabel: 'Ver iniciativas jóvenes',
      href: '/directory?type=YOUTH_INITIATIVE',
    },
    {
      key: 'smes',
      Icon: Building2,
      eyebrow: 'Responsabilidad social con respaldo',
      title: 'PyMEs y Donantes',
      description:
        'Vincula tu empresa con Donatarias Autorizadas que emiten recibos deducibles de ISR ante el SAT.',
      bullets: [
        'Recibos deducibles (CFDI)',
        'Alianzas de responsabilidad social',
        'Donativos económicos o en especie',
      ],
      count: donatariaCount,
      statLabel: `${donatariaCount.toLocaleString('es-MX')} donatarias autorizadas`,
      ctaLabel: 'Ver donatarias autorizadas',
      href: '/directory?donataria=true',
    },
  ]

  return (
    <section
      data-nav-theme="dark"
      className="min-h-[100dvh] w-full flex flex-col justify-center bg-[#0C354C] text-[#F5EEDD] py-20 lg:py-24"
    >
      <SectionTransition>
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
          <GsapReveal className="mb-12 space-y-3 text-left">
            <p className="text-xs font-medium uppercase tracking-[0.06em] text-[#84B3CE]">
              Encuentra tu camino
            </p>
            <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[56px] leading-[1.04] tracking-normal text-white">
              ¿Cómo quieres{' '}
              <span className="font-serif italic font-normal text-[#F5EEDD] text-[1.06em]">
                sumar
              </span>
              ?
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#F5EEDD]/80 max-w-2xl leading-[1.55]">
              Elige la ruta que mejor refleja tu forma de aportar, ya sea con tu tiempo, impulsando
              talento joven o mediante donativos deducibles.
            </p>
          </GsapReveal>

          <GsapReveal>
            <div className="flex flex-col lg:flex-row gap-4 lg:min-h-[440px]">
              {paths.map((item, idx) => {
                const isActive = activeIndex === idx
                const Icon = item.Icon

                return (
                  <div
                    key={item.key}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onFocus={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      'rounded-2xl border p-7 lg:p-9 flex flex-col justify-between gap-6 transition-[flex,background-color,border-color] duration-500',
                      isActive
                        ? 'lg:flex-[1.7] bg-[#16587B]/35 border-[#84B3CE]/60'
                        : 'lg:flex-1 bg-[#124866]/70 border-[#84B3CE]/25'
                    )}
                  >
                    <div className="space-y-5">
                      <div className="flex items-center justify-between gap-3">
                        <div className="size-11 rounded-xl bg-[#84B3CE]/15 text-[#84B3CE] flex items-center justify-center shrink-0">
                          <Icon className="size-5" strokeWidth={1.5} />
                        </div>
                        {item.count > 0 && (
                          <span className="inline-flex items-center rounded-full border border-[#84B3CE]/30 bg-[#0C354C]/60 px-3 py-1 text-[11px] font-medium text-[#84B3CE] tabular-nums">
                            {item.statLabel}
                          </span>
                        )}
                      </div>

                      <div className="space-y-2.5">
                        <p className="text-xs font-medium uppercase tracking-[0.06em] text-[#84B3CE]">
                          {item.eyebrow}
                        </p>
                        <h3 className="font-sans font-light text-2xl sm:text-[28px] leading-snug text-white">
                          {item.title}
                        </h3>
                        <p className="font-sans text-sm sm:text-base text-[#F5EEDD]/80 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <ul className="space-y-2.5 pt-1">
                        {item.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2.5 text-sm text-[#F5EEDD]/85"
                          >
                            <Check
                              className="size-4 text-[#84B3CE] shrink-0 mt-0.5"
                              strokeWidth={1.75}
                            />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-2">
                      <Button
                        asChild
                        variant={isActive ? 'default' : 'outline'}
                        className={cn(
                          'rounded-full px-5 py-2.5 h-auto text-sm font-medium shadow-none transition-colors',
                          isActive
                            ? 'bg-[#84B3CE] hover:bg-[#9AC3DA] text-[#0C354C] border border-[#84B3CE]'
                            : 'bg-transparent hover:bg-[#84B3CE]/15 text-[#84B3CE] hover:text-white border-[#84B3CE]'
                        )}
                      >
                        <Link href={item.href}>
                          {item.ctaLabel}
                          <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
                        </Link>
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </GsapReveal>
        </div>
      </SectionTransition>
    </section>
  )
}
