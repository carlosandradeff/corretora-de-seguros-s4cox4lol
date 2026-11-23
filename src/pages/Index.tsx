import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowDown,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MessageCircle,
  ShieldCheck,
  Star,
  UsersRound,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BrandLogo, ShieldMark } from '@/components/BrandLogo'
import { InsuranceCard } from '@/components/InsuranceCard'
import { LeadForm } from '@/components/LeadForm'
import { CTASection, FAQList, SectionHeading } from '@/components/PageElements'
import { insurances } from '@/data/insurances'
import { whatsappUrl } from '@/data/company'

const testimonials = [
  {
    name: 'Mariana Lopes',
    city: 'Goiânia - GO',
    text: 'A equipe explicou cada diferença sem pressa. Contratei meu seguro residencial sabendo exatamente o que estava protegido.',
  },
  {
    name: 'Rafael Mendes',
    city: 'Aparecida de Goiânia - GO',
    text: 'Precisei de ajuda após uma colisão e a Stop esteve comigo em cada etapa. Atendimento ágil, humano e muito claro.',
  },
  {
    name: 'Carla e Eduardo',
    city: 'Goiânia - GO',
    text: 'Encontramos um plano de saúde adequado para toda a família. A comparação foi transparente e economizou muito tempo.',
  },
  {
    name: 'João Victor',
    city: 'Senador Canedo - GO',
    text: 'Protegemos a empresa com coberturas que realmente fazem sentido. Hoje temos muito mais tranquilidade para crescer.',
  },
]

const homeFaqs = [
  {
    question: 'Como funciona a cotação gratuita?',
    answer:
      'Você envia seus dados e conta brevemente o que precisa. Um especialista analisa seu perfil, compara opções de diferentes seguradoras e entra em contato em até 24 horas, sem compromisso.',
  },
  {
    question: 'A Stop Seguros trabalha com quais seguradoras?',
    answer:
      'Trabalhamos de forma independente com seguradoras e operadoras reconhecidas no mercado. A disponibilidade varia conforme o produto e o perfil, permitindo uma comparação imparcial.',
  },
  {
    question: 'O atendimento é somente em Goiânia?',
    answer:
      'Atendemos presencialmente Goiânia e região metropolitana e também realizamos todo o processo de forma digital, respeitando a disponibilidade de cada produto e seguradora.',
  },
  {
    question: 'A corretora ajuda quando acontece um sinistro?',
    answer:
      'Sim. Orientamos o aviso, os documentos e acompanhamos a comunicação com a seguradora durante todo o processo.',
  },
  {
    question: 'Posso revisar um seguro que já tenho?',
    answer:
      'Pode. Analisamos sua apólice atual, identificamos possíveis lacunas ou excessos e apresentamos alternativas para a renovação.',
  },
  {
    question: 'Quanto tempo leva para receber uma proposta?',
    answer:
      'As propostas mais simples costumam ficar prontas no mesmo dia. Riscos empresariais ou técnicos podem exigir informações e inspeções adicionais.',
  },
]

export default function Index() {
  const [testimonial, setTestimonial] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(
      () => setTestimonial((current) => (current + 1) % testimonials.length),
      6000,
    )
    return () => window.clearInterval(timer)
  }, [])

  return (
    <>
      <section className="relative flex min-h-[720px] items-center overflow-hidden pt-24 text-white md:min-h-screen">
        <img
          src="https://img.usecurling.com/p/1800/1100?q=family%20home&color=blue&dpr=2"
          alt="Família reunida com tranquilidade em casa"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#061E4B]/95 via-[#0A2E6E]/84 to-[#1565D8]/25" />
        <ShieldMark
          inverse
          className="animate-shield-glow absolute -right-20 top-1/2 hidden h-[520px] w-[520px] -translate-y-1/2 lg:block"
        />
        <div className="page-shell relative z-10 py-20">
          <div className="max-w-3xl animate-fade-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] backdrop-blur">
              <ShieldCheck className="h-4 w-4" /> Corretora de seguros em Goiânia
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.06] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-[68px]">
              Proteção e tranquilidade para o que mais importa
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50 md:text-xl">
              Cuidamos das suas escolhas com atendimento humano, comparação transparente e seguros
              pensados para cada fase da sua vida.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 rounded-full bg-[#1565D8] px-7 font-bold shadow-[0_10px_30px_rgba(21,101,216,.35)] hover:bg-[#2877E4]"
              >
                <Link to="/cotacao">
                  Faça sua cotação gratuita <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 rounded-full border-white/45 bg-white/10 px-7 font-bold text-white backdrop-blur hover:bg-white hover:text-[#0A2E6E]"
              >
                <a href={whatsappUrl()} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" /> Fale no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
        <a
          href="#seguros"
          aria-label="Ir para os seguros"
          className="animate-bounce-soft absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur md:block"
        >
          <ArrowDown className="h-5 w-5" />
        </a>
      </section>

      <section className="relative z-10 -mt-px bg-white py-8 shadow-[0_10px_35px_rgba(10,46,110,.08)]">
        <div className="page-shell grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4">
          <TrustStat icon={Clock3} value="+10" label="anos de experiência" />
          <TrustStat icon={UsersRound} value="+5.000" label="clientes protegidos" />
          <TrustStat icon={Clock3} value="24h" label="para responder" />
          <TrustStat icon={ShieldCheck} value="SUSEP" label="equipe certificada" />
        </div>
      </section>

      <section id="seguros" className="section-space bg-[#F4F8FE]">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Nossos seguros"
            title="Proteção completa para cada momento"
            description="Da rotina da sua família aos desafios da sua empresa, encontre orientação especializada e coberturas que fazem sentido."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insurances.map((insurance) => (
              <InsuranceCard key={insurance.slug} insurance={insurance} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-[#1565D8] px-6 font-bold text-[#1565D8] hover:bg-[#1565D8] hover:text-white"
            >
              <Link to="/solucoes">
                Explorar todas as soluções <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="section-space overflow-hidden bg-white">
        <div className="page-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div className="overflow-hidden rounded-[28px]">
              <img
                src="https://img.usecurling.com/p/1000/1100?q=happy%20couple&color=blue&dpr=2"
                alt="Casal tranquilo em um ambiente protegido"
                className="aspect-[4/4.5] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-[28px] bg-gradient-to-t from-[#0A2E6E]/35 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-3 rounded-2xl bg-white p-5 shadow-[0_16px_45px_rgba(10,46,110,.18)] sm:right-6">
              <BrandLogo compact />
              <p className="mt-2 text-sm font-bold text-[#0A2E6E]">Ao seu lado em cada escolha.</p>
            </div>
          </div>
          <div>
            <SectionHeading
              align="left"
              eyebrow="Por que escolher a Stop"
              title="Você protegido, com clareza do começo ao fim"
              description="Nossa função é tornar o seguro simples. Entendemos seu momento, buscamos boas opções e permanecemos disponíveis quando você mais precisa."
            />
            <div className="space-y-5">
              {[
                'Cotação gratuita em poucos minutos',
                'Comparação entre seguradoras reconhecidas',
                'Assistência e orientação em sinistros',
                'Atendimento humanizado e sem pressão',
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-blue-100 bg-[#F9FBFF] p-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DCE9FB] text-[#1565D8]">
                    <Check className="h-5 w-5" />
                  </span>
                  <span className="font-semibold text-[#243754]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#0A2E6E] text-white">
        <div className="page-shell">
          <SectionHeading
            inverse
            eyebrow="Histórias de tranquilidade"
            title="Quem confia na Stop, conta"
            description="Relações duradouras são construídas com presença, transparência e cuidado verdadeiro."
          />
          <div className="relative mx-auto max-w-4xl rounded-[28px] bg-white p-7 text-center text-[#1B2A44] shadow-2xl sm:p-12">
            <div className="flex justify-center gap-1 text-[#1565D8]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <blockquote className="mt-6 text-xl font-medium leading-9 text-[#243754] md:text-2xl">
              “{testimonials[testimonial].text}”
            </blockquote>
            <p className="mt-7 font-bold text-[#0A2E6E]">{testimonials[testimonial].name}</p>
            <p className="mt-1 text-sm text-[#73829A]">{testimonials[testimonial].city}</p>
            <button
              onClick={() =>
                setTestimonial((testimonial - 1 + testimonials.length) % testimonials.length)
              }
              aria-label="Depoimento anterior"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-blue-50 text-[#1565D8] sm:left-6"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => setTestimonial((testimonial + 1) % testimonials.length)}
              aria-label="Próximo depoimento"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-blue-50 text-[#1565D8] sm:right-6"
            >
              <ChevronRight />
            </button>
            <div className="mt-7 flex justify-center gap-2">
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => setTestimonial(index)}
                  aria-label={`Ver depoimento ${index + 1}`}
                  className={`h-2 rounded-full transition-all ${index === testimonial ? 'w-7 bg-[#1565D8]' : 'w-2 bg-blue-200'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-gradient-to-br from-[#EAF2FD] to-white">
        <div className="page-shell grid overflow-hidden rounded-[30px] bg-white shadow-[0_20px_60px_rgba(10,46,110,.12)] lg:grid-cols-[.9fr_1.1fr]">
          <div className="bg-gradient-to-br from-[#0A2E6E] to-[#1565D8] p-8 text-white sm:p-12">
            <p className="text-xs font-bold uppercase tracking-[.25em] text-blue-200">
              Solicite agora
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-.03em] sm:text-4xl">
              Sua cotação, sem compromisso
            </h2>
            <p className="mt-5 leading-7 text-blue-100">
              Preencha os dados ao lado. Nossa equipe compara opções e entra em contato em até 24
              horas.
            </p>
            <div className="mt-8 space-y-4">
              {[
                'Análise personalizada',
                'Condições de diferentes seguradoras',
                'Seus dados tratados com segurança',
              ].map((item) => (
                <p key={item} className="flex items-center gap-3 text-sm">
                  <Check className="h-5 w-5 text-blue-200" />
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="p-7 sm:p-12">
            <LeadForm compact source="Formulário rápido da página inicial" />
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Dúvidas frequentes"
            title="Informação clara para escolher bem"
            description="Respondemos as perguntas mais comuns. Se ainda tiver dúvidas, fale com nossa equipe."
          />
          <FAQList items={homeFaqs} />
        </div>
      </section>
      <CTASection
        title="Sua tranquilidade pode começar hoje"
        description="Conte o que você deseja proteger. A Stop Seguros cuida do caminho até a melhor escolha."
      />
    </>
  )
}

function TrustStat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Clock3
  value: string
  label: string
}) {
  return (
    <div className="flex items-center justify-center gap-3 border-blue-100 md:border-r md:last:border-r-0">
      <Icon className="hidden h-8 w-8 text-[#1565D8] sm:block" />
      <div>
        <p className="text-xl font-extrabold text-[#0A2E6E] sm:text-2xl">{value}</p>
        <p className="text-xs font-medium text-[#5A6B85] sm:text-sm">{label}</p>
      </div>
    </div>
  )
}
