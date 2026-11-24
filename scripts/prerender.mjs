/**
 * Writes the rendered page text into the built HTML, so crawlers, link previews and
 * recruiting tools that don't run JavaScript can read it.
 *
 *   dist/index.html     English
 *   dist/de/index.html  German
 *   dist/404.html       served by GitHub Pages for every unknown address
 *   dist/impressum, dist/datenschutz   only when site.legalPublished (src/content.ts)
 *
 * Runs after `vite build` (client) and `vite build --ssr` (src/entry-server.tsx).
 */
import { access, mkdir, readFile, rm, writeFile } from 'node:fs/promises'

const SSR_DIR = new URL('../node_modules/.prerender/', import.meta.url)
const DIST = new URL('../dist/', import.meta.url)
const SITE = 'https://sonikrish.com'

const { render, renderLegal, renderNotFound } = await import(new URL('entry-server.js', SSR_DIR).href)
const template = await readFile(new URL('index.html', DIST), 'utf8')

/** Replaces exactly one occurrence, and fails the build instead of silently shipping an empty page. */
function replaceOnce(html, from, to) {
  if (html.split(from).length !== 2) throw new Error(`prerender: expected exactly one ${from}`)
  return html.replace(from, () => to)
}

/** Title and description each appear three times: page, Open Graph, Twitter. */
function replaceThree(html, from, to) {
  if (html.split(from).length !== 4) throw new Error(`prerender: expected 3 copies in index.html of "${from}"`)
  return html.replaceAll(from, () => to)
}

const decode = (html) =>
  html.replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replaceAll('&amp;', '&')

const { meta: en, cv } = render('en')

// The Download CV button must never point at a missing file.
await access(new URL(`.${cv}`, DIST)).catch(() => {
  throw new Error(`prerender: ${cv} is missing from dist/. Put the PDF in public${cv}`)
})

for (const lang of ['en', 'de']) {
  const { html: app, mustContain, meta } = render(lang)
  // The footer year comes from the build machine's clock; everything else is from the content files.
  let html = replaceOnce(template, '<div id="root"></div>', `<div id="root">${app}</div>`)
  html = replaceThree(html, en.title, meta.title)
  html = replaceThree(html, en.description, meta.description)
  html = replaceOnce(html, en.imageAlt, meta.imageAlt)

  if (lang === 'de') {
    html = replaceOnce(html, '<html lang="en">', '<html lang="de">')
    html = replaceOnce(html, `<link rel="canonical" href="${SITE}/" />`, `<link rel="canonical" href="${SITE}/de/" />`)
    html = replaceOnce(html, `<meta property="og:url" content="${SITE}/" />`, `<meta property="og:url" content="${SITE}/de/" />`)
    html = replaceOnce(html, 'content="en_GB"', 'content="de_DE"')
  }

  // React puts <!-- --> between neighbouring text nodes; readers ignore it.
  const text = decode(app.replaceAll('<!-- -->', ''))
  for (const expected of mustContain) {
    if (!text.includes(expected)) throw new Error(`prerender (${lang}): missing text "${expected}"`)
  }

  const out = new URL(lang === 'de' ? 'de/index.html' : 'index.html', DIST)
  await mkdir(new URL('.', out), { recursive: true })
  await writeFile(out, html)
  console.log(`prerendered ${lang}: ${html.length} chars, ${mustContain.length} strings checked`)
}

{
  const { html: app, title, description } = renderNotFound()
  let html = replaceOnce(template, '<div id="root"></div>', `<div id="root">${app}</div>`)
  html = replaceThree(html, en.title, title)
  html = replaceThree(html, en.description, description)
  html = replaceOnce(html, `    <link rel="canonical" href="${SITE}/" />`, '    <meta name="robots" content="noindex" />')
  html = html.replace(/ *<link rel="alternate" hreflang=[^>]*>\r?\n/g, '').replace(/ *<meta property="og:url"[^>]*>\r?\n/, '')
  await writeFile(new URL('404.html', DIST), html)
  console.log('prerendered 404')
}

// Refresh our copy of the GitHub contribution graph. Visitors never contact the chart service;
// if it is down, the copy in public/ is used.
try {
  const res = await fetch('https://ghchart.rshah.org/1d6b4f/krish2248', { signal: AbortSignal.timeout(15000) })
  const svg = await res.text()
  if (!res.ok || !svg.includes('<svg') || !svg.includes('data-date') || /<script|href=|url\(/i.test(svg)) throw new Error('unexpected content')
  await writeFile(new URL('github-graph.svg', DIST), svg)
  console.log('github graph refreshed')
} catch (error) {
  console.log(`github graph: kept the saved copy (${error.message})`)
}

const legalPages = renderLegal()
for (const { page, html: app, title, description } of legalPages) {
  const url = `${SITE}/${page}/`
  let html = replaceOnce(template, '<div id="root"></div>', `<div id="root">${app}</div>`)
  html = replaceThree(html, en.title, title)
  html = replaceThree(html, en.description, description)
  html = replaceOnce(html, '<html lang="en">', '<html lang="de">')
  html = replaceOnce(html, `<link rel="canonical" href="${SITE}/" />`, `<link rel="canonical" href="${url}" />`)
  html = replaceOnce(html, `<meta property="og:url" content="${SITE}/" />`, `<meta property="og:url" content="${url}" />`)
  html = replaceOnce(html, 'content="en_GB"', 'content="de_DE"')
  html = html.replace(/ *<link rel="alternate" hreflang=[^>]*>\r?\n/g, '')
  await mkdir(new URL(`${page}/`, DIST), { recursive: true })
  await writeFile(new URL(`${page}/index.html`, DIST), html)
  console.log(`prerendered ${page}`)
}
if (legalPages.length) {
  const file = new URL('sitemap.xml', DIST)
  const urls = legalPages.map(({ page }) => `  <url>\n    <loc>${SITE}/${page}/</loc>\n  </url>\n`).join('')
  await writeFile(file, replaceOnce(await readFile(file, 'utf8'), '</urlset>', `${urls}</urlset>`))
}

await rm(SSR_DIR, { recursive: true, force: true })
