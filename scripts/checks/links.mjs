import fs from 'node:fs'
const B = 'http://localhost:4199'
const headers = { 'user-agent': 'link-checker' }
const ext = new Map(), int = new Map(); let anchors = 0, bad = []
for (const [file, at] of [['dist/index.html', '/'], ['dist/de/index.html', '/de/'], ['dist/404.html', '/nope']]) {
  const h = fs.readFileSync(file, 'utf8'); const ids = new Set([...h.matchAll(/ id="([^"]+)"/g)].map((m) => m[1]))
  for (const [, u] of h.matchAll(/(?:href|src)="([^"]+)"/g)) {
    if (u.startsWith('#')) { anchors++; if (!ids.has(u.slice(1))) bad.push(`${at} anchor ${u}`) }
    else if (u.startsWith('mailto:')) continue
    else if (/^https?:/.test(u)) { if (u.startsWith('https://sonikrish.com')) int.set(u.replace('https://sonikrish.com', '') || '/', at); else ext.set(u, at) }
    else int.set(u, at)
  }
  for (const [, u] of h.matchAll(/content="https:\/\/sonikrish\.com([^"]*)"/g)) int.set(u || '/', at)
}
for (const [, u] of fs.readFileSync('dist/sitemap.xml', 'utf8').matchAll(/https:\/\/sonikrish\.com([^"<]*)/g)) int.set(u, 'sitemap')
for (const u of ['/robots.txt', '/sitemap.xml', '/de', '/?lang=de']) int.set(u, 'extra')
for (const [u] of int) { const r = await fetch(B + u); if (r.status !== 200) bad.push(`internal ${r.status} ${u}`) }
const cv = await fetch(B + '/cv/Krish_Soni_CV.pdf'); const pdf = Buffer.from(await cv.arrayBuffer())
console.log('anchors', anchors, 'internal', int.size, [...int.keys()].join(' '))
console.log('CV', cv.status, cv.headers.get('content-type'), pdf.length, pdf.subarray(0, 5).toString())
console.log('404 status:', (await fetch(B + '/nope')).status, (await fetch(B + '/impressum')).status, (await fetch(B + '/datenschutz/')).status, (await fetch(B + '/de/nope')).status)
for (const [u] of ext) { let s; try { s = (await fetch(u, { headers, redirect: 'follow', signal: AbortSignal.timeout(20000) })).status } catch (e) { s = 'ERR ' + e.message }
  console.log(s, u); if (s !== 200) bad.push(`external ${s} ${u}`) }
const uris = [...new Set([...pdf.toString('latin1').matchAll(/\/URI \((https?:[^)]+)\)/g)].map((m) => m[1]))]
for (const u of uris.filter((x) => !ext.has(x))) { try { const r = await fetch(u, { headers, signal: AbortSignal.timeout(20000) }); console.log('cv', r.status, u); if (r.status !== 200) bad.push(`cv ${r.status} ${u}`) } catch (e) { bad.push('cv ERR ' + u) } }
console.log('cv web links', uris.length); console.log('\nBROKEN:', JSON.stringify(bad, null, 1))
