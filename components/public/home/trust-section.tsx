'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { ShieldCheck, HeartHandshake, Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { OrganizationCard } from '@/components/public/directory/organization-card'
import { SuggestOrgDialog } from '@/components/public/suggest/suggest-org-dialog'
import type { OrganizationCardProps } from '@/types'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface TrustSectionProps {
  youthInitiatives?: OrganizationCardProps[]
}

export function TrustSection({ youthInitiatives = [] }: TrustSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-trust-reveal]', {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.12,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '[data-trust-block]',
            start: 'top 85%',
            once: true,
          },
        })

        gsap.from('[data-youth-reveal]', {
          y: 24,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: '[data-youth-block]',
            start: 'top 85%',
            once: true,
          },
        })
      })
    },
    { scope: sectionRef }
  )

  return (
    <section ref={sectionRef} className="w-full bg-[#F5EEDD] py-20 lg:py-28">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14 space-y-24">
        {/* Part 1 — Puente de Confianza */}
        <div
          data-trust-block
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
        >
          {/* Text Side */}
          <div data-trust-reveal className="lg:col-span-6 space-y-6">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
              Puente de confianza
            </p>
            <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[52px] leading-[1.06] tracking-normal text-[#0C354C]">
              Por un ecosistema social{' '}
              <span className="font-serif italic font-normal text-[#16587B] text-[1.06em]">
                transparente
              </span>{' '}
              y accesible.
            </h2>
            <p className="font-sans text-base sm:text-lg text-[#0C354C]/80 leading-[1.6] max-w-2xl">
              No somos una plataforma de recaudación, somos un puente. Creemos que la transformación
              social ocurre cuando las personas saben exactamente dónde y cómo su apoyo genera
              impacto real.
            </p>

            {/* Warm Paper Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              <Card className="bg-[#FAF7F0] border border-[#DFD5C0] ring-0 shadow-none rounded-[8px] py-0">
                <CardContent className="p-6 space-y-3">
                  <div className="size-10 rounded-[4px] bg-[#16587B]/10 text-[#16587B] flex items-center justify-center">
                    <ShieldCheck className="size-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-sans font-medium text-lg text-[#0C354C]">Red de confianza</h3>
                  <p className="font-sans text-sm text-[#0C354C]/75 leading-relaxed">
                    Revisamos y validamos cada iniciativa para asegurar que tu apoyo llegue a quien
                    lo necesita.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#FAF7F0] border border-[#DFD5C0] ring-0 shadow-none rounded-[8px] py-0">
                <CardContent className="p-6 space-y-3">
                  <div className="size-10 rounded-[4px] bg-[#16587B]/10 text-[#16587B] flex items-center justify-center">
                    <HeartHandshake className="size-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-sans font-medium text-lg text-[#0C354C]">Vínculo directo</h3>
                  <p className="font-sans text-sm text-[#0C354C]/75 leading-relaxed">
                    Conecta sin intermediarios ni comisiones con las personas que lideran cada
                    proyecto.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Image Side */}
          <div data-trust-reveal className="lg:col-span-6">
            <div className="relative aspect-[4/3] w-full rounded-[8px] overflow-hidden border border-[#DFD5C0] bg-[#EAE1CD]">
              <Image
                alt="Trabajo colaborativo en comunidad"
                src="/images/landscape2.jpg"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Part 2 — Iniciativas Jóvenes */}
        <div data-youth-block className="pt-16 border-t border-[#DFD5C0] space-y-8">
          <div
            data-youth-reveal
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div className="space-y-2.5 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-[4px] bg-[#124866] text-[#84B3CE] px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.06em]">
                <Sparkles className="size-3.5" strokeWidth={1.5} />
                Iniciativa Joven
              </span>
              <h2 className="font-sans font-light text-3xl sm:text-4xl lg:text-[44px] leading-[1.08] tracking-normal text-[#0C354C]">
                ¿Te gusta esta iniciativa? ¡Hay que hacerla{' '}
                <span className="font-serif italic font-normal text-[#16587B] text-[1.06em]">
                  real
                </span>
                !
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#0C354C]/80 leading-[1.55]">
                Proyectos liderados por jóvenes y comunidades escolares que están transformando su
                entorno desde hoy.
              </p>
            </div>

            <Button
              asChild
              variant="outline"
              className="rounded-[4px] border-[#16587B] bg-transparent text-[#16587B] hover:bg-[#16587B] hover:text-white px-5 py-2.5 h-auto text-sm font-medium shrink-0 self-start sm:self-auto shadow-none transition-colors"
            >
              <Link href="/directory">
                Ver todas
                <ArrowRight className="ml-2 size-4" strokeWidth={1.5} />
              </Link>
            </Button>
          </div>

          {youthInitiatives.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {youthInitiatives.map((org) => (
                <div key={`home-youth-${org.slug}`} data-youth-reveal className="h-full">
                  <OrganizationCard {...org} surface="on-merino" />
                </div>
              ))}
            </div>
          ) : (
            <div
              data-youth-reveal
              className="rounded-[8px] border border-[#DFD5C0] bg-[#FAF7F0] p-8 text-center space-y-4"
            >
              <p className="font-sans text-base text-[#0C354C]/80 max-w-lg mx-auto">
                Próximamente verás aquí iniciativas lideradas por jóvenes y proyectos escolares en
                México. ¿Conoces una?
              </p>
              <SuggestOrgDialog>
                <Button
                  type="button"
                  className="rounded-[4px] bg-[#16587B] hover:bg-[#0C354C] text-white px-6 py-2.5 h-auto text-sm font-medium shadow-none"
                >
                  Sugerir iniciativa joven
                </Button>
              </SuggestOrgDialog>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
