import { FC } from 'react'
import { useLanguage } from '@/context/LanguageContext'

/** Small panel beside the hero. */
const Now: FC = () => {
  const { now } = useLanguage().c

  return (
    <aside aria-labelledby="now-title" className="rounded-lg border border-line bg-surface p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <h2 id="now-title" className="flex items-center gap-2 font-serif text-xl font-medium text-ink">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          {now.title}
        </h2>
        <p className="text-sm text-muted">{now.updated}</p>
      </div>
      <ul className="mt-4 border-t border-line">
        {now.items.map((item) => (
          <li key={item} className="border-b border-line py-3 leading-snug text-ink-2 last:border-0 last:pb-0">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Now
