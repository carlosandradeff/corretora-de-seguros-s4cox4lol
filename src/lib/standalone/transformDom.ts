import { insurances } from '@/data/insurances'
import { company, whatsappUrl } from '@/data/company'
import type { LiveSnapshot } from '@/lib/standalone/captureLiveState'
import { STANDALONE_CSS, STANDALONE_JS } from '@/lib/standalone/standaloneRuntime'

/** Nome do campo do formulário de cotação, pelo rótulo visível (LeadForm não define `name`). */
const fieldNames: Record<string, string> = {
  'Nome completo': 'name',
  'E-mail': 'email',
  'Telefone / WhatsApp': 'phone',
  'Mensagem (opcional)': 'message',
  'Tipo de seguro': 'insuranceType',
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const labelOf = (el: Element) =>
  el.closest('.space-y-2')?.querySelector('label')?.textContent?.trim() ?? ''

const routeLink = (href: string, label: string, className: string) =>
  `<a class="${className}" href="#" data-sx-route="${href}">${escapeHtml(label)}</a>`

function drawerHtml(): string {
  const subLinks = insurances
    .map((item) => routeLink(`/${item.slug}`, item.title, 'sx-link sx-sub'))
    .join('')
  return (
    '<div id="sx-drawer" aria-hidden="true">' +
    '<div class="sx-overlay" data-sx-close></div>' +
    '<div class="sx-panel" role="dialog" aria-label="Menu de navegação">' +
    '<div class="sx-head">' +
    `<span class="sx-brand">${escapeHtml(company.name)}</span>` +
    '<button type="button" class="sx-x" data-sx-close aria-label="Fechar menu">×</button>' +
    '</div>' +
    '<nav class="sx-nav">' +
    '<a class="sx-link" href="#">Início</a>' +
    routeLink('/sobre', 'Sobre Nós', 'sx-link') +
    routeLink('/solucoes', 'Seguros', 'sx-link') +
    subLinks +
    routeLink('/cotacao', 'Cotação', 'sx-link') +
    routeLink('/blog', 'Blog', 'sx-link') +
    routeLink('/contato', 'Contato', 'sx-link') +
    '</nav>' +
    '<div class="sx-cta">' +
    routeLink('/cotacao', 'Faça sua cotação', 'sx-btn') +
    `<a class="sx-btn sx-wa" href="${escapeHtml(whatsappUrl())}" target="_blank" rel="noreferrer">WhatsApp</a>` +
    '</div>' +
    '</div>' +
    '</div>'
  )
}

function selectOptionsHtml(): string {
  const options = insurances.map(
    (item) => `<option value="${item.slug}">${escapeHtml(item.title)}</option>`,
  )
  return [
    '<option value="">Selecione uma opção</option>',
    ...options,
    '<option value="outro">Outro assunto</option>',
  ].join('')
}

/** Ajusta o clone do DOM React para rodar como arquivo estático com JS embutido. */
export function prepareStandaloneDom(doc: Document, snapshot: LiveSnapshot): void {
  // Scripts e preloads do bundle não devem ir para o arquivo
  doc.querySelectorAll('script, link[rel="modulepreload"]').forEach((el) => el.remove())

  // Links: a página atual vira âncora; outras rotas viram aviso local (evita 404 em file://)
  doc.querySelectorAll<HTMLAnchorElement>('a[href]').forEach((anchor) => {
    const href = anchor.getAttribute('href') ?? ''
    if (href === '/') {
      anchor.setAttribute('href', '#')
    } else if (href.startsWith('/')) {
      anchor.setAttribute('href', '#')
      anchor.setAttribute('data-sx-route', href)
    }
  })

  // Botão hambúrguer abre o drawer exportado
  doc.querySelector('button[aria-label="Abrir menu"]')?.setAttribute('data-sx-open', '')

  // Perguntas frequentes: o React só monta o painel aberto, então reinserimos os painéis capturados
  doc.querySelectorAll<HTMLButtonElement>('h3 > button[aria-controls]').forEach((trigger) => {
    trigger.setAttribute('data-sx-faq', '')
    trigger.setAttribute('aria-expanded', 'false')
    const heading = trigger.parentElement
    const html = snapshot.faqPanels.get(trigger.getAttribute('aria-controls') ?? '')
    if (!heading || !html) return
    const holder = doc.createElement('div')
    holder.innerHTML = html
    const panel = holder.firstElementChild as HTMLElement | null
    if (!panel) return
    panel.hidden = true
    panel.setAttribute('data-state', 'closed')
    heading.insertAdjacentElement('afterend', panel)
  })

  // Formulários: nomes dos campos, select nativo no lugar do Radix Select (que exige React)
  doc.querySelectorAll('form').forEach((form) => {
    form.querySelectorAll('select').forEach((el) => el.remove())
    form.querySelectorAll<HTMLButtonElement>('button[role="combobox"]').forEach((button) => {
      const select = doc.createElement('select')
      select.name = 'insuranceType'
      select.className = button.className
      select.innerHTML = selectOptionsHtml()
      button.replaceWith(select)
    })
    form
      .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea')
      .forEach((el) => {
        const name = fieldNames[labelOf(el)]
        if (name) el.name = name
      })
  })

  // Drawer do menu mobile, estilos e script do arquivo
  doc.body.insertAdjacentHTML('beforeend', drawerHtml())

  const style = doc.createElement('style')
  style.textContent = STANDALONE_CSS
  doc.head.appendChild(style)

  const data = {
    testimonials: snapshot.testimonials,
    testimonialIndex: snapshot.testimonialIndex,
    whatsapp: whatsappUrl(),
  }
  const script = doc.createElement('script')
  script.textContent =
    'window.__SX__=' + JSON.stringify(data).replace(/</g, '\\u003c') + ';\n' + STANDALONE_JS
  doc.body.appendChild(script)
}
