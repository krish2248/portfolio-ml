/**
 * Terminal Window Component
 * Reusable frame that looks like a terminal window
 */

import { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TerminalWindowProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  showControls?: boolean
  variant?: 'default' | 'minimal' | 'bordered'
}

const TerminalWindow = forwardRef<HTMLDivElement, TerminalWindowProps>(
  ({ className, title, showControls = true, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-lg overflow-hidden',
          variant === 'default' && [
            'border border-phosphor-muted',
            'bg-terminal-dark/80 backdrop-blur-sm',
            'shadow-terminal',
          ],
          variant === 'minimal' && 'bg-terminal-dark/50',
          variant === 'bordered' && [
            'border-2 border-phosphor',
            'bg-terminal-dark',
            'shadow-glow',
          ],
          className
        )}
        {...props}
      >
        {/* Window header/title bar */}
        {(title || showControls) && (
          <div
            className={cn(
              'flex items-center gap-3 px-4 py-2',
              'border-b border-phosphor-muted',
              'bg-phosphor/5'
            )}
          >
            {/* macOS-style window controls */}
            {showControls && (
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors" />
              </div>
            )}

            {/* Title */}
            {title && (
              <span className="text-sm text-phosphor-dim font-mono flex-1 text-center">
                {title}
              </span>
            )}

            {/* Spacer for symmetry when no title */}
            {!title && showControls && <div className="flex-1" />}
          </div>
        )}

        {/* Window content */}
        <div className="p-4 md:p-6">{children}</div>
      </div>
    )
  }
)
TerminalWindow.displayName = 'TerminalWindow'

/**
 * Terminal Line Component
 * Single line with optional prompt prefix
 */
interface TerminalLineProps extends HTMLAttributes<HTMLDivElement> {
  prompt?: string
  command?: string
  output?: ReactNode
  isTyping?: boolean
}

const TerminalLine = forwardRef<HTMLDivElement, TerminalLineProps>(
  ({ className, prompt = '$', command, output, isTyping = false, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('font-mono text-sm', className)} {...props}>
        {command !== undefined ? (
          <div className="flex items-start gap-2">
            <span className="text-phosphor-dim select-none">{prompt}</span>
            <span className="text-phosphor">{command}</span>
            {isTyping && (
              <span className="text-phosphor animate-blink">█</span>
            )}
          </div>
        ) : null}
        {output && <div className="text-phosphor-dim mt-1 ml-4">{output}</div>}
        {children}
      </div>
    )
  }
)
TerminalLine.displayName = 'TerminalLine'

/**
 * Terminal Box - ASCII-style bordered box
 */
interface TerminalBoxProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  variant?: 'single' | 'double' | 'rounded'
}

const TerminalBox = forwardRef<HTMLDivElement, TerminalBoxProps>(
  ({ className, title, variant = 'single', children, ...props }, ref) => {
    const chars = {
      single: { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
      double: { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
      rounded: { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' },
    }
    const c = chars[variant]

    return (
      <div
        ref={ref}
        className={cn('font-mono text-phosphor whitespace-pre', className)}
        {...props}
      >
        {/* Top border */}
        <div className="text-phosphor-muted">
          {c.tl}
          {title ? ` ${title} ` : ''}
          {c.h.repeat(40 - (title?.length || 0))}
          {c.tr}
        </div>

        {/* Content with side borders */}
        <div className="relative">
          <span className="absolute left-0 text-phosphor-muted">{c.v}</span>
          <div className="px-4 py-2">{children}</div>
          <span className="absolute right-0 top-0 text-phosphor-muted">{c.v}</span>
        </div>

        {/* Bottom border */}
        <div className="text-phosphor-muted">
          {c.bl}
          {c.h.repeat(42)}
          {c.br}
        </div>
      </div>
    )
  }
)
TerminalBox.displayName = 'TerminalBox'

export { TerminalWindow, TerminalLine, TerminalBox }
