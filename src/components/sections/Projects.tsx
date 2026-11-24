import { FC } from 'react'
import { moreProjects, Project } from '@/content'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import Section from '../layout/Section'
import ProjectCover from '../ui/ProjectCover'

const Projects: FC = () => {
  const { projects } = useLanguage().c

  return (
    <Section id="projects" title={projects.title}>
      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2">
        {projects.items.map((project, i) => (
          // The first project takes the full row.
          <ProjectCard key={project.id} project={project} wide={i === 0} />
        ))}
      </div>

      <p className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-line pt-4">
        <span className="text-muted">{projects.more}</span>
        {moreProjects.map((project) => (
          <a key={project.url} href={project.url} target="_blank" rel="noopener noreferrer" className="link">
            {project.title}
          </a>
        ))}
      </p>
    </Section>
  )
}

const ProjectCard: FC<{ project: Project; wide: boolean }> = ({ project, wide }) => {
  const { projects } = useLanguage().c
  const { title, badge, summary, stack, url, live, motif } = project
  const frame = 'block overflow-hidden rounded-lg border border-line'
  const cover = <ProjectCover motif={motif} caption={url?.replace('https://github.com/', '')} />

  return (
    <article className={cn('group flex flex-col', wide && 'sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-6')}>
      {url ? (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          aria-hidden="true"
          className={cn(frame, 'self-start transition-colors group-hover:border-line-strong', 'w-full')}
        >
          {cover}
        </a>
      ) : (
        <div className={frame}>{cover}</div>
      )}
      <div className={cn('flex grow flex-col', wide ? 'mt-4 sm:mt-0' : 'mt-4')}>
        {badge && (
          <p className="mb-2 self-start rounded border border-accent px-1.5 py-0.5 font-mono text-xs uppercase tracking-wide text-accent">
            {badge}
          </p>
        )}
        <h3 className="text-lg font-medium text-ink">
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block py-px hover:text-accent">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        <p className="mt-2 max-w-measure leading-relaxed text-ink-2">{summary}</p>
        {(stack || url) && (
          <div className="mt-auto pt-3">
            <p className="font-mono text-sm text-muted">{stack?.join(' · ')}</p>
            <p className="mt-1 flex gap-4">
              {live && (
                <a href={live} target="_blank" rel="noopener noreferrer" className="link">
                  {projects.live}
                  <span className="sr-only">: {title}</span> ↗
                </a>
              )}
              {url && (
                <a href={url} target="_blank" rel="noopener noreferrer" className="link">
                  {projects.code}
                  <span className="sr-only">: {title}</span> ↗
                </a>
              )}
            </p>
          </div>
        )}
      </div>
    </article>
  )
}

export default Projects
