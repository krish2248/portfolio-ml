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
      <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {projects.items.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* A native <details>, so the text stays in the HTML and it works without JavaScript. */}
      <details className="group/more mt-12">
        <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-md border border-muted px-4 py-2 font-medium text-ink transition-colors hover:border-ink [&::-webkit-details-marker]:hidden">
          <span className="group-open/more:hidden">
            {projects.more.title} ({projects.more.items.length})
          </span>
          <span className="hidden group-open/more:inline">{projects.more.less}</span>
          <span aria-hidden="true" className="transition-transform group-open/more:rotate-180">
            ↓
          </span>
        </summary>
        <ul className="mt-6 grid gap-x-10 border-t border-line lg:grid-cols-2">
          {projects.more.items.map((project) => (
            <SmallCard key={project.id} project={project} liveLabel={projects.more.live} />
          ))}
        </ul>
      </details>

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
  <li className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[8rem_1fr] sm:gap-5">
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

const ProjectCard: FC<{ project: Project }> = ({ project }) => {
  const { title, badge, summary, stack, url, motif } = project
  const frame = 'block overflow-hidden rounded-lg border border-line'
  const cover = <ProjectCover motif={motif} caption={url?.replace('https://github.com/', '')} className="aspect-[5/2]" />

  return (
    <article className="group flex flex-col">
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
      <div className="mt-3 flex grow flex-col">
        <h3 className="text-lg font-medium text-ink">
          {url ? (
            <a href={url} target="_blank" rel="noopener noreferrer" className="inline-block py-px hover:text-accent">
              {title}
            </a>
          ) : (
            title
          )}
          {badge && (
            <span className="ml-2.5 inline-block rounded border border-accent px-1.5 py-0.5 align-middle font-mono text-xs uppercase tracking-wide text-accent">
              {badge}
            </span>
          )}
        </h3>
        <p className="mt-1 max-w-measure leading-relaxed text-ink-2">{summary}</p>
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
