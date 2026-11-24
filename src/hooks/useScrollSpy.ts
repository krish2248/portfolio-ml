/**
 * Tracks which section is in view, to highlight its nav link.
 */

import { useEffect, useState } from 'react'

interface UseScrollSpyOptions {
  sectionIds: string[]
  offset?: number
}

export function useScrollSpy({ sectionIds, offset = 100 }: UseScrollSpyOptions): string | null {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const line = window.scrollY + offset
      // The last section that starts above the line; none while the hero is showing.
      const current = sectionIds.filter((id) => {
        const el = document.getElementById(id)
        return el && el.offsetTop <= line
      })
      setActiveId(current[current.length - 1] ?? null)
    }

    // One update per frame, and always one after the last scroll event.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [sectionIds, offset])

  return activeId
}
