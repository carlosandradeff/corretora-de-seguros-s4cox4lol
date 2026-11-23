import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, Clock3, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CTASection } from '@/components/PageElements'
import { findPost } from '@/data/blog'
import { whatsappUrl } from '@/data/company'

export default function BlogPost() {
  const { slug } = useParams()
  const post = findPost(slug)
  if (!post) return <Navigate to="/blog" replace />

  return (
    <>
      <article>
        <header className="relative flex min-h-[620px] items-end overflow-hidden pb-16 pt-40 text-white md:pb-20">
          <img
            src={post.image}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#061E4B]/95 via-[#0A2E6E]/82 to-[#1565D8]/35" />
          <div className="page-shell relative z-10">
            <Link
              to="/blog"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-100 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" /> Voltar ao blog
            </Link>
            <div className="max-w-4xl">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[.18em] backdrop-blur">
                {post.category}
              </span>
              <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-[-.04em] md:text-6xl">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-5 text-sm text-blue-100">
                <span>{post.date}</span>
                <span className="flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </header>
        <div className="section-space bg-white">
          <div className="page-shell grid items-start gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
            <div className="mx-auto max-w-3xl space-y-10">
              {post.content.map((section, index) => (
                <section key={`${section.heading}-${index}`}>
                  {section.heading && (
                    <h2 className="text-2xl font-extrabold tracking-[-.02em] text-[#0A2E6E] md:text-3xl">
                      {section.heading}
                    </h2>
                  )}
                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 40)}
                      className="mt-4 text-lg leading-9 text-[#52627A]"
                    >
                      {paragraph}
                    </p>
                  ))}
                  {section.bullets && (
                    <ul className="mt-6 space-y-3 rounded-2xl bg-[#F4F8FE] p-6">
                      {section.bullets.map((item) => (
                        <li key={item} className="flex gap-3 leading-7 text-[#34445E]">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#1565D8]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
            <aside className="soft-card p-6 lg:sticky lg:top-28">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#1565D8]">
                Precisa de orientação?
              </p>
              <h2 className="mt-3 text-xl font-extrabold text-[#0A2E6E]">
                Converse com quem entende
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#5A6B85]">
                Tire dúvidas e receba uma análise sem compromisso.
              </p>
              <Button
                asChild
                className="mt-5 h-12 w-full rounded-xl bg-[#25D366] font-bold hover:bg-[#20bd5b]"
              >
                <a href={whatsappUrl()} target="_blank" rel="noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" /> Falar no WhatsApp
                </a>
              </Button>
            </aside>
          </div>
        </div>
      </article>
      <CTASection />
    </>
  )
}
