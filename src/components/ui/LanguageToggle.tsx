import { FC } from 'react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { Lang } from '@/lib/i18n'

const langs: Lang[] = ['en', 'de']

const LanguageToggle: FC = () => {
  const { lang, setLang, t } = useLanguage()

  return (
    <div role="group" aria-label={t.language.label} className="flex items-center font-mono text-xs">
      {langs.map((option) => (
        <button
          key={option}
          type="button"
          lang={option}
          onClick={() => setLang(option)}
          aria-pressed={lang === option}
          aria-label={t.language.names[option]}
          title={t.language.names[option]}
          className={cn(
            'rounded-full px-2 py-1.5 transition-colors',
            lang === option ? 'bg-accent-soft text-ink' : 'text-muted hover:text-ink'
          )}
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

export default LanguageToggle
