export type LegalPage = 'impressum' | 'datenschutz'
export type Page = 'home' | 'notFound' | LegalPage

export const legalPages: LegalPage[] = ['impressum', 'datenschutz']

/** GitHub Pages serves 404.html for every other address. */
export function pageFromPath(pathname: string): Page {
  if (/^\/(de\/?)?(index\.html)?$/.test(pathname)) return 'home'
  return legalPages.find((page) => new RegExp(`^/${page}/?(index\\.html)?$`).test(pathname)) ?? 'notFound'
}
