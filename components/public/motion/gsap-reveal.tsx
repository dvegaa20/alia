'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger, useGSAP)

interface GsapRevealProps {
  children: React.ReactNode
  className?: string
  staggerSelector?: string
  stagger?: number
  y?: number
  duration?: number
  delay?: number
}

export function GsapReveal({
  children,
  className,
  staggerSelector,
  stagger = 0.09,
  y = 24,
  duration = 0.75,
  delay = 0,
}: GsapRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = containerRef.current
      if (!el) return

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const targets = staggerSelector ? el.querySelectorAll(staggerSelector) : el
        if (staggerSelector && (targets as NodeListOf<Element>).length === 0) return

        gsap.from(targets, {
          y,
          opacity: 0,
          duration,
          delay,
          stagger: staggerSelector ? stagger : 0,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        })
      })
    },
    { scope: containerRef }
  )

  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  )
}
