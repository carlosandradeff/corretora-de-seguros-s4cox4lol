// Pré-renderiza cada rota do site em um HTML5 autônomo dentro de dist/.
// Uso: depois de `vite build`, rode `node scripts/prerender.mjs`.
// Compila src/entry-server.tsx em dist-ssr/ (build SSR com a API do Vite), renderiza cada rota
// com react-dom/server e grava o HTML no lugar do shell vazio. Não usa navegador headless.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'

const root = process.cwd()
const distDir = path.join(root, 'dist')
const ssrDir = path.join(root, 'dist-ssr')
const ROOT_MARKER = '<div id="root"></div>'

/** Mesmo critério de nome do botão Download (fileNameForPath): "/seguros/x" → "seguros-x.html". */
function fileNameFor(route) {
  const name = route.replace(/^\/+|\/+$/g, '').replace(/\//g, '-')
  return name ? `${name}.html` : 'index.html'
}

await build({
  root,
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: ssrDir, emptyOutDir: true, minify: false },
})

const { render, getRoutes } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href)

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf8')
if (!template.includes(ROOT_MARKER)) {
  throw new Error('prerender: <div id="root"></div> não encontrado em dist/index.html')
}

// Troca os <link rel="stylesheet"> por <style> embutido, para as páginas abrirem via file://.
const shell = template.replace(/<link\b[^>]*rel="stylesheet"[^>]*>/g, (tag) => {
  const href = tag.match(/href="([^"]+)"/)?.[1]
  if (!href) return tag
  const css = fs.readFileSync(path.join(distDir, href.replace(/^\//, '')), 'utf8')
  return `<style>${css}</style>`
})

// Função como replacer: o HTML renderizado não é interpretado como padrão ($&, $1…).
const pageFor = (appHtml) => shell.replace(ROOT_MARKER, () => `<div id="root">${appHtml}</div>`)

const routes = getRoutes()
for (const route of routes) {
  fs.writeFileSync(path.join(distDir, fileNameFor(route)), pageFor(render(route)))
}

// 404: caminhos desconhecidos renderizam o componente NotFound.
fs.writeFileSync(path.join(distDir, '404.html'), pageFor(render('/pagina-nao-encontrada')))

fs.rmSync(ssrDir, { recursive: true, force: true })
console.log(`prerender: ${routes.length} páginas + 404.html geradas em dist/`)
