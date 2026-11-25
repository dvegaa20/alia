'use client'

import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ArrowRight, Lightbulb } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SuggestOrgDialog } from '@/components/public/suggest/suggest-org-dialog'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-cta-card]', {
          y: 24,
          opacity: 0,
          duration: 0.75,
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
    <section ref={sectionRef} className="w-full bg-[#F5EEDD] pb-20 lg:pb-24">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div
          data-cta-card
          className="rounded-[12px] bg-[#0C354C] text-[#F5EEDD] border border-[#84B3CE]/20 px-6 py-14 sm:px-14 sm:py-20 flex flex-col items-center text-center gap-6"
        >
          <span className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#84B3CE]">
            Suma una causa
          </span>

          <div className="space-y-3 max-w-2xl">
            <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[52px] leading-[1.06] tracking-normal text-white">
              Ayúdanos a crecer el{' '}
              <span className="font-serif italic font-normal text-[#F5EEDD] text-[1.06em]">
                directorio
              </span>
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#F5EEDD]/80 leading-[1.6]">
              ¿Conoces una iniciativa que deba estar aquí? Juntos podemos hacer que esta red llegue
              a quienes más lo necesitan.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <Button
              asChild
              className="rounded-[4px] bg-[#84B3CE] text-[#0C354C] hover:bg-[#9AC3DA] px-6 py-3 h-auto text-[16px] font-medium border border-[#84B3CE] shadow-none transition-colors"
            >
              <Link href="/directory">
                Explorar directorio
                <ArrowRight className="ml-2 size-4" strokeWidth={1.75} />
              </Link>
            </Button>

            <SuggestOrgDialog>
              <Button
                type="button"
                variant="outline"
                className="rounded-[4px] border-[#84B3CE] bg-transparent text-[#84B3CE] hover:bg-[#84B3CE]/15 hover:text-white px-6 py-3 h-auto text-[16px] font-medium shadow-none transition-colors"
              >
                <Lightbulb className="mr-2 size-4" strokeWidth={1.5} />
                Sugerir una ONG
              </Button>
            </SuggestOrgDialog>
          </div>

          <p className="font-mono text-xs text-[#A8CBE0]/80">
            Todas las sugerencias se revisan manualmente. Sin costo, sin intermediarios.
          </p>
        </div>
      </div>
    </section>
  )
}
