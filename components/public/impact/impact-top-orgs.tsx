'use client'

import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { TrendingUp, ArrowRight, Trophy } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { TopOrg } from '@/server/actions/analytics'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface ImpactTopOrgsProps {
  topOrgs: TopOrg[]
}

const podiumOrder = [1, 0, 2]

const podiumConfig = [
  { rank: 2, platformH: 'h-[84px]' },
  { rank: 1, platformH: 'h-[120px]' },
  { rank: 3, platformH: 'h-[60px]' },
]

export function ImpactTopOrgs({ topOrgs }: ImpactTopOrgsProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-top-org-reveal]', {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.08,
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

  if (topOrgs.length === 0) {
    return (
      <section
        ref={sectionRef}
        className="w-full bg-[#EAE1CD]/60 border-y border-[#DFD5C0] py-20"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
          <Card className="bg-[#FAF7F0] border border-[#DFD5C0] shadow-none rounded-[8px] py-0">
            <CardContent className="p-12 text-center space-y-3">
              <TrendingUp className="size-8 text-[#16587B] mx-auto" strokeWidth={1.5} />
              <p className="font-sans text-[#0C354C]/75">
                Los datos de organizaciones más visitadas estarán disponibles pronto.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    )
  }

  const top3 = topOrgs.slice(0, 3)
  const rest = topOrgs.slice(3)
  const maxViews = topOrgs[0]?.views ?? 1

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#EAE1CD]/60 border-y border-[#DFD5C0] py-20 lg:py-24 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        {/* Section Header */}
        <div data-top-org-reveal className="text-center mb-14 space-y-3">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
            Ranking de impacto
          </p>
          <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[52px] leading-[1.06] tracking-normal text-[#0C354C]">
            Organizaciones{' '}
            <span className="font-serif italic font-normal text-[#16587B] text-[1.06em]">
              más visitadas
            </span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#0C354C]/80 max-w-xl mx-auto leading-[1.6]">
            Las causas que más interés han generado en los últimos 30 días.
          </p>
        </div>

        {/* Two-column layout: podium + list */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* LEFT: Visual Podium */}
          <div data-top-org-reveal className="lg:sticky lg:top-28">
            <div className="flex items-center gap-3 mb-8">
              <div className="size-10 rounded-[4px] bg-[#16587B]/10 text-[#16587B] flex items-center justify-center">
                <Trophy className="size-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-sans font-medium text-xl text-[#0C354C]">Podio</h3>
                <p className="font-mono text-xs text-[#0C354C]/60">Las 3 con más alcance</p>
              </div>
            </div>

            {top3.length >= 1 && (
              <div className="flex items-end justify-center gap-3">
                {podiumOrder.map((orgIdx, colIdx) => {
                  const org = top3[orgIdx]
                  if (!org) return null
                  const { rank, platformH } = podiumConfig[colIdx]

                  return (
                    <div
                      key={`podium-${org.path}`}
                      className="flex flex-col items-center flex-1 min-w-0"
                    >
                      <Link href={`/directory/${org.slug}`} className="block w-full group mb-2">
                        <Card
                          className={cn(
                            'bg-[#FAF7F0] border rounded-[8px] shadow-none transition-all duration-200 hover:border-[#84B3CE] hover:-translate-y-0.5 py-0',
                            rank === 1 ? 'border-[#16587B]/50' : 'border-[#DFD5C0]'
                          )}
                        >
                          <CardContent className="p-4 flex flex-col items-center text-center gap-2">
                            <div className="size-11 rounded-[4px] bg-[#16587B]/10 text-[#16587B] flex items-center justify-center shrink-0">
                              <span className="font-sans font-medium text-base leading-none">
                                {org.title.charAt(0).toUpperCase()}
                              </span>
                            </div>

                            <p className="font-sans text-xs font-medium text-[#0C354C] group-hover:text-[#16587B] transition-colors line-clamp-2 leading-snug w-full">
                              {org.title}
                            </p>

                            <p className="font-mono text-[11px] tabular-nums text-[#0C354C]/60">
                              {org.views.toLocaleString('es-MX')} visitas
                            </p>
                          </CardContent>
                        </Card>
                      </Link>

                      <div
                        className={cn(
                          'w-full rounded-t-[8px] flex flex-col items-center justify-start pt-3 gap-1 border border-b-0',
                          platformH,
                          rank === 1
                            ? 'bg-[#16587B] text-white border-[#16587B]'
                            : rank === 2
                              ? 'bg-[#16587B]/15 text-[#16587B] border-[#16587B]/25'
                              : 'bg-[#FAF7F0] text-[#0C354C]/75 border-[#DFD5C0]'
                        )}
                      >
                        <span className="font-mono font-medium text-2xl tabular-nums leading-none">
                          {rank}
                        </span>
                        <span
                          className={cn(
                            'font-mono text-[10px] uppercase tracking-[0.05em]',
                            rank === 1 ? 'text-[#F5EEDD]/85' : 'text-[#0C354C]/60'
                          )}
                        >
                          {rank === 1 ? '1.er lugar' : rank === 2 ? '2.do lugar' : '3.er lugar'}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            <p className="font-mono text-xs text-[#0C354C]/60 mt-6 text-center">
              Ranking actualizado automáticamente con datos reales.
            </p>
          </div>

          {/* RIGHT: Full Ranking List */}
          <div data-top-org-reveal>
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-[4px] bg-[#16587B]/10 text-[#16587B] flex items-center justify-center">
                <Trophy className="size-5" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="font-sans font-medium text-xl text-[#0C354C]">Posiciones 4 - 10</h3>
                <p className="font-mono text-xs text-[#0C354C]/60">Últimos 30 días</p>
              </div>
            </div>

            <div className="space-y-2.5">
              {rest.map((org, idx) => {
                const i = idx + 3
                const barWidth = Math.max(4, Math.round((org.views / maxViews) * 100))

                return (
                  <div key={org.path} className="group">
                    <Link href={`/directory/${org.slug}`}>
                      <Card className="bg-[#FAF7F0] border border-[#DFD5C0] ring-0 shadow-none rounded-[8px] hover:border-[#84B3CE] transition-colors duration-200 py-0">
                        <CardContent className="px-5 py-3.5 flex items-center gap-4">
                          <span className="font-mono text-sm font-medium tabular-nums w-7 text-center shrink-0 text-[#0C354C]/55">
                            {String(i + 1).padStart(2, '0')}
                          </span>

                          <div className="flex-1 min-w-0">
                            <p className="font-sans text-sm font-medium text-[#0C354C] truncate group-hover:text-[#16587B] transition-colors">
                              {org.title}
                            </p>
                            <div className="mt-1.5 h-1.5 bg-[#EAE1CD] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#16587B] rounded-full transition-all duration-500"
                                style={{ width: `${barWidth}%` }}
                              />
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-mono text-sm font-medium tabular-nums text-[#0C354C]">
                              {org.views.toLocaleString('es-MX')}
                            </span>
                            <p className="font-mono text-[10px] uppercase text-[#0C354C]/60">
                              visitas
                            </p>
                          </div>

                          <ArrowRight
                            className="size-4 text-[#0C354C]/50 shrink-0 group-hover:text-[#16587B] transition-colors"
                            strokeWidth={1.5}
                          />
                        </CardContent>
                      </Card>
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
