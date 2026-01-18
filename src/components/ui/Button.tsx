/**
 * Terminal-styled Button Component
 * Features command prompt prefix and glow effects
 */

import { forwardRef, ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // Base styles
  `relative inline-flex items-center justify-center gap-2
   font-mono text-sm uppercase tracking-wider
   transition-all duration-300
   focus:outline-none focus:ring-2 focus:ring-offset-2
   disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        // Primary terminal button with border
        default: `
          border-2 border-phosphor text-phosphor bg-transparent
          hover:bg-phosphor hover:text-terminal-black
          focus:ring-phosphor focus:ring-offset-terminal-black
          dark:border-phosphor dark:text-phosphor
          dark:hover:bg-phosphor dark:hover:text-terminal-black
          light:border-paper-ink light:text-paper-ink
          light:hover:bg-paper-ink light:hover:text-paper
        `,
        // Secondary/ghost button
        ghost: `
          text-phosphor-dim hover:text-phosphor
          hover:bg-phosphor/10
          focus:ring-phosphor/50 focus:ring-offset-terminal-black
        `,
        // Link-style button
        link: `
          text-cyan underline-offset-4 hover:underline
          focus:ring-cyan focus:ring-offset-terminal-black
        `,
        // Accent button (amber)
        accent: `
          border-2 border-amber text-amber bg-transparent
          hover:bg-amber hover:text-terminal-black
          focus:ring-amber focus:ring-offset-terminal-black
        `,
        // Danger/destructive
        danger: `
          border-2 border-red-500 text-red-500 bg-transparent
          hover:bg-red-500 hover:text-terminal-black
          focus:ring-red-500 focus:ring-offset-terminal-black
        `,
      },
      size: {
        sm: 'px-3 py-1.5 text-xs',
        default: 'px-6 py-3',
        lg: 'px-8 py-4 text-base',
        icon: 'h-10 w-10',
      },
      glow: {
        true: '',
        false: '',
      },
    },
    compoundVariants: [
      // Add glow effect when hovered (dark mode only)
      {
        variant: 'default',
        glow: true,
        className: `
          hover:shadow-glow
          dark:hover:shadow-glow
        `,
      },
      {
        variant: 'accent',
        glow: true,
        className: 'hover:shadow-glow-amber',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      glow: true,
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  showPrompt?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, glow, asChild = false, showPrompt = true, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, glow, className }))}
        ref={ref}
        {...props}
      >
        {/* Terminal prompt prefix */}
        {showPrompt && variant === 'default' && (
          <span className="opacity-70">{'>'}</span>
        )}
        {children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
