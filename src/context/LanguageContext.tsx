/**
 * Language context: English/German, persisted to localStorage.
 * English is at `/`, German at `/de/`, both pre-rendered. index.html sends `?lang=de` links and visitors
 * who chose German before to `/de/` before first paint.
 */

import { createContext, useContext, useEffect, useMemo, useState, useCallback, ReactNode } from 'react'
import { content, Content } from '@/content'
import { langPath, Lang } from '@/lib/lang'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  /** All text, in the current language. */
  c: Content
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

const STORAGE_KEY = 'portfolio-lang'

export function LanguageProvider({ initialLang, children }: { initialLang: Lang; children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    // Keep the address in step, so reloading or sharing it gives the same language.
    window.history.replaceState(null, '', langPath[next] + window.location.hash)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // The switch still works for this visit.
    }
  }, [])

  const value = useMemo(
    () => ({ lang, setLang, c: content[lang] }),
    [lang, setLang]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
