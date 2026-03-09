/**
 * Projects Section Component
 */

import { FC, useState, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { projects, Project } from '../../lib/data'
import { staggerContainer, projectCard } from '../../lib/animations'
import { useInView } from '../../hooks/useInView'
import Section from '../layout/Section'
import { Badge } from '../ui'

interface ProjectsProps { onProjectSelect?: (project: Project) => void }

const Projects: FC<ProjectsProps> = memo(({ onProjectSelect }) => {
  const { ref, inView: isInView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [filter, setFilter] = useState<'all' | 'featured'>('featured')

  const filteredProjects = filter === 'featured' ? projects.filter((p) => p.featured) : projects

  return (
    <Section id="projects" terminalHeader="PROJECTS" background="subtle">
      <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} className="mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <FilterTab active={filter === 'all'} onClick={() => setFilter('all')} count={projects.length}>all</FilterTab>
          <FilterTab active={filter === 'featured'} onClick={() => setFilter('featured')} count={projects.filter((p) => p.featured).length}>featured</FilterTab>
        </div>
      </motion.div>

      <motion.div ref={ref as React.RefObject<HTMLDivElement>} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div key={project.id} variants={projectCard} custom={index} layout exit={{ opacity: 0, scale: 0.9 }}>
              <ProjectCard project={project} onClick={() => onProjectSelect?.(project)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredProjects.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12 font-mono dark:text-slate-500 text-slate-500">
          <p>No projects found.</p>
        </motion.div>
      )}
    </Section>
  )
})

Projects.displayName = 'Projects'

const FilterTab: FC<{ active: boolean; onClick: () => void; count: number; children: React.ReactNode }> = ({ active, onClick, count, children }) => (
  <button onClick={onClick} className={cn('px-3 py-1.5 rounded font-mono text-sm transition-all duration-200',
    active ? 'bg-blue-500 text-white border border-blue-500' : 'dark:text-slate-400 text-slate-600 border border-slate-300 dark:border-slate-600 hover:border-blue-500 hover:text-blue-500')}>
    {children}<span className="ml-2 text-xs dark:text-slate-500 text-slate-400">({count})</span>
  </button>
)

const ProjectCard: FC<{ project: Project; onClick: () => void }> = memo(({ project, onClick }) => {
  const statusColors = { 'deployed': 'text-green-500', 'in-progress': 'text-amber-500', 'archived': 'dark:text-slate-500 text-slate-500' }
  const statusIcons = { 'deployed': '●', 'in-progress': '◐', 'archived': '○' }

  return (
    <motion.article className={cn('group relative p-5 rounded-lg cursor-pointer',
      'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50',
      'hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800', 'transition-all duration-300')}
      onClick={onClick} whileHover={{ y: -4 }} whileTap={{ scale: 0.98 }}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-blue-500">📁</span>
          <h3 className="font-semibold text-lg dark:text-white text-slate-900 group-hover:text-blue-500 transition-all">{project.title}</h3>
        </div>
      </div>

      <p className="font-mono text-sm dark:text-slate-400 text-slate-600 mb-4 line-clamp-2">{project.shortDescription}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 4).map((tech) => (<Badge key={tech} variant="ghost" size="sm">{tech}</Badge>))}
        {project.technologies.length > 4 && <Badge variant="ghost" size="sm">+{project.technologies.length - 4}</Badge>}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-700">
        <span className={cn('font-mono text-xs', statusColors[project.status])}>{statusIcons[project.status]} {project.status}</span>
        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} 
              className="px-3 py-1.5 text-xs font-mono rounded border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition-all">
              Live
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} 
              className="px-3 py-1.5 text-xs font-mono rounded border border-slate-300 dark:border-slate-600 dark:text-slate-300 text-slate-600 hover:border-blue-500 hover:text-blue-500 transition-all">
              GitHub
            </a>
          )}
        </div>
      </div>

      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 rounded-lg border border-blue-500/30" />
      </div>
    </motion.article>
  )
})

ProjectCard.displayName = 'ProjectCard'

export default Projects
