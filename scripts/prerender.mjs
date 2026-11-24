/**
 * Writes the rendered page text into the built HTML, so crawlers, link previews and
 * recruiting tools that don't run JavaScript can read it.
 *
 *   dist/index.html     English
 *   dist/de/index.html  German
 *
 * Runs after `vite build` (client) and `vite build --ssr` (src/entry-server.tsx).
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'

const SSR_DIR = new URL('../node_modules/.prerender/', import.meta.url)
const DIST = new URL('../dist/', import.meta.url)
const SITE = 'https://sonikrish.com'

const { render } = await import(new URL('entry-server.js', SSR_DIR).href)
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

const { meta: en } = render('en')

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

await rm(SSR_DIR, { recursive: true, force: true })
