'use client'

import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ListChecks, ReceiptText, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export type ReachStatIconKey = 'shield' | 'sparkles' | 'list' | 'receipt'

export interface ReachStatItem {
  key: string
  icon: ReachStatIconKey
  label: string
  value: number
  href: string
  description?: string
}

const ICONS: Record<ReachStatIconKey, typeof ShieldCheck> = {
  shield: ShieldCheck,
  sparkles: Sparkles,
  list: ListChecks,
  receipt: ReceiptText,
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 10_000) return `${(n / 1_000).toFixed(0)}k`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  if (n <= 0) return '0'
  return Math.round(n).toLocaleString('es-MX')
}

interface ReachStatsGridProps {
  items: ReachStatItem[]
  tone?: 'light'
}

export function ReachStatsGrid({ items, tone = 'light' }: ReachStatsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)
  const numberRefs = useRef<(HTMLParagraphElement | null)[]>([])

  const serializedValues = items.map((i) => i.value).join(',')

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-stat-card]', {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          force3D: true,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
            fastScrollEnd: true,
          },
        })

        items.forEach((stat, idx) => {
          const el = numberRefs.current[idx]
          if (!el || stat.value <= 0) return

          const counter = { val: 0 }
          gsap.to(counter, {
            val: stat.value,
            duration: 1.3,
            delay: idx * 0.08,
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
              el.textContent = formatNumber(stat.value)
            },
          })
        })
      })
    },
    { scope: gridRef, dependencies: [serializedValues] }
  )

  return (
    <div
      ref={gridRef}
      data-tone={tone}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {items.map((item, idx) => {
        const Icon = ICONS[item.icon]

        return (
          <Link
            key={item.key}
            href={item.href}
            data-stat-card
            className={cn(
              'group rounded-2xl border border-[#DFD5C0] bg-[#FAF7F0] hover:border-[#84B3CE] p-7 flex flex-col justify-between gap-6 min-h-[200px] transition-colors duration-200'
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <div className="size-10 rounded-xl bg-[#16587B]/10 text-[#16587B] flex items-center justify-center shrink-0">
                <Icon className="size-5" strokeWidth={1.5} />
              </div>
              <ArrowRight
                className="size-4 text-[#0C354C]/40 group-hover:text-[#16587B] group-hover:translate-x-0.5 transition-all"
                strokeWidth={1.5}
              />
            </div>

            <div className="space-y-2">
              <p
                ref={(el) => {
                  numberRefs.current[idx] = el
                }}
                className="font-normal text-4xl sm:text-5xl lg:text-[56px] leading-none tracking-[-0.02em] tabular-nums text-[#0C354C]"
              >
                {formatNumber(item.value)}
              </p>
              <p className="font-sans text-base text-[#0C354C]/80 leading-snug">{item.label}</p>
              {item.description && (
                <p className="font-sans text-xs text-[#0C354C]/65 leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
