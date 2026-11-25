'use client'

import { useState, useEffect } from 'react'
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
  const [activeIndex, setActiveIndex] = useState(0)
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

  useEffect(() => {
    if (prefersReducedMotion || videos.length <= 1) return

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % videos.length)
    }, intervalMs)

    return () => window.clearInterval(timer)
  }, [intervalMs, prefersReducedMotion, videos.length])

  const handleVideoError = (index: number) => {
    setFailedVideoMap((prev) => (prev[index] ? prev : { ...prev, [index]: true }))
  }

  const handlePosterError = (index: number) => {
    setFailedPosterMap((prev) => (prev[index] ? prev : { ...prev, [index]: true }))
  }

  return (
    <div
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
              'absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out',
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
                src={item.src}
                poster={item.poster}
                autoPlay
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
