import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ShieldMark } from '@/components/BrandLogo'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F4F8FE] px-5">
      <div className="max-w-lg text-center">
        <ShieldMark className="mx-auto h-24 w-24 opacity-30" />
        <p className="mt-6 text-sm font-bold uppercase tracking-[.25em] text-[#1565D8]">Erro 404</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-[-.04em] text-[#0A2E6E]">
          Esta página não foi encontrada
        </h1>
        <p className="mt-4 leading-7 text-[#5A6B85]">
          O endereço pode ter mudado ou não existe. Volte para o início e continue navegando com
          tranquilidade.
        </p>
        <Button asChild className="mt-8 h-12 rounded-full bg-[#1565D8] px-6 font-bold">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar ao início
          </Link>
        </Button>
      </div>
    </main>
  )
}
