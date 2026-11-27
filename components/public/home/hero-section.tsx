'use client'

import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeroVideoCarousel } from './hero-video-carousel'
import { HERO_VIDEOS, type ResolvedHeroVideo } from './hero-videos'

gsap.registerPlugin(useGSAP)

interface HeroSectionProps {
  heroVideos?: ResolvedHeroVideo[]
}

export function HeroSection({ heroVideos = HERO_VIDEOS }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-hero-animate]', {
          y: 24,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
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
      data-nav-theme="dark"
      className="relative w-full h-[100dvh] min-h-[100dvh] overflow-hidden flex items-center justify-center bg-black"
    >
      {/* Background Video Carousel (auto-pauses inactive & offscreen videos) */}
      <HeroVideoCarousel videos={heroVideos} />

      {/* Readability Scrim — Deep Harbor veil to reduce video brightness and keep text crisp */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0C354C]/70 via-[#0C354C]/50 to-[#0C354C]/80"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,53,76,0.45)_0%,rgba(12,53,76,0.15)_75%)]"
        aria-hidden="true"
      />

      {/* Centered Editorial Content (no backdrop-blur over video) */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        <p
          data-hero-animate
          className="inline-flex items-center gap-2 rounded-full border border-[#84B3CE]/40 bg-[#0C354C]/75 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.06em] text-[#84B3CE] mb-7"
        >
          <span className="size-1.5 rounded-full bg-[#84B3CE]" aria-hidden="true" />
          Directorio Social
          <span className="size-1.5 rounded-full bg-[#84B3CE]" aria-hidden="true" />
          México
          <span className="size-1.5 rounded-full bg-[#84B3CE]" aria-hidden="true" />
          Querétaro
          <span className="size-1.5 rounded-full bg-[#84B3CE]" aria-hidden="true" />
        </p>

        <h1
          data-hero-animate
          className="font-sans font-light text-4xl sm:text-6xl lg:text-[72px] leading-[1.02] tracking-normal text-white mb-6"
        >
          Encuentra y apoya{' '}
          <span className="font-serif italic font-normal text-[#F5EEDD] text-[1.08em]">
            causas reales
          </span>{' '}
          en México.
        </h1>

        <p
          data-hero-animate
          className="font-sans font-normal text-base sm:text-xl lg:text-[22px] leading-[1.5] tracking-[-0.015em] text-[#F5EEDD]/90 max-w-2xl mb-10"
        >
          Cada conexión fortalece una comunidad. Descubre organizaciones verificadas, donatarias
          autorizadas e iniciativas jóvenes para apoyar sin intermediarios.
        </p>

        <div data-hero-animate className="flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            className="rounded-full bg-[#84B3CE] hover:bg-[#9AC3DA] text-[#0C354C] border border-[#84B3CE] px-4 py-2 h-auto font-sans text-[16px] font-medium tracking-[-0.015em] shadow-none transition-colors"
          >
            <Link href="/directory">
              Explorar Directorio
              <ArrowRight className="ml-2 size-4" strokeWidth={1.75} />
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="rounded-full bg-transparent hover:bg-[#84B3CE]/15 text-[#84B3CE] hover:text-white border border-[#84B3CE] px-4 py-2 h-auto font-sans text-[16px] font-medium tracking-[-0.015em] shadow-none transition-colors"
          >
            <Link href="/about">Sobre el proyecto</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
