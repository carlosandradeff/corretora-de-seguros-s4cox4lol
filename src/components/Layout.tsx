import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import {
  ChevronDown,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { BrandLogo } from '@/components/BrandLogo'
import { ScrollToTop } from '@/components/ScrollToTop'
import { insurances } from '@/data/insurances'
import { company, whatsappUrl } from '@/data/company'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Sobre Nós', href: '/sobre' },
  { label: 'Cotação', href: '/cotacao' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contato', href: '/contato' },
]

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileProducts, setMobileProducts] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location.pathname])

  const headerSolid = scrolled || location.pathname !== '/'

  return (
    <div className="flex min-h-screen flex-col overflow-x-clip bg-white text-[#1B2A44]">
      <ScrollToTop />
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          headerSolid
            ? 'border-b border-blue-100/80 bg-white/95 py-2 shadow-[0_4px_24px_rgba(10,46,110,0.08)] backdrop-blur-xl'
            : 'bg-gradient-to-b from-[#061E4B]/70 to-transparent py-4',
        )}
      >
        <div className="page-shell flex items-center justify-between gap-5">
          <Link to="/" aria-label="Stop Seguros — página inicial">
            <BrandLogo inverse={!headerSolid} />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            <DesktopLink href="/" label="Início" inverse={!headerSolid} />
            <DesktopLink href="/sobre" label="Sobre Nós" inverse={!headerSolid} />
            <div className="group relative">
              <Link
                to="/solucoes"
                className={cn(
                  'flex items-center gap-1 rounded-full px-3 py-2 text-sm font-semibold transition',
                  headerSolid
                    ? 'text-[#243754] hover:bg-blue-50 hover:text-[#1565D8]'
                    : 'text-white hover:bg-white/10',
                )}
              >
                Seguros <ChevronDown className="h-4 w-4 transition group-hover:rotate-180" />
              </Link>
              <div className="invisible absolute left-1/2 top-full w-[680px] -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100">
                <div className="grid grid-cols-3 gap-1 rounded-2xl border border-blue-100 bg-white p-4 shadow-[0_20px_60px_rgba(10,46,110,0.18)]">
                  <Link
                    to="/solucoes"
                    className="col-span-3 mb-1 flex items-center justify-between rounded-xl bg-[#F4F8FE] px-4 py-3 font-bold text-[#0A2E6E] hover:text-[#1565D8]"
                  >
                    Ver todas as soluções <span>→</span>
                  </Link>
                  {insurances.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/${item.slug}`}
                      className="rounded-lg px-3 py-2.5 text-sm font-medium text-[#43536B] hover:bg-blue-50 hover:text-[#1565D8]"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <DesktopLink href="/cotacao" label="Cotação" inverse={!headerSolid} />
            <DesktopLink href="/blog" label="Blog" inverse={!headerSolid} />
            <DesktopLink href="/contato" label="Contato" inverse={!headerSolid} />
          </nav>

          <Button
            asChild
            className="hidden rounded-full bg-[#1565D8] px-5 font-bold shadow-[0_8px_24px_rgba(21,101,216,0.3)] hover:bg-[#0F4FB0] xl:inline-flex"
          >
            <Link to="/cotacao">Faça sua cotação</Link>
          </Button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  'rounded-full lg:hidden',
                  headerSolid ? 'text-[#0A2E6E]' : 'text-white hover:bg-white/10 hover:text-white',
                )}
                aria-label="Abrir menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex w-full flex-col overflow-y-auto border-0 bg-white p-0 sm:max-w-md"
            >
              <SheetHeader className="flex-row items-center justify-between border-b border-blue-100 p-5 text-left">
                <SheetTitle>
                  <BrandLogo />
                </SheetTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Fechar menu"
                >
                  <X className="h-5 w-5" />
                </Button>
              </SheetHeader>
              <nav className="flex-1 px-6 py-6">
                {navItems.slice(0, 2).map((item) => (
                  <MobileLink key={item.href} {...item} />
                ))}
                <button
                  onClick={() => setMobileProducts((open) => !open)}
                  className="flex w-full items-center justify-between border-b border-blue-50 py-4 text-left text-lg font-bold text-[#0A2E6E]"
                >
                  Seguros{' '}
                  <ChevronDown
                    className={cn('h-5 w-5 transition', mobileProducts && 'rotate-180')}
                  />
                </button>
                {mobileProducts && (
                  <div className="grid grid-cols-2 gap-1 bg-[#F4F8FE] p-3">
                    {insurances.map((item) => (
                      <Link
                        key={item.slug}
                        to={`/${item.slug}`}
                        className="rounded-lg p-2 text-xs font-semibold leading-5 text-[#43536B]"
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>
                )}
                {navItems.slice(2).map((item) => (
                  <MobileLink key={item.href} {...item} />
                ))}
              </nav>
              <div className="space-y-3 bg-[#F4F8FE] p-6">
                <Button asChild className="h-12 w-full rounded-xl bg-[#1565D8] font-bold">
                  <Link to="/cotacao">Faça sua cotação</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="h-12 w-full rounded-xl border-[#25D366] font-bold text-[#138A44]"
                >
                  <a href={whatsappUrl()} target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Stop Seguros pelo WhatsApp"
        className="animate-float-pulse fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition hover:scale-110 md:bottom-7 md:right-7 md:h-16 md:w-16"
      >
        <MessageCircle className="h-7 w-7 fill-current md:h-8 md:w-8" />
      </a>

      <footer className="bg-[#061E4B] text-blue-100">
        <div className="page-shell grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:py-20">
          <div className="sm:col-span-2 lg:col-span-4 lg:pr-10">
            <BrandLogo inverse />
            <p className="mt-6 max-w-sm text-sm leading-7 text-blue-200">
              Proteção não precisa ser complicada. A Stop Seguros compara opções, explica cada
              detalhe e acompanha você antes, durante e depois da contratação.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialIcon label="Instagram">
                <Instagram />
              </SocialIcon>
              <SocialIcon label="Facebook">
                <Facebook />
              </SocialIcon>
            </div>
          </div>
          <FooterColumn title="Seguros" className="lg:col-span-3">
            {insurances.map((item) => (
              <Link key={item.slug} to={`/${item.slug}`}>
                {item.title}
              </Link>
            ))}
          </FooterColumn>
          <FooterColumn title="Links úteis" className="lg:col-span-2">
            <Link to="/">Início</Link>
            <Link to="/sobre">Sobre nós</Link>
            <Link to="/solucoes">Soluções</Link>
            <Link to="/cotacao">Cotação</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contato">Contato</Link>
            <Link to="/politica-de-privacidade">Política de Privacidade</Link>
          </FooterColumn>
          <div className="lg:col-span-3">
            <h3 className="mb-5 font-bold text-white">Fale com a Stop</h3>
            <div className="space-y-4 text-sm leading-6 text-blue-200">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-400" />
                {company.address}
              </p>
              <a href={`tel:${company.phoneDigits}`} className="flex gap-3 hover:text-white">
                <Phone className="h-5 w-5 shrink-0 text-blue-400" />
                {company.phoneDisplay}
              </a>
              <a href={`mailto:${company.email}`} className="flex gap-3 break-all hover:text-white">
                <Mail className="h-5 w-5 shrink-0 text-blue-400" />
                {company.email}
              </a>
            </div>
            <Button
              asChild
              className="mt-6 rounded-full bg-[#25D366] font-bold text-white hover:bg-[#20bd5b]"
            >
              <a href={whatsappUrl()} target="_blank" rel="noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="page-shell flex flex-col gap-2 py-5 text-xs text-blue-300 sm:flex-row sm:items-center sm:justify-between">
            <p>© 2026 Stop Seguros — Corretora de Seguros</p>
            <p>{company.cnpj}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function DesktopLink({ href, label, inverse }: { href: string; label: string; inverse: boolean }) {
  return (
    <NavLink
      to={href}
      end={href === '/'}
      className={({ isActive }) =>
        cn(
          'rounded-full px-3 py-2 text-sm font-semibold transition',
          inverse
            ? 'text-white hover:bg-white/10'
            : 'text-[#243754] hover:bg-blue-50 hover:text-[#1565D8]',
          isActive && (inverse ? 'bg-white/15' : 'bg-blue-50 text-[#1565D8]'),
        )
      }
    >
      {label}
    </NavLink>
  )
}
function MobileLink({ href, label }: { href: string; label: string }) {
  return (
    <Link to={href} className="block border-b border-blue-50 py-4 text-lg font-bold text-[#0A2E6E]">
      {label}
    </Link>
  )
}
function FooterColumn({
  title,
  className,
  children,
}: {
  title: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={className}>
      <h3 className="mb-5 font-bold text-white">{title}</h3>
      <div className="grid grid-cols-1 gap-3 text-sm text-blue-200 [&_a]:transition [&_a:hover]:translate-x-1 [&_a:hover]:text-white">
        {children}
      </div>
    </div>
  )
}
function SocialIcon({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <a
      href="#"
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition hover:bg-[#1565D8] [&_svg]:h-4 [&_svg]:w-4"
    >
      {children}
    </a>
  )
}
