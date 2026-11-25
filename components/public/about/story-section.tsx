'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Camera } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-story-reveal]', {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.14,
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
    <section ref={sectionRef} className="w-full bg-[#F5EEDD] py-20 lg:py-28 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
          {/* Text Column — narrow narrative reading width max-w-3xl */}
          <div data-story-reveal className="lg:col-span-7 max-w-3xl space-y-6">
            <div className="space-y-3">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
                Nuestra historia
              </p>
              <h2 className="font-sans font-light text-3xl sm:text-5xl lg:text-[52px] leading-[1.06] tracking-normal text-[#0C354C]">
                La historia{' '}
                <span className="font-serif italic font-normal text-[#16587B] text-[1.06em]">
                  detrás de Alia
                </span>
              </h2>
            </div>

            <div className="space-y-5 font-sans text-base sm:text-lg text-[#0C354C]/80 leading-[1.7]">
              <p>
                Todo comenzó con una pregunta simple:{' '}
                <em className="text-[#0C354C] font-serif italic text-[1.06em]">
                  &ldquo;¿Dónde puedo ayudar hoy?&rdquo;
                </em>{' '}
                La respuesta no debería ser difícil de encontrar, pero lo era. Horas de búsqueda,
                sitios desactualizados y directorios detrás de suscripciones.
              </p>
              <p>
                Alia nació de esa frustración y de algo más profundo: la certeza de que en México
                hay una enorme{' '}
                <strong className="text-[#0C354C] font-medium">voluntad de ayudar</strong> que nunca
                llega a su destino por falta de un puente claro, gratuito y confiable.
              </p>
              <p>
                Como iniciativa familiar, construida con tiempo, dedicación y sin financiamiento
                externo, entendemos que{' '}
                <strong className="text-[#0C354C] font-medium">
                  el compromiso social no requiere grandes recursos, sino una visión clara y la
                  determinación de ejecutarla
                </strong>
                . Cada organización verificada, cada conexión facilitada, es nuestra razón de
                seguir.
              </p>
            </div>

            {/* Founder signature */}
            <div className="pt-3 flex items-center gap-4">
              <div className="w-10 h-0.5 bg-[#16587B] shrink-0" />
              <div>
                <p className="font-sans font-medium text-base text-[#0C354C]">Sofía Vega</p>
                <p className="font-mono text-xs uppercase tracking-[0.06em] text-[#0C354C]/60">
                  Fundadora &amp; Directora de Alia
                </p>
              </div>
            </div>
          </div>

          {/* Image Column */}
          <div data-story-reveal className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
            {/*
             * PLACEHOLDER: Foto real de Sofía Vega trabajando en Alia
             * Reemplazar con <Image src="/images/founder-working.jpg" alt="Sofía Vega, Fundadora y Directora de Alia" fill className="object-cover" />
             * Especificaciones: 800 x 1000 px mínimo, aspecto 4:5, iluminación cálida y natural.
             */}
            <div className="relative aspect-4/5 w-full rounded-[8px] overflow-hidden border border-[#DFD5C0] bg-[#FAF7F0] flex flex-col items-center justify-center p-8 text-center">
              <div className="size-14 rounded-[8px] bg-[#16587B]/10 text-[#16587B] flex items-center justify-center mb-4">
                <Camera className="size-6" strokeWidth={1.5} />
              </div>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#16587B] mb-2">
                Foto de la fundadora
              </p>
              <p className="font-sans text-sm text-[#0C354C]/75 max-w-[240px] leading-relaxed">
                Sofía Vega en campo con iniciativas sociales de México.
              </p>
              <p className="font-mono text-[11px] text-[#0C354C]/55 mt-3">
                800 × 1000 px · Aspecto 4:5
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
