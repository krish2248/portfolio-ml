/**
 * Progress Bar Component
 * Animated skill level indicator with terminal aesthetic
 */

import { forwardRef, HTMLAttributes, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useIsInView } from '@/hooks/useInView'
import { useRef } from 'react'

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number // 0-100
  label?: string
  showValue?: boolean
  animated?: boolean
  variant?: 'default' | 'ascii' | 'blocks'
  size?: 'sm' | 'default' | 'lg'
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value,
      label,
      showValue = true,
      animated = true,
      variant = 'default',
      size = 'default',
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const inView = useIsInView(containerRef, { threshold: 0.5, triggerOnce: true })
    const [displayValue, setDisplayValue] = useState(animated ? 0 : value)

    // Animate value when in view
    useEffect(() => {
      if (inView && animated) {
        const timer = setTimeout(() => {
          setDisplayValue(value)
        }, 100)
        return () => clearTimeout(timer)
      } else if (!animated) {
        setDisplayValue(value)
      }
    }, [inView, animated, value])

    // ASCII-style progress bar
    if (variant === 'ascii') {
      const totalBlocks = 20
      const filledBlocks = Math.round((displayValue / 100) * totalBlocks)
      const emptyBlocks = totalBlocks - filledBlocks
      const asciiBar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks)

      return (
        <div ref={containerRef} className={cn('font-mono', className)} {...props}>
          <div className="flex items-center gap-3">
            {label && <span className="text-phosphor-dim min-w-[100px]">{label}</span>}
            <span className="text-phosphor tracking-tight">{asciiBar}</span>
            {showValue && <span className="text-phosphor-dim">{displayValue}%</span>}
          </div>
        </div>
      )
    }

    // Block-style progress bar
    if (variant === 'blocks') {
      const totalBlocks = 10
      const filledBlocks = Math.round((displayValue / 100) * totalBlocks)

      return (
        <div ref={containerRef} className={cn('font-mono', className)} {...props}>
          <div className="flex items-center gap-3">
            {label && <span className="text-phosphor-dim min-w-[100px]">{label}</span>}
            <div className="flex gap-0.5">
              {Array.from({ length: totalBlocks }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={
                    inView
                      ? {
                          opacity: i < filledBlocks ? 1 : 0.3,
                          scale: 1,
                        }
                      : {}
                  }
                  transition={{ delay: i * 0.05, duration: 0.2 }}
                  className={cn(
                    'w-3 h-4 rounded-sm',
                    i < filledBlocks ? 'bg-phosphor shadow-glow' : 'bg-phosphor-muted'
                  )}
                />
              ))}
            </div>
            {showValue && <span className="text-phosphor-dim ml-2">{displayValue}%</span>}
          </div>
        </div>
      )
    }

    // Default bar style
    const heights = {
      sm: 'h-2',
      default: 'h-4',
      lg: 'h-6',
    }

    return (
      <div ref={containerRef} className={cn('w-full', className)} {...props}>
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-1">
            {label && <span className="text-sm text-phosphor-dim font-mono">{label}</span>}
            {showValue && (
              <span className="text-sm text-phosphor font-mono">{displayValue}%</span>
            )}
          </div>
        )}
        <div
          ref={ref}
          className={cn(
            'w-full bg-terminal-dark border border-phosphor-muted rounded-sm overflow-hidden',
            heights[size]
          )}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: inView ? `${displayValue}%` : 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className={cn(
              'h-full bg-phosphor rounded-sm',
              'shadow-[0_0_10px_rgba(0,255,65,0.4)]'
            )}
          />
        </div>
      </div>
    )
  }
)
ProgressBar.displayName = 'ProgressBar'

export { ProgressBar }
