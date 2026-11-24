import { captureLiveState } from '@/lib/standalone/captureLiveState'
import { prepareStandaloneDom } from '@/lib/standalone/transformDom'

/**
 * Gera o HTML5 autossuficiente da página atual: CSS e JavaScript embutidos.
 * As imagens NÃO são embutidas: cada <img> vira um placeholder (bloco cinza com o
 * rótulo "Imagem") nas mesmas dimensões da imagem original.
 *
 * O CSS é lido da CSSOM (document.styleSheets + adoptedStyleSheets + shadowRoots),
 * porque o Tailwind via Vite injeta os estilos em Constructable Stylesheets, que
 * não aparecem como elementos <style>/<link> no DOM.
 */
export async function buildStandaloneHtml(): Promise<string> {
  // Antes de clonar: captura o estado que só existe no React (FAQ e depoimentos)
  const snapshot = await captureLiveState()

  // CSS da CSSOM da página VIVA (antes do clone, que não carrega stylesheets)
  const cssomCss = collectCssomCss(document)

  const doc = document.cloneNode(true) as Document
  const root = doc.documentElement

  // Garante o meta charset
  if (!doc.querySelector('meta[charset], meta[http-equiv="Content-Type"]')) {
    const meta = doc.createElement('meta')
    meta.setAttribute('charset', 'utf-8')
    root.insertBefore(meta, root.firstChild)
  }

  // Embute folhas <link rel="stylesheet"> por fetch (com @import e url() resolvidos).
  // Best-effort: se o fetch falhar, o CSS da CSSOM já cobre a folha processada.
  const stylesheets = Array.from(doc.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
  await Promise.all(
    stylesheets.map(async (linkEl) => {
      try {
        const css = await fetchCss(linkEl.href)
        insertStyle(doc, css)
        linkEl.remove()
      } catch {
        // mantém o <link> original
      }
    }),
  )

  // Substitui cada imagem por um placeholder com as mesmas dimensões (nada é embutido)
  replaceImagesWithPlaceholders(doc)

  prepareStandaloneDom(doc, snapshot)

  // CSS da página (CSSOM + links) vai ANTES dos overrides do runtime standalone
  if (cssomCss.trim()) {
    insertStyle(doc, cssomCss)
  }

  // Sanidade: o CSS embutido precisa cobrir as classes usadas no HTML exportado
  verifyCssCoverage(doc)

  return '<!doctype html>\n' + root.outerHTML
}

/** Cria um <style> no <head> do clone, DEPOIS dos <link> (fontes) já presentes. */
function insertStyle(doc: Document, css: string): void {
  const style = doc.createElement('style')
  style.setAttribute('data-sx-export', '')
  style.textContent = css
  const head = doc.head
  // Insere após o último <link>/<style> existente, para preservar a ordem das fontes
  const lastSheet = Array.from(head.querySelectorAll('link, style')).pop()
  if (lastSheet) {
    lastSheet.insertAdjacentElement('afterend', style)
  } else {
    head.appendChild(style)
  }
}

/**
 * Serializa as regras de todas as stylesheets vivas da página: document.styleSheets
 * (inclui as injetadas pelo Vite/Tailwind) e document.adoptedStyleSheets (constructable),
 * além de shadowRoots abertos. try/catch por folha: folhas de outro origin (CORS)
 * lançam ao acessar cssRules e são ignoradas.
 */
function collectCssomCss(sourceDoc: Document): string {
  const chunks: string[] = []
  const seen = new WeakSet<CSSStyleSheet>()

  const readSheet = (sheet: CSSStyleSheet): void => {
    if (seen.has(sheet)) return
    seen.add(sheet)
    try {
      const rules = sheet.cssRules
      if (!rules || rules.length === 0) return
      chunks.push(
        Array.from(rules)
          .map((rule) => rule.cssText)
          .join('\n'),
      )
    } catch {
      // SecurityError de CORS: a folha não pode ser lida aqui
    }
  }

  const readAll = (list: StyleSheetList | CSSStyleSheet[] | undefined): void => {
    if (!list) return
    Array.from(list as ArrayLike<CSSStyleSheet>).forEach(readSheet)
  }

  readAll(sourceDoc.styleSheets)
  readAll((sourceDoc as Document & { adoptedStyleSheets?: CSSStyleSheet[] }).adoptedStyleSheets)

  // ShadowRoots abertos (componentes web, se houver)
  const walk = (node: Node): void => {
    const shadow = (node as Element).shadowRoot as ShadowRoot | null | undefined
    if (shadow) {
      readAll(shadow.adoptedStyleSheets)
      Array.from(shadow.querySelectorAll('style')).forEach((styleEl) => {
        const text = styleEl.textContent ?? ''
        if (text.trim()) chunks.push(text)
      })
    }
    Array.from(node.childNodes).forEach(walk)
  }
  walk(sourceDoc.documentElement)

  return chunks.filter(Boolean).join('\n')
}

/** Verificação de publicação: o CSS embutido precisa cobrir as classes do HTML exportado.
 *  Confere as 40 classes mais frequentes do DOM; faltando ≥ 2 delas, o export é inválido. */
function verifyCssCoverage(doc: Document): void {
  const pageCss = Array.from(doc.head.querySelectorAll('style[data-sx-export]'))
    .map((el) => el.textContent ?? '')
    .join('\n')

  const classCount = new Map<string, number>()
  doc.querySelectorAll('[class]').forEach((el) => {
    el.classList.forEach((cls) => {
      // O runtime standalone usa classes próprias (.sx-*), já cobertas por STANDALONE_CSS
      if (cls.startsWith('sx-') || cls.startsWith('lucide')) return
      classCount.set(cls, (classCount.get(cls) ?? 0) + 1)
    })
  })

  // Seletores no CSS vêm com escape (ex.: ".sm\:text-5xl", ".text-\[\#0A2E6E\]"),
  // então a busca usa o nome da classe escapado, não o texto cru.
  const escapeClass = (cls: string) => cls.replace(/([^\w-])/g, '\\$1')
  const missing = Array.from(classCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 40)
    .filter(([cls]) => !pageCss.includes(`.${escapeClass(cls)}`))
    .map(([cls]) => cls)

  if (missing.length >= 2) {
    console.error(
      `[export standalone] CSS embutido não cobre ${missing.length} classes principais: ` +
        missing.slice(0, 10).join(', '),
    )
    throw new Error(
      'Export cancelado: o CSS embutido está incompleto. Recarregue a página e tente de novo.',
    )
  }
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
