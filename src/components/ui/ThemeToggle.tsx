/**
 * Theme Toggle Component
 * Switches between dark (terminal) and light (paper) modes
 */

import { forwardRef, ButtonHTMLAttributes } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

interface ThemeToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  showLabel?: boolean
  size?: 'sm' | 'default' | 'lg'
}

const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, showLabel = false, size = 'default', ...props }, ref) => {
    const { toggleTheme, isDark } = useTheme()

    const sizes = {
      sm: 'h-8 w-8',
      default: 'h-10 w-10',
      lg: 'h-12 w-12',
    }

    const iconSizes = {
      sm: 'h-4 w-4',
      default: 'h-5 w-5',
      lg: 'h-6 w-6',
    }

    return (
      <button
        ref={ref}
        onClick={toggleTheme}
        className={cn(
          'relative inline-flex items-center justify-center',
          'rounded-lg border border-phosphor-muted',
          'bg-terminal-dark/50 backdrop-blur-sm',
          'text-phosphor-dim hover:text-phosphor',
          'hover:border-phosphor hover:bg-phosphor/10',
          'transition-all duration-300',
          'focus:outline-none focus:ring-2 focus:ring-phosphor focus:ring-offset-2 focus:ring-offset-terminal-black',
          sizes[size],
          showLabel && 'w-auto px-4 gap-2',
          className
        )}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        {...props}
      >
        <AnimatePresence mode="wait">
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ opacity: 0, rotate: -90, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Moon className={iconSizes[size]} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ opacity: 0, rotate: 90, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Sun className={iconSizes[size]} />
            </motion.div>
          )}
        </AnimatePresence>

        {showLabel && (
          <span className="text-sm font-mono">
            {isDark ? 'Dark' : 'Light'}
          </span>
        )}

        {/* Glow effect on hover (dark mode only) */}
        {isDark && (
          <div
            className={cn(
              'absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300',
              'group-hover:opacity-100',
              'bg-phosphor/10 blur-md -z-10'
            )}
          />
        )}
      </button>
    )
  }
)
ThemeToggle.displayName = 'ThemeToggle'

/**
 * Terminal-style theme toggle with ASCII art
 */
const ThemeToggleTerminal = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  ({ className, ...props }, ref) => {
    const { isDark, toggleTheme } = useTheme()

    return (
      <button
        ref={ref}
        onClick={toggleTheme}
        className={cn(
          'font-mono text-sm text-phosphor-dim hover:text-phosphor',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-phosphor',
          className
        )}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        {...props}
      >
        <span className="opacity-50">{'>'}</span>
        <span className="ml-1">
          {isDark ? 'mode --light' : 'mode --dark'}
        </span>
        <span className="animate-blink ml-0.5">_</span>
      </button>
    )
  }
)
ThemeToggleTerminal.displayName = 'ThemeToggleTerminal'

export { ThemeToggle, ThemeToggleTerminal }
