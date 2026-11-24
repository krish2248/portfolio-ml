export type LegalPage = 'impressum' | 'datenschutz'
export type Page = 'home' | LegalPage

export const legalPages: LegalPage[] = ['impressum', 'datenschutz']

export const pageFromPath = (pathname: string): Page =>
  legalPages.find((page) => new RegExp(`^/${page}(/|$)`).test(pathname)) ?? 'home'
