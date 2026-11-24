import { FC } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import Section from '../layout/Section'
import ProjectCover from '../ui/ProjectCover'

const Bored: FC = () => {
  const { bored } = useLanguage().c

  return (
    <Section id="bored" title={bored.title}>
      <ul className="grid gap-x-6 gap-y-8 sm:grid-cols-3">
        {bored.items.map((item) => (
          <li key={item.id}>
            <div className="overflow-hidden rounded-lg border border-line">
              <ProjectCover motif={item.motif} />
            </div>
            <h3 className="mt-4 text-lg font-medium text-ink">
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="link">
                  {item.title} ↗
                </a>
              ) : (
                item.title
              )}
            </h3>
            <p className="mt-1 text-ink-2">{item.text}</p>
            {!item.url && (
              <p className="mt-2 inline-block rounded border border-accent px-1.5 py-0.5 font-mono text-xs uppercase tracking-wide text-accent">
                {bored.soon}
              </p>
            )}
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default Bored
