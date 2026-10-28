import { FC } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import Section from '../layout/Section'

const OpenTo: FC = () => {
  const { t, c } = useLanguage()

  return (
    <Section id="open-to" title={t.openTo.title} note={t.openTo.note(c.availability.from)}>
      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
        {c.openTo.map((item) => (
          <div key={item.title} className="bg-surface p-5 sm:p-6">
            <h3 className="font-medium text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-2">{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default OpenTo
