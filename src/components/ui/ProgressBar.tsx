/**
 * Progress Bar Component
 */

import { forwardRef, HTMLAttributes, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useIsInView } from '@/hooks/useInView'
import { useRef } from 'react'

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number
  label?: string
  showValue?: boolean
  animated?: boolean
  variant?: 'default' | 'ascii' | 'blocks'
  size?: 'sm' | 'default' | 'lg'
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(({ className, value, label, showValue = true, animated = true, variant = 'default', size = 'default', ...props }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const inView = useIsInView(containerRef, { threshold: 0.5, triggerOnce: true })
  const [displayValue, setDisplayValue] = useState(animated ? 0 : value)

  useEffect(() => {
    if (inView && animated) { const timer = setTimeout(() => setDisplayValue(value), 100); return () => clearTimeout(timer) }
    else if (!animated) setDisplayValue(value)
  }, [inView, animated, value])

  if (variant === 'ascii') {
    const totalBlocks = 20, filledBlocks = Math.round((displayValue / 100) * totalBlocks), emptyBlocks = totalBlocks - filledBlocks
    const asciiBar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks)
    return (<div ref={containerRef} className={cn('font-mono', className)} {...props}><div className="flex items-center gap-3">{label && <span className="dark:text-slate-400 text-slate-600 min-w-[100px]">{label}</span>}<span className="text-blue-500 tracking-tight">{asciiBar}</span>{showValue && <span className="dark:text-slate-400 text-slate-600">{displayValue}%</span>}</div></div>)
  }

  if (variant === 'blocks') {
    const totalBlocks = 10, filledBlocks = Math.round((displayValue / 100) * totalBlocks)
    return (<div ref={containerRef} className={cn('font-mono', className)} {...props}><div className="flex items-center gap-3">{label && <span className="dark:text-slate-400 text-slate-600 min-w-[100px]">{label}</span>}<div className="flex gap-0.5">{Array.from({ length: totalBlocks }).map((_, i) => (<motion.div key={i} initial={{ opacity: 0, scale: 0 }} animate={inView ? { opacity: i < filledBlocks ? 1 : 0.3, scale: 1 } : {}} transition={{ delay: i * 0.05, duration: 0.2 }} className={cn('w-3 h-4 rounded-sm', i < filledBlocks ? 'bg-blue-500' : 'dark:bg-slate-600 bg-slate-400')} />))}</div>{showValue && <span className="ml-2 dark:text-slate-400 text-slate-600">{displayValue}%</span>}</div></div>)
  }

  const heights = { sm: 'h-2', default: 'h-4', lg: 'h-6' }

  return (
    <div ref={containerRef} className={cn('w-full', className)} {...props}>
      {(label || showValue) && (<div className="flex justify-between items-center mb-1">{label && <span className="text-sm dark:text-slate-400 text-slate-600 font-mono">{label}</span>}{showValue && <span className="text-sm text-blue-500 font-mono">{displayValue}%</span>}</div>)}
      <div ref={ref} className={cn('w-full dark:bg-slate-700 bg-slate-200 border border-slate-300 dark:border-slate-600 rounded-sm overflow-hidden', heights[size])}>
        <motion.div initial={{ width: 0 }} animate={{ width: inView ? `${displayValue}%` : 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }} className="h-full bg-blue-500 rounded-sm" />
      </div>
    </div>
  )
})
ProgressBar.displayName = 'ProgressBar'

export { ProgressBar }
