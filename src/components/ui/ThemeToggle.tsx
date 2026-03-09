/**
 * Theme Toggle Component
 */

import { forwardRef, ButtonHTMLAttributes } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'
import { cn } from '@/lib/utils'

interface ThemeToggleProps extends ButtonHTMLAttributes<HTMLButtonElement> { showLabel?: boolean; size?: 'sm' | 'default' | 'lg' }

const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(({ className, showLabel = false, size = 'default', ...props }, ref) => {
  const { toggleTheme, isDark } = useTheme()

  const sizes = { sm: 'h-8 w-8', default: 'h-10 w-10', lg: 'h-12 w-12' }
  const iconSizes = { sm: 'h-4 w-4', default: 'h-5 w-5', lg: 'h-6 w-6' }

  return (
    <button ref={ref} onClick={toggleTheme}
      className={cn('relative inline-flex items-center justify-center rounded-lg border', 'border-slate-300 dark:border-slate-600', 'bg-white dark:bg-slate-800/50', 'text-slate-600 dark:text-slate-400 hover:text-blue-500', 'hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10', 'transition-all duration-300', 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2', 'dark:focus:ring-offset-slate-900 focus:ring-offset-white', sizes[size], showLabel && 'w-auto px-4 gap-2', className)}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`} title={`Switch to ${isDark ? 'light' : 'dark'} mode`} {...props}>
      <AnimatePresence mode="wait">
        {isDark ? (
          <motion.div key="moon" initial={{ opacity: 0, rotate: -90, scale: 0 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 90, scale: 0 }} transition={{ duration: 0.2 }}>
            <Moon className={iconSizes[size]} />
          </motion.div>
        ) : (
          <motion.div key="sun" initial={{ opacity: 0, rotate: 90, scale: 0 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: -90, scale: 0 }} transition={{ duration: 0.2 }}>
            <Sun className={iconSizes[size]} />
          </motion.div>
        )}
      </AnimatePresence>
      {showLabel && <span className="text-sm font-mono">{isDark ? 'Dark' : 'Light'}</span>}
    </button>
  )
})
ThemeToggle.displayName = 'ThemeToggle'

const ThemeToggleTerminal = forwardRef<HTMLButtonElement, ThemeToggleProps>(({ className, ...props }, ref) => {
  const { isDark, toggleTheme } = useTheme()
  return (<button ref={ref} onClick={toggleTheme} className={cn('font-mono text-sm dark:text-slate-400 text-slate-600 hover:text-blue-500', 'transition-colors duration-200', 'focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-offset-slate-900 focus:ring-offset-white', className)} aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`} {...props}><span className="opacity-50">{'>'}</span><span className="ml-1">{isDark ? 'mode --light' : 'mode --dark'}</span><span className="animate-blink ml-0.5">_</span></button>)
})
ThemeToggleTerminal.displayName = 'ThemeToggleTerminal'

export { ThemeToggle, ThemeToggleTerminal }
