'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { HeartHandshake, Users, Globe2, Clock } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { ImpactMetrics } from '@/server/actions/analytics'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 10_000) return `${(n / 1_000).toFixed(0)}k`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  if (n <= 0) return '—'
  return Math.round(n).toLocaleString('es-MX')
}

function timeAgo(isoDate: string): string {
  const diffMs = Date.now() - new Date(isoDate).getTime()
  const mins = Math.floor(diffMs / 60_000)
  if (mins < 1) return 'hace un momento'
  if (mins < 60) return `hace ${mins} min`
  const hrs = Math.floor(mins / 60)
  return `hace ${hrs}h`
}

const metricsCards = [
  {
    key: 'reach',
    Icon: Users,
    sublabel: 'Voluntad compartida',
    label: 'Personas que han explorado iniciativas locales',
    field: 'communityReach' as const,
  },
  {
    key: 'connections',
    Icon: HeartHandshake,
    sublabel: 'Vínculos directos',
    label: 'Personas conectando con causas sociales',
    field: 'realConnections' as const,
  },
  {
    key: 'views',
    Icon: Globe2,
    sublabel: 'Historias descubiertas',
    label: 'Consultas a organizaciones en el directorio',
    field: 'pageViews' as const,
  },
]

interface ImpactHeroProps {
  metrics: ImpactMetrics
}

export function ImpactHero({ metrics }: ImpactHeroProps) {
  const { lastUpdated } = metrics
  const sectionRef = useRef<HTMLElement>(null)
  const numberRefs = useRef<(HTMLParagraphElement | null)[]>([])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-impact-hero]', {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
        })

        metricsCards.forEach((card, idx) => {
          const target = metrics[card.field]
          const el = numberRefs.current[idx]
          if (!el || target <= 0) return

          const counter = { val: 0 }
          gsap.to(counter, {
            val: target,
            duration: 1.4,
            delay: 0.2 + idx * 0.1,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = formatNumber(counter.val)
            },
            onComplete: () => {
              el.textContent = formatNumber(target)
            },
          })
        })
      })
    },
    { scope: sectionRef, dependencies: [metrics.communityReach, metrics.realConnections, metrics.pageViews] }
  )

  return (
    <section ref={sectionRef} className="w-full bg-[#F5EEDD] pt-28 pb-16 lg:pt-36 lg:pb-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        {/* Header */}
        <div data-impact-hero className="text-center mb-10 space-y-4">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
            Transparencia activa
          </p>
          <h1 className="font-sans font-light text-4xl sm:text-6xl lg:text-[66px] leading-[1.03] tracking-normal text-[#0C354C]">
            Nuestro{' '}
            <span className="font-serif italic font-normal text-[#16587B] text-[1.06em]">
              alcance
            </span>{' '}
            social
          </h1>
          <p className="font-sans text-base sm:text-lg text-[#0C354C]/80 max-w-2xl mx-auto leading-[1.6]">
            Datos de impacto sobre nuestro alcance en México, actualizados constantemente para
            garantizar total transparencia en nuestra labor comunitaria.
          </p>
        </div>

        {/* Timestamp pill */}
        <div data-impact-hero className="flex justify-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-[4px] border border-[#DFD5C0] bg-[#FAF7F0] px-4 py-1.5 font-mono text-xs text-[#0C354C]/65">
            <Clock className="size-3.5 text-[#16587B]" strokeWidth={1.5} />
            Datos de los últimos 30 días · Actualizado {timeAgo(lastUpdated)}
          </span>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {metricsCards.map(({ key, Icon, sublabel, label, field }, idx) => (
            <div key={key} data-impact-hero>
              <Card className="h-full bg-[#FAF7F0] border border-[#DFD5C0] ring-0 shadow-none rounded-[8px] hover:border-[#84B3CE] transition-colors duration-200 py-0">
                <CardContent className="p-7 lg:p-8 flex flex-col justify-between min-h-[220px] gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
                        {sublabel}
                      </span>
                      <div className="size-10 rounded-[4px] bg-[#16587B]/10 text-[#16587B] flex items-center justify-center shrink-0">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </div>
                    </div>
                    <p className="font-sans text-sm text-[#0C354C]/75 leading-relaxed">{label}</p>
                  </div>

                  <p
                    ref={(el) => {
                      numberRefs.current[idx] = el
                    }}
                    className="font-mono font-normal text-4xl sm:text-5xl leading-none tracking-[-0.02em] tabular-nums text-[#0C354C]"
                  >
                    {formatNumber(metrics[field])}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
