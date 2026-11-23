import { PageHero } from '@/components/PageElements'
import { company } from '@/data/company'

const sections = [
  {
    title: '1. Nosso compromisso',
    text: 'A Stop Seguros respeita sua privacidade e trata dados pessoais com responsabilidade, transparência e segurança. Esta política explica quais informações coletamos pelo site, para quais finalidades e quais são os seus direitos.',
  },
  {
    title: '2. Dados coletados',
    text: 'Nos formulários de cotação e contato, podemos coletar nome, e-mail, telefone, tipo de seguro de interesse e a mensagem enviada. Também podem ser registrados dados técnicos de navegação necessários ao funcionamento e à segurança do site.',
  },
  {
    title: '3. Como usamos seus dados',
    text: 'As informações são usadas para responder solicitações, preparar cotações, prestar orientação sobre seguros, manter o histórico do atendimento e cumprir obrigações legais e regulatórias. Não comercializamos dados pessoais.',
  },
  {
    title: '4. Compartilhamento',
    text: 'Quando necessário para preparar uma proposta ou executar um serviço solicitado, dados podem ser compartilhados com seguradoras, operadoras, prestadores e parceiros envolvidos, sempre no limite da finalidade informada e conforme a legislação aplicável.',
  },
  {
    title: '5. Segurança e retenção',
    text: 'Adotamos medidas administrativas e técnicas para reduzir riscos de acesso indevido, perda ou alteração. Os dados permanecem armazenados pelo período necessário ao atendimento, ao relacionamento e ao cumprimento de obrigações legais.',
  },
  {
    title: '6. Seus direitos',
    text: 'Nos termos da Lei Geral de Proteção de Dados (LGPD), você pode solicitar confirmação do tratamento, acesso, correção, portabilidade quando aplicável, anonimização, bloqueio, eliminação e informações sobre compartilhamento. Alguns dados podem ser mantidos por obrigação legal.',
  },
  {
    title: '7. Cookies e links externos',
    text: 'Podemos utilizar cookies estritamente necessários e recursos de terceiros, como mapas e WhatsApp. Ao acessar serviços externos, aplicam-se também as políticas de privacidade desses fornecedores.',
  },
  {
    title: '8. Atualizações',
    text: 'Esta política pode ser atualizada para refletir mudanças legais ou operacionais. A versão disponível nesta página é sempre a mais recente. Última atualização: março de 2026.',
  },
]

export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Privacidade e transparência"
        title="Política de Privacidade"
        description="Saiba como a Stop Seguros coleta, utiliza e protege as informações fornecidas durante sua navegação e atendimento."
        image="https://img.usecurling.com/p/1800/900?q=blue%20sky&color=blue&dpr=2"
      />
      <article className="section-space bg-white">
        <div className="page-shell max-w-4xl">
          <div className="space-y-9">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-xl font-extrabold text-[#0A2E6E]">{section.title}</h2>
                <p className="mt-3 leading-8 text-[#5A6B85]">{section.text}</p>
              </section>
            ))}
            <section className="rounded-2xl bg-[#F4F8FE] p-6">
              <h2 className="text-xl font-extrabold text-[#0A2E6E]">9. Canal de privacidade</h2>
              <p className="mt-3 leading-8 text-[#5A6B85]">
                Para exercer direitos ou esclarecer dúvidas sobre o tratamento de dados, envie uma
                mensagem para{' '}
                <a className="font-semibold text-[#1565D8]" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </article>
    </>
  )
}
