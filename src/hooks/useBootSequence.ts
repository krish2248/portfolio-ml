/**
 * Custom hook for managing the boot sequence animation
 * Orchestrates the terminal boot effect on page load
 */

import { useState, useEffect, useCallback } from 'react'
import { bootSequence } from '@/lib/data'
import { prefersReducedMotion } from '@/lib/utils'

interface UseBootSequenceOptions {
  enabled?: boolean
  onComplete?: () => void
  skipKey?: string
}

interface UseBootSequenceReturn {
  lines: string[]
  isBooting: boolean
  isComplete: boolean
  progress: number
  skip: () => void
}

export function useBootSequence({
  enabled = true,
  onComplete,
  skipKey = 'Enter',
}: UseBootSequenceOptions = {}): UseBootSequenceReturn {
  const [lines, setLines] = useState<string[]>([])
  const [isBooting, setIsBooting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [currentLineIndex, setCurrentLineIndex] = useState(0)

  // Check if we should skip the animation
  const shouldSkip = !enabled || prefersReducedMotion()

  // Skip function
  const skip = useCallback(() => {
    setLines(bootSequence)
    setCurrentLineIndex(bootSequence.length)
    setIsBooting(false)
    setIsComplete(true)
    onComplete?.()
  }, [onComplete])

  // Handle keypress to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isBooting && (e.key === skipKey || e.key === 'Escape')) {
        skip()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isBooting, skipKey, skip])

  // Handle click to skip
  useEffect(() => {
    const handleClick = () => {
      if (isBooting) {
        skip()
      }
    }

    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [isBooting, skip])

  // Start boot sequence
  useEffect(() => {
    if (shouldSkip) {
      skip()
      return
    }

    // Small delay before starting
    const startTimeout = setTimeout(() => {
      setIsBooting(true)
    }, 300)

    return () => clearTimeout(startTimeout)
  }, [shouldSkip, skip])

  // Add lines progressively
  useEffect(() => {
    if (!isBooting || currentLineIndex >= bootSequence.length) return

    // Variable timing for more realistic effect
    const line = bootSequence[currentLineIndex]
    const baseDelay = 80
    const extraDelay = line.includes('...') ? 300 : line === '' ? 100 : 0
    const delay = baseDelay + extraDelay + Math.random() * 50

    const timeout = setTimeout(() => {
      setLines((prev) => [...prev, line])
      setCurrentLineIndex((prev) => prev + 1)
    }, delay)

    return () => clearTimeout(timeout)
  }, [isBooting, currentLineIndex])

  // Check for completion
  useEffect(() => {
    if (currentLineIndex >= bootSequence.length && isBooting) {
      // Small delay after last line
      const timeout = setTimeout(() => {
        setIsBooting(false)
        setIsComplete(true)
        onComplete?.()
      }, 500)

      return () => clearTimeout(timeout)
    }
  }, [currentLineIndex, isBooting, onComplete])

  return {
    lines,
    isBooting,
    isComplete,
    progress: (currentLineIndex / bootSequence.length) * 100,
    skip,
  }
}
