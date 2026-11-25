'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Sparkles } from 'lucide-react'

gsap.registerPlugin(useGSAP)

export function AboutHeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-about-hero]', {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          force3D: true,
          clearProps: 'transform,opacity',
        })
      })
    },
    { scope: heroRef }
  )

  return (
    <section
      ref={heroRef}
      data-nav-theme="light"
      className="w-full bg-[#F5EEDD] pt-28 pb-16 lg:pt-36 lg:pb-24"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-14">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <div data-about-hero className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#16587B]/25 bg-[#16587B]/10 px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-[0.06em] text-[#16587B]">
              <Sparkles className="size-3.5" strokeWidth={1.5} />
              Sobre el proyecto
            </span>
          </div>

          <h1
            data-about-hero
            className="font-sans font-light text-4xl sm:text-6xl lg:text-[68px] leading-[1.03] tracking-normal text-[#0C354C] mb-6"
          >
            Nuestra misión:{' '}
            <span className="font-serif italic font-normal text-[#16587B] text-[1.06em]">
              conectar personas
            </span>{' '}
            con causas reales.
          </h1>

          <p
            data-about-hero
            className="font-sans text-lg sm:text-xl text-[#0C354C]/80 leading-[1.6] max-w-2xl"
          >
            Una iniciativa familiar, sin fines de lucro, nacida del deseo de hacer el bien accesible
            para todos en México.
          </p>

          <div data-about-hero className="mt-10 flex items-center gap-3">
            <div className="w-8 h-px bg-[#DFD5C0]" />
            <span className="font-mono text-xs uppercase tracking-[0.06em] text-[#0C354C]/60">
              Alia · Directorio Social · México
            </span>
            <div className="w-8 h-px bg-[#DFD5C0]" />
          </div>
        </div>
      </div>
    </section>
  )
}
