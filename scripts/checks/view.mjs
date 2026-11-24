import { spawn } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
const OUT = process.argv[2]
const chrome = spawn('C:/Program Files/Google/Chrome/Application/chrome.exe', ['--headless=new', '--remote-debugging-port=9337', '--window-size=1426,900', '--user-data-dir=' + mkdtempSync(path.join(tmpdir(), 'vw-')), 'about:blank'])
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let target
for (let i = 0; i < 40 && !target; i++) { await sleep(300); try { target = (await (await fetch('http://127.0.0.1:9337/json')).json()).find((t) => t.type === 'page') } catch {} }
const ws = new WebSocket(target.webSocketDebuggerUrl); await new Promise((r) => (ws.onopen = r))
let id = 0; const wait = new Map(); let logs = []
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id) { wait.get(d.id)?.(d.result ?? d.error); return }
  if (d.method === 'Runtime.exceptionThrown') logs.push('EXC')
  if (d.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(d.params.type)) logs.push(d.params.args.map((a) => a.value ?? a.description).join(' ').slice(0, 150)) }
const send = (method, params = {}) => new Promise((r) => { const n = ++id; wait.set(n, r); ws.send(JSON.stringify({ id: n, method, params })) })
const ev = async (e) => { const r = await send('Runtime.evaluate', { expression: e, returnByValue: true, awaitPromise: true }); return r.exceptionDetails ? 'ERR ' + r.exceptionDetails.exception?.description : r.result?.value }
const shot = async (n) => writeFileSync(`${OUT}/${n}.png`, Buffer.from((await send('Page.captureScreenshot', { format: 'png' })).data, 'base64'))
await send('Page.enable'); await send('Runtime.enable')
await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: 'dark' }, { name: 'prefers-reduced-motion', value: 'reduce' }] })
for (const [p, w, h] of [['/', 1426, 772], ['/', 1280, 640], ['/', 1366, 657], ['/', 1920, 969], ['/', 2560, 1300], ['/', 1024, 700], ['/', 768, 1024], ['/', 390, 844], ['/de/', 1426, 772], ['/de/', 1024, 700], ['/de/', 375, 667]]) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: w < 600 })
  await send('Page.navigate', { url: 'http://localhost:4199' + p }); await sleep(1300)
  console.log(p, w + 'x' + h, await ev(`(() => { const t = document.getElementById('top').getBoundingClientRect(), e = document.getElementById('experience').getBoundingClientRect(), l = document.querySelector('#top > div').getBoundingClientRect(), n = document.querySelector('#top aside').getBoundingClientRect(); return JSON.stringify({ heroH: Math.round(t.height), expTop: Math.round(e.top), expVisible: e.top < innerHeight - 0.5, gapTop: Math.round(Math.min(l.top, n.top) - 64), gapBottom: Math.round(t.bottom - Math.max(l.bottom, n.bottom)), textW: Math.round(l.width), nowW: Math.round(n.width), overflow: document.documentElement.scrollWidth > innerWidth, active: document.querySelector('[aria-current]')?.textContent ?? null }) })()`))
  if (w === 1426 && p === '/') {
    await shot('V-hero')
    for (const s of ['experience', 'projects', 'education', 'contact', 'bored']) { await ev(`document.getElementById('${s}').scrollIntoView()`); await sleep(350); console.log('  at', s, '-> nav', await ev(`document.querySelector('[aria-current]')?.textContent ?? null`)); await shot('V-' + s) }
    await ev(`scrollTo(0, 0)`); await sleep(300); console.log('  at top -> nav', await ev(`document.querySelector('[aria-current]')?.textContent ?? null`))
    console.log('  details closed:', await ev(`(() => { const d = document.querySelector('details'); return d.open + ' ' + d.querySelector('summary').innerText.replace(/\\n/g, ' ') })()`))
    await ev(`document.querySelector('summary').focus()`); await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13, text: '\r' }); await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 }); await sleep(300)
    console.log('  after Enter:', await ev(`(() => { const d = document.querySelector('details'); return d.open + ' ' + d.querySelector('summary').innerText.replace(/\\n/g, ' ') + ' items ' + d.querySelectorAll('li').length })()`))
    await ev(`document.querySelector('details').scrollIntoView()`); await sleep(300); await shot('V-more')
  }
  if ((w === 390 && p === '/') || (w === 1920) || (w === 1024 && p === '/de/')) await shot(`V-${w}`)
}
console.log('logs', JSON.stringify(logs))
await send('Browser.close'); ws.close(); chrome.kill(); process.exit(0)
