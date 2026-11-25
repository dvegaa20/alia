'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface SectionTransitionProps {
  children: React.ReactNode
  className?: string
}

/**
 * GPU-only full-screen section boundary transition inspired by eco.com.
 * Animates only transform (y, scale) and opacity with force3D — zero scroll hijacking,
 * zero heavy scrub reflows, and full prefers-reduced-motion respect.
 */
export function SectionTransition({ children, className }: SectionTransitionProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const triggerEl = wrapperRef.current
      const innerEl = innerRef.current
      if (!triggerEl || !innerEl) return

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(innerEl, {
          y: 36,
          scale: 0.985,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          force3D: true,
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: triggerEl,
            start: 'top 82%',
            once: true,
            fastScrollEnd: true,
          },
        })
      })
    },
    { scope: wrapperRef }
  )

  return (
    <div ref={wrapperRef} className={cn('w-full', className)}>
      <div ref={innerRef} className="w-full will-change-transform">
        {children}
      </div>
    </div>
  )
}
