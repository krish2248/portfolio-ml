/**
 * Education Section Component
 * Vertical career timeline display
 */

import { FC, memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { education } from '../../lib/data'
import { fadeInUp, staggerContainer } from '../../lib/animations'
import { useInView } from '../../hooks/useInView'
import Section from '../layout/Section'

const Education: FC = memo(() => {
  const { ref, inView: isInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <Section id="education" terminalHeader="EDUCATION">
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="max-w-3xl mx-auto"
      >
        <div className="relative">
          {education.map((edu, index) => (
            <TimelineItem key={edu.id} item={edu} index={index} />
          ))}
        </div>
      </motion.div>
    </Section>
  )
})

Education.displayName = 'Education'

interface TimelineItemProps {
  item: {
    id: string
    degree: string
    institution: string
    location: string
    period: string
    grade?: string
    description?: string
  }
  index: number
}

const TimelineItem: FC<TimelineItemProps> = ({ item, index }) => {
  const isLast = index === education.length - 1

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className={cn('relative pl-8 pb-8', !isLast && 'pb-8')}
    >
      {!isLast && (
        <div className="absolute left-[11px] top-6 bottom-0 w-px bg-phosphor-muted" />
      )}
      
      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-terminal-dark border-2 border-phosphor flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-cyan" />
      </div>

      <motion.div
        className={cn(
          'p-4 rounded-lg',
          'border border-phosphor-muted bg-terminal-dark/50',
          'hover:border-phosphor transition-all duration-300'
        )}
        whileHover={{ x: 4 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <h3 className="font-display text-lg text-phosphor">{item.degree}</h3>
          <span className="font-mono text-sm text-cyan">{item.period}</span>
        </div>
        
        <div className="font-mono text-sm text-phosphor-dim mb-2">
          <span className="text-phosphor">{item.institution}</span>
          <span className="text-phosphor-muted"> — {item.location}</span>
        </div>

        {item.grade && (
          <div className="font-mono text-sm text-green">
            <span className="text-phosphor-muted">Grade: </span>
            {item.grade}
          </div>
        )}

        {item.description && (
          <p className="font-mono text-sm text-phosphor-dim mt-2">{item.description}</p>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Education
