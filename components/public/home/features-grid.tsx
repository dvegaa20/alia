'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Users, HeartHandshake, Globe } from 'lucide-react'
import type { ImpactMetrics } from '@/server/actions/analytics'

gsap.registerPlugin(ScrollTrigger, useGSAP)

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 10_000) return `${(n / 1_000).toFixed(0)}k`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  if (n <= 0) return '—'
  return Math.round(n).toLocaleString('es-MX')
}

interface FeaturesSectionGridProps {
  metrics: ImpactMetrics
}

export function FeaturesSectionGrid({ metrics }: FeaturesSectionGridProps) {
  const { communityReach, realConnections, pageViews } = metrics
  const gridRef = useRef<HTMLDivElement>(null)
  const numberRefs = useRef<(HTMLParagraphElement | null)[]>([])

  const stats = [
    {
      eyebrow: 'Alcance comunitario',
      rawValue: communityReach,
      value: formatNumber(communityReach),
      title: 'Usuarios únicos',
      description: 'Personas reales que exploraron organizaciones sociales en nuestra plataforma.',
      Icon: Users,
    },
    {
      eyebrow: 'Vínculos reales',
      rawValue: realConnections,
      value: formatNumber(realConnections),
      title: 'Conexiones directas',
      description: 'Interacciones ciudadanas hacia perfiles, sitios web o canales de contacto.',
      Icon: HeartHandshake,
    },
    {
      eyebrow: 'Historias descubiertas',
      rawValue: pageViews,
      value: formatNumber(pageViews),
      title: 'Páginas vistas',
      description: 'Consultas registradas a proyectos sociales verificados en todo México.',
      Icon: Globe,
    },
  ]

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-stat-card]', {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
          },
        })

        stats.forEach((stat, idx) => {
          const el = numberRefs.current[idx]
          if (!el || stat.rawValue <= 0) return

          const counter = { val: 0 }
          gsap.to(counter, {
            val: stat.rawValue,
            duration: 1.4,
            delay: idx * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              once: true,
            },
            onUpdate: () => {
              el.textContent = formatNumber(counter.val)
            },
            onComplete: () => {
              el.textContent = formatNumber(stat.rawValue)
            },
          })
        })
      })
    },
    { scope: gridRef, dependencies: [communityReach, realConnections, pageViews] }
  )

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {stats.map(({ eyebrow, value, title, description, Icon }, idx) => (
        <div
          key={title}
          data-stat-card
          className="rounded-[8px] border border-[#84B3CE]/25 bg-[#124866]/70 p-7 lg:p-9 flex flex-col justify-between gap-7"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#84B3CE]">
              {eyebrow}
            </span>
            <Icon className="size-5 text-[#84B3CE] shrink-0" strokeWidth={1.5} />
          </div>

          <div className="space-y-2.5">
            <p
              ref={(el) => {
                numberRefs.current[idx] = el
              }}
              className="font-mono font-normal text-4xl sm:text-5xl lg:text-[56px] leading-none tracking-[-0.02em] tabular-nums text-white"
            >
              {value}
            </p>
            <h3 className="font-sans text-xl font-light text-[#F5EEDD] pt-1">{title}</h3>
            <p className="font-sans text-sm text-[#F5EEDD]/75 leading-relaxed">{description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
