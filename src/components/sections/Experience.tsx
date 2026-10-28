import { FC } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import Section from '../layout/Section'

const Experience: FC = () => {
  const { t, c } = useLanguage()

  return (
    <Section id="experience" title={t.experience.title}>
      <ol className="space-y-12">
        {c.experiences.map((job) => (
          <li key={job.id} className="grid gap-2 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
            <div className="font-mono text-xs leading-6 text-muted">
              {job.period}
              <span className="block">{job.type}</span>
            </div>
            <div>
              <h3 className="font-medium text-ink">
                {job.title} <span className="font-normal text-ink-2">· {job.company}</span>
              </h3>
              <p className="text-sm text-muted">{job.location}</p>
              <ul className="mt-3 space-y-2">
                {job.points.map((point) => (
                  <li key={point} className="relative pl-4 text-sm leading-relaxed text-ink-2 before:absolute before:left-0 before:top-[0.6em] before:h-px before:w-2 before:bg-line-strong">
                    {point}
                  </li>
                ))}
              </ul>
              {job.stack && <p className="mt-3 font-mono text-xs text-muted">{job.stack}</p>}
            </div>
          </li>
        ))}
      </ol>

      <h3 className="eyebrow mt-16">{t.experience.references}</h3>
      <div className="mt-4 grid gap-6 md:grid-cols-3">
        {c.references.map((ref) => (
          <figure key={ref.name} className="flex flex-col border-l-2 border-accent pl-4">
            <blockquote lang="en" className="font-serif text-[1.05rem] italic leading-relaxed text-ink-2">“{ref.quote}”</blockquote>
            <figcaption className="mt-auto min-h-[4.5rem] pt-3 text-sm">
              <span className="text-ink">{ref.name}</span>
              <span className="block text-muted">{ref.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  )
}

export default Experience
