import { captureLiveState } from '@/lib/standalone/captureLiveState'
import { prepareStandaloneDom } from '@/lib/standalone/transformDom'

/** Gera o HTML5 autossuficiente da página atual: CSS e JavaScript embutidos.
 *  As imagens NÃO são embutidas: cada <img> vira um placeholder (bloco cinza com o
 *  rótulo "Imagem") nas mesmas dimensões da imagem original. */
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

  // Substitui cada imagem por um placeholder com as mesmas dimensões (nada é embutido)
  replaceImagesWithPlaceholders(doc)

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

/** Troca cada <img> (e cada background-image de CSS embutido) por um bloco cinza reservado,
 *  com largura/altura/aspect-ratio e classes preservadas, mantendo o layout idêntico.
 *  Nunca baixa nem embute bytes de imagem: o arquivo fica leve e funciona offline. */
export function replaceImagesWithPlaceholders(doc: Document): void {
  const images = Array.from(doc.querySelectorAll('img'))
  for (const img of images) {
    const placeholder = doc.createElement('div')
    placeholder.className = img.className
    placeholder.setAttribute('data-sx-image', '')
    placeholder.setAttribute('role', 'img')
    placeholder.setAttribute('aria-label', img.getAttribute('alt') || 'Imagem')
    placeholder.classList.add('sx-img-placeholder')

    // Preserva o box da imagem: classes (aspect-[..], w-*, h-*), width/height e aspect-ratio
    const width = img.getAttribute('width')
    const height = img.getAttribute('height')
    if (width) placeholder.setAttribute('data-sx-width', width)
    if (height) placeholder.setAttribute('data-sx-height', height)
    if (!width && !height) {
      const ratio = ratioFrom(img)
      if (ratio) placeholder.style.aspectRatio = ratio
    }

    // Filhos inline (ex.: legenda/overlay simples) permanecem dentro do reservado
    if (img.childElementCount > 0) {
      placeholder.innerHTML = img.innerHTML
    }

    img.replaceWith(placeholder)
  }

  // background-image em CSS embutido (não há nenhum hoje; cobre estilos inline futuros)
  doc.querySelectorAll<HTMLElement>('[style*="background-image"]').forEach((el) => {
    const style = el.getAttribute('style') ?? ''
    el.setAttribute(
      'style',
      style.replace(
        /background-image\s*:[^;"]*(;?)/g,
        (_full, semi) => `background-image:none${semi}`,
      ),
    )
  })
}

/** Deduz a proporção da imagem. Todas as imagens do site vêm do CDN de imagens
 *  (img.usecurling.com/p/LARGURA/ALTURA), então a URL carrega as dimensões exatas
 *  com que foram pedidas — e é a única fonte confiável no clone do DOM.
 *  Ex.: /p/1000/1100 → "1000 / 1100". */
function ratioFrom(img: HTMLImageElement): string | null {
  const src = img.getAttribute('src') ?? img.getAttribute('data-src') ?? ''
  const match = src.match(/\/p\/(\d+)\/(\d+)/)
  if (match) return `${match[1]} / ${match[2]}`
  if (img.naturalWidth > 0 && img.naturalHeight > 0) {
    return `${img.naturalWidth} / ${img.naturalHeight}`
  }
  return null
}
