import { FC, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonLinkProps {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary'
  external?: boolean
  /** File name to save as. */
  download?: string
  className?: string
}

export const ButtonLink: FC<ButtonLinkProps> = ({ href, children, variant = 'secondary', external, download, className }) => (
  <a
    href={href}
    download={download}
    {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
    className={cn(
      'inline-flex min-h-11 items-center rounded-md px-4 py-2 font-medium transition-colors',
      variant === 'primary'
        ? 'bg-ink text-bg hover:bg-accent'
        : 'border border-muted text-ink hover:border-ink',
      className
    )}
  >
    {children}
  </a>
)
