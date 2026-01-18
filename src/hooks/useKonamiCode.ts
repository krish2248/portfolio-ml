/**
 * Custom hook for detecting Konami Code input
 * Easter egg: ↑ ↑ ↓ ↓ ← → ← → B A
 */

import { useEffect, useState, useCallback } from 'react'

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
]

interface UseKonamiCodeOptions {
  onActivate?: () => void
  timeout?: number
}

interface UseKonamiCodeReturn {
  isActivated: boolean
  progress: number
  reset: () => void
}

export function useKonamiCode({
  onActivate,
  timeout = 5000,
}: UseKonamiCodeOptions = {}): UseKonamiCodeReturn {
  const [inputSequence, setInputSequence] = useState<string[]>([])
  const [isActivated, setIsActivated] = useState(false)
  const [lastKeyTime, setLastKeyTime] = useState<number>(0)

  const reset = useCallback(() => {
    setInputSequence([])
    setIsActivated(false)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now()

      // Reset if too much time has passed between keys
      if (now - lastKeyTime > timeout && inputSequence.length > 0) {
        setInputSequence([])
      }

      setLastKeyTime(now)

      // Get the key code
      const key = e.code

      // Check if this key could be part of the sequence
      const nextIndex = inputSequence.length
      const expectedKey = KONAMI_CODE[nextIndex]

      if (key === expectedKey) {
        const newSequence = [...inputSequence, key]
        setInputSequence(newSequence)

        // Check if sequence is complete
        if (newSequence.length === KONAMI_CODE.length) {
          setIsActivated(true)
          onActivate?.()
          // Reset after a short delay
          setTimeout(reset, 100)
        }
      } else if (key === KONAMI_CODE[0]) {
        // Start new sequence if first key matches
        setInputSequence([key])
      } else {
        // Reset on wrong key
        setInputSequence([])
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [inputSequence, lastKeyTime, timeout, onActivate, reset])

  return {
    isActivated,
    progress: (inputSequence.length / KONAMI_CODE.length) * 100,
    reset,
  }
}

/**
 * Hook for triggering Matrix rain effect (Konami code easter egg)
 */
export function useMatrixRain(duration = 5000): boolean {
  const [isActive, setIsActive] = useState(false)

  useKonamiCode({
    onActivate: () => {
      setIsActive(true)
      setTimeout(() => setIsActive(false), duration)
    },
  })

  return isActive
}
