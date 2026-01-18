/**
 * Terminal-styled Card Component
 * Features border glow and terminal aesthetic
 */

import { forwardRef, HTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva(
  // Base styles
  `rounded-lg overflow-hidden transition-all duration-300`,
  {
    variants: {
      variant: {
        // Default terminal card with border
        default: `
          border border-phosphor-muted bg-terminal-dark/50 backdrop-blur-sm
          hover:border-phosphor
          dark:border-phosphor-muted dark:bg-terminal-dark/50
          dark:hover:border-phosphor
        `,
        // Solid background
        solid: `
          bg-terminal-dark border border-phosphor-muted
          hover:border-phosphor
        `,
        // Ghost/transparent
        ghost: `
          bg-transparent border border-transparent
          hover:border-phosphor-muted hover:bg-terminal-dark/30
        `,
        // Elevated with more prominent shadow
        elevated: `
          border border-phosphor-muted bg-terminal-dark
          shadow-lg shadow-black/20
          hover:border-phosphor hover:shadow-glow
        `,
      },
      padding: {
        none: '',
        sm: 'p-3',
        default: 'p-4 md:p-6',
        lg: 'p-6 md:p-8',
      },
      interactive: {
        true: 'cursor-pointer',
        false: '',
      },
    },
    compoundVariants: [
      {
        interactive: true,
        className: `
          hover:shadow-glow
          active:scale-[0.98]
        `,
      },
    ],
    defaultVariants: {
      variant: 'default',
      padding: 'default',
      interactive: false,
    },
  }
)

export interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, interactive, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, padding, interactive, className }))}
        {...props}
      />
    )
  }
)
Card.displayName = 'Card'

// Card Header
const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col space-y-1.5 pb-4', className)}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

// Card Title
const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-lg font-display font-semibold text-phosphor', className)}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

// Card Description
const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-sm text-phosphor-dim', className)}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

// Card Content
const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

// Card Footer
const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center pt-4', className)}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants }
