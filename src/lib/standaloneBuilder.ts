import { captureLiveState } from '@/lib/standalone/captureLiveState'
import { prepareStandaloneDom } from '@/lib/standalone/transformDom'

/** Gera o HTML5 autossuficiente da página atual: CSS, imagens e JavaScript embutidos. */
export async function buildStandaloneHtml(): Promise<string> {
  // Antes de clonar: captura o estado que só existe no React (FAQ e depoimentos)
  const snapshot = await captureLiveState()

  const doc = document.cloneNode(true) as Document
  const root = doc.documentElement

  // Garante o meta charset
  if (!doc.querySelector('meta[charset], meta[http-equiv="Content-Type"]')) {
    const meta = doc.createElement('meta')
    meta.setAttribute('charset', 'utf-8')
    root.insertBefore(meta, root.firstChild)
  }

  // Embute os CSS locais como <style> (best-effort: mantém o <link> se falhar)
  const stylesheets = Array.from(doc.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
  await Promise.all(
    stylesheets.map(async (linkEl) => {
      try {
        const css = await fetchCss(linkEl.href)
        const style = doc.createElement('style')
        style.textContent = css
        linkEl.replaceWith(style)
      } catch {
        // mantém o <link> original
      }
    }),
  )

  // Embute as imagens remotas como data URI (best-effort: se o CDN bloquear, mantém a URL)
  await inlineImages(doc)

  prepareStandaloneDom(doc, snapshot)

  return '<!doctype html>\n' + root.outerHTML
}

/** Busca o CSS da folha de estilo, resolvendo @import e corrigindo URLs relativas. */
async function fetchCss(href: string): Promise<string> {
  const response = await fetch(href)
  if (!response.ok) throw new Error(`Falha ao carregar CSS: ${href} (${response.status})`)
  let css = await response.text()
  const baseUrl = new URL(href)

  // Resolve @import aninhados (uma etapa extra cobre os bundles típicos)
  const imports = css.matchAll(/@import\s+(?:url\()?['"]?([^'")\s;]+)['"]?\)?[^;]*;/g)
  const resolved = await Promise.all(
    Array.from(imports).map(async (match) => {
      try {
        return { match: match[0], css: await fetchCss(new URL(match[1], baseUrl).href) }
      } catch {
        return { match: match[0], css: '' }
      }
    }),
  )
  for (const item of resolved) css = css.replace(item.match, item.css)

  // Converte url(...) relativos em absolutos para o CSS funcionar standalone
  css = css.replace(/url\((\s*['"]?)([^'")]+)(['"]?\s*)\)/g, (full, q1, rawUrl: string, q2) => {
    const value = rawUrl.trim()
    if (!value || value.startsWith('data:') || value.startsWith('#')) return full
    try {
      return `url(${q1}${new URL(value, baseUrl).href}${q2})`
    } catch {
      return full
    }
  })
  return css
}

async function inlineImages(doc: Document): Promise<void> {
  const images = Array.from(doc.querySelectorAll<HTMLImageElement>('img[src^="http"]'))
  await Promise.all(
    images.map(async (img) => {
      try {
        const response = await fetch(img.getAttribute('src') ?? '')
        if (!response.ok) return
        const dataUrl = await blobToDataUrl(await response.blob())
        img.setAttribute('src', dataUrl)
      } catch {
        // mantém a URL remota
      }
    }),
  )
}

const blobToDataUrl = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(blob)
  })
