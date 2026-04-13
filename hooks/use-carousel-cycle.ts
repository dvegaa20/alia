'use client'

import { useState, useEffect } from 'react'

export function useCarouselCycle<T>(items: T[], intervalMs: number) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Track previous to inform animation direction if needed
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!items.length) return

    const interval = setInterval(() => {
      // Pause automatic cycling if the tab is not visible
      if (document.hidden) return

      setPreviousIndex(currentIndex)
      setCurrentIndex((current) => (current + 1) % items.length)
    }, intervalMs)

    return () => clearInterval(interval)
  }, [items.length, intervalMs, currentIndex])

  return {
    current: items[currentIndex],
    currentIndex,
    previous: previousIndex !== null ? items[previousIndex] : null,
    previousIndex,
  }
}
