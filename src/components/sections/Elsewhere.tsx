import { FC } from 'react'
import { personalProjects, socialLinks, studyRepos } from '@/lib/data'
import Section from '../layout/Section'
import ProjectCover from '../ui/ProjectCover'
import { ProjectLinks } from './Projects'

const Elsewhere: FC = () => (
  <Section id="elsewhere" title="Elsewhere" note="Learning in public, writing, and things I build for fun.">
    <div className="grid gap-10 md:grid-cols-2">
      <div>
        <h3 className="eyebrow">Learning in public</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-2">
          Around 40 public repositories, including study notes and notebooks I keep while working through the
          fundamentals:
        </p>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
          {studyRepos.map((repo) => (
            <li key={repo.url}>
              <a href={repo.url} target="_blank" rel="noopener noreferrer" className="link">
                {repo.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="eyebrow">Writing & video</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-2">
          I write about machine learning, data science and software engineering on{' '}
          <a href={socialLinks.medium} target="_blank" rel="noopener noreferrer" className="link">
            Medium
          </a>{' '}
          and publish technical videos on{' '}
          <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="link">
            YouTube
          </a>
          . Outside of work I tinker with ESP32 and Raspberry Pi, and run quantised open-weight LLMs locally.
        </p>
      </div>
    </div>

    <a
      href={socialLinks.github}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-10 block rounded-lg border border-line bg-surface p-4 transition-colors hover:border-line-strong"
      aria-label="GitHub contribution graph, opens GitHub profile"
    >
      {/* Inverted in dark mode so the empty cells go dark instead of glaring grey. */}
      <img
        src="https://ghchart.rshah.org/1d6b4f/krish2248"
        alt="Krish Soni’s GitHub contributions over the past year"
        className="h-auto w-full dark:hue-rotate-180 dark:invert"
        loading="lazy"
      />
    </a>

    <h3 className="eyebrow mt-14">Outside work</h3>
    <p className="mt-3 text-sm text-ink-2">Football, coffee, indie games and classic literature, each with a small project attached.</p>
    <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {personalProjects.map((project) => (
        <article key={project.id} className="group">
          <a
            href={project.liveUrl ?? project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
            aria-hidden="true"
            className="block overflow-hidden rounded-lg border border-line transition-colors group-hover:border-line-strong"
          >
            <ProjectCover motif={project.motif} />
          </a>
          <h4 className="mt-3 font-medium text-ink">{project.title}</h4>
          <p className="font-mono text-xs text-muted">{project.kind}</p>
          <p className="mt-1 text-sm text-ink-2">{project.summary}</p>
          <div className="mt-2">
            <ProjectLinks project={project} />
          </div>
        </article>
      ))}
    </div>
  </Section>
)

export default Elsewhere
