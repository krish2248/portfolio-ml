import { FC } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import Section from '../layout/Section'

const Now: FC = () => {
  const { now } = useLanguage().c

  return (
    <Section id="now" title={now.title} note={now.updated}>
      <ul className="max-w-3xl border-t border-line">
        {now.items.map((item) => (
          <li key={item} className="border-b border-line py-3 text-ink-2">
            {item}
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default Now
