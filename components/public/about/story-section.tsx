'use client'

import { useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface StorySectionProps {
  founderImageSrc?: string | null
}

export function StorySection({ founderImageSrc = null }: StorySectionProps) {
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
      data-nav-theme="light"
      className="w-full bg-[#F5EEDD] py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16">
          {/* Text Column — narrow narrative reading width max-w-3xl */}
          <div data-story-reveal className="lg:col-span-7 max-w-3xl space-y-6">
            <div className="space-y-3">
              <p className=" text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
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
                <p className=" text-xs uppercase tracking-[0.06em] text-[#0C354C]/60">
                  Fundadora &amp; Directora de Alia
                </p>
              </div>
            </div>
          </div>

          {/* Image / Editorial Quote Column */}
          <div data-story-reveal className="lg:col-span-5 w-full max-w-md mx-auto lg:max-w-none">
            {founderImageSrc ? (
              <div className="relative aspect-4/5 w-full rounded-2xl overflow-hidden border border-[#DFD5C0] bg-[#FAF7F0]">
                <Image
                  src={founderImageSrc}
                  alt="Sofía Vega, Fundadora y Directora de Alia"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            ) : (
              <figure className="rounded-2xl border border-[#DFD5C0] bg-[#FAF7F0] p-8 sm:p-10 lg:p-12 space-y-6">
                <Quote className="size-10 text-[#16587B]/40" strokeWidth={1.5} aria-hidden="true" />
                <blockquote className="font-serif italic text-2xl sm:text-3xl leading-[1.3] text-[#0C354C]">
                  &ldquo;El compromiso social no requiere grandes recursos, sino una visión clara y
                  la determinación de ejecutarla.&rdquo;
                </blockquote>
                <figcaption className="pt-2 flex items-center gap-4">
                  <div className="w-10 h-0.5 bg-[#16587B] shrink-0" />
                  <div>
                    <p className="font-sans font-medium text-base text-[#0C354C]">Sofía Vega</p>
                    <p className="text-xs uppercase tracking-[0.06em] text-[#0C354C]/60">
                      Fundadora &amp; Directora de Alia
                    </p>
                  </div>
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
