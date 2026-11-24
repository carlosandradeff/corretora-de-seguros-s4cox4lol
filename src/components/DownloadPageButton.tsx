import { Download } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { cn } from '@/lib/utils'
import { buildStandaloneHtml } from '@/lib/standaloneBuilder'

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

/** Gera um HTML5 autossuficiente (CSS + JS embutidos) da página atual e dispara o download. */
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
