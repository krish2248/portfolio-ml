/**
 * Section Component
 * Reusable section wrapper with scroll-triggered animations
 */

import { FC, ReactNode, forwardRef, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'
import { cn } from '../../lib/utils'
import { sectionReveal, staggerContainer } from '../../lib/animations'
import { useInView } from '../../hooks/useInView'

interface SectionProps {
  /** Section id for navigation */
  id: string
  /** Section content */
  children: ReactNode
  /** Additional CSS classes */
  className?: string
  /** Container width variant */
  size?: 'default' | 'narrow' | 'wide' | 'full'
  /** Background variant */
  background?: 'default' | 'subtle' | 'none'
  /** Whether to use staggered children animation */
  stagger?: boolean
  /** Custom animation variants */
  variants?: Variants
  /** Disable animations */
  noAnimation?: boolean
  /** Add terminal-style section header */
  terminalHeader?: string
}

const sizeClasses = {
  default: 'max-w-6xl',
  narrow: 'max-w-4xl',
  wide: 'max-w-7xl',
  full: 'max-w-full',
}

const backgroundClasses = {
  default: 'bg-transparent',
  subtle: 'bg-terminal-dark/30',
  none: '',
}

/**
 * Section wrapper with scroll-triggered reveal animations
 * Supports terminal-style headers and staggered children
 */
const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      children,
      className,
      size = 'default',
      background = 'default',
      stagger = false,
      variants,
      noAnimation = false,
      terminalHeader,
    },
    forwardedRef
  ) => {
    const { ref: inViewRef, inView: isInView } = useInView({ threshold: 0.1, triggerOnce: true })

    // Sync forwarded ref with inView ref
    useEffect(() => {
      if (forwardedRef && inViewRef.current) {
        if (typeof forwardedRef === 'function') {
          forwardedRef(inViewRef.current)
        } else {
          forwardedRef.current = inViewRef.current
        }
      }
    }, [forwardedRef, inViewRef])

    const animationVariants = stagger ? staggerContainer : (variants ?? sectionReveal)

    // Non-animated version
    if (noAnimation) {
      return (
        <section
          id={id}
          ref={forwardedRef}
          className={cn(
            'section-padding px-4 sm:px-6 lg:px-8',
            backgroundClasses[background],
            className
          )}
        >
          <div className={cn('mx-auto', sizeClasses[size])}>
            {terminalHeader && <SectionHeader title={terminalHeader} />}
            {children}
          </div>
        </section>
      )
    }

    return (
      <motion.section
        id={id}
        ref={inViewRef as React.RefObject<HTMLElement>}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={animationVariants}
        className={cn(
          'section-padding px-4 sm:px-6 lg:px-8',
          backgroundClasses[background],
          className
        )}
      >
        <div className={cn('mx-auto', sizeClasses[size])}>
          {terminalHeader && <SectionHeader title={terminalHeader} animated />}
          {children}
        </div>
      </motion.section>
    )
  }
)

Section.displayName = 'Section'

/**
 * Terminal-style section header
 * Displays as: ═══ SECTION_NAME ═══
 */
interface SectionHeaderProps {
  title: string
  animated?: boolean
}

const SectionHeader: FC<SectionHeaderProps> = ({ title, animated = false }) => {
  const HeaderContent = () => (
    <div className="mb-8 md:mb-12 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-phosphor-muted to-phosphor-muted" />
      <h2 className="font-display text-lg md:text-xl uppercase tracking-widest text-phosphor-dim">
        <span className="text-phosphor-muted">{'// '}</span>
        {title}
      </h2>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-phosphor-muted to-phosphor-muted" />
    </div>
  )

  if (animated) {
    return (
      <motion.div variants={sectionReveal}>
        <HeaderContent />
      </motion.div>
    )
  }

  return <HeaderContent />
}

export default Section
export { SectionHeader }
