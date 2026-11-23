import { Link } from 'react-router-dom'
import { ArrowRight, Check, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InsuranceCard } from '@/components/InsuranceCard'
import { CTASection, PageHero, SectionHeading } from '@/components/PageElements'
import { insurances } from '@/data/insurances'

export default function Solutions() {
  return (
    <>
      <PageHero
        eyebrow="Nossas soluções"
        title="Proteção para sua vida, seu patrimônio e seus negócios"
        description="Não entregamos apenas apólices. Entendemos seus riscos, comparamos alternativas e construímos proteção sob medida."
        image="https://img.usecurling.com/p/1800/900?q=open%20sky&color=blue&dpr=2"
      />
      <section className="section-space bg-[#F4F8FE]">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Consultoria especializada"
            title="Um portfólio completo para escolhas mais seguras"
            description="Explore cada solução e conheça as principais coberturas. Nossa equipe ajuda você a ajustar todos os detalhes."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {insurances.map((insurance) => (
              <InsuranceCard key={insurance.slug} insurance={insurance} />
            ))}
          </div>
        </div>
      </section>
      <section className="section-space bg-white">
        <div className="page-shell grid items-center gap-12 rounded-[30px] bg-[#0A2E6E] p-7 text-white sm:p-12 lg:grid-cols-2 lg:p-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.25em] text-blue-200">
              Independência para comparar
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-.03em] md:text-4xl">
              A solução certa não é igual para todo mundo
            </h2>
            <p className="mt-5 leading-8 text-blue-100">
              Avaliamos coberturas, limites, franquias, assistências e qualidade de atendimento.
              Você recebe uma visão objetiva para decidir com confiança.
            </p>
            <Button
              asChild
              className="mt-8 h-12 rounded-full bg-white px-6 font-bold text-[#0A2E6E] hover:bg-blue-50"
            >
              <Link to="/cotacao">
                Pedir uma análise gratuita <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              'Necessidade antes do produto',
              'Condições explicadas com clareza',
              'Alternativas de seguradoras',
              'Acompanhamento pós-venda',
            ].map((item) => (
              <div
                key={item}
                className="flex min-h-28 flex-col justify-between rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur"
              >
                <ShieldCheck className="h-6 w-6 text-blue-200" />
                <p className="mt-4 font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="pb-20">
        <div className="page-shell rounded-2xl border border-blue-100 bg-[#F4F8FE] p-6 text-center text-sm text-[#5A6B85]">
          <p className="flex items-center justify-center gap-2">
            <Check className="h-5 w-5 text-[#1565D8]" /> Não encontrou exatamente o que procura?
            Nossa equipe também estrutura outras soluções especiais.
          </p>
        </div>
      </section>
      <CTASection />
    </>
  )
}
