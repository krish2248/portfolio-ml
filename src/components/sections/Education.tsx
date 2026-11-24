import { FC } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import Section from '../layout/Section'

/** Education and skills, side by side. */
const Education: FC = () => {
  const { education } = useLanguage().c

  return (
    <Section id="education" title={education.title}>
      <div className="grid gap-12 md:grid-cols-2 md:gap-10 xl:gap-16">
        <ol className="space-y-9">
          {education.items.map((item) => (
            <li key={item.id}>
              <p className="font-mono text-sm leading-6 text-muted">{item.period}</p>
              <h3 className="mt-1 text-lg font-medium text-ink">{item.degree}</h3>
              <p className="text-ink-2">{item.school}</p>
              {item.notes.map((note) => (
                <p key={note} className="mt-2 leading-relaxed text-ink-2">
                  {note}
                </p>
              ))}
              {item.modules && (
                <dl className="mt-3 space-y-2">
                  {item.modules.map((row) => (
                    <div key={row.semester}>
                      <dt className="text-sm text-muted">{row.semester}</dt>
                      <dd className="leading-relaxed text-ink-2">{row.text}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </li>
          ))}
        </ol>

        <div>
          <h3 className="sr-only">{education.skillsTitle}</h3>
          <dl className="border-t border-line md:border-t-0">
            {education.skills.map((row) => (
              <div key={row.group} className="border-b border-line py-3 first:md:pt-0 last:border-0">
                <dt className="font-mono text-sm leading-6 text-muted">{row.group}</dt>
                <dd className="text-ink-2">{row.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  )
}

export default Education
