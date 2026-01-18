/**
 * Projects Section Component
 * File listing style project grid
 */

import { FC, useState, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { projects, Project } from '../../lib/data'
import { staggerContainer, projectCard } from '../../lib/animations'
import { useInView } from '../../hooks/useInView'
import Section from '../layout/Section'
import { Badge } from '../ui'

interface ProjectsProps {
  /** Callback when a project is selected for lightbox */
  onProjectSelect?: (project: Project) => void
}

/**
 * Projects section with ls -la style file listing
 * Displays projects as a grid with filtering options
 */
const Projects: FC<ProjectsProps> = memo(({ onProjectSelect }) => {
  const { ref, inView: isInView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [filter, setFilter] = useState<'all' | 'featured'>('all')

  const filteredProjects = filter === 'featured'
    ? projects.filter((p) => p.featured)
    : projects

  return (
    <Section id="projects" terminalHeader="PROJECTS" background="subtle">
      {/* Terminal-style header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        className="mb-8"
      >
        {/* Command prompt */}
        <div className="font-mono text-sm text-phosphor-dim mb-4">
          <span className="text-phosphor">$</span> ls -la ~/projects/
          {filter === 'featured' && <span className="text-cyan"> --featured</span>}
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          <FilterTab
            active={filter === 'all'}
            onClick={() => setFilter('all')}
            count={projects.length}
          >
            all
          </FilterTab>
          <FilterTab
            active={filter === 'featured'}
            onClick={() => setFilter('featured')}
            count={projects.filter((p) => p.featured).length}
          >
            featured
          </FilterTab>
        </div>
      </motion.div>

      {/* File listing header (ls -la style) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        className="hidden md:grid grid-cols-12 gap-4 px-4 py-2 font-mono text-xs text-phosphor-muted border-b border-phosphor-muted/30 mb-4"
      >
        <div className="col-span-1">drwxr</div>
        <div className="col-span-1">year</div>
        <div className="col-span-4">name</div>
        <div className="col-span-4">description</div>
        <div className="col-span-2">status</div>
      </motion.div>

      {/* Projects grid */}
      <motion.div
        ref={ref as React.RefObject<HTMLDivElement>}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={projectCard}
              custom={index}
              layout
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <ProjectCard
                project={project}
                onClick={() => onProjectSelect?.(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {filteredProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 font-mono text-phosphor-muted"
        >
          <p>No projects found.</p>
          <p className="text-sm mt-2">$ ls: directory is empty</p>
        </motion.div>
      )}
    </Section>
  )
})

Projects.displayName = 'Projects'

/**
 * Filter tab button
 */
interface FilterTabProps {
  active: boolean
  onClick: () => void
  count: number
  children: React.ReactNode
}

const FilterTab: FC<FilterTabProps> = ({ active, onClick, count, children }) => (
  <button
    onClick={onClick}
    className={cn(
      'px-3 py-1.5 rounded font-mono text-sm transition-all duration-200',
      active
        ? 'bg-phosphor/10 text-phosphor border border-phosphor'
        : 'text-phosphor-dim border border-phosphor-muted/50 hover:border-phosphor-muted hover:text-phosphor'
    )}
  >
    {children}
    <span className="ml-2 text-xs text-phosphor-muted">({count})</span>
  </button>
)

/**
 * Individual project card
 */
interface ProjectCardProps {
  project: Project
  onClick: () => void
}

const ProjectCard: FC<ProjectCardProps> = memo(({ project, onClick }) => {
  const statusColors = {
    'deployed': 'text-phosphor',
    'in-progress': 'text-amber',
    'archived': 'text-phosphor-muted',
  }

  const statusIcons = {
    'deployed': '●',
    'in-progress': '◐',
    'archived': '○',
  }

  return (
    <motion.article
      className={cn(
        'group relative p-5 rounded-lg cursor-pointer',
        'border border-phosphor-muted/50 bg-terminal-dark/50',
        'hover:border-phosphor hover:bg-terminal-dark/80',
        'transition-all duration-300'
      )}
      onClick={onClick}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute -top-2 -right-2">
          <Badge variant="filled" size="sm">FEATURED</Badge>
        </div>
      )}

      {/* Project header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-cyan">📁</span>
          <h3 className="font-display text-lg text-phosphor group-hover:text-glow transition-all">
            {project.title}
          </h3>
        </div>
        <span className="font-mono text-xs text-phosphor-muted">{project.year}</span>
      </div>

      {/* Description */}
      <p className="font-mono text-sm text-phosphor-dim mb-4 line-clamp-2">
        {project.shortDescription}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 4).map((tech) => (
          <Badge key={tech} variant="ghost" size="sm">{tech}</Badge>
        ))}
        {project.technologies.length > 4 && (
          <Badge variant="ghost" size="sm">+{project.technologies.length - 4}</Badge>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-phosphor-muted/30">
        {/* Status */}
        <span className={cn('font-mono text-xs', statusColors[project.status])}>
          {statusIcons[project.status]} {project.status}
        </span>

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-mono text-xs text-cyan hover:text-glow transition-colors"
              aria-label="View live site"
            >
              [live]
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-mono text-xs text-cyan hover:text-glow transition-colors"
              aria-label="View source code"
            >
              [code]
            </a>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute inset-0 rounded-lg border border-phosphor/30 shadow-[0_0_20px_rgba(0,255,65,0.1)]" />
      </div>
    </motion.article>
  )
})

ProjectCard.displayName = 'ProjectCard'

export default Projects
