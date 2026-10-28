/**
 * Language context: English/German, persisted to localStorage.
 * English is the default; the choice is remembered per visitor and `?lang=de` links straight to German.
 */

import { createContext, useContext, useEffect, useMemo, useState, useCallback, ReactNode } from 'react'
import { contentEn, Content } from '@/lib/data'
import { contentDe } from '@/lib/data.de'
import { ui, Lang, UI } from '@/lib/i18n'

interface LanguageContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  /** Interface text. */
  t: UI
  /** CV content. */
  c: Content
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

const STORAGE_KEY = 'portfolio-lang'

/** `?lang=de` in the URL wins (handy for links sent to German recruiters), then the saved choice. */
function initialLang(): Lang {
  const fromUrl = new URLSearchParams(window.location.search).get('lang')
  if (fromUrl === 'en' || fromUrl === 'de') return fromUrl
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'en' || saved === 'de') return saved
  } catch {
    // Storage can be blocked (private mode); fall back to English.
  }
  return 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // The switch still works for this visit.
    }
  }, [])

  const value = useMemo(
    () => ({ lang, setLang, t: ui[lang], c: lang === 'de' ? contentDe : contentEn }),
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
