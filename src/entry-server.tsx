/**
 * Build-time entry, used only by scripts/prerender.mjs.
 */

import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { content, moreProjects, site } from './content'
import { Lang } from './lib/lang'

export function render(lang: Lang) {
  const c = content[lang]
  const html = renderToString(
    <StrictMode>
      <App lang={lang} />
    </StrictMode>
  )

  // The build fails if any of these is missing from the HTML.
  const mustContain = [
    site.name,
    site.email,
    site.cv,
    c.hero.tagline,
    c.hero.statement,
    c.now.updated,
    ...c.now.items,
    ...c.projects.items.flatMap((p) => [p.title, p.badge ?? '', p.summary, p.url ?? '', p.live ?? '', ...(p.stack ?? [])]),
    ...moreProjects.flatMap((p) => [p.title, p.url]),
    ...c.experience.items.flatMap((job) => [job.period, job.role, job.company, job.location, job.text]),
    ...c.experience.quotes.flatMap((ref) => [ref.quote, ref.name, ref.role]),
    ...c.education.items.flatMap((item) => [item.period, item.degree, item.school, item.note ?? '']),
    ...c.skills.rows,
    c.contact.locationValue,
  ].filter(Boolean)

  return { html, mustContain, meta: c.meta, cv: site.cv }
}
