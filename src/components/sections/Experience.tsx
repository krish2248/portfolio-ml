import { FC } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import Section from '../layout/Section'

const Experience: FC = () => {
  const { experience } = useLanguage().c

  return (
    <Section id="experience" title={experience.title}>
      <ol className="space-y-10">
        {experience.items.map((job) => (
          <li key={job.id} className="grid gap-2 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
            <div className="font-mono text-sm leading-6 text-muted">{job.period}</div>
            <div>
              <h3 className="text-lg font-medium text-ink">
                {job.role} <span className="font-normal text-ink-2">· {job.company}</span>
              </h3>
              <p className="text-sm text-muted">{job.location}</p>
              <p className="mt-2 max-w-measure leading-relaxed text-ink-2">{job.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <h3 className="eyebrow mt-16">{experience.quotesTitle}</h3>
      <div className="mt-4 grid gap-6 md:grid-cols-3">
        {experience.quotes.map((ref) => (
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
