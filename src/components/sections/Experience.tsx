/**
 * Experience Section Component
 * Vertical career timeline display
 */

import { FC, memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { experiences } from '../../lib/data'
import { fadeInUp, staggerContainer } from '../../lib/animations'
import { useInView } from '../../hooks/useInView'
import Section from '../layout/Section'

const typeColors: Record<string, string> = {
  'full-time': 'bg-green',
  'part-time': 'bg-cyan',
  'freelance': 'bg-yellow',
  'internship': 'bg-purple',
  'remote': 'bg-orange',
}

const Experience: FC = memo(() => {
  const { ref, inView: isInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <Section id="experience" terminalHeader="EXPERIENCE">
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="max-w-3xl mx-auto"
      >
        <div className="relative">
          {experiences.map((exp, index) => (
            <TimelineItem key={exp.id} item={exp} index={index} />
          ))}
        </div>
      </motion.div>
    </Section>
  )
})

Experience.displayName = 'Experience'

interface TimelineItemProps {
  item: {
    id: string
    title: string
    company: string
    type: 'full-time' | 'part-time' | 'freelance' | 'internship' | 'remote'
    location: string
    period: string
    description: string
    achievements: string[]
  }
  index: number
}

const TimelineItem: FC<TimelineItemProps> = ({ item, index }) => {
  const isLast = index === experiences.length - 1

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
        <div className={cn('w-2 h-2 rounded-full', typeColors[item.type] || 'bg-cyan')} />
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
          <h3 className="font-display text-lg text-phosphor">{item.title}</h3>
          <span className="font-mono text-sm text-cyan">{item.period}</span>
        </div>
        
        <div className="font-mono text-sm text-phosphor-dim mb-2">
          <span className="text-phosphor">{item.company}</span>
          <span className="text-phosphor-muted"> — {item.location}</span>
          <span className={cn('ml-2 px-2 py-0.5 rounded text-xs uppercase', typeColors[item.type], 'text-terminal-dark')}>
            {item.type}
          </span>
        </div>

        <p className="font-mono text-sm text-phosphor-dim mb-3">{item.description}</p>

        {item.achievements.length > 0 && (
          <ul className="space-y-1">
            {item.achievements.map((achievement, i) => (
              <li key={i} className="font-mono text-sm text-green flex items-start gap-2">
                <span className="text-phosphor-muted">▸</span>
                {achievement}
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </motion.div>
  )
}

export default Experience
