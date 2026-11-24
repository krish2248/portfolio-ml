import { FC } from 'react'
import { Project, site, SmallProject } from '@/content'
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

      <h3 className="eyebrow mt-16">{projects.more.title}</h3>
      <ul className="mt-5 grid gap-x-8 border-t border-line lg:grid-cols-2">
        {projects.more.items.map((project) => (
          <SmallCard key={project.id} project={project} liveLabel={projects.more.live} />
        ))}
      </ul>

      <h3 className="eyebrow mt-16">{projects.graph.title}</h3>
      <a
        href={site.github}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 block rounded-lg border border-line bg-surface p-4 transition-colors hover:border-line-strong"
        aria-label={projects.graph.label}
      >
        {/* Our own copy, refreshed at every deploy (scripts/prerender.mjs). Inverted in dark mode so empty cells go dark. */}
        <img
          src="/github-graph.svg"
          alt={projects.graph.alt}
          width={663}
          height={104}
          loading="lazy"
          className="h-auto w-full dark:hue-rotate-180 dark:invert"
        />
      </a>
    </Section>
  )
}

const Links: FC<{ project: { title: string; url?: string; live?: string }; liveLabel?: string }> = ({ project, liveLabel }) => {
  const { projects } = useLanguage().c

  return (
    <p className="mt-1 flex gap-4">
      {project.live && (
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="link">
          {liveLabel ?? projects.live}
          <span className="sr-only">: {project.title}</span> ↗
        </a>
      )}
      {project.url && (
        <a href={project.url} target="_blank" rel="noopener noreferrer" className="link">
          {projects.code}
          <span className="sr-only">: {project.title}</span> ↗
        </a>
      )}
    </p>
  )
}

const SmallCard: FC<{ project: SmallProject; liveLabel: string }> = ({ project, liveLabel }) => (
  <li className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-5">
    <div className="self-start overflow-hidden rounded-md border border-line">
      <ProjectCover motif={project.motif} />
    </div>
    <div className="min-w-0">
      <h4 className="font-medium text-ink">{project.title}</h4>
      <p className="mt-1 leading-snug text-ink-2">{project.summary}</p>
      {(project.url || project.live) && <Links project={project} liveLabel={liveLabel} />}
    </div>
  </li>
)

const ProjectCard: FC<{ project: Project; wide: boolean }> = ({ project, wide }) => {
  const { title, badge, summary, stack, url, motif } = project
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
            {url && <Links project={project} />}
          </div>
        )}
      </div>
    </article>
  )
}

export default Projects
