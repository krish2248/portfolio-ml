// Static server that behaves like GitHub Pages: directory redirects, 404.html, gzip.
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import zlib from 'node:zlib'
const [root, port] = process.argv.slice(2)
const types = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.png': 'image/png', '.jpg': 'image/jpeg', '.pdf': 'application/pdf', '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml' }
http.createServer((q, s) => {
  const u = new URL(q.url, 'http://x'); let f = path.join(root, decodeURIComponent(u.pathname)), code = 200
  if (fs.existsSync(f) && fs.statSync(f).isDirectory()) { if (!u.pathname.endsWith('/')) { s.writeHead(301, { location: u.pathname + '/' + u.search }); return s.end() } f = path.join(f, 'index.html') }
  if (!fs.existsSync(f)) { f = path.join(root, '404.html'); code = 404 }
  let b = fs.readFileSync(f); const t = types[path.extname(f)] ?? 'application/octet-stream'; const h = { 'content-type': t }
  if (/text|javascript|xml/.test(t) && /gzip/.test(q.headers['accept-encoding'] ?? '')) { b = zlib.gzipSync(b); h['content-encoding'] = 'gzip' }
  h['content-length'] = b.length; s.writeHead(code, h); s.end(b)
}).listen(+port)
