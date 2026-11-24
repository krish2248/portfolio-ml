import { spawn } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
const BASE = 'http://localhost:4199', OUT = process.argv[2]
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--remote-debugging-port=9334', '--window-size=1280,900', '--user-data-dir=' + mkdtempSync(path.join(tmpdir(), 'a11y-')), 'about:blank'])
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let target
for (let i = 0; i < 40 && !target; i++) { await sleep(300); try { target = (await (await fetch('http://127.0.0.1:9334/json')).json()).find((t) => t.type === 'page') } catch {} }
const ws = new WebSocket(target.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r))
let id = 0; const wait = new Map(); let logs = []
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id) { wait.get(d.id)?.(d.result ?? d.error); return }
  if (d.method === 'Runtime.exceptionThrown') logs.push('EXC')
  if (d.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(d.params.type)) logs.push(d.params.args.map((a) => a.value ?? a.description).join(' ').slice(0, 150)) }
const send = (method, params = {}) => new Promise((r) => { const n = ++id; wait.set(n, r); ws.send(JSON.stringify({ id: n, method, params })) })
const ev = async (e) => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); if (r.exceptionDetails) return 'ERR ' + r.exceptionDetails.exception?.description; return r.result?.value }
const shot = async (n) => writeFileSync(OUT + '/' + n + '.png', Buffer.from((await send('Page.captureScreenshot', { format: 'png' })).data, 'base64'))
await send('Page.enable'); await send('Runtime.enable')
const media = (scheme, motion) => send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: scheme }, { name: 'prefers-reduced-motion', value: motion }] })

const AUDIT = `(() => {
  const cv = document.createElement('canvas').getContext('2d', { willReadFrequently: true })
  const rgb = (c) => { cv.clearRect(0,0,1,1); cv.fillStyle = c; cv.fillRect(0,0,1,1); const d = cv.getImageData(0,0,1,1).data; return [d[0],d[1],d[2],d[3]/255] }
  const lum = ([r,g,b]) => { const f = (v) => { v/=255; return v<=0.03928? v/12.92 : ((v+0.055)/1.055)**2.4 }; return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b) }
  const ratio = (a,b) => { const [x,y] = [lum(a),lum(b)].sort((p,q)=>q-p); return (x+0.05)/(y+0.05) }
  const bgOf = (el) => { for (let e = el; e; e = e.parentElement) { const c = rgb(getComputedStyle(e).backgroundColor); if (c[3] > 0.99) return c } return rgb(getComputedStyle(document.documentElement).backgroundColor) }
  const sizes = {}, low = [], long = []
  let min = 99
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  while (w.nextNode()) {
    const t = w.currentNode.textContent.trim(); if (!t) continue
    const el = w.currentNode.parentElement; const s = getComputedStyle(el)
    if (['SCRIPT','STYLE'].includes(el.tagName) || el.closest('.sr-only, svg') || s.display === 'none' || !el.getClientRects().length) continue
    const fs = parseFloat(s.fontSize); (sizes[fs] ??= new Set()).add(el.tagName.toLowerCase() + ':' + t.slice(0, 26))
    const r = ratio(rgb(s.color), bgOf(el)); min = Math.min(min, r); if (r < 4.5) low.push(r.toFixed(2) + ' ' + t.slice(0, 30))
    if (t.length > 70 && !el.closest('a')) { const range = document.createRange(); range.selectNodeContents(w.currentNode); const lines = new Set([...range.getClientRects()].map((x) => Math.round(x.top))).size; long.push([Math.round(t.length / lines * 10) / 10, lines, t.slice(0, 28)]) }
  }
  return { sizes: Object.fromEntries(Object.entries(sizes).map(([k, v]) => [k, v.size + ' e.g. ' + [...v].slice(0, 2).join(' | ')])), minContrast: +min.toFixed(2), low, maxCharsPerLine: long.sort((a, b) => b[0] - a[0]).slice(0, 4),
    h: [...document.querySelectorAll('h1,h2,h3,h4')].map((h) => h.tagName + ' ' + h.textContent.slice(0, 22)).join(' / '), overflow: document.documentElement.scrollWidth - innerWidth,
    offscreen: [...document.querySelectorAll('main *, header *, footer *')].filter((e) => { const r = e.getBoundingClientRect(); return r.width && (r.right > innerWidth + 1 || r.left < -1) && !e.closest('svg, .sr-only') && getComputedStyle(e).position !== 'absolute' && !String(e.className).includes('sr-only') }).map((e) => e.tagName + '.' + String(e.className).slice(0, 30)).slice(0, 4),
    imgs: [...document.images].map((i) => i.alt), small: [...document.querySelectorAll('a,button')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 2 && (r.height < 24 || r.width < 24) }).map((e) => e.textContent.trim().slice(0, 18) + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height)) }
})()`
const first = process.argv[3] !== 'quick'
for (const [p, scheme] of [['/', 'light'], ['/', 'dark'], ['/de/', 'light']]) for (const width of [375, 768, 1280]) {
  await media(scheme, 'no-preference'); await send('Emulation.setDeviceMetricsOverride', { width, height: 800, deviceScaleFactor: 1, mobile: width < 600 })
  await send('Page.navigate', { url: BASE + p }); await sleep(1800)
  const a = await ev(AUDIT)
  console.log(`\n## ${p} ${scheme} ${width}: minContrast ${a.minContrast} low ${JSON.stringify(a.low)} overflow ${a.overflow} off ${JSON.stringify(a.offscreen)}`)
  console.log('   line chars:', JSON.stringify(a.maxCharsPerLine.map((x) => x[0] + ' (' + x[1] + ' lines) ' + x[2])))
  if (scheme === 'light') console.log('   sizes:', JSON.stringify(a.sizes))
  console.log('   small targets:', JSON.stringify(a.small))
  if (width === 1280 && scheme === 'light') console.log('   headings:', a.h, '\n   imgs', a.imgs)
  const h = await ev('document.documentElement.scrollHeight'); await send('Emulation.setDeviceMetricsOverride', { width, height: h, deviceScaleFactor: 1, mobile: width < 600 }); await sleep(300); await shot(`A${p === '/' ? 'en' : 'de'}-${scheme}-${width}`)
}
// Keyboard walk
for (const width of [1280, 375]) {
  await media('light', 'reduce'); await send('Emulation.setDeviceMetricsOverride', { width, height: 800, deviceScaleFactor: 1, mobile: false })
  await send('Page.navigate', { url: BASE + '/' }); await sleep(1500); const seq = []
  const key = async (k, code, vk, text) => { await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code, windowsVirtualKeyCode: vk, text }); await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: vk }) }
  for (let i = 0; i < 28; i++) { await key('Tab', 'Tab', 9); await sleep(40)
    const f = await ev(`(() => { const e = document.activeElement; if (!e || e === document.body) return null; const s = getComputedStyle(e); const r = e.getBoundingClientRect(); return [(e.getAttribute('aria-label') || e.textContent).trim().slice(0, 20), s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2 ? 'ok' : 'NO-OUTLINE', r.top >= -1 && r.bottom <= innerHeight + 1 ? '' : 'OFFSCREEN', r.top < 64 && !e.closest('header') && i_skip(e) ? 'UNDER-HEADER' : ''].filter(Boolean).join(':'); function i_skip(e) { return e.getAttribute('href') !== '#main' } })()`)
    if (!f) break; seq.push(f); if (i === 0) { await shot('A-skip'); } }
  console.log(`\n## keyboard ${width}:`, seq.join(' > '))
  if (width === 375) { await send('Page.navigate', { url: BASE + '/' }); await sleep(1200); console.log('menu:', await ev(`(async () => { const b = document.querySelector('[aria-controls=mobile-menu]'); b.click(); await new Promise(r => setTimeout(r, 200)); const open = b.getAttribute('aria-expanded') + ' ' + !!document.getElementById('mobile-menu'); document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })); window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); await new Promise(r => setTimeout(r, 200)); return open + ' -> ' + b.getAttribute('aria-expanded') + ' focus:' + document.activeElement.textContent.slice(0, 10) })()`)) }
}
// Skip link moves focus; reduced motion
await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: BASE + '/' }); await sleep(1200)
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Tab', code: 'Tab', windowsVirtualKeyCode: 9 }); await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, text: '\r' }); await sleep(300)
console.log('\nskip -> hash', await ev('location.hash'), 'active', await ev('document.activeElement.id || document.activeElement.tagName'))
for (const m of ['no-preference', 'reduce']) { await media('light', m); await send('Page.navigate', { url: BASE + '/' }); await sleep(1200); console.log('motion', m, await ev(`(() => { const all = [...document.querySelectorAll('*')].map((e) => getComputedStyle(e)); const s = (v) => Math.max(...v.split(',').map((x) => parseFloat(x) * (x.includes('ms') ? 1 : 1000))); return JSON.stringify({ animated: all.filter((x) => x.animationName !== 'none').length, maxTransitionMs: Math.max(...all.map((x) => s(x.transitionDuration))), scroll: getComputedStyle(document.documentElement).scrollBehavior, heroOpacity: getComputedStyle(document.querySelector('h1')).opacity }) })()`)) }
console.log('console:', JSON.stringify(logs))
await send('Browser.close'); ws.close(); chrome.kill(); process.exit(0)
