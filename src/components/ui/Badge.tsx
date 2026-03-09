/**
 * Badge Component
 */

import { forwardRef, HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  `inline-flex items-center px-2 py-0.5 text-xs font-mono uppercase tracking-wide rounded-sm transition-colors duration-200`,
  {
    variants: {
      variant: {
        default: 'border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800/50 hover:border-blue-500 hover:text-blue-500',
        filled: 'bg-blue-500/20 text-blue-500 border border-blue-500/30 hover:bg-blue-500/30',
        react: 'border-cyan-400/50 text-cyan-400 bg-cyan-400/10 hover:bg-cyan-400/20',
        typescript: 'border-blue-400/50 text-blue-400 bg-blue-400/10',
        node: 'border-green-400/50 text-green-400 bg-green-400/10',
        python: 'border-yellow-400/50 text-yellow-400 bg-yellow-400/10',
        database: 'border-purple-400/50 text-purple-400 bg-purple-400/10',
        deployed: 'border-green-400/50 text-green-400 bg-green-400/10',
        'in-progress': 'border-amber-400/50 text-amber-400 bg-amber-400/10',
        archived: 'border-slate-400/50 text-slate-400 bg-slate-400/10',
        ghost: 'text-slate-600 dark:text-slate-400 hover:text-blue-500',
      },
      size: { sm: 'text-[10px] px-1.5 py-0.5', default: 'text-xs px-2 py-0.5', lg: 'text-sm px-3 py-1' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(({ className, variant, size, ...props }, ref) => (
  <span ref={ref} className={cn(badgeVariants({ variant, size, className }))} {...props} />
))
Badge.displayName = 'Badge'

export function getTechBadgeVariant(tech: string): BadgeProps['variant'] {
  const techLower = tech.toLowerCase()
  if (techLower.includes('react') || techLower.includes('next')) return 'react'
  if (techLower.includes('typescript') || techLower.includes('ts')) return 'typescript'
  if (techLower.includes('node') || techLower.includes('express')) return 'node'
  if (techLower.includes('python') || techLower.includes('django') || techLower.includes('flask')) return 'python'
  if (techLower.includes('sql') || techLower.includes('mongo') || techLower.includes('redis') || techLower.includes('database')) return 'database'
  return 'default'
}

export { Badge, badgeVariants }
