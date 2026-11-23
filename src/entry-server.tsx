/* Entrada de pré-renderização: compilada só pelo scripts/prerender.mjs (build SSR), nunca no app. */
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import SiteRoutes from './routes/SiteRoutes'
import { insurances } from './data/insurances'
import { blogPosts } from './data/blog'

const staticRoutes = [
  '/',
  '/sobre',
  '/solucoes',
  '/seguros',
  '/cotacao',
  '/contato',
  '/blog',
  '/politica-de-privacidade',
]

/** Todas as rotas do site: estáticas, um caminho por seguro e um por artigo do blog. */
export function getRoutes(): string[] {
  const paths = [
    ...staticRoutes,
    ...insurances.map((item) => `/${item.slug}`),
    ...blogPosts.map((post) => `/blog/${post.slug}`),
  ]
  return Array.from(new Set(paths))
}

/** Renderiza o HTML de uma rota (conteúdo de #root). */
export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <SiteRoutes />
    </StaticRouter>,
  )
}
