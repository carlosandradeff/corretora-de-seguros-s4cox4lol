/** Estado que o React não mantém no DOM quando fechado: respostas do FAQ (Radix só monta o
 *  painel aberto) e os depoimentos do carrossel. Lê tudo da página viva e devolve ao estado original. */

export type Testimonial = { quote: string; name: string; city: string }

export type LiveSnapshot = {
  /** id do painel do acordeão → HTML do painel (capturado abrindo cada item). */
  faqPanels: Map<string, string>
  /** Todos os depoimentos do carrossel, em ordem (vazio quando não há carrossel). */
  testimonials: Testimonial[]
  /** Índice do depoimento visível quando o arquivo foi gerado. */
  testimonialIndex: number
}

/** Espera o React aplicar o estado após um clique programático. */
const nextTick = () => new Promise<void>((resolve) => setTimeout(resolve, 0))

function readTestimonialCard(): Testimonial {
  const quote = document.querySelector('blockquote')
  const name = quote?.nextElementSibling
  const city = name?.nextElementSibling
  return {
    quote: (quote?.textContent ?? '').replace(/^\s*“|”\s*$/g, ''),
    name: name?.textContent ?? '',
    city: city?.textContent ?? '',
  }
}

export async function captureLiveState(): Promise<LiveSnapshot> {
  const faqPanels = new Map<string, string>()

  // Gatilhos do acordeão: AccordionTrigger fica dentro de um h3 em FAQList
  const triggers = Array.from(
    document.querySelectorAll<HTMLButtonElement>(
      'h3 > button[aria-controls][aria-expanded="false"]',
    ),
  )
  for (const trigger of triggers) {
    const id = trigger.getAttribute('aria-controls')
    if (!id) continue
    trigger.click()
    await nextTick()
    const panel = document.getElementById(id)
    if (panel) faqPanels.set(id, panel.outerHTML)
    trigger.click()
    await nextTick()
  }

  // Carrossel de depoimentos: percorre os pontos e volta ao depoimento original
  const testimonials: Testimonial[] = []
  let testimonialIndex = 0
  const dots = Array.from(
    document.querySelectorAll<HTMLButtonElement>('button[aria-label^="Ver depoimento"]'),
  )
  if (dots.length > 1) {
    const original = readTestimonialCard()
    for (const dot of dots) {
      dot.click()
      await nextTick()
      testimonials.push(readTestimonialCard())
    }
    testimonialIndex = Math.max(
      0,
      testimonials.findIndex(
        (item) => item.quote === original.quote && item.name === original.name,
      ),
    )
    dots[testimonialIndex]?.click()
    await nextTick()
  }

  return { faqPanels, testimonials, testimonialIndex }
}
