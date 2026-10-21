import { FC } from 'react'
import { education, skills } from '@/lib/data'
import Section from '../layout/Section'

const Education: FC = () => (
  <Section id="education" title="Education & skills">
    <ol className="space-y-10">
      {education.map((item) => (
        <li key={item.id} className="grid gap-2 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
          <div className="font-mono text-xs leading-6 text-muted">{item.period}</div>
          <div>
            <h3 className="font-medium text-ink">{item.degree}</h3>
            <p className="text-sm text-ink-2">
              {item.institution} <span className="text-muted">· {item.location}</span>
            </p>
            {item.details.map((detail) => (
              <p key={detail} className="mt-2 text-sm leading-relaxed text-ink-2">
                {detail}
              </p>
            ))}
          </div>
        </li>
      ))}
    </ol>

    <dl className="mt-14 border-t border-line">
      {skills.map((row) => (
        <div key={row.group} className="grid gap-1 border-b border-line py-3 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
          <dt className="text-sm text-muted">{row.group}</dt>
          <dd className="text-sm text-ink-2">{row.items.join(', ')}</dd>
        </div>
      ))}
    </dl>
  </Section>
)

export default Education
