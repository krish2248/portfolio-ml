export type Lang = 'en' | 'de'

/** English lives at `/`, German at `/de/`. */
export const langPath: Record<Lang, string> = { en: '/', de: '/de/' }

export const langFromPath = (pathname: string): Lang => (/^\/de(\/|$)/.test(pathname) ? 'de' : 'en')

export const langNames: Record<Lang, string> = { en: 'English', de: 'Deutsch' }
