/**
 * Project Lightbox Component
 * Man page style modal for viewing project details
 */

import { FC, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'
import { Project } from '../../lib/data'
import { modalBackdrop, modalContent } from '../../lib/animations'
import { Badge, Button } from '../ui'

interface ProjectLightboxProps {
  /** Project to display */
  project: Project | null
  /** Whether the lightbox is open */
  isOpen: boolean
  /** Close handler */
  onClose: () => void
}

/**
 * Man page styled lightbox modal for project details
 * Displays full project information with terminal aesthetics
 */
const ProjectLightbox: FC<ProjectLightboxProps> = memo(({ project, isOpen, onClose }) => {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalBackdrop}
            onClick={onClose}
            className="absolute inset-0 bg-terminal-black/90 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            key="content"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalContent}
            className={cn(
              'relative z-10 w-full max-w-3xl max-h-[90vh]',
              'overflow-hidden rounded-lg',
              'border border-phosphor-muted bg-terminal-dark',
              'shadow-[0_0_50px_rgba(0,255,65,0.1)]'
            )}
          >
            {/* Terminal header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-phosphor-muted bg-terminal-black/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <button
                    onClick={onClose}
                    className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"
                    aria-label="Close"
                  />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-3 font-mono text-sm text-phosphor-dim">
                  man {project.id}
                </span>
              </div>
              <button
                onClick={onClose}
                className="font-mono text-sm text-phosphor-muted hover:text-phosphor transition-colors"
              >
                [ESC]
              </button>
            </div>

            {/* Scrollable content */}
            <div className="overflow-y-auto max-h-[calc(90vh-60px)] p-6">
              {/* Man page header */}
              <div className="font-mono text-sm text-phosphor-muted mb-6 flex items-center justify-between">
                <span>PROJECT(7)</span>
                <span>Developer's Manual</span>
                <span>PROJECT(7)</span>
              </div>

              {/* NAME section */}
              <ManSection title="NAME">
                <p className="text-phosphor">
                  {project.title}
                  <span className="text-phosphor-dim"> - {project.shortDescription}</span>
                </p>
              </ManSection>

              {/* SYNOPSIS section */}
              <ManSection title="SYNOPSIS">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="default">{tech}</Badge>
                  ))}
                </div>
              </ManSection>

              {/* DESCRIPTION section */}
              <ManSection title="DESCRIPTION">
                <p className="text-phosphor-dim leading-relaxed whitespace-pre-wrap">
                  {project.fullDescription}
                </p>
              </ManSection>

              {/* CHALLENGES section (if available) */}
              {project.challenges && (
                <ManSection title="IMPLEMENTATION">
                  <p className="text-phosphor-dim leading-relaxed whitespace-pre-wrap">
                    {project.challenges}
                  </p>
                </ManSection>
              )}

              {/* OPTIONS section (links) */}
              <ManSection title="OPTIONS">
                <div className="space-y-2 font-mono text-sm">
                  {project.liveUrl && (
                    <div className="flex items-start gap-4">
                      <span className="text-cyan w-20">--live</span>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-phosphor-dim hover:text-phosphor transition-colors"
                      >
                        {project.liveUrl}
                      </a>
                    </div>
                  )}
                  {project.githubUrl && (
                    <div className="flex items-start gap-4">
                      <span className="text-cyan w-20">--source</span>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-phosphor-dim hover:text-phosphor transition-colors"
                      >
                        {project.githubUrl}
                      </a>
                    </div>
                  )}
                  <div className="flex items-start gap-4">
                    <span className="text-cyan w-20">--year</span>
                    <span className="text-phosphor-dim">{project.year}</span>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="text-cyan w-20">--status</span>
                    <span className={cn(
                      project.status === 'deployed' && 'text-phosphor',
                      project.status === 'in-progress' && 'text-amber',
                      project.status === 'archived' && 'text-phosphor-muted'
                    )}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </ManSection>

              {/* SEE ALSO section */}
              <ManSection title="SEE ALSO">
                <p className="text-phosphor-dim">
                  <span className="text-cyan">projects(1)</span>,{' '}
                  <span className="text-cyan">about(5)</span>,{' '}
                  <span className="text-cyan">contact(7)</span>
                </p>
              </ManSection>

              {/* Footer */}
              <div className="mt-8 pt-4 border-t border-phosphor-muted/30 font-mono text-xs text-phosphor-muted flex items-center justify-between">
                <span>{project.year}</span>
                <span>Portfolio v1.0</span>
                <span>PROJECT(7)</span>
              </div>

              {/* Action buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Button asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Live
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button asChild variant="ghost">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Code
                    </a>
                  </Button>
                )}
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
})

ProjectLightbox.displayName = 'ProjectLightbox'

/**
 * Man page section component
 */
interface ManSectionProps {
  title: string
  children: React.ReactNode
}

const ManSection: FC<ManSectionProps> = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="font-mono text-sm font-bold text-phosphor uppercase mb-2">
      {title}
    </h3>
    <div className="pl-4">{children}</div>
  </div>
)

export default ProjectLightbox
