import { Link } from 'react-router-dom'
import { ArrowUpRight, Clock3 } from 'lucide-react'
import { CTASection, PageHero, SectionHeading } from '@/components/PageElements'
import { blogPosts } from '@/data/blog'

export default function Blog() {
  return (
    <>
      <PageHero
        eyebrow="Conteúdo para escolher melhor"
        title="Informação que também protege"
        description="Artigos objetivos sobre seguros, prevenção e planejamento para ajudar você a tomar decisões mais tranquilas."
        image="https://img.usecurling.com/p/1800/900?q=reading%20home&color=blue&dpr=2"
      />
      <section className="section-space bg-[#F4F8FE]">
        <div className="page-shell">
          <SectionHeading
            eyebrow="Blog Stop Seguros"
            title="Conhecimento claro, sem termos complicados"
            description="Conteúdos preparados para responder dúvidas reais de famílias, profissionais e empresas."
          />
          <div className="grid gap-7 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-[22px] border border-blue-100 bg-white shadow-[0_8px_30px_rgba(10,46,110,.07)] transition hover:-translate-y-2 hover:shadow-[0_18px_40px_rgba(10,46,110,.13)]"
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="h-56 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3 text-xs font-semibold text-[#73829A]">
                      <span className="rounded-full bg-[#DCE9FB] px-3 py-1 text-[#1565D8]">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock3 className="h-3.5 w-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    <h2 className="mt-5 text-xl font-extrabold leading-7 text-[#0A2E6E]">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[#5A6B85]">{post.excerpt}</p>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#1565D8]">
                      Ler artigo <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTASection
        title="Quer aplicar esse conhecimento à sua proteção?"
        description="Fale com um especialista e receba uma análise personalizada para o seu momento."
      />
    </>
  )
}
