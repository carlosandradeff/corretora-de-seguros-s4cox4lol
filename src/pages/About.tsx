import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Eye,
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CTASection, Checklist, PageHero, SectionHeading } from '@/components/PageElements'

const values = [
  {
    icon: Target,
    title: 'Missão',
    text: 'Proteger pessoas, famílias e negócios por meio de escolhas claras, adequadas e sustentáveis.',
  },
  {
    icon: Eye,
    title: 'Visão',
    text: 'Ser reconhecida em Goiás como a corretora que transforma seguro em tranquilidade verdadeira.',
  },
  {
    icon: HeartHandshake,
    title: 'Valores',
    text: 'Transparência, escuta, responsabilidade, respeito e presença em todos os momentos.',
  },
]

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="Sobre a Stop Seguros"
        title="Experiência que protege. Proximidade que tranquiliza."
        description="Há mais de uma década, ajudamos pessoas e empresas de Goiânia e região a tomar decisões seguras, com orientação simples e atendimento verdadeiramente humano."
        image="https://img.usecurling.com/p/1800/900?q=professional%20team&color=blue&dpr=2"
      />

      <section className="section-space bg-white">
        <div className="page-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Nossa história"
              title="Seguro é sobre cuidar de histórias"
              description="A Stop Seguros nasceu com uma ideia simples: ninguém deveria escolher uma proteção importante sem entender o que está contratando."
            />
            <div className="space-y-5 text-base leading-8 text-[#5A6B85]">
              <p>
                Começamos atendendo famílias e empreendedores da região metropolitana de Goiânia.
                Com o tempo, ampliamos nosso portfólio e formamos relações sólidas com seguradoras,
                operadoras de saúde e parceiros especializados.
              </p>
              <p>
                Mesmo com novos produtos e tecnologia, preservamos aquilo que nos trouxe até aqui:
                ouvir antes de oferecer, comparar com independência e acompanhar cada cliente também
                depois da assinatura. Porque uma apólice só cumpre seu propósito quando traz
                segurança no momento em que é necessária.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://img.usecurling.com/p/1000/1000?q=client%20conversation&color=blue&dpr=2"
              alt="Atendimento próximo da Stop Seguros"
              className="aspect-square w-full rounded-[28px] object-cover"
            />
            <div className="absolute -bottom-6 left-5 right-5 flex items-center gap-4 rounded-2xl bg-white p-5 shadow-[0_18px_45px_rgba(10,46,110,.18)] sm:left-auto sm:w-72">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#DCE9FB] text-[#1565D8]">
                <ShieldCheck />
              </span>
              <p className="text-sm font-bold leading-6 text-[#0A2E6E]">
                Mais de 10 anos colocando pessoas em primeiro lugar.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space bg-[#F4F8FE]">
        <div className="page-shell">
          <SectionHeading
            eyebrow="O que nos guia"
            title="Princípios firmes, relações leves"
            description="Cada recomendação carrega responsabilidade. Por isso, nossas escolhas começam por estes compromissos."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, title, text }) => (
              <div key={title} className="soft-card p-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#DCE9FB] text-[#1565D8]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-6 text-xl font-extrabold text-[#0A2E6E]">{title}</h3>
                <p className="mt-3 leading-7 text-[#5A6B85]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space bg-white">
        <div className="page-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <img
              src="https://img.usecurling.com/p/1000/850?q=goiania%20city&color=blue&dpr=2"
              alt="Vista urbana de Goiânia"
              className="w-full rounded-[28px] object-cover shadow-[0_18px_45px_rgba(10,46,110,.12)]"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading
              align="left"
              eyebrow="Confiança em Goiânia"
              title="Conhecimento local, acesso às melhores soluções"
              description="Atendemos quem vive, trabalha e empreende em Goiânia e região com proximidade e domínio das necessidades locais."
            />
            <Checklist
              items={[
                'Análise imparcial entre diferentes seguradoras',
                'Profissionais preparados para riscos pessoais e empresariais',
                'Atendimento presencial e digital',
                'Acompanhamento em renovações e sinistros',
                'Comunicação direta, sem termos complicados',
              ]}
            />
            <Button
              asChild
              className="mt-8 h-12 rounded-full bg-[#1565D8] px-6 font-bold hover:bg-[#0F4FB0]"
            >
              <Link to="/cotacao">
                Quero falar com um especialista <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-[#F4F8FE] py-16">
        <div className="page-shell grid gap-6 sm:grid-cols-3">
          <MiniFeature
            icon={UsersRound}
            title="Atendimento humano"
            text="Você fala com pessoas que escutam e explicam."
          />
          <MiniFeature
            icon={Sparkles}
            title="Escolha simplificada"
            text="Traduzimos condições e destacamos o que importa."
          />
          <MiniFeature
            icon={ShieldCheck}
            title="Presença contínua"
            text="Acompanhamos sua proteção durante toda a vigência."
          />
        </div>
      </section>
      <CTASection title="Conheça um jeito mais tranquilo de contratar seguros" />
    </>
  )
}

function MiniFeature({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof UsersRound
  title: string
  text: string
}) {
  return (
    <div className="flex gap-4 rounded-2xl bg-white p-6">
      <Icon className="h-7 w-7 shrink-0 text-[#1565D8]" />
      <div>
        <h3 className="font-bold text-[#0A2E6E]">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-[#5A6B85]">{text}</p>
      </div>
    </div>
  )
}
