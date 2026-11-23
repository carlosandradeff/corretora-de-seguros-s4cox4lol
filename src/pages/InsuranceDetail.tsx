import { Link, Navigate, useParams } from 'react-router-dom'
import {
  ArrowRight,
  Check,
  FileCheck2,
  MessageCircle,
  SearchCheck,
  ShieldCheck,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CTASection, FAQList, PageHero, SectionHeading } from '@/components/PageElements'
import { findInsurance } from '@/data/insurances'
import { whatsappUrl } from '@/data/company'

export default function InsuranceDetail({ slug: propSlug }: { slug?: string }) {
  const params = useParams()
  const insurance = findInsurance(propSlug ?? params.slug)
  if (!insurance) return <Navigate to="/solucoes" replace />
  const Icon = insurance.icon
  const quoteLink = `/cotacao?tipo=${insurance.slug}`
  const whatsapp = whatsappUrl(
    `Olá! Vim pelo site da Stop Seguros e gostaria de saber mais sobre ${insurance.title}.`,
  )

  return (
    <>
      <PageHero
        eyebrow={insurance.eyebrow}
        title={insurance.title}
        description={insurance.intro}
        image={insurance.image}
      />
      <section className="section-space bg-white">
        <div className="page-shell grid items-start gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
          <div className="space-y-16">
            <section>
              <SectionHeading
                align="left"
                eyebrow="Proteção sob medida"
                title={`O que o ${insurance.title.toLowerCase()} pode cobrir`}
                description="A composição final depende da análise do risco e das condições da seguradora. Estas são as proteções mais procuradas:"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                {insurance.covers.map((item) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-2xl border border-blue-100 bg-[#F9FBFF] p-4"
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#DCE9FB] text-[#1565D8]">
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="text-sm font-medium leading-6 text-[#34445E]">{item}</p>
                  </div>
                ))}
              </div>
            </section>
            <section className="rounded-[26px] bg-[#F4F8FE] p-7 sm:p-10">
              <h2 className="text-2xl font-extrabold text-[#0A2E6E]">
                O que normalmente não está coberto
              </h2>
              <p className="mt-3 leading-7 text-[#5A6B85]">
                Toda apólice possui exclusões e condições. Nós explicamos cada ponto antes da
                contratação para evitar surpresas.
              </p>
              <ul className="mt-7 space-y-4">
                {insurance.exclusions.map((item) => (
                  <li key={item} className="flex gap-3 text-[#5A6B85]">
                    <X className="mt-1 h-5 w-5 shrink-0 text-[#D64545]" />
                    <span className="leading-7">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <SectionHeading
                align="left"
                eyebrow="Jornada simples"
                title="Como contratar em 3 passos"
                description="Da primeira conversa à emissão, você conta com acompanhamento próximo e informações claras."
              />
              <div className="grid gap-5 md:grid-cols-3">
                <Step
                  number="01"
                  icon={SearchCheck}
                  title="Cotação"
                  text="Entendemos seu perfil e consultamos opções adequadas."
                />
                <Step
                  number="02"
                  icon={FileCheck2}
                  title="Proposta"
                  text="Comparamos condições, limites e valores com você."
                />
                <Step
                  number="03"
                  icon={ShieldCheck}
                  title="Apólice"
                  text="Após sua escolha, acompanhamos a emissão e a vigência."
                />
              </div>
            </section>
            <section>
              <SectionHeading
                align="left"
                eyebrow="Benefícios"
                title="Por que contratar com a Stop"
              />
              <div className="grid gap-4 sm:grid-cols-3">
                {insurance.benefits.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-blue-100 p-5 text-center font-semibold leading-6 text-[#0A2E6E]"
                  >
                    <ShieldCheck className="mx-auto mb-3 h-6 w-6 text-[#1565D8]" />
                    {item}
                  </div>
                ))}
              </div>
            </section>
          </div>
          <aside className="soft-card overflow-hidden lg:sticky lg:top-28">
            <div className="bg-gradient-to-br from-[#0A2E6E] to-[#1565D8] p-7 text-white">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <Icon className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-2xl font-extrabold">Proteja o que importa</h2>
              <p className="mt-3 text-sm leading-6 text-blue-100">
                Receba uma análise personalizada para {insurance.title.toLowerCase()}, sem
                compromisso.
              </p>
            </div>
            <div className="space-y-3 p-6">
              <Button
                asChild
                className="h-12 w-full rounded-xl bg-[#1565D8] font-bold hover:bg-[#0F4FB0]"
              >
                <Link to={quoteLink}>
                  Solicitar cotação <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-12 w-full rounded-xl border-[#25D366] font-bold text-[#138A44] hover:bg-green-50"
              >
                <a href={whatsapp} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" /> Falar no WhatsApp
                </a>
              </Button>
              <p className="pt-2 text-center text-xs leading-5 text-[#73829A]">
                Retorno em até 24h. Cotação gratuita e seus dados protegidos.
              </p>
            </div>
          </aside>
        </div>
      </section>
      <section className="section-space bg-[#F4F8FE]">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Perguntas frequentes"
            title={`Dúvidas sobre ${insurance.title.toLowerCase()}`}
          />
          <FAQList items={insurance.faqs} />
        </div>
      </section>
      <CTASection
        title={`Vamos conversar sobre ${insurance.title.toLowerCase()}?`}
        description="Uma boa proteção começa por entender sua realidade. Nossa equipe está pronta para ajudar."
      />
    </>
  )
}

function Step({
  number,
  icon: Icon,
  title,
  text,
}: {
  number: string
  icon: typeof SearchCheck
  title: string
  text: string
}) {
  return (
    <div className="relative rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_8px_25px_rgba(10,46,110,.06)]">
      <span className="absolute right-5 top-4 text-4xl font-extrabold text-blue-50">{number}</span>
      <Icon className="relative h-7 w-7 text-[#1565D8]" />
      <h3 className="relative mt-5 text-lg font-bold text-[#0A2E6E]">{title}</h3>
      <p className="relative mt-2 text-sm leading-6 text-[#5A6B85]">{text}</p>
    </div>
  )
}
