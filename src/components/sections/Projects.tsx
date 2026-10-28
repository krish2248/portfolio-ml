import { FC } from 'react'
import { Project } from '@/lib/data'
import { useLanguage } from '@/context/LanguageContext'
import Section from '../layout/Section'
import ProjectCover from '../ui/ProjectCover'

/** "github.com/krish2248/futology" → "krish2248/futology"; otherwise the live domain. */
export function coverCaption(project: Project): string | undefined {
  if (project.githubUrl) return project.githubUrl.replace('https://github.com/', '')
  if (project.liveUrl) return new URL(project.liveUrl).hostname
  return undefined
}

const Projects: FC = () => {
  const { t, c } = useLanguage()

  return (
    <Section id="projects" title={t.projects.title} note={t.projects.note}>
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
        {c.featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <h3 className="eyebrow mt-16">{t.projects.more}</h3>
      <ul className="mt-4 border-t border-line">
        {c.moreProjects.map((project) => (
          <li key={project.id} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[14rem_1fr_auto] sm:items-baseline sm:gap-6">
            <span className="font-medium text-ink">{project.title}</span>
            <span className="text-sm text-ink-2">
              {project.summary} <span className="text-muted">{project.technologies.join(', ')}</span>
            </span>
            <ProjectLinks project={project} />
          </li>
        ))}
      </ul>
    </Section>
  )
}

const ProjectCard: FC<{ project: Project }> = ({ project }) => {
  const primaryUrl = project.liveUrl ?? project.githubUrl

  return (
    <article className="group flex flex-col">
      <a
        href={primaryUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
        className="block overflow-hidden rounded-lg border border-line transition-colors group-hover:border-line-strong"
      >
        <ProjectCover motif={project.motif} caption={coverCaption(project)} />
      </a>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-medium text-ink">
          <a href={primaryUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            {project.title}
          </a>
        </h3>
        <span className="shrink-0 font-mono text-xs text-muted">{project.kind}</span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-2">{project.summary}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4">
        <span className="font-mono text-xs text-muted">{project.technologies.join(' · ')}</span>
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}

export const ProjectLinks: FC<{ project: Project }> = ({ project }) => {
  const { t } = useLanguage()

  return (
    <span className="flex gap-4 text-sm">
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="link">
          {t.projects.live}<span className="sr-only">{t.projects.liveSr(project.title)}</span> ↗
        </a>
      )}
      {project.githubUrl && (
        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="link">
          {t.projects.code}<span className="sr-only">{t.projects.codeSr(project.title)}</span> ↗
        </a>
      )}
    </span>
  )
}

export default Projects
