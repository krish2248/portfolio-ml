/**
 * Build-time entry, used only by scripts/prerender.mjs.
 */

import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App'
import { content, notFound, site } from './content'
import { hasPlaceholders, legal } from './legal'
import { Lang } from './lib/lang'
import { legalPages } from './lib/pages'

export function render(lang: Lang) {
  const c = content[lang]
  const html = renderToString(
    <StrictMode>
      <App lang={lang} page="home" />
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
    ...c.projects.more.items.flatMap((p) => [p.title, p.summary, p.url ?? '', p.live ?? '']),
    ...c.experience.items.flatMap((job) => [job.period, job.role, job.company, job.location, job.text]),
    ...c.experience.quotes.flatMap((ref) => [ref.quote, ref.name, ref.role]),
    ...c.education.items.flatMap((item) => [item.period, item.degree, item.school, ...item.notes]),
    ...c.education.skills.flatMap((row) => [row.group, row.text]),
    site.medium,
    site.youtube,
    c.bored.youtube.title,
    ...c.bored.blogs.items.flatMap((blog) => [blog.title, blog.type, blog.url]),
    c.contact.locationValue,
  ].filter(Boolean)

  return { html, mustContain, meta: c.meta, cv: site.cv }
}

export function renderNotFound() {
  const html = renderToString(
    <StrictMode>
      <App lang="en" page="notFound" />
    </StrictMode>
  )
  return { html, title: `${notFound.en.title} · ${site.name}`, description: notFound.en.text }
}

/** The legal pages to publish; none unless `site.legalPublished`. */
export function renderLegal() {
  if (!site.legalPublished) return []
  return legalPages.map((page) => {
    const text = legal[page]
    if (hasPlaceholders(text)) throw new Error(`src/legal.ts: ${page} still has [[placeholders]], so it can't be published`)
    const html = renderToString(
      <StrictMode>
        <App lang="de" page={page} />
      </StrictMode>
    )
    return { page, html, title: `${text.title} · ${site.name}`, description: text.description }
  })
}
