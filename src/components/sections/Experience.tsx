/**
 * Experience Section Component
 * Combined Education & Experience timeline with center line
 */

import { FC, memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { experiences, education } from '../../lib/data'
import { fadeInUp, staggerContainer } from '../../lib/animations'
import { useInView } from '../../hooks/useInView'
import Section from '../layout/Section'

interface ExperienceItem { id: string; type: 'experience'; title: string; company: string; type2: 'full-time' | 'part-time' | 'freelance' | 'internship' | 'remote'; location: string; period: string; description: string; achievements: string[] }
interface EducationItem { id: string; type: 'education'; degree: string; institution: string; location: string; period: string; grade?: string; description?: string }
type TimelineItem = ExperienceItem | EducationItem

const combinedTimeline: TimelineItem[] = [
  ...experiences.map(e => ({ ...e, type: 'experience' as const, type2: e.type })),
  ...education.map(e => ({ ...e, type: 'education' as const, title: e.degree, company: e.institution, description: e.description || '', achievements: [], type2: 'full-time' as const })),
].sort((a, b) => {
  const getYear = (item: TimelineItem): number => { const match = item.period.match(/\d{4}/); return match ? parseInt(match[0]) : 0 }
  return getYear(b) - getYear(a)
})

const Experience: FC = memo(() => {
  const { ref, inView: isInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <Section id="experience" terminalHeader="EXPERIENCE & EDUCATION">
      <motion.div ref={ref as React.RefObject<HTMLDivElement>} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer} className="max-w-5xl mx-auto">
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-blue-500/30 -translate-x-1/2" />
          {combinedTimeline.map((item, index) => <TimelineItem key={item.id} item={item} index={index} isLeft={index % 2 === 0} />)}
        </div>
      </motion.div>
    </Section>
  )
})

Experience.displayName = 'Experience'

const TimelineItem: FC<{ item: TimelineItem; index: number; isLeft: boolean }> = ({ item, index, isLeft }) => {
  const isEducation = item.type === 'education'

  return (
    <motion.div variants={fadeInUp} custom={index} className={cn('relative mb-6', isLeft ? 'pr-12' : 'pl-12')} style={{ marginLeft: isLeft ? '0' : '50%', marginRight: isLeft ? '50%' : '0' }}>
      <motion.div className={cn('p-5 rounded-lg', 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800', 'hover:border-blue-500 transition-all duration-300')}>
        {/* Header with date on same line */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <h3 className="font-semibold text-lg dark:text-white text-slate-900">
            {isEducation ? (item as EducationItem).degree : (item as ExperienceItem).title}
          </h3>
          <span className="font-mono text-sm text-blue-500 whitespace-nowrap">{item.period}</span>
        </div>
        
        {/* Company/Institution */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="font-medium dark:text-slate-300 text-slate-700">
            {isEducation ? (item as EducationItem).institution : (item as ExperienceItem).company}
          </span>
          <span className="dark:text-slate-500 text-slate-500">•</span>
          <span className="dark:text-slate-500 text-slate-500">{item.location}</span>
          {!isEducation && (
            <span className="ml-2 px-2 py-0.5 rounded text-xs uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20">
              {(item as ExperienceItem).type2}
            </span>
          )}
        </div>

        {/* Grade for education */}
        {isEducation && (item as EducationItem).grade && (
          <div className="font-mono text-sm text-blue-500 mb-3">
            Grade: {(item as EducationItem).grade}
          </div>
        )}

        <p className="font-mono text-sm dark:text-slate-400 text-slate-600 mb-3">{isEducation ? (item as EducationItem).description : (item as ExperienceItem).description}</p>

        {!isEducation && (item as ExperienceItem).achievements.length > 0 && (
          <ul className="space-y-1">
            {(item as ExperienceItem).achievements.map((achievement, i) => (
              <li key={i} className="font-mono text-sm dark:text-slate-400 text-slate-600 flex items-start gap-2">
                <span className="text-blue-500">▸</span>
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
