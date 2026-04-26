/**
 * Skills Section Component
 */

import { FC, memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { skills, SkillCategory } from '../../lib/data'
import { fadeInUp, staggerContainer } from '../../lib/animations'
import { useInView } from '../../hooks/useInView'
import Section from '../layout/Section'

const Skills: FC = memo(() => {
  const { ref, inView: isInView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <Section id="skills" terminalHeader="SKILLS">
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <SystemStat label="Skills" value={skills.reduce((acc, cat) => acc + cat.skills.length, 0).toString()} />
            <SystemStat label="Categories" value={skills.length.toString()} />
            <SystemStat label="Focus" value="ML/AI" color="blue" />
            <SystemStat label="Status" value="ACTIVE" color="green" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skills.map((category, catIndex) => (
            <motion.div key={category.name} variants={fadeInUp} custom={catIndex}>
              <SkillCategoryCard category={category} />
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="mt-8 text-center">
          <pre className="inline-block font-mono text-[8px] md:text-xs dark:text-slate-600 text-slate-400 leading-tight opacity-50">
{`╔══════════════════════════════════════════════════╗
║  "The only way to do great work is to love it"   ║
║                    - Steve Jobs                   ║
╚══════════════════════════════════════════════════╝`}
          </pre>
        </motion.div>
      </motion.div>
    </Section>
  )
})

Skills.displayName = 'Skills'

const SystemStat: FC<{ label: string; value: string; color?: 'blue' | 'green' | 'amber' }> = ({ label, value, color = 'blue' }) => {
  const colorClasses = { blue: 'text-blue-500', green: 'text-green-500', amber: 'text-amber-500' }
  return (
    <div className="font-mono text-xs p-2 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
      <span className="dark:text-slate-500 text-slate-500">{label}: </span>
      <span className={colorClasses[color]}>{value}</span>
    </div>
  )
}

const SkillCategoryCard: FC<{ category: SkillCategory }> = memo(({ category }) => {
  return (
    <div
      className={cn(
        'p-5 rounded-lg h-full',
        'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50',
        'hover:border-blue-500/50 transition-all duration-300'
      )}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-slate-700/60">
        <h3 className="font-semibold text-base dark:text-white text-slate-900">
          <span className="text-blue-500">{'// '}</span>
          {category.name}
        </h3>
        <span className="font-mono text-xs dark:text-slate-500 text-slate-500">{category.skills.length}</span>
      </div>

      <ul className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <li
            key={skill.name}
            className={cn(
              'font-mono text-sm px-3 py-1.5 rounded-md',
              'border border-slate-200 dark:border-slate-700',
              'bg-slate-50 dark:bg-slate-800',
              'dark:text-slate-300 text-slate-700',
              'hover:border-blue-500/60 hover:text-blue-500 dark:hover:text-blue-400',
              'transition-colors duration-200'
            )}
          >
            {skill.name}
          </li>
        ))}
      </ul>
    </div>
  )
})

SkillCategoryCard.displayName = 'SkillCategoryCard'

export default Skills
