import { FC, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonLinkProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  external?: boolean
  className?: string
}

export const ButtonLink: FC<ButtonLinkProps> = ({ href, children, variant = 'secondary', external, className }) => (
  <a
    href={href}
    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    className={cn(
      'inline-flex h-10 items-center rounded-md px-4 text-sm font-medium transition-colors',
      variant === 'primary'
        ? 'bg-ink text-bg hover:bg-accent'
        : 'border border-line-strong text-ink hover:border-ink',
      className
    )}
  >
    {children}
  </a>
)
