import { useSearchParams } from 'react-router-dom'
import { Clock3, LockKeyhole, MessageCircle, ShieldCheck } from 'lucide-react'
import { LeadForm } from '@/components/LeadForm'
import { PageHero } from '@/components/PageElements'
import { whatsappUrl } from '@/data/company'

export default function Quote() {
  const [params] = useSearchParams()
  const initialType = params.get('tipo') ?? ''

  return (
    <>
      <PageHero
        eyebrow="Cotação gratuita"
        title="Conte o que você precisa proteger"
        description="Preencha seus dados em poucos minutos. Um corretor da Stop Seguros analisará seu perfil e entrará em contato em até 24 horas."
        image="https://img.usecurling.com/p/1800/900?q=calm%20conversation&color=blue&dpr=2"
      />
      <section className="section-space bg-[#F4F8FE]">
        <div className="page-shell grid items-start gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-14">
          <aside className="space-y-6 lg:sticky lg:top-28">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.24em] text-[#1565D8]">
                Simples e sem compromisso
              </p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-[-.03em] text-[#0A2E6E]">
                Sua proteção começa com uma boa conversa
              </h2>
              <p className="mt-4 leading-7 text-[#5A6B85]">
                Usamos estas informações somente para preparar seu atendimento. Não compartilhamos
                seus dados para ofertas de terceiros.
              </p>
            </div>
            <div className="space-y-3">
              <Feature
                icon={ShieldCheck}
                title="Análise personalizada"
                text="Uma proposta compatível com seu momento."
              />
              <Feature
                icon={Clock3}
                title="Retorno em até 24h"
                text="Atendimento ágil em horário comercial."
              />
              <Feature
                icon={LockKeyhole}
                title="Dados protegidos"
                text="Privacidade e uso responsável das informações."
              />
            </div>
            <a
              href={whatsappUrl('Olá! Gostaria de solicitar uma cotação com a Stop Seguros.')}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#25D366] bg-white p-4 font-bold text-[#138A44] transition hover:bg-green-50"
            >
              <MessageCircle className="h-5 w-5" /> Prefiro falar pelo WhatsApp
            </a>
          </aside>
          <div className="soft-card p-6 sm:p-9 lg:p-12">
            <h2 className="text-2xl font-extrabold text-[#0A2E6E]">Solicite sua cotação</h2>
            <p className="mt-2 text-sm leading-6 text-[#5A6B85]">
              Campos marcados são necessários para que possamos retornar.
            </p>
            <LeadForm
              key={initialType}
              initialType={initialType}
              source="Página de cotação"
              className="mt-8"
            />
          </div>
        </div>
      </section>
    </>
  )
}

function Feature({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof ShieldCheck
  title: string
  text: string
}) {
  return (
    <div className="flex gap-4 rounded-2xl bg-white p-5 shadow-[0_6px_20px_rgba(10,46,110,.06)]">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DCE9FB] text-[#1565D8]">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-bold text-[#0A2E6E]">{title}</p>
        <p className="mt-1 text-sm leading-6 text-[#5A6B85]">{text}</p>
      </div>
    </div>
  )
}
