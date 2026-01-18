/**
 * Utility functions for the portfolio
 * Includes class name merging and other helpers
 */

import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge class names with Tailwind CSS conflict resolution
 * Combines clsx for conditional classes with tailwind-merge for deduplication
 * 
 * @example
 * cn('px-4 py-2', isActive && 'bg-phosphor', 'px-6')
 * // Returns: 'py-2 px-6 bg-phosphor' (px-6 overrides px-4)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a date string to a readable format
 */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
  }).format(new Date(date))
}

/**
 * Generate a random ID for unique keys
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

/**
 * Throttle function for scroll/resize handlers
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean

  return function executedFunction(this: unknown, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Check if code is running in browser environment
 */
export const isBrowser = typeof window !== 'undefined'

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (!isBrowser) return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Smooth scroll to element by ID
 */
export function scrollToElement(id: string, offset = 80): void {
  const element = document.getElementById(id)
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

/**
 * Get random item from array
 */
export function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * Sleep/delay utility for animations
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Clamp a number between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}
