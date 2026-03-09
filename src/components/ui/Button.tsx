/**
 * Button Component
 */

import { forwardRef, ButtonHTMLAttributes } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  `relative inline-flex items-center justify-center gap-2 font-mono text-sm uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: 'border-2 border-blue-500 text-blue-500 bg-transparent hover:bg-blue-500 hover:text-white focus:ring-blue-500 dark:focus:ring-offset-slate-900 focus:ring-offset-white',
        ghost: 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 focus:ring-blue-500/50 dark:focus:ring-offset-slate-900 focus:ring-offset-white',
        link: 'text-blue-500 underline-offset-4 hover:underline focus:ring-blue-500 dark:focus:ring-offset-slate-900 focus:ring-offset-white',
        accent: 'border-2 border-amber-500 text-amber-500 bg-transparent hover:bg-amber-500 hover:text-white focus:ring-amber-500 dark:focus:ring-offset-slate-900 focus:ring-offset-white',
        danger: 'border-2 border-red-500 text-red-500 bg-transparent hover:bg-red-500 hover:text-white focus:ring-red-500 dark:focus:ring-offset-slate-900 focus:ring-offset-white',
      },
      size: { sm: 'px-3 py-1.5 text-xs', default: 'px-6 py-3', lg: 'px-8 py-4 text-base', icon: 'h-10 w-10' },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> { asChild?: boolean; showPrompt?: boolean }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, showPrompt = true, children, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button'
  return (<Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>{showPrompt && variant === 'default' && <span className="opacity-70">{'>'}</span>}{children}</Comp>)
})
Button.displayName = 'Button'

export { Button, buttonVariants }
