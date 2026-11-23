import { Download } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { cn } from '@/lib/utils'

/** Nome do arquivo derivado da rota atual: "/" → "index.html", "/sobre" → "sobre.html",
 *  "/seguros/auto" → "seguros-auto.html". */
export function fileNameForPath(pathname: string): string {
  const normalized = pathname
    .split('?')[0]
    .split('#')[0]
    .replace(/\/+$/, '')
    .replace(/^\//, '')
    .replace(/\//g, '-')
    .trim()
  return normalized ? `${normalized}.html` : 'index.html'
}

/** Gera um HTML5 standalone da página atual e dispara o download via Blob. */
export function useDownloadPageHtml() {
  const { pathname } = useLocation()
  const [preparing, setPreparing] = useState(false)

  const download = useCallback(async () => {
    if (preparing) return
    setPreparing(true)
    try {
      const html = await buildStandaloneHtml()
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = fileNameForPath(pathname)
      document.body.appendChild(link)
      link.click()
      link.remove()
      setTimeout(() => URL.revokeObjectURL(url), 5000)
    } catch {
      // best-effort: se algo falhar, não quebra a página
    } finally {
      setPreparing(false)
    }
  }, [pathname, preparing])

  return { download, preparing }
}

async function buildStandaloneHtml(): Promise<string> {
  const doc = document.cloneNode(true) as Document
  const root = doc.documentElement

  // 1. Garante o meta charset
  if (!doc.querySelector('meta[charset], meta[http-equiv="Content-Type"]')) {
    const meta = doc.createElement('meta')
    meta.setAttribute('charset', 'utf-8')
    root.insertBefore(meta, root.firstChild)
  }

  // 2. Remove todos os scripts (o arquivo estático não deve rodar o app React)
  doc.querySelectorAll('script').forEach((script) => script.remove())

  // 3. Embute os CSS locais como <style>
  const stylesheets = Array.from(doc.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]'))
  await Promise.all(
    stylesheets.map(async (linkEl) => {
      try {
        const css = await fetchCss(linkEl.href)
        const style = doc.createElement('style')
        style.textContent = css
        linkEl.replaceWith(style)
      } catch {
        // best-effort: mantém o <link> original se o fetch falhar
      }
    }),
  )

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

export function DownloadPageButton({ className }: { className?: string }) {
  const { download, preparing } = useDownloadPageHtml()
  return (
    <button
      type="button"
      onClick={download}
      disabled={preparing}
      aria-label="Baixar esta página como arquivo HTML"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-blue-400/40 px-3 py-1.5 text-xs font-semibold text-blue-200 transition hover:border-blue-300 hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-60',
        className,
      )}
    >
      <Download className="h-3.5 w-3.5" aria-hidden="true" />
      {preparing ? 'Preparando…' : 'Download'}
    </button>
  )
}
