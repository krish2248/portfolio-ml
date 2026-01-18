/**
 * Skills Section Component
 * htop-style system monitor display
 */

import { FC, memo } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'
import { skills, SkillCategory, Skill } from '../../lib/data'
import { fadeInUp, staggerContainer, skillItem } from '../../lib/animations'
import { useInView } from '../../hooks/useInView'
import Section from '../layout/Section'
import { TerminalWindow, ProgressBar } from '../ui'

/**
 * Skills section styled like htop system monitor
 * Shows skill categories with animated progress bars
 */
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
        {/* htop-style header */}
        <motion.div variants={fadeInUp} className="mb-8">
          <TerminalWindow title="htop - skill monitor">
            {/* Top bar like htop */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <SystemStat label="Processes" value={skills.reduce((acc, cat) => acc + cat.skills.length, 0).toString()} />
              <SystemStat label="Categories" value={skills.length.toString()} />
              <SystemStat label="Avg Level" value={`${Math.round(skills.reduce((acc, cat) => acc + cat.skills.reduce((a, s) => a + s.level, 0) / cat.skills.length, 0) / skills.length)}%`} />
              <SystemStat label="Status" value="ACTIVE" color="phosphor" />
            </div>
          </TerminalWindow>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skills.map((category, catIndex) => (
            <motion.div
              key={category.name}
              variants={fadeInUp}
              custom={catIndex}
            >
              <SkillCategoryCard
                category={category}
                isInView={isInView}
                delay={catIndex * 0.2}
              />
            </motion.div>
          ))}
        </div>

        {/* ASCII art decoration */}
        <motion.div
          variants={fadeInUp}
          className="mt-12 text-center"
        >
          <pre className="inline-block font-mono text-[8px] md:text-xs text-phosphor-muted leading-tight opacity-50">
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

/**
 * System stat display (htop style)
 */
interface SystemStatProps {
  label: string
  value: string
  color?: 'phosphor' | 'cyan' | 'amber'
}

const SystemStat: FC<SystemStatProps> = ({ label, value, color = 'cyan' }) => {
  const colorClasses = {
    phosphor: 'text-phosphor',
    cyan: 'text-cyan',
    amber: 'text-amber',
  }

  return (
    <div className="font-mono text-sm">
      <span className="text-phosphor-muted">{label}: </span>
      <span className={colorClasses[color]}>{value}</span>
    </div>
  )
}

/**
 * Individual skill category card
 */
interface SkillCategoryCardProps {
  category: SkillCategory
  isInView: boolean
  delay: number
}

const SkillCategoryCard: FC<SkillCategoryCardProps> = memo(({ category, isInView, delay }) => {
  return (
    <motion.div
      className={cn(
        'p-5 rounded-lg',
        'border border-phosphor-muted/50 bg-terminal-dark/50',
        'hover:border-phosphor/50 transition-all duration-300'
      )}
    >
      {/* Category header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-lg text-phosphor">
          <span className="text-phosphor-muted">{'// '}</span>
          {category.name}
        </h3>
        <span className="font-mono text-xs text-phosphor-muted">
          {category.skills.length} skills
        </span>
      </div>

      {/* Skills list */}
      <motion.ul
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: delay,
            },
          },
        }}
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

/**
 * Individual skill item with progress bar
 */
interface SkillItemProps {
  skill: Skill
  index: number
  isInView: boolean
}

const SkillItem: FC<SkillItemProps> = memo(({ skill, index, isInView }) => {
  return (
    <motion.li
      variants={skillItem}
      custom={index}
      className="group"
    >
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-sm text-phosphor-dim group-hover:text-phosphor transition-colors">
          {skill.name}
        </span>
        <span className="font-mono text-xs text-phosphor-muted">
          {skill.level}%
        </span>
      </div>
      <ProgressBar
        value={skill.level}
        animated={isInView}
        variant="default"
        showValue={false}
      />
    </motion.li>
  )
})

SkillItem.displayName = 'SkillItem'

export default Skills
