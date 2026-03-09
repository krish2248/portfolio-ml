/**
 * Skills Section Component
 */

import { FC, memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { skills, SkillCategory, Skill } from '../../lib/data'
import { fadeInUp, staggerContainer, skillItem } from '../../lib/animations'
import { useInView } from '../../hooks/useInView'
import Section from '../layout/Section'
import { ProgressBar } from '../ui'

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
        <motion.div variants={fadeInUp} className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SystemStat label="Skills" value={skills.reduce((acc, cat) => acc + cat.skills.length, 0).toString()} />
            <SystemStat label="Categories" value={skills.length.toString()} />
            <SystemStat label="Focus" value="ML/AI" color="blue" />
            <SystemStat label="Status" value="ACTIVE" color="green" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((category, catIndex) => (
            <motion.div key={category.name} variants={fadeInUp} custom={catIndex}>
              <SkillCategoryCard category={category} isInView={isInView} delay={catIndex * 0.2} />
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="mt-12 text-center">
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
    <div className="font-mono text-sm p-3 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg">
      <span className="dark:text-slate-500 text-slate-500">{label}: </span>
      <span className={colorClasses[color]}>{value}</span>
    </div>
  )
}

const SkillCategoryCard: FC<{ category: SkillCategory; isInView: boolean; delay: number }> = memo(({ category, isInView, delay }) => {
  return (
    <motion.div className={cn(
      'p-5 rounded-lg',
      'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50',
      'hover:border-blue-500 transition-all duration-300'
    )}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg dark:text-white text-slate-900">
          <span className="text-blue-500">{'// '}</span>
          {category.name}
        </h3>
        <span className="font-mono text-xs dark:text-slate-500 text-slate-500">{category.skills.length} skills</span>
      </div>

      <motion.ul
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: delay } } }}
        className="space-y-3"
      >
        {category.skills.map((skill, index) => (
          <SkillItem key={skill.name} skill={skill} index={index} isInView={isInView} />
        ))}
      </motion.ul>
    </motion.div>
  )
})

SkillCategoryCard.displayName = 'SkillCategoryCard'

const SkillItem: FC<{ skill: Skill; index: number; isInView: boolean }> = memo(({ skill, index, isInView }) => {
  return (
    <motion.li variants={skillItem} custom={index} className="group">
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-sm dark:text-slate-400 text-slate-600 group-hover:text-blue-500 transition-colors">{skill.name}</span>
        <span className="font-mono text-xs dark:text-slate-500 text-slate-500">{skill.level}%</span>
      </div>
      <ProgressBar value={skill.level} animated={isInView} variant="default" showValue={false} />
    </motion.li>
  )
})

SkillItem.displayName = 'SkillItem'

export default Skills
