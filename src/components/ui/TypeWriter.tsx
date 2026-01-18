/**
 * TypeWriter Component
 * Animates text character by character with cursor
 */

import { forwardRef, HTMLAttributes, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TypeWriterProps extends HTMLAttributes<HTMLSpanElement> {
  text: string
  speed?: number
  delay?: number
  cursor?: boolean
  cursorChar?: string
  onComplete?: () => void
  enabled?: boolean
}

const TypeWriter = forwardRef<HTMLSpanElement, TypeWriterProps>(
  (
    {
      className,
      text,
      speed = 50,
      delay = 0,
      cursor = true,
      cursorChar = '█',
      onComplete,
      enabled = true,
      ...props
    },
    ref
  ) => {
    const [displayedText, setDisplayedText] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
      if (!enabled) {
        setDisplayedText('')
        setIsComplete(false)
        return
      }

      // Initial delay
      const startTimeout = setTimeout(() => {
        setIsTyping(true)
      }, delay)

      return () => clearTimeout(startTimeout)
    }, [enabled, delay, text])

    useEffect(() => {
      if (!isTyping) return

      if (displayedText.length < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1))
        }, speed)

        return () => clearTimeout(timeout)
      } else {
        setIsTyping(false)
        setIsComplete(true)
        onComplete?.()
      }
    }, [isTyping, displayedText, text, speed, onComplete])

    return (
      <span ref={ref} className={cn('font-mono', className)} {...props}>
        {displayedText}
        {cursor && !isComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            className="text-phosphor"
          >
            {cursorChar}
          </motion.span>
        )}
        {cursor && isComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
            className="text-phosphor"
          >
            {cursorChar}
          </motion.span>
        )}
      </span>
    )
  }
)
TypeWriter.displayName = 'TypeWriter'

/**
 * Multi-line TypeWriter that types multiple lines sequentially
 */
interface MultiLineTypeWriterProps extends HTMLAttributes<HTMLDivElement> {
  lines: string[]
  lineSpeed?: number
  charSpeed?: number
  lineDelay?: number
  cursor?: boolean
  onComplete?: () => void
  enabled?: boolean
  prefix?: string
}

const MultiLineTypeWriter = forwardRef<HTMLDivElement, MultiLineTypeWriterProps>(
  (
    {
      className,
      lines,
      lineSpeed = 100,
      charSpeed = 30,
      lineDelay = 0,
      cursor = true,
      onComplete,
      enabled = true,
      prefix = '',
      ...props
    },
    ref
  ) => {
    const [currentLineIndex, setCurrentLineIndex] = useState(0)
    const [completedLines, setCompletedLines] = useState<string[]>([])
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
      if (!enabled) {
        setCurrentLineIndex(0)
        setCompletedLines([])
        setIsComplete(false)
      }
    }, [enabled])

    const handleLineComplete = () => {
      const completedLine = lines[currentLineIndex]
      setCompletedLines((prev) => [...prev, completedLine])

      if (currentLineIndex < lines.length - 1) {
        setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1)
        }, lineSpeed)
      } else {
        setIsComplete(true)
        onComplete?.()
      }
    }

    return (
      <div ref={ref} className={cn('font-mono space-y-1', className)} {...props}>
        {/* Completed lines */}
        {completedLines.map((line, index) => (
          <div key={index} className="text-phosphor">
            {prefix && <span className="text-phosphor-dim">{prefix}</span>}
            {line}
          </div>
        ))}

        {/* Currently typing line */}
        {enabled && !isComplete && currentLineIndex < lines.length && (
          <div className="text-phosphor">
            {prefix && <span className="text-phosphor-dim">{prefix}</span>}
            <TypeWriter
              text={lines[currentLineIndex]}
              speed={charSpeed}
              delay={currentLineIndex === 0 ? lineDelay : 0}
              cursor={cursor}
              onComplete={handleLineComplete}
              enabled={enabled}
            />
          </div>
        )}
      </div>
    )
  }
)
MultiLineTypeWriter.displayName = 'MultiLineTypeWriter'

/**
 * Staggered text reveal (each letter animates in)
 */
interface StaggeredTextProps extends HTMLAttributes<HTMLSpanElement> {
  text: string
  staggerDelay?: number
  initialDelay?: number
}

const StaggeredText = forwardRef<HTMLSpanElement, StaggeredTextProps>(
  ({ className, text, staggerDelay = 0.03, initialDelay = 0, ...props }, ref) => {
    const letters = text.split('')

    return (
      <span ref={ref} className={cn('inline-block', className)} {...props}>
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: initialDelay + index * staggerDelay,
              duration: 0.3,
            }}
            className="inline-block"
            style={{ whiteSpace: letter === ' ' ? 'pre' : 'normal' }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
    )
  }
)
StaggeredText.displayName = 'StaggeredText'

export { TypeWriter, MultiLineTypeWriter, StaggeredText }
