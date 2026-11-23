import { Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { LeadForm } from '@/components/LeadForm'
import { PageHero, SectionHeading } from '@/components/PageElements'
import { company, whatsappUrl } from '@/data/company'

export default function Contact() {
  const mapQuery = encodeURIComponent(company.address)
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title="Estamos prontos para ouvir você"
        description="Tire dúvidas, revise sua proteção ou peça uma cotação. Fale com uma equipe que explica com calma e acompanha de verdade."
        image="https://img.usecurling.com/p/1800/900?q=helpful%20advisor&color=blue&dpr=2"
      />
      <section className="section-space bg-[#F4F8FE]">
        <div className="page-shell grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-14">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Fale conosco"
              title="Escolha o melhor canal"
              description="Nosso atendimento acontece de segunda a sexta, em horário comercial. Mensagens recebidas fora desse período são respondidas no próximo dia útil."
            />
            <div className="space-y-4">
              <ContactItem
                icon={MapPin}
                title="Endereço"
                text={company.address}
                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              />
              <ContactItem
                icon={Phone}
                title="Telefone"
                text={company.phoneDisplay}
                href={`tel:${company.phoneDigits}`}
              />
              <ContactItem
                icon={MessageCircle}
                title="WhatsApp"
                text={company.phoneDisplay}
                href={whatsappUrl()}
              />
              <ContactItem
                icon={Mail}
                title="E-mail"
                text={company.email}
                href={`mailto:${company.email}`}
              />
              <ContactItem icon={Clock3} title="Horário" text={company.hours} />
            </div>
          </div>
          <div className="soft-card p-6 sm:p-9 lg:p-12">
            <h2 className="text-2xl font-extrabold text-[#0A2E6E]">Envie uma mensagem</h2>
            <p className="mt-2 text-sm leading-6 text-[#5A6B85]">
              Descreva sua dúvida ou necessidade. Retornaremos em até 24 horas.
            </p>
            <LeadForm
              initialType="outro"
              source="Página de contato"
              defaultMessage="Contato pelo site: "
              className="mt-8"
            />
          </div>
        </div>
      </section>
      <section className="bg-white pb-20 md:pb-24">
        <div className="page-shell">
          <div className="overflow-hidden rounded-[28px] border border-blue-100 shadow-[0_15px_40px_rgba(10,46,110,.1)]">
            <iframe
              title="Localização da Stop Seguros em Aparecida de Goiânia"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-[420px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  )
}

function ContactItem({
  icon: Icon,
  title,
  text,
  href,
}: {
  icon: typeof Phone
  title: string
  text: string
  href?: string
}) {
  const content = (
    <>
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DCE9FB] text-[#1565D8]">
        <Icon className="h-5 w-5" />
      </span>
      <span>
        <strong className="block text-sm text-[#0A2E6E]">{title}</strong>
        <span className="mt-1 block text-sm leading-6 text-[#5A6B85]">{text}</span>
      </span>
    </>
  )
  return href ? (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel="noreferrer"
      className="flex gap-4 rounded-2xl bg-white p-4 transition hover:-translate-y-1 hover:shadow-md"
    >
      {content}
    </a>
  ) : (
    <div className="flex gap-4 rounded-2xl bg-white p-4">{content}</div>
  )
}
