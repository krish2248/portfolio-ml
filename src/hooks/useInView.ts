/**
 * Custom hook for detecting elements in viewport
 * Uses IntersectionObserver for performance
 */

import { useEffect, useRef, useState, useCallback } from 'react'

interface UseInViewOptions {
  threshold?: number | number[]
  root?: Element | null
  rootMargin?: string
  triggerOnce?: boolean
  onChange?: (inView: boolean, entry: IntersectionObserverEntry) => void
}

interface UseInViewReturn {
  ref: React.RefObject<HTMLElement>
  inView: boolean
  entry: IntersectionObserverEntry | undefined
}

export function useInView(options: UseInViewOptions = {}): UseInViewReturn {
  const {
    threshold = 0,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
    onChange,
  } = options

  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const hasTriggered = useRef(false)

  const updateEntry = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (triggerOnce && hasTriggered.current) return

      setEntry(entry)
      setInView(entry.isIntersecting)
      onChange?.(entry.isIntersecting, entry)

      if (triggerOnce && entry.isIntersecting) {
        hasTriggered.current = true
      }
    },
    [triggerOnce, onChange]
  )

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(updateEntry, {
      threshold,
      root,
      rootMargin,
    })

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [threshold, root, rootMargin, updateEntry])

  return { ref: ref as React.RefObject<HTMLElement>, inView, entry }
}

/**
 * Simplified hook that just returns inView state
 */
export function useIsInView(
  ref: React.RefObject<HTMLElement>,
  options: Omit<UseInViewOptions, 'onChange'> = {}
): boolean {
  const { threshold = 0, root = null, rootMargin = '0px', triggerOnce = false } = options
  const [inView, setInView] = useState(false)
  const hasTriggered = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (!('IntersectionObserver' in window)) {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (triggerOnce && hasTriggered.current) return

        setInView(entry.isIntersecting)

        if (triggerOnce && entry.isIntersecting) {
          hasTriggered.current = true
        }
      },
      { threshold, root, rootMargin }
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [ref, threshold, root, rootMargin, triggerOnce])

  return inView
}
