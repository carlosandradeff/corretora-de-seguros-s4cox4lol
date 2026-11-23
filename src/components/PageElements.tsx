import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  inverse = false,
}: {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  inverse?: boolean
}) {
  return (
    <div className={cn('mb-12 max-w-3xl', align === 'center' && 'mx-auto text-center')}>
      {eyebrow && (
        <p
          className={cn(
            'mb-3 text-xs font-bold uppercase tracking-[0.25em]',
            inverse ? 'text-blue-200' : 'text-[#1565D8]',
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'text-3xl font-extrabold leading-tight tracking-[-0.03em] md:text-4xl',
          inverse ? 'text-white' : 'text-[#0A2E6E]',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-base leading-7 md:text-lg',
            inverse ? 'text-blue-100' : 'text-[#5A6B85]',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string
  title: string
  description: string
  image: string
}) {
  return (
    <section className="relative flex min-h-[500px] items-end overflow-hidden pb-20 pt-40 text-white md:min-h-[560px] md:pb-24">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#061E4B]/95 via-[#0A2E6E]/85 to-[#1565D8]/35" />
      <div className="page-shell relative z-10">
        <div className="max-w-3xl animate-fade-rise">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-blue-200">
            {eyebrow}
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50 md:text-xl">{description}</p>
        </div>
      </div>
    </section>
  )
}

export function Checklist({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('space-y-4', className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[#34445E]">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#1565D8]" />
          <span className="leading-7">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function FAQList({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="mx-auto max-w-3xl rounded-2xl border border-blue-100 bg-white px-5 shadow-[0_12px_36px_rgba(10,46,110,0.07)] md:px-8"
    >
      {items.map((item, index) => (
        <AccordionItem key={item.question} value={`faq-${index}`}>
          <AccordionTrigger className="text-left font-semibold text-[#0A2E6E] hover:text-[#1565D8] hover:no-underline">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="pb-5 leading-7 text-[#5A6B85]">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export function CTASection({
  title = 'Vamos encontrar a proteção certa para você?',
  description = 'Conte com atendimento humano, comparação transparente e suporte em todos os momentos.',
}: {
  title?: string
  description?: string
}) {
  return (
    <section className="bg-gradient-to-br from-[#0A2E6E] to-[#1565D8] py-16 text-white md:py-20">
      <div className="page-shell flex flex-col items-center justify-between gap-7 text-center lg:flex-row lg:text-left">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-200">
            Proteção começa com uma conversa
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-[-0.03em] md:text-4xl">{title}</h2>
          <p className="mt-3 max-w-2xl text-blue-100">{description}</p>
        </div>
        <Button
          asChild
          size="lg"
          className="h-14 shrink-0 rounded-full bg-white px-7 font-bold text-[#0A2E6E] hover:bg-blue-50"
        >
          <Link to="/cotacao">
            Solicitar cotação <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
