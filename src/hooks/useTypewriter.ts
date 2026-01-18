/**
 * Custom hook for typewriter animation effect
 * Types out text character by character
 */

import { useState, useEffect, useCallback } from 'react'

interface UseTypewriterOptions {
  text: string
  speed?: number
  delay?: number
  onComplete?: () => void
  enabled?: boolean
}

interface UseTypewriterReturn {
  displayedText: string
  isTyping: boolean
  isComplete: boolean
  reset: () => void
  skip: () => void
}

export function useTypewriter({
  text,
  speed = 50,
  delay = 0,
  onComplete,
  enabled = true,
}: UseTypewriterOptions): UseTypewriterReturn {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  // Reset function
  const reset = useCallback(() => {
    setDisplayedText('')
    setCurrentIndex(0)
    setIsTyping(false)
    setIsComplete(false)
  }, [])

  // Skip to end
  const skip = useCallback(() => {
    setDisplayedText(text)
    setCurrentIndex(text.length)
    setIsTyping(false)
    setIsComplete(true)
    onComplete?.()
  }, [text, onComplete])

  // Handle the typing effect
  useEffect(() => {
    if (!enabled) {
      reset()
      return
    }

    // Initial delay before starting
    const delayTimeout = setTimeout(() => {
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(delayTimeout)
  }, [enabled, delay, reset])

  useEffect(() => {
    if (!isTyping || currentIndex >= text.length) return

    const timeout = setTimeout(() => {
      setDisplayedText(text.slice(0, currentIndex + 1))
      setCurrentIndex((prev) => prev + 1)
    }, speed)

    return () => clearTimeout(timeout)
  }, [isTyping, currentIndex, text, speed])

  // Check for completion
  useEffect(() => {
    if (currentIndex >= text.length && isTyping) {
      setIsTyping(false)
      setIsComplete(true)
      onComplete?.()
    }
  }, [currentIndex, text.length, isTyping, onComplete])

  return {
    displayedText,
    isTyping,
    isComplete,
    reset,
    skip,
  }
}

/**
 * Hook for typing multiple lines sequentially
 */
interface UseMultiLineTypewriterOptions {
  lines: string[]
  lineSpeed?: number
  lineDelay?: number
  charSpeed?: number
  onLineComplete?: (lineIndex: number) => void
  onAllComplete?: () => void
  enabled?: boolean
}

interface UseMultiLineTypewriterReturn {
  displayedLines: string[]
  currentLineIndex: number
  isTyping: boolean
  isComplete: boolean
  reset: () => void
  skip: () => void
}

export function useMultiLineTypewriter({
  lines,
  lineSpeed = 50,
  lineDelay = 200,
  charSpeed = 30,
  onLineComplete,
  onAllComplete,
  enabled = true,
}: UseMultiLineTypewriterOptions): UseMultiLineTypewriterReturn {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [currentCharIndex, setCurrentCharIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const reset = useCallback(() => {
    setDisplayedLines([])
    setCurrentLineIndex(0)
    setCurrentCharIndex(0)
    setIsTyping(false)
    setIsComplete(false)
  }, [])

  const skip = useCallback(() => {
    setDisplayedLines(lines)
    setCurrentLineIndex(lines.length)
    setIsTyping(false)
    setIsComplete(true)
    onAllComplete?.()
  }, [lines, onAllComplete])

  // Start typing after initial delay
  useEffect(() => {
    if (!enabled) {
      reset()
      return
    }

    const timeout = setTimeout(() => {
      setIsTyping(true)
    }, lineDelay)

    return () => clearTimeout(timeout)
  }, [enabled, lineDelay, reset])

  // Handle character-by-character typing
  useEffect(() => {
    if (!isTyping || currentLineIndex >= lines.length) return

    const currentLine = lines[currentLineIndex]

    if (currentCharIndex < currentLine.length) {
      // Type next character
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev]
          newLines[currentLineIndex] = currentLine.slice(0, currentCharIndex + 1)
          return newLines
        })
        setCurrentCharIndex((prev) => prev + 1)
      }, charSpeed)

      return () => clearTimeout(timeout)
    } else {
      // Line complete, move to next
      const timeout = setTimeout(() => {
        onLineComplete?.(currentLineIndex)
        setCurrentLineIndex((prev) => prev + 1)
        setCurrentCharIndex(0)
        setDisplayedLines((prev) => [...prev, ''])
      }, lineSpeed)

      return () => clearTimeout(timeout)
    }
  }, [isTyping, currentLineIndex, currentCharIndex, lines, charSpeed, lineSpeed, onLineComplete])

  // Check for completion
  useEffect(() => {
    if (currentLineIndex >= lines.length && isTyping) {
      setIsTyping(false)
      setIsComplete(true)
      onAllComplete?.()
    }
  }, [currentLineIndex, lines.length, isTyping, onAllComplete])

  return {
    displayedLines: displayedLines.filter((_, i) => i <= currentLineIndex),
    currentLineIndex,
    isTyping,
    isComplete,
    reset,
    skip,
  }
}
