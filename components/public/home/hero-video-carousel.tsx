'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { HERO_VIDEOS, type ResolvedHeroVideo } from './hero-videos'
import { cn } from '@/lib/utils'

interface HeroVideoCarouselProps {
  videos?: ResolvedHeroVideo[]
  intervalMs?: number
}

export function HeroVideoCarousel({
  videos = HERO_VIDEOS,
  intervalMs = 7000,
}: HeroVideoCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [isInView, setIsInView] = useState(true)
  const [failedVideoMap, setFailedVideoMap] = useState<Record<number, boolean>>({})
  const [failedPosterMap, setFailedPosterMap] = useState<Record<number, boolean>>({})
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches)
    updatePreference()
    mediaQuery.addEventListener('change', updatePreference)
    return () => mediaQuery.removeEventListener('change', updatePreference)
  }, [])

  // Pause Hero playback completely when scrolled out of the first screen
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.05 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Auto-cycle slides only while Hero is visible and reduced motion is off
  useEffect(() => {
    if (prefersReducedMotion || !isInView || videos.length <= 1) return

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % videos.length)
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [intervalMs, isInView, prefersReducedMotion, videos.length])

  // Play ONLY the active video when in view; pause every inactive or offscreen video
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return
      const shouldPlay = index === activeIndex && isInView && !prefersReducedMotion
      if (shouldPlay) {
        const playPromise = video.play()
        if (playPromise && typeof playPromise.catch === 'function') {
          playPromise.catch(() => {})
        }
      } else if (!video.paused) {
        video.pause()
      }
    })
  }, [activeIndex, isInView, prefersReducedMotion])

  const handleVideoError = (index: number) => {
    setFailedVideoMap((prev) => (prev[index] ? prev : { ...prev, [index]: true }))
  }

  const handlePosterError = (index: number) => {
    setFailedPosterMap((prev) => (prev[index] ? prev : { ...prev, [index]: true }))
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-[#0C354C] via-[#124866] to-[#16587B]"
      aria-hidden="true"
    >
      {videos.map((item, index) => {
        const isActive = index === activeIndex
        const shouldRenderVideo =
          !prefersReducedMotion && item.hasVideoFile !== false && !failedVideoMap[index]
        const showPosterFallback = Boolean(item.poster) && !failedPosterMap[index]

        return (
          <div
            key={item.src}
            className={cn(
              'absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out will-change-[opacity]',
              isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
          >
            {showPosterFallback && (
              <Image
                src={item.poster!}
                alt={item.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
                onError={() => handlePosterError(index)}
              />
            )}

            {shouldRenderVideo && (
              <video
                ref={(el) => {
                  videoRefs.current[index] = el
                }}
                src={item.src}
                poster={item.poster}
                muted
                loop
                playsInline
                preload={index === 0 ? 'auto' : 'metadata'}
                onError={() => handleVideoError(index)}
                className="absolute inset-0 w-full h-full object-cover"
                aria-label={item.alt}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
