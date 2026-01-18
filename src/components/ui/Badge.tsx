/**
 * Terminal-styled Badge Component
 * Used for tech stack tags and labels
 */

import { forwardRef, HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  // Base styles
  `inline-flex items-center px-2 py-0.5 
   text-xs font-mono uppercase tracking-wide
   rounded-sm transition-colors duration-200`,
  {
    variants: {
      variant: {
        // Default outline badge
        default: `
          border border-phosphor-muted text-phosphor-dim bg-terminal-dark/50
          hover:border-phosphor hover:text-phosphor
        `,
        // Filled badge
        filled: `
          bg-phosphor/20 text-phosphor border border-phosphor/30
          hover:bg-phosphor/30
        `,
        // Tech stack specific colors
        react: 'border-cyan/50 text-cyan bg-cyan/10 hover:bg-cyan/20',
        typescript: 'border-blue-400/50 text-blue-400 bg-blue-400/10',
        node: 'border-green-400/50 text-green-400 bg-green-400/10',
        python: 'border-yellow-400/50 text-yellow-400 bg-yellow-400/10',
        database: 'border-purple-400/50 text-purple-400 bg-purple-400/10',
        
        // Status badges
        deployed: 'border-phosphor/50 text-phosphor bg-phosphor/10',
        'in-progress': 'border-amber/50 text-amber bg-amber/10',
        archived: 'border-gray-400/50 text-gray-400 bg-gray-400/10',
        
        // Ghost (no border)
        ghost: 'text-phosphor-dim hover:text-phosphor',
      },
      size: {
        sm: 'text-[10px] px-1.5 py-0.5',
        default: 'text-xs px-2 py-0.5',
        lg: 'text-sm px-3 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)
Badge.displayName = 'Badge'

/**
 * Get badge variant based on technology name
 */
export function getTechBadgeVariant(tech: string): BadgeProps['variant'] {
  const techLower = tech.toLowerCase()
  
  if (techLower.includes('react') || techLower.includes('next')) return 'react'
  if (techLower.includes('typescript') || techLower.includes('ts')) return 'typescript'
  if (techLower.includes('node') || techLower.includes('express')) return 'node'
  if (techLower.includes('python') || techLower.includes('django') || techLower.includes('flask')) return 'python'
  if (
    techLower.includes('sql') ||
    techLower.includes('mongo') ||
    techLower.includes('redis') ||
    techLower.includes('database')
  ) return 'database'
  
  return 'default'
}

export { Badge, badgeVariants }
