/**
 * Build-time entry, used only by scripts/prerender.mjs.
 */

import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { contentEn } from './lib/data'
import { contentDe } from './lib/data.de'
import { Lang } from './lib/i18n'

export function render(lang: Lang) {
  const c = lang === 'de' ? contentDe : contentEn
  const html = renderToString(
    <StrictMode>
      <App lang={lang} />
    </StrictMode>
  )

  // The build fails if any of these is missing from the HTML.
  const projects = [...c.featuredProjects, ...c.moreProjects, ...c.personalProjects]
  const mustContain = [
    c.siteConfig.name,
    c.siteConfig.statement,
    c.siteConfig.intro,
    c.availability.headline,
    c.availability.terms,
    ...c.quickFacts.flatMap((fact) => [fact.label, fact.value]),
    ...c.openTo.flatMap((item) => [item.title, item.body]),
    ...c.experiences.flatMap((job) => [job.title, job.company, job.period, ...job.points]),
    ...c.education.flatMap((item) => [item.degree, item.institution, ...item.details]),
    ...c.skills.flatMap((row) => [row.group, ...row.items]),
    ...projects.flatMap((project) => [project.title, project.summary]),
    ...c.references.flatMap((ref) => [ref.quote, ref.name, ref.role]),
  ]

  return { html, mustContain }
}
