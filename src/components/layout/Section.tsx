/**
 * Section Component
 */

import { FC, ReactNode, forwardRef, useEffect } from 'react'
import { motion, Variants } from 'framer-motion'
import { cn } from '../../lib/utils'
import { sectionReveal, staggerContainer } from '../../lib/animations'
import { useInView } from '../../hooks/useInView'

interface SectionProps {
  id: string
  children: ReactNode
  className?: string
  size?: 'default' | 'narrow' | 'wide' | 'full'
  background?: 'default' | 'subtle' | 'none'
  stagger?: boolean
  variants?: Variants
  noAnimation?: boolean
  terminalHeader?: string
}

const sizeClasses = { default: 'max-w-6xl', narrow: 'max-w-4xl', wide: 'max-w-7xl', full: 'max-w-full' }
const backgroundClasses = { default: 'bg-transparent', subtle: 'bg-slate-50 dark:bg-slate-800/30', none: '' }

const Section = forwardRef<HTMLElement, SectionProps>(({ id, children, className, size = 'default', background = 'default', stagger = false, variants, noAnimation = false, terminalHeader, ...props }, ref) => {
  const { ref: inViewRef, inView: isInView } = useInView({ threshold: 0.1, triggerOnce: true })

  useEffect(() => {
    if (ref && 'current' in ref && inViewRef.current) ref.current = inViewRef.current
    else if (ref && inViewRef.current) (ref as (el: HTMLElement) => void)(inViewRef.current)
  }, [ref, inViewRef])

  const animationVariants = stagger ? staggerContainer : (variants ?? sectionReveal)

  if (noAnimation) return (<section id={id} ref={ref} className={cn('section-padding px-4 sm:px-6 lg:px-8', backgroundClasses[background], className)}><div className={cn('mx-auto', sizeClasses[size])}>{terminalHeader && <SectionHeader title={terminalHeader} />}{children}</div></section>)

  return (
    <motion.section id={id} ref={inViewRef as React.RefObject<HTMLElement>} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={animationVariants} className={cn('section-padding px-4 sm:px-6 lg:px-8', backgroundClasses[background], className)} {...props}>
      <div className={cn('mx-auto', sizeClasses[size])}>{terminalHeader && <SectionHeader title={terminalHeader} animated />}{children}</div>
    </motion.section>
  )
})

Section.displayName = 'Section'

interface SectionHeaderProps { title: string; animated?: boolean }

const SectionHeader: FC<SectionHeaderProps> = ({ title, animated = false }) => {
  const HeaderContent = () => (
    <div className="mb-8 md:mb-12 flex items-center gap-4">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-slate-300 dark:to-slate-700" />
      <h2 className="font-semibold text-lg md:text-xl uppercase tracking-widest dark:text-slate-300 text-slate-700"><span className="text-blue-500">{'// '}</span>{title}</h2>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-slate-300 dark:via-slate-700 to-slate-300 dark:to-slate-700" />
    </div>
  )
  return animated ? (<motion.div variants={sectionReveal}><HeaderContent /></motion.div>) : <HeaderContent />
}

export default Section
export { SectionHeader }
