/**
 * Custom hook for tracking which section is currently in view
 * Used for highlighting active nav links
 */

import { useEffect, useState, useCallback } from 'react'
import { throttle } from '@/lib/utils'

interface UseScrollSpyOptions {
  sectionIds: string[]
  offset?: number
  throttleMs?: number
}

export function useScrollSpy({
  sectionIds,
  offset = 100,
  throttleMs = 100,
}: UseScrollSpyOptions): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + offset

    // Find the section that's currently in view
    let currentSection: string | null = null

    for (const id of sectionIds) {
      const element = document.getElementById(id)
      if (element) {
        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          currentSection = id
          break
        }
      }
    }

    // If we're at the top of the page, set the first section as active
    if (window.scrollY < 100 && sectionIds.length > 0) {
      currentSection = sectionIds[0]
    }

    // If we're at the bottom of the page, set the last section as active
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
      currentSection = sectionIds[sectionIds.length - 1]
    }

    setActiveId(currentSection)
  }, [sectionIds, offset])

  useEffect(() => {
    // Create throttled handler
    const throttledHandler = throttle(handleScroll, throttleMs)

    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener('scroll', throttledHandler, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledHandler)
    }
  }, [handleScroll, throttleMs])

  return activeId
}

/**
 * Hook to track scroll position
 */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY)
    }, 50)

    setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}

/**
 * Hook to detect if user has scrolled past a threshold
 */
export function useHasScrolled(threshold = 50): boolean {
  const scrollY = useScrollPosition()
  return scrollY > threshold
}
