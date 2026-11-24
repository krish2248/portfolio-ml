import { FC } from 'react'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'
import { Lang, langNames } from '@/lib/lang'

const langs: Lang[] = ['en', 'de']

const LanguageToggle: FC = () => {
  const { lang, setLang, c } = useLanguage()

  return (
    <div role="group" aria-label={c.ui.language} className="flex items-center font-mono text-sm">
      {langs.map((option) => (
        <button
          key={option}
          type="button"
          lang={option}
          onClick={() => setLang(option)}
          aria-pressed={lang === option}
          aria-label={langNames[option]}
          title={langNames[option]}
          className={cn(
            'min-h-9 rounded-full px-2.5 py-1.5 transition-colors',
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
