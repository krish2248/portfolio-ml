import { FC } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import Section from '../layout/Section'

const Education: FC = () => {
  const { education } = useLanguage().c

  return (
    <Section id="education" title={education.title}>
      <ol className="space-y-10">
        {education.items.map((item) => (
          <li key={item.id} className="grid gap-2 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
            <div className="font-mono text-xs leading-6 text-muted">{item.period}</div>
            <div>
              <h3 className="font-medium text-ink">{item.degree}</h3>
              <p className="text-sm text-ink-2">{item.school}</p>
              {item.note && <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.note}</p>}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export default Education
